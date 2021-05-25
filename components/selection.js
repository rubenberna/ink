import React, { useState } from 'react'
import { render, Text } from 'ink';
import SelectInput from 'ink-select-input';

const Demo = () => {
  const [firstSelection, setFirstSelection] = useState(null)

  const handleSelect = (item) => {
    setFirstSelection(item)
  }

  const items = [
    {
      label: "First",
      value: "value",
    },
    {
      label: "Second",
      value: "second",
    },
    {
      label: "Third",
      value: "third",
    },
  ];

  return (
    <>
      <Text color="greenBright">npm run command selector!</Text>
      {
        !firstSelection ?
          <SelectInput items={items} onSelect={handleSelect} />
          :
          <Text color="rgb(232, 131, 136)">You selected {firstSelection.label}</Text>
      }
    </>
  );
};

render(<Demo />);