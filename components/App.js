import React, { useState, useEffect } from 'react';
import { render, Box, Text, useInput, useApp, Static, Newline } from 'ink';
import TextInput from 'ink-text-input';
import { clone } from '../utils/gitClone';
import { authenticate } from '../utils/auth';
import Spinner from 'ink-spinner';

const RunProject = () => {
  const [projectName, setProjectName] = useState('');
  const [loadingMsg, setLoadingMsg] = useState(undefined)
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(false)
  const [steps, setSteps] = useState([])
  const [completed, setCompleted] = useState(false)
  const {exit} = useApp();

  const updateSteps = (newStep) => {
    setSteps(previousSteps => [
      ...previousSteps,
      newStep
    ])
  }

  const auth = async () => {
    setLoadingMsg('Authenticating')
    await authenticate()
    setUserIsAuthenticated(true);
    updateSteps({
      id: 'auth',
      title: 'Authenticated',
      success: true
    })
    setLoadingMsg(undefined)
  }

  useEffect(() => {
    auth()
  }, [])
  
  useInput((input, key) => {
    if (key.return) {
      setLoadingMsg('Cloning repo')
      clone(projectName)
      updateSteps({
        id: 'clone',
        title: 'Cloned repo',
        success: true
      })
      setLoadingMsg(undefined)
      setCompleted(true)
      exit()
    }
  })

  const renderLoading = () => {
    return loadingMsg &&
      <Text>
        <Text color="green">
          <Spinner type="dots"  />
        </Text>
        {` ${loadingMsg}`}
      </Text>
  }

  const renderDialog = () => {
    return steps.length <= 1 && (
      <Box>
        <Box marginRight={1}>
          <Text>Enter the name of your project:</Text>
        </Box>

        <TextInput value={projectName} onChange={setProjectName} />
      </Box>
    )
  }

  const renderSuccess = () => (
    <Box borderStyle="round" borderColor="green" width={40} padding={2}>
      <Text>
        <Text>cd <Text color="green" bold>{projectName}</Text></Text>
        <Newline />
        <Newline />
        <Text>If you build it, they will come!</Text>
      </Text>
    </Box>
  )


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
      { userIsAuthenticated && renderDialog() }
      { completed && renderSuccess() }
    </>
  )
};

render(<RunProject />);