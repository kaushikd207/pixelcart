import React from "react";
import { Button, VStack } from "@chakra-ui/react";

interface CartControlsProps {
  clearCart: () => void;
  removeUnavailable: () => void;
}

const CartControls: React.FC<CartControlsProps> = ({
  clearCart,
  removeUnavailable,
}) => (
  <VStack mt={5} spacing={3}>
    <Button onClick={clearCart} colorScheme="red">
      Clear Cart
    </Button>
    <Button onClick={removeUnavailable} colorScheme="orange">
      Remove Unavailable
    </Button>
  </VStack>
);

export default CartControls;
