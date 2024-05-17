/**
 * @author Matthew Evans
 * @module template
 * @see README.md
 * @copyright MIT see LICENSE.md
 */

import fs from 'node:fs'
import path from 'node:path'

/**
 * Fetch package JSON for the main script
 * @param encoding File type encoding.  Defaults to utf8
 * @throws Any errors related to opening the file
 * @returns The package.json file data
 */
export const getPackageJSON = (encoding:BufferEncoding = 'utf8'):JSON => {
  const scriptDir = import.meta.dirname
  try {
    return JSON.parse(
      fs.readFileSync(
        path.join(scriptDir, path.relative(scriptDir, 'package.json')), encoding
      )
    )
  } catch (error:any) { throw error }
}
