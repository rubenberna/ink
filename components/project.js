import React, { useState, useEffect } from 'react';
import { render, Box, Text, useInput, useApp, Static } from 'ink';
import TextInput from 'ink-text-input';
import Spinner from 'ink-spinner';
import { clone } from '../utils/gitClone';
import { authenticate } from '../utils/auth';

const SearchQuery = () => {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);
  const [steps, setSteps] = useState([]);
  const [completed, setCompleted] = useState(false);
  const {exit} = useApp();

  const updateSteps = (newStep) => {
    setSteps(previousSteps => [
      ...previousSteps,
      newStep
    ])
  }

  const auth = async () => {
    setLoading(true)
    await authenticate()
    setUserIsAuthenticated(true);
    updateSteps({
      id: 'auth',
      title: 'Authenticated',
      success: true
    })
    setLoading(false)
  };

  useEffect( () => {
    auth()
  }, []);
  
  useInput((input, key) => {
    if (key.return) {
      setLoading(true)
      clone(query)
      updateSteps({
        id: 'clone',
        title: 'Cloned repo',
        success: true
      })
      setLoading(false)
      setCompleted(true)
      exit()
    }
  });

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
  };

  const renderCompleted = () => (
    <Box borderStyle="round" borderColor="green" width={40} alignItems="center" padding={1}>
      <Text>If you build it, they will come!!</Text>
    </Box>
  );

  const renderSpinner = () => (
    <Text>
      <Text color="green">
        <Spinner type="dots" />
      </Text>
      {' Loading'}
    </Text>
  );

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
        loading && renderSpinner()
      }

      {
        userIsAuthenticated && renderDialog()
      }

      {
        completed && renderCompleted()
      }
    </>
  )
};

render(<SearchQuery />);