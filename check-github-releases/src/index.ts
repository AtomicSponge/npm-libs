/**
 * @author Matthew Evans
 * @module check-github-releases
 * @see README.md
 * @copyright MIT see LICENSE.md
 */

/** Parsed download URLs and their display labels */
interface URLAsset {
  /** Display label for URL - filename */
  name:string
  /** URL for downloading asset */
  url:string
}

/** Object containing parsed URLs and information about the request */
interface Releases {
  /** List of Windows Assets */
  winURLs:Array<URLAsset>
  /** List of Mac Assets */
  macURLs:Array<URLAsset>
  /** List of Linux Assets */
  linURLs:Array<URLAsset>
  /** List of source code assets */
  sourceURLs:Array<URLAsset>
  /** Result message */
  message:string
  /** Error flag */
  error:boolean
}

/** Extension groups for adding to the check list */
enum Extensions {
  /** Windows extensions */
  winExt,
  /** Mac extensions */
  macExt,
  /** Linux extensions */
  linExt
}

/**
 * Get the release JSON from the GitHub API
 * Then parse into URLs for each OS
 * @param __GitHubURL__ The GitHub API URL to parse
 * @param opts List of optional extensions to check
 * @param opts.group The extension group to add to.
 * Valid options:  Extensions.winExt, Extensions.macExt, Extensions.linExt
 * @param opts.extensions An array of extensions to add
 * @returns Object containing processed results
 */
export const checkGitHubReleases = async (
  __GitHubURL__:string,
  opts?:[ { group:Extensions, extensions:Array<string> } ]
):Promise<Releases> => {
  const _ext = {
    winExt: [ '.exe' ],
    macExt: [ '.dmg' ],
    linExt: [ '.deb', '.rpm', '.pacman', '.AppImage' ]
  }

  if(opts) {
    opts.forEach(opt => {
      switch(opt.group) {
        case Extensions.winExt:
          opt.extensions.forEach(ext => { _ext.winExt.push(ext) })
          return
        case Extensions.macExt:
          opt.extensions.forEach(ext => { _ext.macExt.push(ext) })
          return
        case Extensions.linExt:
          opt.extensions.forEach(ext => { _ext.linExt.push(ext) })
          return
        default:
          return
      }
    })
  }

  const winURLs:Array<URLAsset> = []
  const macURLs:Array<URLAsset> = []
  const linURLs:Array<URLAsset> = []
  const sourceURLs:Array<URLAsset> = []

  const result = await (async () => {
    try {
      const response = await fetch(__GitHubURL__)
      return response.json()
    } catch (error:any) {  //  Catch connection errors
      return <Releases>{
        winURLs: winURLs,
        macURLs: macURLs,
        linURLs: linURLs,
        sourceURLs: sourceURLs,
        message: `
          Unable to locate latest releases!<br/>
          Please try again later.<br/>${error.message}`,
        error: true
      }
    }
  })()
  if (result.error) return result  //  IIFE resulted in error, return
  if (result.message === 'Not Found') {  //  Github repo not found
    return <Releases>{
      winURLs: winURLs,
      macURLs: macURLs,
      linURLs: linURLs,
      sourceURLs: sourceURLs,
      message: `
        Unable to locate latest releases!<br/>
        Please try again later.<br/>404: Not Found`,
      error: true
    }
  }
  if (!result.hasOwnProperty('assets')) {  //  Found result, but no assets
    return <Releases>{
      winURLs: winURLs,
      macURLs: macURLs,
      linURLs: linURLs,
      sourceURLs: sourceURLs,
      message: `
        Unable to locate latest releases!<br/>
        Please try again later.<br/>400: Bad Request`,
      error: true
    }
  }

  //  Parse JSON from 'result' and extract URLs
  if (result.tarball_url)
    sourceURLs.push({ name: 'tarball', url: result.tarball_url })
  if (result.zipball_url)
    sourceURLs.push({ name: 'zipball', url: result.zipball_url })

  result.assets.forEach((asset:{name:string, browser_download_url:string}) => {
    _ext.winExt.forEach(ext => {
      if (asset.browser_download_url.endsWith(ext)) {
        winURLs.push({ name: asset.name, url: asset.browser_download_url })
        return
      }
    })
    _ext.macExt.forEach(ext => {
      if (asset.browser_download_url.endsWith(ext)) {
        macURLs.push({ name: asset.name, url: asset.browser_download_url })
        return
      }
    })
    _ext.linExt.forEach(ext => {
      if (asset.browser_download_url.endsWith(ext)) {
        linURLs.push({ name: asset.name, url: asset.browser_download_url })
        return
      }
    })
  })

  return <Releases>{
    winURLs: winURLs,
    macURLs: macURLs,
    linURLs: linURLs,
    sourceURLs: sourceURLs,
    message: 'success',
    error: false
  }
}
