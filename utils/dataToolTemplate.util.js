import execa from 'execa';
import { authenticate } from './auth.util';
import { clone } from './clone.util';

const DataToolTemplateUtil = (() => {

  const _cloneProject = (projectName) => {
    clone(projectName)
  }

  const _installApp = (dest) => {
    process.chdir(dest)
    return execa('yarn', ['install'])
  }

  const _installWorkbench = () => {
    process.chdir('workbench')
    return execa('yarn', ['install'])
  }

  return {
    auth: authenticate,
    cloneProject: _cloneProject,
    installApp: _installApp,
    installWorkbench: _installWorkbench
  }
})()

export default DataToolTemplateUtil;