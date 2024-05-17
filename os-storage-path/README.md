#  os-storage-path

## WIP - needs testing

### Get application storage location based on operating system

Will try to determine this by available global variables.
Also performs a verification that the location exists.
If a path can be found, `__os_storage_path` will be set to its value.
If no path is found it will contain *null*.

Example locations:
- Windows: `c:\users\username\AppData\Local`
- Mac: `/home/username/Library/Preferences`
- Linux & other OSes: `/home/username/.local/share`

Install to your existing project using:
```
```

Include ECMAScript:
```
import { __os_storage_path } from '@spongex/os_storage_path
```

Include CommonJS:
```
const { __os_storage_path } = require('@spongex/os_storage_path')
```

## Usage
```
//  Make sure the value is not null
if(__os_storage_path !== null) {
  console.log(__os_storage_path)  //  Write it to console
  //  Or use it to store some data
  fs.writeFileSync(path.join(__os_storage_path, 'my-app-name', 'settings.json'), data)
}
```

# Changelog

## 1.0.0
- Initial release
