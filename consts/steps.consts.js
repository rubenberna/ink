export const STEPS = {
  NPMRC: 'NPMRC',
  PROJECT_NAME: 'PROJECT_NAME',
  MANAGER: 'MANAGER',
  CLONE: 'CLONE',
  INSTALLATION: 'INSTALLATION',
}

export const getStepsDetails = (name, boolean = true, title) => ({
  [STEPS.NPMRC]: {
    nr: 0,
    title: title || 'Connected to feed via vsts-npm-auth',
    success: boolean
  },
  [STEPS.PROJECT_NAME]: {
    nr: 1,
    title: 'Project name',
    success: boolean
  },
  [STEPS.MANAGER]:  {
    nr: 2,
    title: 'Selected package manager',
    success: boolean
  },
  [STEPS.CLONE]:  {
    nr: 3,
    title: 'Cloned repo',
    success: boolean
  },
  [STEPS.INSTALLATION]:  {
    nr: 4,
    title: 'Installed dependencies',
    success: boolean
  },
})[name]