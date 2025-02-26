import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Challenge from "./components/Challenge";

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <Challenge numDomainsRequired={5} />
    </ChakraProvider>
  );
};

export default App;
