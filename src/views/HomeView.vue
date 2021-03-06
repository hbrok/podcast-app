<template>
  <div class="podcast__header">
    <div class="podcast__header-inner" v-for="(podcast, index) in podcasts" :key="index" @click="loadPodcast(podcast.id)">
      <h1 class="podcast__title">{{ title }}</h1>
      <img
        class="podcast__cover-image"
        :src="podcast.coverImage"
        alt=""
      >

      <div>
        <p>{{ podcast.title }}</p>
        <ul class="podcast__meta">
          <li>
            <svg class="icon icon-clock">
              <use xlink:href="#clock"/>
            </svg> Last updated {{ podcast.lastUpdated | date }}
          </li>

          <li>
            <svg class="icon icon-headphones">
              <use xlink:href="#headphones"/>
            </svg> {{ podcast.episodes }} episodes
          </li>
        </ul>
      </div>
    </div>

    <svg
      class="svg"
      viewBox="0 0 1439 80"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="currentColor">
        <path d="M-1,80 L1439,80 L1439,75.0577158 C1379.79277,41.1506119 1270.6261,17.4276478 1111.5,3.88882329 C874.5,-16.2756963 723.714904,48.2131338 344,54.8931963 C226.309936,56.9636364 111.309936,46.4859939 -1,23.4602687 L-1,80 Z"/>
      </g>
    </svg>  
  </div>
</template>

<script>
import router from "@/router";
import { getJSON } from "@/utils";

export default {
  name: "HomeView",
  data: function() {
    return {
      podcasts: []
    };
  },
  created: function() {
    this.loadPodcastByItunesId("367330921,665149280"); // Load MBMBaM & Sawbones
  },
  methods: {
    loadPodcast: function(trackId) {
      router.push({ path: `/${trackId}` });
    },
    loadPodcastByItunesId: function(id) {
      const _that = this;

      getJSON(`https://itunes.apple.com/lookup?id=${id}`, function(response) {
        response.results.forEach(result => {
          _that.podcasts.push({
            title: result.trackName,
            lastUpdated: result.releaseDate,
            coverImage: result.artworkUrl600,
            episodes: result.trackCount,
            id: result.trackId
          });
        });
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "../variables.scss";

.podcast__header {
  display: grid;
  grid-template-columns: 50% 50%;
  margin-bottom: 1rem;
  background-image: linear-gradient(-147deg, #de8d94 0%, #808fae 100%);

  .icon {
    font-size: 0.8rem;
    margin-right: 0.25rem;
  }
}

.podcast__header-inner {
  display: grid;
  grid-template-columns: minmax(0, 300px) auto;
  grid-column-gap: 20px;
  grid-template-areas:
    "podcast-image podcast-title"
    "podcast-image podcast-meta";
  width: 100%;
  max-width: 895px;
  padding: 2rem;
  margin: 0 auto;
  color: $white;
  box-sizing: border-box
}

.podcast__title {
  grid-area: podcast-title;
  margin: 0;
  margin-bottom: 1rem;
  font-size: 2rem;
}

.podcast__cover-image {
  grid-area: podcast-image;
  max-width: 100%;
  border-radius: 5px;
  box-shadow: 0 5px 20px 0px rgba(50, 70, 107, 0.5);
}

.podcast__meta {
  grid-area: podcast-meta;
  margin: 0;
  padding: 0;
  list-style-type: none;

  li {
    margin-bottom: 0.5rem;
  }
}

.podcast__episodes {
  list-style-type: none;
  max-width: 770px;
  margin: 0 auto;
  padding: 0 1rem;
}
</style>
