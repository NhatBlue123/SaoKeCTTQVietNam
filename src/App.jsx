import { MantineProvider } from '@mantine/core';

import Home from './components/home.jsx';
export default function App() {
  return (
    <>
      <MantineProvider>
          <Home></Home>
      </MantineProvider>
    </>
  )
}