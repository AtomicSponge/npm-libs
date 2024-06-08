#  job-runner

Run multiple processes simultaneously easily with one class!

Install to your existing project using:
```
npm i @spongex/job-runner
```

Include ECMAScript:
```
import { JobRunner } from '@spongex/job-runner'
```

Include CommonJS:
```
const { JobRunner } = require('@spongex/job-runner')
```

# Usage

__job-runner__ works by first constructing a new object and passing it a list of commands to be ran, then calling its member function `runAllJobs` to process.

The `JobRunner` constructor has the following signature:
### JobRunner: (cmds: Array\<string>, opts?: Array\<ExecOptions>) => void

`cmds` is a list of the commands to be passed to [exec](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback)

`ExecOptions` is the same format as what [exec](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback) is passed.  This can either be a list of options to use wich must be the *same length* as the commands, or *one single* option to be applied to each job.

---

The `runAllJobs` member function has the following signature:
### runAllJobs: async (splicers?: Array\<Splicer>, callback?: JobRunnerCallback) => Promise\<RunResults>

`splicers` is an optional array of variables and values to be replaced in the commands.
See the examples below for a demonstration of its usage.

The `callback` function is an optional function that will be called after the results of *each* command.  The function is passed two parameters, an `error` object created by the command if any, and a `RunResults` object representing the result information of the command.

This `RunResults` object has the following format:
- `results`: An array of `PromiseSettledResult`
- `runTime`: Total run time for all jobs in milliseconds
- `numSuccess`: Count of successful jobs
- `numFailed`: Count of failed jobs

For `PromiseSettledResult` this contains a `status` property and a property that is *either* `value` or `reason`.  `value` is only present if `status` is equal to `"fulfilled"` while `reason` will be present when `status` is equal to `"rejected"`

However, both `value` and `reason` will be an object that has the following format:
- `command`:  The command which was used for the job
- `duration`: The duration of the job in milliseconds
- `error`: The error thrown by `exec` if any
- `code`: The exit code of the job
- `stdout`: The output of the job
- `stderr`: The error output of the job

See the documentation on [Promise.allSettled](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled#return_value) for any additional information.

# Examples

__Using JobRunner with a list of options:__

```
const myJobs = new JobRunner(
  [
    'ls',
    'ls',
    'ls',
    'ls',
    'ls'
  ],
  [
    { cwd: '/home/user/folder_a' },
    { cwd: '/home/user/folder_b' },
    { cwd: '/home/user/folder_c' },
    { cwd: '/home/user/folder_d' },
    { cwd: '/home/user/folder_e' }
  ]
)

const { results, runTime, numSuccess, numFailed } = await myJobs.runAllJobs()
```

__Using JobRunner with a splicer:__
```
const myJobs = new JobRunner(
  [
    'ls $PATH_A',
    'ls $PATH_B',
    'ls $PATH_C',
    'ls $PATH_D',
    'ls $PATH_E'
    ]
  )

const { results, runTime, numSuccess, numFailed } = await myJobs.runAllJobs(
  [
    { var: '$PATH_A', val: '/home/user/folder_a' },
    { var: '$PATH_B', val: '/home/user/folder_b' },
    { var: '$PATH_C', val: '/home/user/folder_c' },
    { var: '$PATH_D', val: '/home/user/folder_d' },
    { var: '$PATH_E', val: '/home/user/folder_e' }
  ]
)
```

# Changelog

## 1.0.0
- Initial release
