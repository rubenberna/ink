import React, { useState, useEffect } from 'react';
import { render, Box, Text, useInput, useApp, Static } from 'ink';
import TextInput from 'ink-text-input';
import { clone } from '../utils/gitClone';
import { authenticate } from '../utils/auth';

const SearchQuery = () => {
  const [query, setQuery] = useState('');
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(false)
  const [steps, setSteps] = useState([])
  const {exit} = useApp();

  const updateSteps = (newStep) => {
    setSteps(previousSteps => [
      ...previousSteps,
      newStep
    ])
  }

  const auth = async () => {
    await authenticate()
    setUserIsAuthenticated(true);
    updateSteps({
      id: 'auth',
      title: 'Authenticated',
      success: true
    })
  }

  useEffect(() => {
    auth()
  }, [])
  useInput((input, key) => {
    if (key.return) {
      clone(query)
      updateSteps({
        id: 'clone',
        title: 'Cloned repo',
        success: true
      })
      exit()
    }
  })

  const renderDialog = () => {
    return (
      <>
        <Box>
          <Box marginRight={1}>
            <Text>Enter the name of your project:</Text>
          </Box>

          <TextInput value={query} onChange={setQuery} />
        </Box>
      </>
    );
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

      {
        userIsAuthenticated && renderDialog()
      }
    </>
  )
};

render(<SearchQuery />);