import React, { useState, useEffect } from 'react';
import { render, Box, Text, useInput, useApp, Static, Newline } from 'ink';
import TextInput from 'ink-text-input';
import Spinner from 'ink-spinner';
import SelectInput from 'ink-select-input';
import DataToolTemplateUtil from '../utils/dataToolTemplate.util';

const RunProject = () => {
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [manager, setManager] = useState(undefined);
  const [loadingMsg, setLoadingMsg] = useState(undefined)
  const [steps, setSteps] = useState([]);
  const [completed, setCompleted] = useState(false);
  const {exit} = useApp();

  useEffect(() => {
    _auth()
  }, []);

  useInput((input, key) => {
    if (key.return && steps.length === 1) {
      return _cloneProject()
    }
  });

  const updateSteps = (newStep) => {
    setSteps(previousSteps => [
      ...previousSteps,
      newStep
    ])
  };

  const _auth = async () => {
    setLoadingMsg('Authenticating')
    await DataToolTemplateUtil.auth()
    setUserIsAuthenticated(true);
    updateSteps({
      id: 'auth',
      title: 'Authenticated',
      success: true
    })
    setLoadingMsg(undefined)
  }

  const _cloneProject = async () => {
    setLoadingMsg('Preparing data tool')
    await DataToolTemplateUtil.cloneProject(projectName)
    updateSteps({
      id: 'clone',
      title: 'Cloned repo',
      success: true
    })
    setLoadingMsg(undefined)
    return _installProject(projectName)
  }

  const _installProject = async (dest) => {
    setLoadingMsg('Installing dependencies')
    await DataToolTemplateUtil.installApp(dest)
    await DataToolTemplateUtil.installWorkbench()
    _finish()
  }

  const _finish = () => {
    updateSteps({
      id: 'clone',
      title: 'Installed project',
      success: true
    })
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
        <Text>cd <Text color="green" bold>{projectName}</Text></Text>
        <Newline />
        <Text color="green" bold>{manager} start</Text>
        <Newline />
        <Text italic>To publish your project:</Text>
        <Newline/>
        <Text color="green" bold>{manager} start</Text>
        <Newline />
        <Newline />
        <Text italic>"If you build it, they will come!"</Text>
      </Text>
    </Box>
  )

  const renderSelectManager = () => {
    const handleSelect = item => setManager(item.value)
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
        <SelectInput items={items} onSelect={handleSelect}/>
      </Box>

    )
  }

  return (
    <>
      <Static items={steps}>
        {step => (
          <Box key={step.id}>
            <Text color="green">✔ {step.title}</Text>
          </Box>
        )}
      </Static>
      { loadingMsg && renderLoading() }
      { (userIsAuthenticated && steps.length === 1 )&& renderDialog() }
      { (userIsAuthenticated && steps.length === 2 )&& renderSelectManager() }
      { completed && renderSuccess() }
    </>
  )
};

render(<RunProject />);