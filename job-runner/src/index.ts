/**
 * @author Matthew Evans
 * @module spongex/job-runner
 * @see README.md
 * @copyright MIT see LICENSE.md
 */

import fs from 'node:fs'
import path from 'node:path'
import { exec, type ExecOptions } from 'node:child_process'

import { __locale } from '@spongex/system-locale'
import { AsyncResolver } from '@spongex/async-resolver'

/** Resolution of a job command */
interface CmdRes {
  /** Command ran by a job */
  command:string
  /** Status code */
  code:number
  /** stdout buffer */
  stdout:string
  /** stderr buffer */
  stderr:string
  /** Durration of the job */
  durration:number
}

/** Return type of {@link jobRunner} */
interface RunResults {
  /** Count of successful jobs */
  numSuccess:number
  /** Count of failed jobs */
  numFailed:number
  /** Results */
  results:Array<CmdRes>
}

/** Callback for the {@link jobRunner} Function */
interface JobRunnerCallback {
  (
    /** Result of the command */
    result:CmdRes,
    /** Error from exec if any */
    error?:any
  ):void
}

/** Run multiple processes simultaneously */
export class JobRunner {
  /** Collection of job promises */
  #jobPromises:Array<AsyncResolver> = []
  /** Collection of the results of all jobs */
  #jobResults:Array<CmdRes> = []
  /** Collection of commands to be processed */
  #cmds:Array<string> = []
  /** Collection of options for commands */
  #opts:Array<ExecOptions> = []
  /** Flag if the job run is complete */
  #runComplete = false
  /** Number of successful results */
  #goodRes = 0
  /** Number of failed results */
  #badRes = 0
  /** Total run time for all jobs */
  #runTime = 0

  /**
   * Create a new JobRunner class
   * @throws Error if provided options is not the same length as commands
   * Allows for a single option to be passed to be used on all commands
   */
  constructor(cmds:Array<string>, opts?:Array<ExecOptions>) {
    this.#cmds = cmds
    this.#opts = opts || []

    // error checking
    if(this.#opts.length > 1 && this.#cmds.length !== this.#opts.length) {
      throw new JobRunnerError(
        `Must provide the same number of command and option arguments` +
        ` or one single option for all commands!`,
        this.constructor
      )
    }
  }

  /**
   * Run the group of loaded jobs
   * @partam callback Callback function that is passed an {@link CmdRes} object
   * and the error from exec if any - runs after each command
   * @returns A {@link RunResults} object with the count of successful and
   * failed runs, also an array of the results
   */
  jobRunner = async (callback?:JobRunnerCallback):Promise<RunResults> => {
    this.#runComplete = false
    this.#goodRes = 0
    this.#badRes = 0
    this.#runTime = 0

    const startTime = performance.now()
    this.#cmds.forEach((cmd:string) => {
      this.#jobPromises.push(new AsyncResolver())
      const jobIDX = this.#jobPromises.length - 1

      let opt
      if(this.#opts.length === 1) opt = this.#opts[0]
      else opt = this.#opts[jobIDX] || null

      const cmdStart = performance.now()
      exec(cmd, opt, (error:any, stdout:string, stderr:string) => {
        const cmdStop = performance.now()
        let cmdRes
        if(error) {
          cmdRes = {
            command: cmd,
            code: error.code,
            stdout: stdout,
            stderr: stderr,
            durration: cmdStop - cmdStart
          }
          this.#badRes++; this.#jobResults.push(cmdRes)
          this.#jobPromises[jobIDX].reject()
        } else {
          cmdRes = {
            command: cmd,
            code: 0,
            stdout: stdout,
            stderr: stderr,
            durration: cmdStop - cmdStart
          }
          this.#goodRes++; this.#jobResults.push(cmdRes)
          this.#jobPromises[jobIDX].resolve()
        }
        if(callback !== undefined) callback(cmdRes, error)
      })
    })
    await Promise.allSettled(this.#jobPromises)
    const endTime = performance.now()
    this.#runComplete = true
    this.#runTime = endTime - startTime
    return {
      numSuccess: this.#goodRes,
      numFailed: this.#badRes,
      results: this.#jobResults
    }
  }

  /**
   * Write the results of the job run to file
   * @param dir Path to save log to
   * @param fileName Name of log file
   * @throws Error if the jobs did not complete
   * @throws Any errors related to writing the file
   */
  writeResults = (dir:string, fileName?:string) => {
    if(this.#runComplete === false) {
      throw new JobRunnerError(
        `Method 'writeResults' called before jobs were completed!`,
        this.writeResults
      )
    }

    const timestamp = (new Date().toLocaleTimeString(__locale)).split(' ')[0]
    fileName = fileName || `jobrunner-${timestamp}.log`

    /**
     * Write a message to the log file
     * @param message String to write
     * @throws Any errors related to the write
     */
    const writeLog = (message:string) => {
      try {
        fs.appendFileSync(path.join(dir, fileName), message)
      } catch (error:any) { throw error }
    }

    try {
      //  create new file

      writeLog(`Number of successful jobs: ${this.#goodRes}`)
      writeLog(`Number of failed jobs: ${this.#badRes}`)
      writeLog(`\n${'-'.repeat(20)}\n`)

      this.#jobResults.forEach((job:CmdRes) => {
        writeLog(`Command: ${job.command}`)
        writeLog(`Durration: ${job.durration}`)
        writeLog(`Exit code: ${job.code}\n`)
        writeLog(`stdout:\n${job.stdout}`)
        writeLog(`stderr:\n${job.stderr}`)
        writeLog(`\n${'-'.repeat(20)}\n`)
      })

      writeLog(`Run time: ${this.#runTime}`)
      writeLog(`Completed at: ${new Date().toLocaleString(__locale)}`)
    } catch (error:any) {
      throw new JobRunnerError(error.message, this.writeResults)
    }
  }
}

/**
 * Class for handling Job Runner errors
 * @extends Error
 */
class JobRunnerError extends Error {
  message:string
  code:Object
  exitCode:number

  /**
   * Constructs the JobRunnerError class
   * @param message Error message
   * @param code Error code
   * @param exitCode Exit code
   */
  constructor(message:string, code:Object, exitCode?:number) {
    super()

    this.name = this.constructor.name
    this.message = message
    this.code = code
    this.exitCode = exitCode || 1

    this.stack = new Error().stack
  }
}
