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
  results:Array<CmdRes>
  /** Count of successful jobs */
  numSuccess:number
  /** Count of failed jobs */
  numFailed:number
  /** Total run time for all jobs */
  runTime:number
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
  /** Collection of the results of all jobs */
  #jobResults:Array<CmdRes> = []
  /** Collection of commands to be processed */
  #cmds:Array<string> = []
  /** Collection of options for commands */
  #opts:Array<ExecOptions> = []
  /** Number of successful results */
  #goodRes = 0
  /** Number of failed results */
  #badRes = 0
  /** Total run time for all jobs */
  #runTime = 0

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
  jobRunner = async (splicers?:Array<Splicer>, callback?:JobRunnerCallback):Promise<RunResults> => {
    this.#goodRes = 0
    this.#badRes = 0
    this.#runTime = 0

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
            code: error.code,
            stdout: stdout,
            stderr: stderr
          }
          this.#badRes++; this.#jobResults.push(cmdRes)
          this.#jobPromises[jobIDX].reject()
        } else {
          //  Cmd success
          cmdRes = {
            command: cmd,
            duration: cmdStop - cmdStart,
            code: 0,
            stdout: stdout,
            stderr: stderr
          }
          this.#goodRes++; this.#jobResults.push(cmdRes)
          this.#jobPromises[jobIDX].resolve()
        }
        //  Run callback on cmd results if provided
        if(callback !== undefined) callback(error, cmdRes)
      })
    })
    //  Await all results and return stats of all jobs
    await Promise.allSettled(this.#jobPromises)
    const endTime = performance.now()
    this.#runTime = endTime - startTime
    return {
      results: this.#jobResults,
      numSuccess: this.#goodRes,
      numFailed: this.#badRes,
      runTime: this.#runTime
    }
  }
}
