# async-for-each

### Async For Each
Async version of the forEach function.

Install to your existing project using:
```
npm i @spongex/async-for-each
```

Include ECMAScript:
```
import { asyncForEach } from '@spongex/async-for-each'
```

Include CommonJS:
```
const { asyncForEach } = require('@spongex/async-for-each')
```

# Usage

### asyncForEach: async (array: Array<any>, callback: Function) => Promise<void>

## Example:

```
const collection:Array<number> = [ 1, 2, 3, 4, 5 ]

asyncForEach(collection, async (item) => {
  // do something asynchronous with item
})
```

# Changelog

## 1.0.2
- Dependencies bump

## 1.0.1
- Comment error, quick fix

## 1.0.0
- Initial release
