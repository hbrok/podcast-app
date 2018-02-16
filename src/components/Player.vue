<template>
<div v-if="currentlyPlaying" class="player-wrapper">
    <audio
      ref="playerAudio"
      class="player__video viewer"
      v-on:play="updateButton"
      v-on:pause="updateButton"
      v-on:timeupdate="handleProgress"
      v-on:durationchange="durationUpdate"
    ></audio>

    <div class="player-wrapper__inner">
      <div class="player">
        <img class="player__image" :src="coverImage" alt="">

        <div class="player__title">
          <b>{{ podcastTitle }}</b><br> {{ currentlyPlaying.title }}
        </div>

        <div class="progress__bar progress__bar--duration">
          <div
            class="progress" 
            ref="progress"
            v-on:click="scrubAudio"
            v-on:mousemove="mousedown && scrubAudio($event)"
            v-on:mousedown="mousedown = true"
            v-on:mouseup="mousedown = false"
          >
            <div class="progress__filled" ref="progressBar"></div>
          </div>
          <span class="current-time">{{ currentTime }}</span>
          <span class="duration">{{ duration }}</span>
          <div class="player__buttons">
            <button v-on:click="skip" data-skip="-10" class="player__button">
               <svg class="icon icon-back">
                <use xlink:href="#back"></use>
              </svg>&nbsp;10s
             </button>

            <button
              class="player__button toggle"
              title="Toggle Play"
              v-on:click="togglePlay"
              ref="playerButton"
            ></button>

            <button v-on:click="skip" data-skip="25" class="player__button">
            25s&nbsp;<svg class="icon icon-forward">
              <use xlink:href="#forward"></use>
            </svg>
              </button>
          </div>
        </div>

        <div class="progress__bar progress__bar--volume">
          <svg class="icon icon-volume-low">
              <use xlink:href="#volume-low"></use>
            </svg>
          <div
            class="progress"
            ref="volume"
            v-on:click="scrubVolume"
            v-on:mousemove="mousedown && scrubVolume($event)"
            v-on:mousedown="mousedown = true"
            v-on:mouseup="mousedown = false"
          >
            <div class="progress__filled" ref="volumeBar"></div>
          </div>
          <svg class="icon icon-volume-high">
              <use xlink:href="#volume-high"></use>
            </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import eventHub from "../event-hub";

export default {
  name: "Player",
  data: function() {
    return {
      currentlyPlaying: false,
      coverImage: "",
      podcastTitle: "",
      currentTime: "0:00:00",
      duration: "0:00:00",
      mousedown: false,
      icons: {
        play:
          '<svg class="icon icon-play"><use xlink:href="#play"></use></svg>',
        pause:
          '<svg class="icon icon-pause"><use xlink:href="#pause"></use></svg>'
      }
    };
  },
  created: function() {
    eventHub.$on("play-episode", this.loadEpisode);
  },
  methods: {
    loadEpisode: function({ episode, coverImage, podcastTitle }) {
      const player = this.$refs.playerAudio;
      const button = this.$refs.playerButton;

      this.currentlyPlaying = episode;
      this.coverImage = coverImage;
      this.podcastTitle = podcastTitle;
      player.setAttribute("src", episode.audio);
      this.togglePlay();
      player.play();
    },
    togglePlay: function() {
      const player = this.$refs.playerAudio;
      const method = player.paused ? "play" : "pause";

      player[method]();
      this.updateButton();
    },
    updateButton: function() {
      const player = this.$refs.playerAudio;
      const button = this.$refs.playerButton;
      const icon = player.paused ? this.icons.play : this.icons.pause;

      button.innerHTML = icon;
    },
    handleProgress: function() {
      const player = this.$refs.playerAudio;
      const progressBar = this.$refs.progressBar;
      const percent = player.currentTime / player.duration * 100;

      this.currentTime = this.formatTime(player.currentTime);
      progressBar.style.flexBasis = `${percent}%`;
    },
    durationUpdate: function(e) {
      this.duration = this.formatTime(e.currentTarget.duration);
    },
    formatTime: function(timeInSeconds) {
      const hours = Math.floor((timeInSeconds / 3600) % 60);
      let minutes = Math.floor((timeInSeconds / 60) % 60);
      let seconds = Math.floor(timeInSeconds % 60);

      minutes = minutes.toString().length === 1 ? `0${minutes}` : minutes;
      seconds = seconds.toString().length === 1 ? `0${seconds}` : seconds;

      return `${hours}:${minutes}:${seconds}`;
    },
    handleVolumeUpdate: function(e) {
      const player = this.$refs.playerAudio;
      player.volume = e.currentTarget.value;
    },
    scrubAudio: function(e) {
      const player = this.$refs.playerAudio;
      const progressBar = this.$refs.progressBar;
      const progress = this.$refs.progress;
      const scrubTime = e.offsetX / progress.offsetWidth * player.duration;

      player.currentTime = scrubTime;
    },
    scrubVolume: function(e) {
      const player = this.$refs.playerAudio;
      const volumeBar = this.$refs.volumeBar;
      const volume = this.$refs.volume;

      const scrubTime = e.offsetX / volume.offsetWidth * 10000;

      volumeBar.style.flexBasis = `${scrubTime / 100}%`;
      player.volume = scrubTime / 10000;
    },
    skip: function(e) {
      const player = this.$refs.playerAudio;
      player.currentTime += parseFloat(e.currentTarget.dataset.skip);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../variables.scss";

.player-wrapper {
  position: fixed;
  display: flex;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  padding: 0.25rem;
  align-content: center;
  align-items: center;
  background-color: white;
  box-shadow: 0 0 10px 0 rgba(42, 45, 66, 0.5);
}

.player-wrapper__inner {
  width: 100%;
  max-width: 850px;
  margin: 0 auto;
  font-size: 0.75rem;
  background: $white;
}

.player {
  display: grid;
  grid-template-columns: 50px 200px auto 135px;
  grid-column-gap: 1.5rem;
  align-items: center;
}

.player__image {
  width: 50px;
  height: 50px;
  border-radius: 5px;
}

.player__buttons {
  display: flex;
  flex-wrap: wrap;

  display: grid;
  grid-template-columns: 2fr 1fr 2fr;

  flex-basis: 33%;
}

.player__button {
  background-color: transparent;
  border: 0;
  font-size: 0.75rem;
}

.player__slider {
  grid-row: 2;
  grid-column: 1 / span 3;
  flex-basis: 100%;
}

.player__title {
  white-space: nowrap;
  overflow: hidden;
}

.progress {
  flex: 10;
  position: relative;
  display: flex;
  flex-basis: 100%;
  height: 5px;
  // transition: height 0.3s;
  background: rgba(0, 0, 0, 0.5);
  cursor: ew-resize;
  border-radius: 5px;
}

.progress__filled {
  width: 50%;
  background: #191f4c;
  flex: 0;
  flex-basis: 50%;
  border-radius: 5px 0 0 5px;
}

.current-time {
  flex-basis: 33%;
}

.duration {
  order: 3;
  float: right;
  flex-basis: 33%;
  text-align: right;
}

.progress__bar--volume {
  display: flex;
  align-items: center;
  font-size: 1rem;

  // Align to top w/the other progress bar
  top: -8px;
  position: relative;

  > * {
    margin: 0 0.25rem;
  }
}

.progress__bar--duration {
  display: flex;
  flex-wrap: wrap;
}

.progress__bar--duration .progress {
  flex-basis: 100%;
}
</style>
