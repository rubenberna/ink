import React, { useState, useEffect } from 'react';
import { render, Box, Text, useInput, useApp, Newline } from 'ink';
import TextInput from 'ink-text-input';
import { clone } from '../utils/gitClone';
import * as auth from '../utils/auth';

const SearchQuery = () => {
  const [query, setQuery] = useState('');
  const [username, setUsername] = useState(null);
  const {exit} = useApp();

  useInput((input, key) => {
    if (key.return) {
      clone(query)
      exit()
    }
  })

  const authenticate = async () => {
    const res = await auth.login();
    if (res?.account?.name) {
      setUsername(res.account.name)
    }
  }

  useEffect(() => {
    console.log(process.platform);
    authenticate()
  }, [])

  const askForProjectDetails = () => (
    <Box>
      <Box marginRight={1}>
        <Text color="#278ece">Hi {username}!
          <Newline/>
          <Text color="#fff">Enter the name of your project:</Text>
        </Text>
      </Box>

      <TextInput value={query} onChange={setQuery} />
    </Box>
  )

  return (
    <>
      { username && askForProjectDetails()}
    </>
  );
};

render(<SearchQuery />);