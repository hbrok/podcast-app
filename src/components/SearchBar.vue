<template>
  <form @submit.prevent>
    <label for="podcast-search">Search for a podcast</label>
    <div class="results-wrapper">
      <input
        autocomplete="off"
        type="search"
        name="podcast-search"
        ref="searchBar"
        @input="search"
        @blur="resetSearch"
        @keyup.up="prevSearchResult"
        @keyup.down.prevent="nextSearchResult"
        @keyup.enter="loadPodcast(searchResults[selectedSearchResult].trackId)"
      >
      
      <ul v-if="searchResults">
        <li
          v-for="(result, index) in searchResults"
          :key="index"
          :class="index === selectedSearchResult ? 'selected' : ''"
          @click="loadPodcast(result.trackId)"
        >
          {{ result.trackName }}
        </li>
      </ul>
    </div>
    <button type="submit">
      <span class="screen-reader-text">Search</span>
      <svg class="icon icon-search">
        <use xlink:href="#search"/>
      </svg> 
    </button>
  </form>
</template>

<script>
import router from "@/router";
import eventHub from "@/event-hub";
import { getJSON } from "@/utils";

export default {
  name: "SearchBar",
  props: {
    msg: {
      type: String,
      default: ""
    }
  },
  data: function() {
    return {
      typeAhead: null,
      searchResults: [],
      currentSearch: false,
      selectedSearchResult: -1
    };
  },
  created: function() {
    eventHub.$on("reset-search", this.resetSearch);
  },
  methods: {
    nextSearchResult: function() {
      this.selectedSearchResult === this.searchResults.length - 1
        ? (this.selectedSearchResult = 0)
        : this.selectedSearchResult++;
    },
    prevSearchResult: function() {
      this.selectedSearchResult === 0
        ? (this.selectedSearchResult = this.searchResults.length - 1)
        : this.selectedSearchResult--;
    },
    loadPodcast: function(trackId) {
      router.push({ path: `/${trackId}` });
    },
    resetSearch: function() {
      const _that = this;
      this.selectedSearchResult = -1;

      // When clicking a search result, the results clear before the click can register,
      // setting a timeout fixes it for now.
      setTimeout(function() {
        _that.searchResults = [];
      }, 500);
    },
    search: function(e) {
      const _that = this;
      const chars = e.currentTarget.value.length;

      this.selectedSearchResult = -1;
      this.searchResults = [];

      // Search if we have more than 3 chars.
      if (chars < 3) {
        return;
      }

      if (this.currentSearch) {
        this.currentSearch.abort();
      }

      this.currentSearch = getJSON(
        `https://itunes.apple.com/search?media=podcast&attribute=titleTerm&limit=10&term=${
          e.currentTarget.value
        }`,
        function(response) {
          for (var i = 0; i < response.results.length; i++) {
            _that.searchResults.push({
              trackName: response.results[i].trackName,
              feedUrl: response.results[i].feedUrl,
              trackId: response.results[i].trackId
            });
          }

          _that.currentSearch = false;
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../variables.scss";

form {
  display: flex;
  align-items: center;
  justify-content: center;
}

input[type="search"] {
  position: relative;
  z-index: 1;
  border-radius: 5px 0 0 5px;
  border: 2px solid $light-grey;
  padding: 0.45rem 0.5rem;
  color: $dark-grey;
}

label {
  width: auto;
  margin-right: 1rem;
}

button {
  padding: 0.46rem 0.75rem;
  border-color: #e8e8e8;
  border-radius: 0 5px 5px 0;
  background-color: $light-grey;
}

.results-wrapper ul {
  position: absolute;
  width: 315px;
  max-width: 100%;
  margin: 0;
  margin-top: 0.3rem;
  padding: 0;
  border-radius: 5px;
  box-shadow: 1px 1px 10px 0px rgba($black, 0.5);
  background-color: $white;
  font-size: 0.9rem;
  color: $black;
  list-style: none;
  overflow: hidden;

  li {
    padding: 0.5rem 0.5rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;

    &:not(:last-child) {
      border-bottom: 1px solid $light-grey;
    }

    &.selected,
    &:hover {
      background-color: $light-grey;
      cursor: pointer;
    }
  }
}
</style>
