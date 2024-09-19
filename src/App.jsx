import { MantineProvider } from '@mantine/core';

import Home from './components/home';
import BarChart1 from './components/Matine/BarChart';
import Main from './components/main';
export default function App() {
  return (
    <>
      <MantineProvider>
          <Home></Home>
          <Main></Main>
      </MantineProvider>
    </>
  )
}