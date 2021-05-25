import React, { useState } from 'react';
import { render, Box, Text, useInput, useApp } from 'ink';
import TextInput from 'ink-text-input';
import { clone } from '../utils/gitClone';

const SearchQuery = () => {
  const [query, setQuery] = useState('');
  const {exit} = useApp();

  useInput((input, key) => {
    if (key.return) {
      clone(query)
      exit()
    }
  })

  return (
    <Box>
      <Box marginRight={1}>
        <Text>Enter the name of your project:</Text>
      </Box>

      <TextInput value={query} onChange={setQuery} />
    </Box>
  );
};

render(<SearchQuery />);