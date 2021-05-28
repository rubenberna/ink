import React, { useState, useEffect } from 'react';
import { render, Box, Text, useInput, useApp } from 'ink';
import TextInput from 'ink-text-input';
import { clone } from '../utils/gitClone';
import { authenticate } from '../utils/auth';

const SearchQuery = () => {
  const [query, setQuery] = useState('');
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(false)
  const {exit} = useApp();

  const auth = async () => {
    const res = await authenticate()
    console.log(res.account.name);
    setUserIsAuthenticated(true)
  }

  useEffect(() => {
    auth()
  }, [])
  useInput((input, key) => {
    if (key.return) {
      clone(query)
      exit()
    }
  })

  const renderDialog = () => {
    return (
      <Box>
        <Box marginRight={1}>
          <Text>Enter the name of your project:</Text>
        </Box>

        <TextInput value={query} onChange={setQuery} />
      </Box>
    );
  }

  return userIsAuthenticated && renderDialog()
};

render(<SearchQuery />);