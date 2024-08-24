# regexps

### Collection of regex tests

Install to your existing project using:
```
npm i @spongex/regexps
```

Include ECMAScript:
```
import { testHexColor } from '@spongex/regexps'
```

Include CommonJS:
```
const { testAlpha } = require('@spongex/regexps')
```

# API Reference

### replaceNewlines: (str: string, replace: string) => string
Replaces newlines (\r\n, \r, \n) with another string.
Returns the modified string.
```
const resStr = replaceNewlines(oldStr, '<br/>')
```

### testHexColor: (str: string) => boolean
Test if a valid hexadecimal color value.  Allows for alpha channel.
Returns true if valid, else false.
```
const res = testHexColor('#FF00FF')
```

### testRGB: (str: string) => boolean
Test if a valid RGB(a) or HSL(a) value.
Returns true if valid, else false.
```
const res = testRGB('rgba(255, 255, 255, 0.5)')
```

### testPixel: (str: string) => boolean
Test for a valid pixel format (NNpx).
Returns true if valid, else false.
```
const res = testPixel('12px')
```

### testAlpha: (str: string) => boolean
Test if charecters are all alphabetic.
Returns true if valid, else false.
```
const res = testAlpha('ABCD')
```

### testNumeric: (str: string) => boolean
Test if charecters are all numeric.
Returns true if valid, else false.
```
const res = testNumeric('1234')
```

### testAlphaNumeric: (str: string) => boolean
Test if only alphabectic and numeric charecters.
Returns true if valid, else false.
```
const res = testAlphaNumeric('ABC123')
```

### validHex: (str: string) => boolean
Tests a string for valid hex values.
Returns true if valid, else false.
```
const res = validHex('0f9dacdc')
```

# Changelog

## 1.1.1
- Dependencies bump

## 1.1.0
- Added two new functions `replaceNewlines` and `validHex`

## 1.0.0
- Initial release
