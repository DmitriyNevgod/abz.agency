import Vue from 'vue'
import VueTippy from 'vue-tippy'

Vue.use(VueTippy, {
  directive: 'tippy', // => v-tippy
  flipDuration: 0,
  animation: 'shift-toward',
  followCursor: true,
  flipOnUpdate: true,
  inlinePositioning: true,
  maxWidth: 'auto',
  placement: 'auto',
  offset: '-20, 0',
  distance: 25,
  popperOptions: {
    modifiers: {
      preventOverflow: {
        enabled: false,
      },
    },
  },
})
