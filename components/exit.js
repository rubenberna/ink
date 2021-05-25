import React, { useState } from 'react'
import {render, Static, Box, Text, useApp} from 'ink';
import SelectInput from "ink-select-input";
import pkg from '../package.json';

const Demo = () => {
  const {exit} = useApp();
  const [selection, setSelection] = useState([])

  const items = Object.keys(pkg.devDependencies).map(
    (commandName) => {
      return {
        label: commandName,
        value: commandName
      }
    }
  )

  const handleSelection = (item) => {
    setSelection(previousSelection => [
      ...previousSelection,
      item
    ])
    exit()
  }

  return (
    <>
      <Static items={selection}>
        {select => (
          <Box key={select.value}>
            <Text color="green">✔ {select.label}</Text>
          </Box>
        )}
      </Static>

      <SelectInput
        items={items}
        onSelect={handleSelection}
      />
    </>
  )
};

render(<Demo/>)