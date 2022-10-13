import Vue from 'vue'
import VueTippy, { TippyComponent } from 'vue-tippy'

Vue.use(VueTippy, {
  directive: 'tippy', // => v-tippy
  flipDuration: 0,
  animation: 'shift-toward',
  followCursor: true,
  flip: false,
  placement: 'bottom-end',
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
Vue.component('VTippy', TippyComponent)
