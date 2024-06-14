#  Vue Image Zoom

### Vue3 Component for click to zoom on images

Install to your existing project using:
```
npm i @spongex/vue-image-zoom
```

Include ECMAScript:
```
import { ImageZoom } from '@spongex/vue-image-zoom'
```

Include CommonJS:
```
const { ImageZoom } = require('@spongex/vue-image-zoom')
```

<sub>Adapted from: <https://codeconvey.com/html-image-zoom-on-click/></sub>

# Usage

### \<ImageZoom src="/img/myImage.png" width="100" caption="An example"/>

#### Properties
- `id` *(optional)* HTML Element ID
- `src` *__(required)__* URL to image source
- `alt` *(optional)* Alternate text for image
- `width` *(optional)* Width of document image
- `height` *(optional)* Height of document image
- `caption` *(optional)* Caption for modal display

# Changelog

## 1.1.1
 - Bumped dependencies
 - Updated Vue requirements to only ^3.0.0

## 1.1.0
- Fixed maintaining aspect ratio when zooming in.
- Slight CSS improvements
- Bump Vite dev dep

## 1.0.0
- Initial release
