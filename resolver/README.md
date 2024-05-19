#  Resolver Class

### Await for asynchronous data

Install to your existing project using:
```
npm i @spongex/resolver
```

Include ECMAScript:
```
import { Resolver } from '@spongex/resolver
```

Include CommonJS:
```
const { Resolver } = require('@spongex/resolver')
```

# Usage

First create a new resolver object:
```
let myResolver = new Resolver()
```

Start an asynchronous process, then await the promise to be resolved or rejected.
```
await myResolver.promise.then(data => {
  console.log(`Received: ${data}`)
}).catch(msg => {
  console.log(`Canceled: ${msg}`)
})
```

Resolve the promise:
```
myResolver.resolve(data)
```

Reject the promise:
```
myResolver.reject('This was rejected')
```

# Changelog

## 1.0.0
- Initial release
