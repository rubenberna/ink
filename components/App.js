import React, { useState, useEffect } from 'react';
import { render, Box, Text, useInput, useApp, Static, Newline } from 'ink';
import TextInput from 'ink-text-input';
import Spinner from 'ink-spinner';
import SelectInput from 'ink-select-input';
import { DataToolGenerator } from '../utils/dataToolTemplate.util';
import { authenticate } from '../utils/auth.util';
import { getOs } from '../utils/npmrc.util';
import { STEPS } from '../consts/steps.consts';

const RunProject = () => {
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [manager, setManager] = useState(undefined);
  const [loadingMsg, setLoadingMsg] = useState(undefined);
  const [steps, setSteps] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [os, setOs] = useState(undefined)
  const {exit} = useApp();

  let dataToolGenerator;

  useEffect(() => {
    _auth()
    const os = getOs()
    setOs(os)
  }, []);

  useInput((input, key) => {
    if (key.return && steps.length === STEPS.PROJECT_NAME.nr) {
      return _addProjectName()
    }
  });

  const updateSteps = (newStep) => {
    setSteps(previousSteps => [
      ...previousSteps,
      newStep
    ])
  };

  const updatePackageManager = (item) => {
    setManager(item.value)
    return _addPackageManager(item.value)
  }

  const _auth = async () => {
    setLoadingMsg('Authenticating')
    await authenticate()
    setUserIsAuthenticated(true);
    updateSteps(STEPS.AUTH)
    setLoadingMsg(undefined)
  }

  const _addProjectName = () => {
    updateSteps(STEPS.PROJECT_NAME)
  }

  const _addPackageManager = async (manager) => {
    setLoadingMsg('Preparing data tool')
    updateSteps(STEPS.MANAGER)
    return _cloneProject(manager)
  }

  const _cloneProject = async (manager) => {
    dataToolGenerator = new DataToolGenerator(manager, projectName, os)
    await dataToolGenerator.cloneProject()
    updateSteps(STEPS.CLONE)
    setLoadingMsg(undefined)
    return _installProject()
  }

  const _installProject = async () => {
    setLoadingMsg('Installing dependencies')
    await dataToolGenerator.installApp()
    await dataToolGenerator.installWorkbench()
    _finish()
  }

  const _finish = () => {
    updateSteps(STEPS.INSTALLATION)
    setLoadingMsg(undefined)
    setCompleted(true)
    exit()
  }

  const renderLoading = () => {
    return loadingMsg &&
      <Text>
        <Text color="green">
          <Spinner type="dots"  />
        </Text>
        {` ${loadingMsg}`}
      </Text>
  }

  const renderSelectManager = () => {
    const items = [
      {
        label: 'Yarn',
        value: 'yarn'
      },
      {
        label: 'Npm',
        value: 'npm'
      }
    ]

    return (
      <Box flexDirection="column">
        <Text>What's your favourite package manager?</Text>
        <SelectInput items={items} onSelect={updatePackageManager}/>
      </Box>
    )
  }

  const renderDialog = () => (
    <Box>
      <Box marginRight={1}>
        <Text>Enter the name of your project:</Text>
      </Box>

      <TextInput value={projectName} onChange={setProjectName} />
    </Box>
  )

  const renderSuccess = () => (
    <Box borderStyle="round" borderColor="green" width={40} padding={2}>
      <Text>
        <Text italic>To start your project:</Text>
        <Newline/>
        <Text>cd <Text color="#006064" bold>{projectName}</Text></Text>
        <Newline />
        <Text color="#006064" bold>{manager} start</Text>
        <Newline />
        <Newline />
        <Text italic>To publish your project:</Text>
        <Newline/>
        <Text color="#006064" bold>{manager} publish</Text>
        <Newline />
        <Newline />
        <Text italic>"If you build it, they will come!"</Text>
      </Text>
    </Box>
  )

  return (
    <>
      <Static items={steps}>
        {step => (
          <Box key={step.nr}>
            <Text color="green">✔ {step.title}</Text>
          </Box>
        )}
      </Static>
      { loadingMsg && renderLoading() }
      { (userIsAuthenticated && steps.length === STEPS.PROJECT_NAME.nr )&& renderDialog() }
      { (userIsAuthenticated && steps.length === STEPS.MANAGER.nr )&& renderSelectManager() }
      { completed && renderSuccess() }
    </>
  )
};

render(<RunProject />);