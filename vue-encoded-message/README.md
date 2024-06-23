# vue-encoded-message

Vue3 component for displaying an encoded message.  Takes UTF-16 codes and displays them on a canvas.  Useful for evading web scrapers.

Install to your existing project using:
```
npm i @spongex/vue-encoded-message
```

Include ECMAScript:
```
import { EncodedMessage } from '@spongex/vue-encoded-message'
```

Include CommonJS:
```
const { EncodedMessage } = require('@spongex/vue-encoded-message')
```

# Usage

### \<EncodedMessage :message="[189, 43, 190, 61]" :size="32"/>

#### Properties
- `message` *__(required)__* Message to display as an array of UTF-16 codes
- `size` *__(required)__* Size of the text in pixels
- `padding` *(optional)* Canvas padding in pixels
- `font-face` *(optional)* CSS Font Face value
- `font-color` *(optional)* CSS color value

# Changelog

## 1.0.0
- Initial release
