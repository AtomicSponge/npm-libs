/**
 * @author Matthew Evans
 * @module @spongex/system-locale
 * @see README.md
 * @copyright MIT see LICENSE.md
 */

/** Set to the system locale */
export const __locale = Intl.DateTimeFormat().resolvedOptions().locale
