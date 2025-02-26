import React, { useState } from "react";
import { Input, Button, HStack } from "@chakra-ui/react";

interface DomainInputProps {
  addDomain: (domain: string) => void;
}

const DomainInput: React.FC<DomainInputProps> = ({ addDomain }) => {
  const [domain, setDomain] = useState("");

  const validateDomain = (input: string) => {
    const regex = /^[a-zA-Z0-9-]+(\.com|\.xyz|\.app)$/;
    return regex.test(input.toLowerCase());
  };

  const handleAdd = () => {
    if (validateDomain(domain)) {
      addDomain(domain.toLowerCase());
      setDomain("");
    }
  };

  return (
    <HStack>
      <Input
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        placeholder="Enter domain..."
      />
      <Button onClick={handleAdd} colorScheme="blue">
        Add
      </Button>
    </HStack>
  );
};

export default DomainInput;
