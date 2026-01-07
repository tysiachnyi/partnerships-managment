import { Flex, Tabs, Heading, Box, Stack } from "@chakra-ui/react";
import { FeatureFlag } from "@/components/FeatureFlag";

const sampleFlags = [
  {
    name: "New Dashboard",
    description: "Enables the new dashboard layout for all users.",
    isActive: true,
  },
  {
    name: "Beta Feature Access",
    description: "Grants access to beta features for testing purposes.",
    isActive: false,
  },
  {
    name: "Dark Mode",
    description: "Allows users to switch to dark mode theme.",
    isActive: true,
  },
  {
    name: "Enhanced Security",
    description: "Activates additional security measures for user accounts.",
    isActive: false,
  },
  {
    name: "Performance Improvements",
    description:
      "Optimizes application performance for better user experience.",
    isActive: true,
  },
  {
    name: "Social Media Integration",
    description: "Enables sharing content directly to social media platforms.",
    isActive: false,
  },
  {
    name: "Multi-language Support",
    description: "Provides support for multiple languages in the UI.",
    isActive: true,
  },
];

function App() {
  const featureFlagsRender = (condition: boolean) =>
    sampleFlags
      .filter((flag) => flag.isActive === condition)
      .map((flag) => (
        <FeatureFlag
          key={flag.name}
          name={flag.name}
          description={flag.description}
        />
      ));

  return (
    <Box>
      <Flex justify={"center"} mb={8}>
        <Heading>Feature Flags Management</Heading>
      </Flex>
      <Flex justify={"center"}>
        <Tabs.Root variant="enclosed" minW="xl" fitted defaultValue={"Active"}>
          <Tabs.List>
            <Tabs.Trigger value="Active">Active Flags</Tabs.Trigger>
            <Tabs.Trigger value="Disabled">Disabled Flags</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="Active">
            <Stack>{featureFlagsRender(true)}</Stack>
          </Tabs.Content>
          <Tabs.Content value="Disabled">
            <Stack>{featureFlagsRender(false)}</Stack>
          </Tabs.Content>
        </Tabs.Root>
      </Flex>
    </Box>
  );
}

export default App;
