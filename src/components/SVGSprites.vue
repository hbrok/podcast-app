<template>
  <!-- eslint-disable vue/max-attributes-per-line -->
  <svg class="spritesheet">
    <symbol id="search" viewBox="0 0 8 8"><path d="M3.5 0c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5c.59 0 1.17-.14 1.66-.41a1 1 0 0 0 .13.13l1 1a1.02 1.02 0 1 0 1.44-1.44l-1-1a1 1 0 0 0-.16-.13c.27-.49.44-1.06.44-1.66 0-1.93-1.57-3.5-3.5-3.5zm0 1c1.39 0 2.5 1.11 2.5 2.5 0 .66-.24 1.27-.66 1.72-.01.01-.02.02-.03.03a1 1 0 0 0-.13.13c-.44.4-1.04.63-1.69.63-1.39 0-2.5-1.11-2.5-2.5s1.11-2.5 2.5-2.5z"/></symbol>

    <symbol id="headphones" viewBox="0 0 8 8">
      <path d="M4 0c-1.65 0-3 1.35-3 3v1h-.5a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-3.5c0-1.11.89-2 2-2 1.11 0 2 .89 2 2v3.5a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5h-.5v-1c0-1.65-1.35-3-3-3z" />
    </symbol>
        
    <symbol id="link" viewBox="0 0 8 8">
      <path d="M5.88.03c-.18.01-.36.03-.53.09-.27.1-.53.25-.75.47a.5.5 0 1 0 .69.69c.11-.11.24-.17.38-.22.35-.12.78-.07 1.06.22.39.39.39 1.04 0 1.44l-1.5 1.5c-.44.44-.8.48-1.06.47-.26-.01-.41-.13-.41-.13a.5.5 0 1 0-.5.88s.34.22.84.25c.5.03 1.2-.16 1.81-.78l1.5-1.5c.78-.78.78-2.04 0-2.81-.28-.28-.61-.45-.97-.53-.18-.04-.38-.04-.56-.03zm-2 2.31c-.5-.02-1.19.15-1.78.75l-1.5 1.5c-.78.78-.78 2.04 0 2.81.56.56 1.36.72 2.06.47.27-.1.53-.25.75-.47a.5.5 0 1 0-.69-.69c-.11.11-.24.17-.38.22-.35.12-.78.07-1.06-.22-.39-.39-.39-1.04 0-1.44l1.5-1.5c.4-.4.75-.45 1.03-.44.28.01.47.09.47.09a.5.5 0 1 0 .44-.88s-.34-.2-.84-.22z"
      />
    </symbol>
        
    <symbol id="clock" viewBox="0 0 8 8">
      <path d="M4 0c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm0 1c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm-.5 1v2.22l.16.13.5.5.34.38.72-.72-.38-.34-.34-.34v-1.81h-1z" />
    </symbol>

    <symbol id="volume-low" viewBox="0 0 8 8">
      <path d="M3.34 0l-1.34 2h-2v4h2l1.34 2h.66v-8h-.66zm1.66 3v2c.09 0 .18-.01.25-.03.43-.11.75-.51.75-.97 0-.46-.31-.86-.75-.97-.08-.02-.17-.03-.25-.03z" transform="translate(1)" />
    </symbol>

    <symbol id="volume-high" viewBox="0 0 8 8">
      <path d="M3.34 0l-1.34 2h-2v4h2l1.34 2h.66v-8h-.66zm1.66 1v1c.17 0 .34.02.5.06.86.22 1.5 1 1.5 1.94s-.63 1.72-1.5 1.94c-.16.04-.33.06-.5.06v1c.25 0 .48-.04.72-.09h.03c1.3-.33 2.25-1.51 2.25-2.91 0-1.4-.95-2.58-2.25-2.91-.23-.06-.49-.09-.75-.09zm0 2v2c.09 0 .18-.01.25-.03.43-.11.75-.51.75-.97 0-.46-.31-.86-.75-.97-.08-.02-.17-.03-.25-.03z"
      />
    </symbol>

    <symbol id="play" viewBox="0 0 8 8">
      <path d="M0 0v6l6-3-6-3z" transform="translate(1 1)" />
    </symbol>

    <symbol id="pause" viewBox="0 0 8 8">
      <path d="M0 0v6h2v-6h-2zm4 0v6h2v-6h-2z" transform="translate(1 1)" />
    </symbol>
          
    <symbol id="back" viewBox="0 0 8 8">
      <path d="M4 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z" transform="translate(1)" />
    </symbol>
          
    <symbol id="forward" viewBox="0 0 8 8">
      <path d="M1.5 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z" transform="translate(1)" />
    </symbol>

    <symbol id="loading" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
      <g transform="rotate(0 50 50)">
        <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#28292f">
          <animate attributeName="opacity" values="1;0" times="0;1" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite"/>
        </rect>
      </g>
      <g transform="rotate(30 50 50)">
        <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#28292f">
          <animate attributeName="opacity" values="1;0" times="0;1" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite"/>
        </rect>
      </g>
      <g transform="rotate(60 50 50)">
        <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#28292f">
          <animate attributeName="opacity" values="1;0" times="0;1" dur="1s" begin="-0.75s" repeatCount="indefinite"/>
        </rect>
      </g>
      <g transform="rotate(90 50 50)">
        <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#28292f">
          <animate attributeName="opacity" values="1;0" times="0;1" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite"/>
        </rect>
      </g>
      <g transform="rotate(120 50 50)">
        <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#28292f">
          <animate attributeName="opacity" values="1;0" times="0;1" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite"/>
        </rect>
      </g>
      <g transform="rotate(150 50 50)">
        <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#28292f">
          <animate attributeName="opacity" values="1;0" times="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite"/>
        </rect>
      </g>
      <g transform="rotate(180 50 50)">
        <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#28292f">
          <animate attributeName="opacity" values="1;0" times="0;1" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite"/>
        </rect>
      </g>
      <g transform="rotate(210 50 50)">
        <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#28292f">
          <animate attributeName="opacity" values="1;0" times="0;1" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite"/>
        </rect>
      </g>
      <g transform="rotate(240 50 50)">
        <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#28292f">
          <animate attributeName="opacity" values="1;0" times="0;1" dur="1s" begin="-0.25s" repeatCount="indefinite"/>
        </rect>
      </g>
      <g transform="rotate(270 50 50)">
        <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#28292f">
          <animate attributeName="opacity" values="1;0" times="0;1" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite"/>
        </rect>
      </g>
      <g transform="rotate(300 50 50)">
        <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#28292f">
          <animate attributeName="opacity" values="1;0" times="0;1" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite"/>
        </rect>
      </g>
      <g transform="rotate(330 50 50)">
        <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#28292f">
          <animate attributeName="opacity" values="1;0" times="0;1" dur="1s" begin="0s" repeatCount="indefinite"/>
        </rect>
      </g>
    </symbol>
  </svg>
</template>

<script>
export default {
  name: "SVGSprites"
};
</script>

<style lang="scss">
.spritesheet {
  display: none;
}

.icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  fill: currentColor;
}
</style>
