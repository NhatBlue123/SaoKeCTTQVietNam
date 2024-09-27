import { MantineProvider } from '@mantine/core';

import Home from './components/home';
export default function App() {
  return (
    <>
      <MantineProvider>
          <Home></Home>
      </MantineProvider>
    </>
  )
}