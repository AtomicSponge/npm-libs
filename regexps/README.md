# regexps

Install to your existing project using:
```
npm i @spongex/regexps
```

Include ECMAScript:
```
import { testHexColor } from '@spongex/regexps
```

Include CommonJS:
```
const { testAlpha } = require('@spongex/regexps')
```

# API Reference

### testHexColor: (str:string) => boolean
Test if a valid hexadecimal color value.  Allows for alpha channel.
Returns true if valid, else false.

### testRgb: (str:string) => boolean
Test if a valid RGB(a) or HSL(a) value.
Returns true if valid, else false.

### testPixel: (str:string) => boolean
Test for a valid pixel format (NNpx).
Returns true if valid, else false.

### testAlpha: (str:string) => boolean
Test if charecters are all alphabetic.
Returns true if valid, else false.

### testNumeric: (str:string) => boolean
Test if charecters are all numeric.
Returns true if valid, else false.

### testAlphaNumeric: (str:string) => boolean
Test if only alphabectic and numeric charecters.
Returns true if valid, else false.

# Changelog

## 1.0.0
- Initial release
