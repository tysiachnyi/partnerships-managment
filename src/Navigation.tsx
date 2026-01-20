import { Box, Flex, IconButton, Text, Button, HStack, Avatar } from "@chakra-ui/react";
import { FiHome, FiSettings, FiLogOut } from "react-icons/fi";
import { useAuthStore } from "@/stores/authStore";
import { toaster } from "@/components/ui/toasterCall";
import { ColorModeButton } from "@/components/ui/color-mode";

function Navigation() {
  const { isAuthenticated, user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    toaster.create({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
      type: 'info',
    });
  };

  return (
    <Box
      as="nav"
      position="fixed"
      top={0}
      left={0}
      w="100%"
      bg="gray.800"
      px={4}
      py={2}
      boxShadow="md"
      zIndex={10}
    >
      <Flex justify="space-between" align="center">
        <Flex gap={4}>
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
          <ColorModeButton color="white" _hover={{ bg: "whiteAlpha.200" }} />
        </Flex>

        {isAuthenticated && user && (
          <HStack gap={3}>
            <Flex align="center" gap={2}>
              <Avatar.Root size="sm">
                <Avatar.Fallback name={user.name} />
              </Avatar.Root>
              <Text color="white" fontSize="sm">
                {user.name}
              </Text>
            </Flex>
            <Button
              variant="ghost"
              color="white"
              size="sm"
              onClick={handleLogout}
              _hover={{ bg: "whiteAlpha.200" }}
            >
              <FiLogOut />
              Logout
            </Button>
          </HStack>
        )}
      </Flex>
    </Box>
  );
}

export default Navigation;
