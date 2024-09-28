import { MantineProvider } from "@mantine/core";
import Header from "./components/header.jsx";
import Main from "./components/Main.jsx";
// import Home from './components/home.jsx';
export default function App() {
  return (
    <>
      <MantineProvider>
        <Header></Header>
        <Main></Main>
      </MantineProvider>
    </>
  );
}
