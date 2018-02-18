<template>
  <form>
    <label for="podcast-search">Search for a podcast</label>
    <div class="results-wrapper">
      <input
        type="search"
        name="podcast-search"
        ref="searchBar"
        @input="search"
        @blur="resetSearch"
      >
      
      <ul v-if="searchResults">
        <li
          v-for="(result, index) in searchResults"
          :key="index"
          @click="loadPodcast(result.feedUrl)"
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
      currentSearch: false
    };
  },
  created: function() {
    eventHub.$on("reset-search", this.resetSearch);
  },
  methods: {
    loadPodcast: function(feedUrl) {
      eventHub.$emit("load-podcast", feedUrl);
    },
    resetSearch: function() {
      // e.currentTarget.value = "";
      // this.searchResults = [];
    },
    search: function(e) {
      const _that = this;
      const chars = e.currentTarget.value.length;

      this.searchResults = [];

      // Search if we have more than 3 chars.
      if (chars < 3) {
        return;
      }

      if (this.currentSearch) {
        this.currentSearch.abort();
      }

      this.currentSearch = getJSON(
        `https://itunes.apple.com/search?media=podcast&attribute=titleTerm&limit=15&term=${
          e.currentTarget.value
        }`,
        function(response) {
          for (var i = 0; i < response.results.length; i++) {
            _that.searchResults.push({
              trackName: response.results[i].trackName,
              feedUrl: response.results[i].feedUrl
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
  padding: 0.45rem 0.75rem;
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

    &:hover {
      background-color: $light-grey;
    }
  }
}
</style>
