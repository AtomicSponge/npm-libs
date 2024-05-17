#  get-package-json

### Get the project's package data in an object

Install to your existing project using:
```
npm i @spongex/get-package-json
```

Include ECMAScript:
```
import { getPackageJSON } from '@spongex/get-package-json
```

Include CommonJS:
```
const { getPackageJSON } = require('@spongex/get-package-json')
```

# Usage

### getPackageJSON: (encoding:BufferEncoding = 'utf8') => JSON

```
const packageInfo = getPackageJSON()

console.log(packageInfo.version)
```

# Changelog

## 1.0.0
- Initial release
