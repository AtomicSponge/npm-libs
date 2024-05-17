/**
 * @author Matthew Evans
 * @module @spongex/os-storage-path
 * @see README.md
 * @copyright MIT see LICENSE.md
 */

import fs from 'node:fs'
import path from 'node:path'

/** Application storage location based on operating system */
export const __os_storage_path = (():string | null => {
  if (process.env.LOCALAPPDATA) return process.env.LOCALAPPDATA
  if (!process.platform || !process.env.HOME) return null

  const platform = process.platform.toLowerCase()

  const testLocation = (location:string):string | null => {
    if (fs.existsSync(location)) return location
    else return null
  }

  //  Windows
  if (platform.includes('win32') || platform.includes('win64')) {
    return testLocation(path.join(process.env.HOME, 'AppData', 'Local'))
  }
  //  Mac
  if (platform.includes('darwin') ||
      platform.includes('macos') ||
      platform.includes('osx')) {
    return testLocation(path.join(process.env.HOME, 'Library', 'Preferences'))
  }
  //  Linux, BSD, Unix, etc
  if (platform.includes('aix') ||
      platform.includes('android') ||
      platform.includes('cygwin') ||
      platform.includes('freebsd') ||
      platform.includes('haiku') ||
      platform.includes('linux') ||
      platform.includes('openbsd') ||
      platform.includes('sunos') ||
      platform.includes('netbsd')) {
    return testLocation(path.join(process.env.HOME, '.local', 'share'))
  }
  //  Nothing found
  return null
})()
