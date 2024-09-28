import { MantineProvider } from "@mantine/core";
import Header from "./components/Header";
import Main from "./components/Main";
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
