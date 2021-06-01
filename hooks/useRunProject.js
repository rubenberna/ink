import { useEffect } from 'react';
import { STEPS, getStepsDetails } from '../consts/steps.consts';
import { DataToolGenerator } from '../utils/dataToolTemplate.util';
import { authenticate } from '../utils/auth.util';
import { installVstsAuth } from '../utils/npmrc'

export const useRunProject = (steps, updateSteps, setLoadingMsg, setUserIsAuthenticated, setCompleted, projectName, manager, exit) => {
  const startAuth = async () => {
    await _auth()
    await _getOs()
  }

  const getDataTool = async () => {
    const dataToolGenerator = new DataToolGenerator(manager, projectName)
    await _cloneProject(dataToolGenerator)
    await _installProject(dataToolGenerator)
    _finish()
  }

  useEffect(() => {
    if (steps.length === getStepsDetails(STEPS.CLONE).nr) {
      getDataTool()
    }
  }, [steps])

  const _auth = async () => {
    setLoadingMsg('Authenticating')
    await authenticate()
    setUserIsAuthenticated(true);
    updateSteps(getStepsDetails(STEPS.AUTH))
    setLoadingMsg(undefined)
  }

  const _getOs = async () => {
    setLoadingMsg('Setting connection to feed')
    const os = process.platform
    if (os === 'win32') {
      await installVstsAuth()
      updateSteps(getStepsDetails(STEPS.NPMRC))
      setLoadingMsg(undefined)
    } else {
      updateSteps(getStepsDetails(STEPS.NPMRC, false, 'As you are not a Windows user, please check how to setup authentication to the feed here: https://docs.microsoft.com/en-us/azure/devops/artifacts/npm/npmrc?view=azure-devops#set-up-authentication-on-your-dev-box'))
      setLoadingMsg(undefined)
    }
  }

  const _cloneProject = async (dataToolGenerator) => {
    await dataToolGenerator.cloneProject()
    return updateSteps(getStepsDetails(STEPS.CLONE))
  }

  const _installProject = async (dataToolGenerator) => {
    setLoadingMsg('Installing dependencies')
    await dataToolGenerator.installApp()
    return await dataToolGenerator.installWorkbench()
  }

  const _finish = () => {
    updateSteps(getStepsDetails(STEPS.INSTALLATION))
    setLoadingMsg(undefined)
    setCompleted(true)
    exit()
  }

  return {
    startAuth
  }
}