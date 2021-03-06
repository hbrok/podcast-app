<template>
  <div>
    <div class="podcast__header">
      <div class="podcast__header-inner">
        <h1 class="podcast__title">{{ title }}</h1>
        <img
          class="podcast__cover-image"
          :src="coverImage"
          alt=""
        >

        <div class="podcast__meta">
          <p>{{ summary }}</p>
          <ul class="podcast__meta--list">
            <li v-if="lastUpdated">
              <svg class="icon icon-clock">
                <use xlink:href="#clock"/>
              </svg> Last updated {{ lastUpdated | date }}
            </li>

            <li v-if="link">
              <svg class="icon icon-link">
                <use xlink:href="#link"/>
              </svg> <a :href="link">{{ link }}</a>
            </li>

            <li v-if="episodes.length">
              <svg class="icon icon-headphones">
                <use xlink:href="#headphones"/>
              </svg> {{ episodes.length }} episodes
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

    <section class="podcast__episodes">
      <div class="loading" v-if="loading">
      <svg class="icon icon-loading">
        <use xlink:href="#loading"/>
      </svg>
    </div>

      <PodcastEpisode
        v-for="(episode, index) in episodes"
        :episode="episode"
        :cover-image="episodes[index].coverImage"
        :podcast-title="title"
        :key="index"
      />
    </section>
  </div>
</template>

<script>
import PodcastEpisode from "@/components/PodcastEpisode.vue";

import eventHub from "@/event-hub";
import fetchPodcast from "@/podcasts";
import { getJSON } from "@/utils";

export default {
  name: "PodcastView",
  components: {
    PodcastEpisode
  },
  data: function() {
    return {
      loading: false,
      title: "",
      lastUpdated: "",
      link: "",
      summary: "",
      coverImage: "",
      episodes: []
    };
  },
  watch: {
    "$route.params.itunesId"(to, from) {
      this.loadPodcastByItunesId(this.$route.params.itunesId);
    }
  },
  created: function() {
    eventHub.$on("load-podcast", this.loadPodcast);
    this.loadPodcastByItunesId(this.$route.params.itunesId);
  },
  methods: {
    loadPodcast: function(feedUrl) {
      this.loading = true;

      eventHub.$emit("reset-search");

      fetchPodcast(feedUrl).then(response => {
        this.title = response.title;
        this.lastUpdated = response.lastUpdated;
        this.link = response.link;
        this.summary = response.summary;
        this.coverImage = response.coverImage;
        this.episodes = response.episodes;
        this.loading = false;
      });
    },
    loadPodcastByItunesId: function(id) {
      getJSON(
        `https://itunes.apple.com/lookup?id=${this.$route.params.itunesId}`,
        response => {
          this.loadPodcast(response.results[0].feedUrl);
        }
      );
    }
  }
};
</script>

<style lang="scss">
@import "../variables.scss";

.loading {
  text-align: center;
}

.icon.icon-loading {
  width: 8rem;
  height: 8rem;
  max-width: 100%;
  margin: 0 auto;
}

.podcast__header {
  margin-bottom: 1rem;
  background-image: linear-gradient(-147deg, #de8d94 0%, #808fae 100%);

  .icon {
    font-size: 0.8rem;
    margin-right: 0.25rem;
  }
}

.podcast__header-inner {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 100px auto;
  grid-template-areas:
    "podcast-image podcast-title"
    "podcast-meta podcast-meta";
  width: 100%;
  max-width: 600px;
  padding: 1rem;
  margin: 0 auto;
  color: $white;
  box-sizing: border-box;

  @media screen and (min-width: 750px) {
    grid-template-columns: minmax(0, 300px) auto;
    grid-template-areas:
      "podcast-image podcast-title"
      "podcast-image podcast-meta";
    padding: 2rem;
    max-width: 895px;
  }
}

.podcast__title {
  grid-area: podcast-title;
  align-self: center;
  margin: 0;
  font-size: 1.5rem;

  @media screen and (min-width: 750px) {
    font-size: 2rem;
  }
}

.podcast__cover-image {
  grid-area: podcast-image;
  height: auto;
  width: 300px;
  max-width: 100%;
  border-radius: 5px;
  box-shadow: 0 5px 20px 0px rgba(50, 70, 107, 0.5);
  background-color: $light-grey;
}

.podcast__meta {
  grid-area: podcast-meta;
}

.podcast__meta--list {
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
