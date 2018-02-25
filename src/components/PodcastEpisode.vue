<template>
  <article class="podcast-episode">
    <div>
      <img
        class="podcast-episode__cover-image"
        :src="coverImage"
        alt=""
      >

      <button
        class="podcast-episode__button"
        @click="loadEpisode"
      >
        <svg class="icon icon-play">
          <use xlink:href="#play"/>
        </svg> Play
      </button>
    </div>

    <div>
      <div class="podcast-episode__date">
        <span
          aria-hidden="true"
          class="screen-reader-text">Published:
        </span> {{ episode.pubDate | date }}

        <span v-if="episode.duration">
          <span aria-hidden="true"> | </span>
          <span
            aria-hidden="true"
            class="screen-reader-text"
          >Duration:</span> {{ episode.duration }}
        </span>
      </div>

      <h2 class="podcast-episode__title">{{ episode.title }}</h2>
      <p 
        class="podcast-episode__summary"
        v-html="episode.description"></p>
    </div>
  </article>
</template>

<script>
import eventHub from "@/event-hub";

export default {
  name: "PodcastEpisode",
  props: {
    episode: {
      type: Object,
      default: function() {
        return {};
      }
    },
    coverImage: {
      type: String,
      default: ""
    },
    podcastTitle: {
      type: String,
      default: ""
    }
  },
  methods: {
    loadEpisode: function() {
      eventHub.$emit("play-episode", {
        episode: this.episode,
        coverImage: this.coverImage,
        podcastTitle: this.podcastTitle
      });
    }
  }
};
</script>

<style lang="scss">
@import "../variables.scss";

.podcast-episode {
  display: grid;
  grid-template-columns: 150px auto;
  grid-gap: 20px;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid $light-grey;
}

.podcast-episode__title {
  margin: 0;
  margin-bottom: 1rem;
  border-bottom: 1px solid #fff;
}

.podcast-episode__date {
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: $dark-grey;
}

.podcast-episode__cover-image {
  height: 150px;
  width: 150px;
  max-width: 100%;
  border-radius: 5px;
  background-color: $light-grey;
}

.podcast-episode__button {
  width: 100%;
  padding: 0.25rem;
  border: 3px solid $black;
  border-radius: 5px;
  background-color: transparent;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 14px;
  color: $black;
  transition: background-color 0.25s, color 0.25s;

  &:hover {
    background-color: $black;
    color: $white;
  }
}
</style>
