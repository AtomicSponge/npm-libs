#  os-storage-path

## WIP - needs testing

### Get application storage location based on operating system

Will try to determine this by available global variables.
Also performs a verification that the location exists.
If a path can be found, `__os_storage_path` will be set to its value.
If no path is found it will contain *null*.

For example, on Windows it will be: `c:\users\username\AppData\Local`

For Mac: `/home/username/Library/Preferences`

For Linux and other OSes: `/home/username/.local/share`

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

# Changelog

## Usage
```
if(__os_storage_path !== null) {
  console.log(__os_storage_path)

  fs.writeFileSync(path.join(__os_storage_path, 'my-app-name', 'settings.json'), data)
}
```

## 1.0.0
- Initial release
