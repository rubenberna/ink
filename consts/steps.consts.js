// export const STEPS = {
//   AUTH: {
//     nr: 0,
//     title: 'Authenticated',
//     success: true
//   },
//   NPMRC: {
//     nr: 1,
//     title: 'Install vsts-npm-auth',
//     success: true
//   },
//   PROJECT_NAME: {
//     nr: 2,
//     title: 'Project name',
//     success: true
//   },
//   MANAGER:  {
//     nr: 3,
//     title: 'Selected package manager',
//     success: true
//   },
//   CLONE:  {
//     nr: 4,
//     title: 'Cloned repo',
//     success: true
//   },
//   INSTALLATION:  {
//     nr: 5,
//     title: 'Installed dependencies',
//     success: true
//   },
// }

export const STEPS = {
  AUTH: 'AUTH',
  NPMRC: 'NPMRC',
  PROJECT_NAME: 'PROJECT_NAME',
  MANAGER: 'MANAGER',
  CLONE: 'CLONE',
  INSTALLATION: 'INSTALLATION',
}

export const getStepsDetails = (name, boolean = true, title) => ({
  [STEPS.AUTH]: {
    nr: 0,
    title: 'Authenticated',
    success: boolean
  },
  [STEPS.NPMRC]: {
    nr: 1,
    title: title || 'Install vsts-npm-auth',
    success: boolean
  },
  [STEPS.PROJECT_NAME]: {
    nr: 2,
    title: 'Project name',
    success: boolean
  },
  [STEPS.MANAGER]:  {
    nr: 3,
    title: 'Selected package manager',
    success: boolean
  },
  [STEPS.CLONE]:  {
    nr: 4,
    title: 'Cloned repo',
    success: boolean
  },
  [STEPS.INSTALLATION]:  {
    nr: 5,
    title: 'Installed dependencies',
    success: boolean
  },
})[name]