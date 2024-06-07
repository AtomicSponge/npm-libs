/**
 * @author Matthew Evans
 * @module template
 * @see README.md
 * @copyright MIT see LICENSE.md
 */

import fs from 'node:fs'
import path from 'node:path'
import { exec, type ExecOptions } from 'node:child_process'

import { AsyncResolver } from "@spongex/async-resolver"

/** Resolution of a job command */
interface CmdRes {
  command:string  /** Command ran by a job */
  code:number     /** Status code */
  stdout:string   /** stdout buffer */
  stderr:string   /** stderr buffer */
}

/** Return type of runJob */
interface RunResults {
  /** Count of successful jobs */
  goodRes:number
  /** Count of failed jobs */
  badRes:number
}

/** Run multiple processes simultaneously */
export class JobRunner {
  /** Collection of job promises */
  #jobPriomises:Array<AsyncResolver> = []
  #jobResults:Array<CmdRes> = []
  #cmds:Array<string> = []
  #opts:Array<ExecOptions> = []
  #runComplete = false

  /**
   * Create a new JobRunner class
   * @throws 
   */
  constructor(cmds:Array<string>, opts?:Array<ExecOptions>) {
    this.#cmds = cmds
    this.#opts = opts || []

    // error checking
    if(this.#opts.length > 0 && this.#cmds.length !== this.#opts.length) {
      throw new JobRunnerError(
        `Must provide the name number of command and option arguments!`,
        this.constructor
      )
    }
  }

  /**
   * Run the group of loaded jobs
   * @returns Am object with the count of successful and failed runs
   */
  jobRunner = async ():Promise<RunResults> => {
    let goodRes = 0
    let badRes = 0

    this.#cmds.forEach((cmd:string) => {
      this.#jobPriomises.push(new AsyncResolver())
      const jobIDX = this.#jobPriomises.length - 1

      exec(cmd, this.#opts[jobIDX], (error:any, stdout:string, stderr:string) => {
        if(error) {
          const cmdRes = { command: cmd, code: error.code, stdout: stdout, stderr: stderr }
          badRes++; this.#jobResults.push(cmdRes)
          this.#jobPriomises[jobIDX].reject(cmdRes)
        } else {
          const cmdRes = { command: cmd, code: error.code, stdout: stdout, stderr: stderr }
          goodRes++; this.#jobResults.push(cmdRes)
          this.#jobPriomises[jobIDX].resolve(cmdRes)
        }
      })
    })
    this.#runComplete = true
    return <RunResults>{ goodRes, badRes }
  }

  /**
   * Write the results of the job run to file
   * @param path 
   * @param fileName
   * @throws Error if the jobs did not complete
   * @throws Any errors related to writing the file
   */
  writeResults = (path:string, fileName?:string) => {
    if(this.#runComplete === false) {
      throw new JobRunnerError(
        `Method 'writeResults' called before jobs were completed!`,
        this.writeResults
      )
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
