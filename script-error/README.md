# script-error

### Function for displaying an error to console and optionally exiting
Also formats text in red

Install to your existing project using:
```
npm i @spongex/script-error
```

Include ECMAScript:
```
import { scriptError } from '@spongex/script-error'
```

Include CommonJS:
```
const { scriptError } = require('@spongex/script-error')
```

# Usage

### scriptError: (message: string, { exit?: boolean, code?: number }) => number

## Examples:

Exit script with a code of 1:
```
scriptError('Something went wrong!')
```

Don't exit script and use a custom return code:
```
scriptError('Error handler', { exit: false, code: 100 })
```

End script with a custom error code:
```
scriptError('Something bad happened!', { code: 200 })
```

# Changelog

## 1.0.0
- Initial release
