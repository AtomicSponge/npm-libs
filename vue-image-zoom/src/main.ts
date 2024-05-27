import type { App } from 'vue'
import { ImageZoom } from '@/components'

export default {
  install: (app:App) => {
    app.component('ImageZoom', ImageZoom)
  }
}

export { ImageZoom }
