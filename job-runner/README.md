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

## Example

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
    { cwd: '/home/user/foldera' },
    { cwd: '/home/user/folderb' },
    { cwd: '/home/user/folderc' },
    { cwd: '/home/user/folderd' },
    { cwd: '/home/user/foldere' }
    ]
  )

{ results, numSuccess, numFailed, runTime } = await myJobs.jobRunner()

myJobs.writeResults(process.cwd())
```

# Changelog

## 1.0.0
- Initial release
