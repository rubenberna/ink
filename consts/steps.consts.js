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
    title: title || 'Connected to feed via vsts-npm-auth',
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