#  job-runner

Run multiple processes simultaneously

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

The `JobRunner constructor` has the following signature:
### JobRunner: (cmds: Array<string>, opts?: Array<ExecOptions>) => void

`cmds` is a list of the commands to be passed to [exec](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback)

Please note that `ExecOptions` is the same format as what [exec](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback) is passed.

-----

The `runAllJobs` function has the following signature:
### runAllJobs: async (splicers?: Array<Splicer>, callback?: JobRunnerCallback) => Promise<RunResults>

## Examples

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

{ results, numSuccess, numFailed, runTime } = await myJobs.runAllJobs()
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

{ results, numSuccess, numFailed, runTime } = await myJobs.runAllJobs(
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
