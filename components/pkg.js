import React, { useState } from 'react'
import { render, Text,  } from 'ink';
import SelectInput from 'ink-select-input';
import pkg from '../package.json'

const Demo = () => {
  const [selection, setSelection] = useState(null)

  const handleSelect = (item) => {
    setSelection(item)
  }

  const items = Object.keys(pkg.devDependencies).map(
    (commandName) => {
      return {
        label: commandName,
        value: commandName
      }
    }
  )

  return (
    <>
      <Text color="green">Welcome to npm run command selector!</Text>
      {
        !selection ?
          <SelectInput items={items} onSelect={handleSelect}/>
          :
          <Text color="blue">You selected {selection.label}</Text>
      }
    </>
  )
}

render(<Demo/>)

