#  Sytem Locale Variable

### Get the system locale

This is a variable that will set itself to the system's locale string.

Install to your existing project using:
```
npm i @spongex/system-locale
```

Include ECMAScript:
```
import { __locale } from '@spongex/system-locale'
```

Include CommonJS:
```
const { __locale } = require('@spongex/system-locale')
```

# Usage

```
console.log(__locale)
```

Example output:  `en-US`

# Changelog

## 1.0.0
- Initial release
