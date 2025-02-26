import React from "react";
import { Text, Progress, Box } from "@chakra-ui/react";

interface CartProgressProps {
  count: number;
  required: number;
}

const CartProgress: React.FC<CartProgressProps> = ({ count, required }) => (
  <Box>
    <Text>
      {count} out of {required} domains added
    </Text>
    <Progress
      value={(count / required) * 100}
      colorScheme="blue"
      size="sm"
      mt={2}
    />
  </Box>
);

export default CartProgress;
