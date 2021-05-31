import execa from 'execa';
import { authenticate } from './auth.util';
import { clone } from './clone.util';

const DataToolTemplateUtil = (() => {

  const _cloneProject = (projectName) => {
    clone(projectName)
  }

  const _installApp = (dest, manager) => {
    console.log(manager);
    process.chdir(dest)
    return execa(manager, ['install'])
  }

  const _installWorkbench = (manager) => {
    process.chdir('workbench')
    return execa(manager, ['install'])
  }

  return {
    auth: authenticate,
    cloneProject: _cloneProject,
    installApp: _installApp,
    installWorkbench: _installWorkbench
  }
})()

export default DataToolTemplateUtil;