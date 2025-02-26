import React from "react";
import { List, ListItem, IconButton, HStack, Text } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { Domain } from "../types/domain";

interface DomainListProps {
  domains: Set<Domain>;
  removeDomain: (domain: string) => void;
}

const DomainList: React.FC<DomainListProps> = ({ domains, removeDomain }) => (
  <List spacing={3} mt={3}>
    {[...domains].map((domain) => (
      <ListItem key={domain.name}>
        <HStack>
          <Text>
            {domain.name} {domain.available ? "(Available)" : "(Unavailable)"}
          </Text>
          <IconButton
            aria-label="Remove"
            icon={<DeleteIcon />}
            onClick={() => removeDomain(domain.name)}
          />
        </HStack>
      </ListItem>
    ))}
  </List>
);

export default DomainList;
