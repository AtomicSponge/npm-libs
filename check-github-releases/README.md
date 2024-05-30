#  check-github-releases

Check a GitHub Releases via the API and parse download links

Install to your existing project using:
```
npm i @spongex/check-github-releases
```

Include ECMAScript:
```
import { checkGitHubReleases } from '@spongex/check-github-releases'
```

Include CommonJS:
```
const { checkGitHubReleases } = require('@spongex/check-github-releases')
```

# Usage

### checkGitHubReleases: async (
### __GitHubURL__: string,
### opts?:[ { group:Extensions, extensions:Array<string> } ]
### ) => Promise<Releases>

#### Takes the following parameters:
- `__GitHubURL__` A string of the GitHub Releases API URL
- `opts` Optional parameter to add additional extension groups to check.
This is an array that takes an object in the following format:
  - `group` The asset group to add to.  Valid options are:  Extensions.winExt, Extensions.macExt, Extensions.linExt
  - `extensions` An array of strings containing the extensions to add to the parser

#### Returns an object in the following format:
- `winURLs` An array of `URLAsset` of parsed Windows assets
- `macURLs` An array of `URLAsset` of parsed Mac assets
- `linURLs` An array of `URLAsset` of parsed Linux assets
- `sourceURLs` An array of `URLAsset` of parsed source code assets
- `message` Error code message if any
- `error` Error flag, true if error else false

The `URLAsset` is an object with the following format:
- `name` A string with the filename
- `url` A string with the URL to download the asset

# Changelog

## 1.1.0
- Added the following extentions to Mac:
  - `pkg`, `mas`, `mas-dev`
- Added the following extentions to Linux:
  - `freebsd`, `p5p`, `apk`

## 1.0.0
- Initial release
