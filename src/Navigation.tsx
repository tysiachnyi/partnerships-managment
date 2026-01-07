import { Box, Flex, IconButton } from "@chakra-ui/react";
import { FiHome, FiSettings } from "react-icons/fi";

function Navigation() {
  return (
    <Box
      as="nav"
      position="fixed"
      top={0}
      left={0}
      w="100%"
      bg="gray.800"
      px={2}
      py={1}
      boxShadow="md"
      zIndex={10}
    >
      <Flex justify="center" gap={8}>
        <IconButton aria-label="Home" variant="ghost" color="white" size="md">
          <FiHome />
        </IconButton>
        <IconButton
          aria-label="Settings"
          variant="ghost"
          color="white"
          size="md"
        >
          <FiSettings />
        </IconButton>
      </Flex>
    </Box>
  );
}

export default Navigation;
