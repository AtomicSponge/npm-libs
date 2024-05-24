#  os-appdata-path

### Get application storage location based on operating system

Will try to determine this by available global variables.
Also performs a verification that the location exists.
If a path can be found, `__os_appdata_path` will be set to its value.
If no path is found it will contain *null*.

Not tested on all OSes, but if the folder does not exist this will be *null* regardless.

If `process.env.LOCALAPPDATA` exists, then `__os_appdata_path` will be set to this value.
Otherwise, it attempts to locate by joining `process.platform` and `process.env.HOME` with common OS paths.

Example locations:
- Windows: `c:\users\username\AppData\Local`
- Mac: `/home/username/Library/Preferences`
- Linux & other OSes: `/home/username/.config`

Install to your existing project using:
```
npm i @spongex/os-appdata-path
```

Include ECMAScript:
```
import { __os_appdata_path } from '@spongex/os_appdata_path
```

Include CommonJS:
```
const { __os_appdata_path } = require('@spongex/os_appdata_path')
```

## Usage
```

//  Make sure the value is not null
if(__os_appdata_path !== null) {
  console.log(__os_appdata_path)  //  Write it to console

  //  Use it to store some data
  fs.writeFileSync(
    path.join(__os_appdata_path, 'my-app-name', 'settings.json'),
    data
  )
}
```

# Changelog

## 0.2.0
- Updatad Linux & other OSes path from `/home/username/.local/share` to `/home/username/.config`

## 0.1.0
- Initial release
