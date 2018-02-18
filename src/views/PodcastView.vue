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

      <div>
        <p>{{ summary }}</p>
        <ul class="podcast__meta">
          <li>
            <svg class="icon icon-clock">
              <use xlink:href="#clock"/>
            </svg> Last updated {{ lastUpdated }}
          </li>
          <li><svg class="icon icon-link">
              <use xlink:href="#link"/>
            </svg> <a :href="link">{{ link }}</a>
            </li>
          <li>
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
    <PodcastEpisode
      v-for="(episode, index) in episodes"
      :episode="episode"
      :cover-image="coverImage"
      :podcast-title="title"
      :key="index"
    />
  </section>
</div>
</template>

<script>
import PodcastEpisode from "@/components/PodcastEpisode.vue";

import eventHub from "@/event-hub";

const getElement = (parent, tagName) =>
  parent.getElementsByTagName(tagName)[0].textContent;

const getElements = (parent, tagName) => parent.getElementsByTagName(tagName);

export default {
  name: "PodcastView",
  components: {
    PodcastEpisode
  },
  data: function() {
    return {
      title: "",
      lastUpdated: "",
      link: "",
      summary: "",
      coverImage: "",
      episodes: []
    };
  },
  created: function() {
    this.loadPodcast(`https://mbmbam.libsyn.com/rss`);
    eventHub.$on("load-podcast", this.loadPodcast);
  },
  methods: {
    loadPodcast: function(feedUrl) {
      // this.resetSearch();
      eventHub.$emit("reset-search");

      fetch(new Request(`https://cors-anywhere.herokuapp.com/${feedUrl}`)).then(
        results => {
          // results returns XML. lets cast this to a string, then create
          // a new DOM object out of it!
          results.text().then(str => {
            let responseDoc = new DOMParser().parseFromString(
              str,
              "application/xml"
            );

            this.title = getElement(responseDoc, "title");
            this.lastUpdated = getElement(responseDoc, "pubDate");
            this.link = getElement(responseDoc, "link");
            this.summary = getElement(responseDoc, "itunes:summary");
            this.coverImage = responseDoc
              .getElementsByTagName("itunes:image")[0]
              .getAttribute("href");
            this.episodes = [];
            Array.from(getElements(responseDoc, "item")).forEach(item => {
              this.episodes.push({
                title: getElement(item, "title"),
                pubDate: getElement(item, "pubDate"),
                description: getElement(item, "description"),
                duration: getElement(item, "itunes:duration"),
                audio: item
                  .getElementsByTagName("enclosure")[0]
                  .getAttribute("url")
              });
            });

            const lastUpdated = Date.parse(this.lastUpdated);
            this.lastUpdated = `${lastUpdated}`;
          });
        }
      );
    }
  }
};
</script>

<style lang="scss">
@import "../variables.scss";

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
