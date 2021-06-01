import { useState, useEffect } from 'react';
import { DataToolGenerator } from '../utils/dataToolTemplate.util';
import { authenticate } from '../utils/auth.util';
import { STEPS } from '../consts/steps.consts';

export const useRunProject = (steps, updateSteps, setLoadingMsg, setUserIsAuthenticated, setCompleted, projectName, manager, exit) => {
  const [os, setOs] = useState(undefined);

  const startAuth = async () => {
    await _auth()
    await _getOs()
  }

  const getDataTool = async () => {
    const dataToolGenerator = new DataToolGenerator(manager, projectName, os)
    await _cloneProject(dataToolGenerator)
    await _installProject(dataToolGenerator)
    _finish()
  }

  useEffect(() => {
    if (steps.length === STEPS.CLONE.nr) {
      getDataTool()
    }
  }, [steps])

  const _auth = async () => {
    setLoadingMsg('Authenticating')
    await authenticate()
    setUserIsAuthenticated(true);
    updateSteps(STEPS.AUTH)
    setLoadingMsg(undefined)
  }

  const _getOs = async () => {
    const os = process.platform
    setOs(os)
  }

  const _cloneProject = async (dataToolGenerator) => {
    await dataToolGenerator.cloneProject()
    return updateSteps(STEPS.CLONE)
  }

  const _installProject = async (dataToolGenerator) => {
    setLoadingMsg('Installing dependencies')
    await dataToolGenerator.installApp()
    return await dataToolGenerator.installWorkbench()
  }

  const _finish = () => {
    updateSteps(STEPS.INSTALLATION)
    setLoadingMsg(undefined)
    setCompleted(true)
    exit()
  }

  return {
    startAuth
  }
}