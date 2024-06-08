/**
 * @author Matthew Evans
 * @module spongex/job-runner
 * @see README.md
 * @copyright MIT see LICENSE.md
 */

import { exec, type ExecOptions } from 'node:child_process'
import { AsyncResolver } from '@spongex/async-resolver'

/** Resolution of a {@link jobRunner} command */
interface CmdRes {
  /** Command ran by a job */
  command:string
  /** Duration of the job */
  duration:number
  /** Error if any were thrown by exec */
  error:any
  /** Status code */
  code:number
  /** stdout buffer */
  stdout:string
  /** stderr buffer */
  stderr:string
}

/** Return type of {@link jobRunner} */
interface RunResults {
  /** Results */
  results:Array<PromiseSettledResult<CmdRes>>
  /** Total run time for all jobs */
  runTime:number
  /** Count of successful jobs */
  numSuccess:number
  /** Count of failed jobs */
  numFailed:number
}

/** Splicer object for the {@link jobRunner} function */
interface Splicer {
  /** Variable to match replacements with */
  var:string,
  /** List of values to replace variable with */
  val:string
}

/** Callback for the {@link jobRunner} function */
interface JobRunnerCallback {
  (
    /** Error from exec if any */
    error:any,
    /** Result of the command */
    result:CmdRes
  ):void
}

/** Run multiple processes simultaneously */
export class JobRunner {
  /** Collection of job promises */
  #jobPromises:Array<AsyncResolver> = []
  /** Collection of commands to be processed */
  #cmds:Array<string> = []
  /** Collection of options for commands */
  #opts:Array<ExecOptions> = []

  /**
   * Create a new JobRunner class
   * @param cmds Each command to be ran by exec
   * @param opts Options for exec, can be for each command or a single option
   * @throws Error if provided options is not the same length as commands
   * or not a single option
   */
  constructor(cmds:Array<string>, opts?:Array<ExecOptions>) {
    this.#cmds = cmds
    this.#opts = opts || []

    // error checking
    if(this.#opts.length > 1 && this.#cmds.length !== this.#opts.length) {
      throw new Error(`Must provide the same number of command and ` +
        `option arguments or one single option for all commands!`)
    }
  }

  /**
   * Run the group of loaded jobs
   * @param splicers A list of {@link Splicer} objects to modify the command with
   * @param callback Callback function that is passed an {@link CmdRes} object
   * and the error from exec if any - runs after each command
   * @returns A {@link RunResults} object with the count of successful and
   * failed runs, also an array of the results
   */
  runAllJobs = async (splicers?:Array<Splicer>, callback?:JobRunnerCallback):Promise<RunResults> => {
    let goodRes = 0
    let badRes = 0

    const startTime = performance.now()
    this.#cmds.forEach((cmd:string) => {
      //  Modify the command using any provided splicers
      splicers?.forEach((splice:Splicer) => {
        cmd = cmd.replaceAll(splice.var, splice.val)
      })

      //  Create a new Resolver for the cmd
      this.#jobPromises.push(new AsyncResolver())
      const jobIDX = this.#jobPromises.length - 1

      //  Determine options for the cmd
      let opt
      if(this.#opts.length === 1) opt = this.#opts[0]
      else opt = this.#opts[jobIDX] || null

      //  Run cmd & process
      const cmdStart = performance.now()
      exec(cmd, opt, (error:any, stdout:string, stderr:string) => {
        const cmdStop = performance.now()
        let cmdRes
        if(error) {
          //  Cmd resulted in error
          cmdRes = {
            command: cmd,
            duration: cmdStop - cmdStart,
            error: error,
            code: error.code,
            stdout: stdout,
            stderr: stderr
          }
          badRes++
          this.#jobPromises[jobIDX].reject(cmdRes)
        } else {
          //  Cmd success
          cmdRes = {
            command: cmd,
            duration: cmdStop - cmdStart,
            error: error,
            code: 0,
            stdout: stdout,
            stderr: stderr
          }
          goodRes++
          this.#jobPromises[jobIDX].resolve(cmdRes)
        }
        //  Run callback on cmd results if provided
        if(callback !== undefined) callback(error, cmdRes)
      })
    })
    //  Await all results and return stats of all jobs
    const finishedJobs:Array<Promise<CmdRes>> = []
    this.#jobPromises.forEach(job => { finishedJobs.push(job.promise) })
    const results = await Promise.allSettled(finishedJobs)
    const endTime = performance.now()

    return {
      results: results,
      runTime: endTime - startTime,
      numSuccess: goodRes,
      numFailed: badRes
    }
  }
}
