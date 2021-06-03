import React, { useState, useEffect } from 'react';
import { render, Box, Text, useInput, useApp, Static, Newline } from 'ink';
import TextInput from 'ink-text-input';
import Spinner from 'ink-spinner';
import SelectInput from 'ink-select-input';
import { STEPS, getStepsDetails } from '../consts/steps.consts';
import { useRunProject } from '../hooks/useRunProject';

const App = () => {
  const {exit} = useApp();
  const [projectName, setProjectName] = useState('');
  const [manager, setManager] = useState(undefined);
  const [loadingMsg, setLoadingMsg] = useState(undefined);
  const [steps, setSteps] = useState([]);
  const [completed, setCompleted] = useState(false);

  useInput((input, key) => {
    if (key.return && steps.length === getStepsDetails(STEPS.PROJECT_NAME).nr) {
      updateSteps(getStepsDetails(STEPS.PROJECT_NAME))
    }
  });

  const updateSteps = (newStep) => {
    setSteps(previousSteps => [
      ...previousSteps,
      newStep
    ])
  };

  const {  startAuth } = useRunProject(
    steps,
    updateSteps,
    setLoadingMsg,
    setCompleted,
    projectName,
    manager,
    exit
  )

  useEffect(() => {
    startAuth()
  }, []);

  const renderLoading = () => {
    return loadingMsg &&
      <Text>
        <Text color="green">
          <Spinner type="dots"  />
        </Text>
        {` ${loadingMsg}`}
      </Text>
  }

  const renderSelectManager = () => {
    const handleChange = (item) => {
      setManager(item.value)
      setLoadingMsg('Preparing data tool')
      updateSteps(getStepsDetails(STEPS.MANAGER))
    }

    const items = [
      {
        label: 'Yarn (recommended)',
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
        <SelectInput items={items} onSelect={handleChange}/>
      </Box>
    )
  }

  const renderProjectNamePrompt = () => {
    return (
      <Box>
        <Box marginRight={1}>
          <Text>Enter the name of your project:</Text>
        </Box>

        <TextInput value={projectName} onChange={setProjectName} />
      </Box>
    )
  }

  const renderSuccessMsg = () => (
    <Box borderStyle="round" borderColor="green" width={40} padding={2}>
      <Text>
        <Text italic>To start your project:</Text>
        <Newline/>
        <Text>cd <Text color="#006064" bold>{projectName}</Text></Text>
        <Newline />
        <Text color="#006064" bold>{manager} start</Text>
        <Newline />
        <Newline />
        <Text italic>To publish your project:</Text>
        <Newline/>
        <Text color="#006064" bold>{manager} publish</Text>
        <Newline />
        <Newline />
        <Text italic>"If you build it, they will come!"</Text>
      </Text>
    </Box>
  )

  return (
    <>
      <Static items={steps}>
        {step => (
          <Box key={step.nr}>
            { step.success ?
              <Text color="green">✔ {step.title}</Text>
              :
              <Text color="red">&#x261E; {step.title}</Text>
            }
          </Box>
        )}
      </Static>
      { loadingMsg && renderLoading() }
      { ( steps.length === getStepsDetails(STEPS.PROJECT_NAME).nr )&& renderProjectNamePrompt() }
      { ( steps.length === getStepsDetails(STEPS.MANAGER).nr )&& renderSelectManager() }
      { completed && renderSuccessMsg() }
    </>
  )
};

render(<App />);