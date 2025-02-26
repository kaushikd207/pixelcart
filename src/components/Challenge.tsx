import React, { useState } from "react";
import {
  Box,
  Button,
  VStack,
  Input,
  Text,
  HStack,
  useToast,
  Progress,
  Tooltip,
  IconButton,
  Flex,
  Divider,
  Badge,
} from "@chakra-ui/react";
import { CopyIcon, DeleteIcon } from "@chakra-ui/icons";
import { FaShoppingCart, FaTrash, FaTimesCircle } from "react-icons/fa";

// Mock API function
const isDomainAvailable = async (_domain: string): Promise<boolean> => {
  return Math.random() > 0.5; // Simulated API response
};

// Allowed TLDs
const VALID_TLDS = [".com", ".xyz", ".app"];

interface ChallengeProps {
  numDomainsRequired: number;
}

const Challenge: React.FC<ChallengeProps> = ({ numDomainsRequired }) => {
  const [domains, setDomains] = useState<
    { name: string; available: boolean }[]
  >([]);
  const [inputValue, setInputValue] = useState("");
  const toast = useToast();

  const isValidDomain = (domain: string) => {
    return (
      VALID_TLDS.some((tld) => domain.endsWith(tld)) &&
      !domain.includes("://") &&
      !domain.includes("/")
    );
  };

  const addDomain = async () => {
    const cleanDomain = inputValue.trim().toLowerCase();
    if (!isValidDomain(cleanDomain)) {
      toast({ title: "Invalid domain!", status: "error", duration: 2000 });
      return;
    }
    if (domains.some((d) => d.name === cleanDomain)) {
      toast({
        title: "Domain already in cart!",
        status: "warning",
        duration: 2000,
      });
      return;
    }
    const available = await isDomainAvailable(cleanDomain);
    setDomains([...domains, { name: cleanDomain, available }]);
    setInputValue("");
  };

  const removeDomain = (name: string) => {
    setDomains(domains.filter((d) => d.name !== name));
  };

  const clearCart = () => {
    setDomains([]);
  };

  const removeUnavailable = () => {
    setDomains(domains.filter((d) => d.available));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(domains.map((d) => d.name).join(", "));
    toast({ title: "Copied to clipboard!", status: "success", duration: 2000 });
  };

  const cartFullness = (domains.length / numDomainsRequired) * 100;
  const isCartFull = domains.length >= numDomainsRequired;
  const canPurchase = domains.length === numDomainsRequired;

  return (
    <Flex justify="center" align="center" minH="100vh" bg="gray.100">
      <Box p={6} maxW="500px" w="90%" bg="white" borderRadius="lg" shadow="xl">
        {/* Title */}
        <Text
          fontSize="2xl"
          fontWeight="bold"
          textAlign="center"
          mb={4}
          color="blue.500"
        >
          Domain Cart
        </Text>

        {/* Input Field */}
        <HStack>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addDomain()}
            placeholder="Enter domain (e.g., example.com)"
            borderColor="blue.400"
            _focus={{ borderColor: "blue.600" }}
          />
          <Button onClick={addDomain} colorScheme="blue" px={6}>
            Add
          </Button>
        </HStack>

        {/* Cart Progress Bar */}
        <Box mt={4}>
          <Text fontSize="sm" color="gray.600">
            {domains.length} / {numDomainsRequired} domains added
          </Text>
          <Progress
            value={cartFullness}
            size="sm"
            colorScheme={isCartFull ? "red" : "green"}
            borderRadius="lg"
          />
        </Box>

        <Divider my={4} />

        {/* Domain List */}
        <VStack align="stretch" spacing={2} maxH="250px" overflowY="auto">
          {domains.map((domain, index) => (
            <HStack
              key={index}
              p={3}
              bg="gray.50"
              borderRadius="md"
              shadow="sm"
              w="full"
              transition="0.2s"
              _hover={{ bg: "gray.100" }}
            >
              <Badge colorScheme={domain.available ? "green" : "red"}>
                {domain.available ? "Available" : "Unavailable"}
              </Badge>
              <Text fontSize="md" flex="1" fontWeight="medium">
                {domain.name}
              </Text>
              <IconButton
                icon={<DeleteIcon />}
                aria-label="Remove domain"
                size="sm"
                colorScheme="red"
                onClick={() => removeDomain(domain.name)}
              />
            </HStack>
          ))}
        </VStack>

        <Divider my={4} />

        {/* Buttons */}
        <VStack mt={2} spacing={2}>
          <Button
            colorScheme="red"
            leftIcon={<FaTrash />}
            w="full"
            onClick={clearCart}
          >
            Clear Cart
          </Button>
          <Button
            colorScheme="purple"
            leftIcon={<FaTimesCircle />}
            w="full"
            onClick={removeUnavailable}
          >
            Remove Unavailable Domains
          </Button>
          <Button
            colorScheme="blue"
            leftIcon={<CopyIcon />}
            w="full"
            onClick={copyToClipboard}
          >
            Copy to Clipboard
          </Button>
          <Tooltip label="You must have exactly the required number of domains">
            <Button
              colorScheme="green"
              leftIcon={<FaShoppingCart />}
              w="full"
              isDisabled={!canPurchase}
              onClick={() =>
                toast({ title: "Domains purchased!", status: "success" })
              }
            >
              Purchase Domains
            </Button>
          </Tooltip>
        </VStack>
      </Box>
    </Flex>
  );
};

export default Challenge;
