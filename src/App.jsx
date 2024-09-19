import { MantineProvider } from '@mantine/core';

import Home from './components/home';
import BarChart1 from './components/Matine/BarChart';
export default function App() {
  return (
    <>
      <MantineProvider>
          <Home></Home>
      </MantineProvider>
    </>
  )
}