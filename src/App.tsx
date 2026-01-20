import { useState } from 'react';
import { Flex, Tabs, Heading, Box, Stack, Button, HStack, Text } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { FeatureFlag } from "@/components/FeatureFlag";
import { AddNewFeatureFlagModal } from "@/components/AddNewFeatureFlagModal";
import { ConfirmModal } from "@/components/ConfirmModal";
import { AuthGuard } from "@/components/AuthGuard";
import { useFeatureFlagStore, type FeatureFlag as FeatureFlagType } from "@/stores/featureFlagStore";
import { toaster } from "@/components/ui/toasterCall";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmModalState, setConfirmModalState] = useState<{
    isOpen: boolean;
    flagId: string | null;
    flagName: string;
    isActive: boolean;
  }>({
    isOpen: false,
    flagId: null,
    flagName: '',
    isActive: false,
  });

  const { getActiveFlags, getInactiveFlags, toggleFlag } = useFeatureFlagStore();

  const activeFlags = getActiveFlags();
  const inactiveFlags = getInactiveFlags();

  const handleOpenConfirmModal = (flagId: string, flagName: string, isActive: boolean) => {
    setConfirmModalState({
      isOpen: true,
      flagId,
      flagName,
      isActive,
    });
  };

  const handleCloseConfirmModal = () => {
    setConfirmModalState(prev => ({ ...prev, isOpen: false }));
  };

  const handleConfirmToggle = () => {
    if (confirmModalState.flagId) {
      toggleFlag(confirmModalState.flagId);
      toaster.create({
        title: `Feature ${confirmModalState.isActive ? 'Deactivated' : 'Activated'}`,
        description: `${confirmModalState.flagName} has been ${confirmModalState.isActive ? 'turned off' : 'turned on'}.`,
        type: 'info',
      });
    }
    handleCloseConfirmModal();
  };

  const featureFlagsRender = (flags: FeatureFlagType[]) =>
    flags.map((flag) => (
      <FeatureFlag
        key={flag.id}
        id={flag.id}
        name={flag.name}
        description={flag.description}
        isActive={flag.isActive}
        onToggleConfirm={() => handleOpenConfirmModal(flag.id, flag.name, flag.isActive)}
      />
    ));

  return (
    <AuthGuard>
        <ConfirmModal
          isOpen={confirmModalState.isOpen}
          onClose={handleCloseConfirmModal}
          onConfirm={handleConfirmToggle}
          title={`Confirm Feature Flag ${confirmModalState.isActive ? 'Deactivation' : 'Activation'}`}
          description={`Are you sure you want to ${confirmModalState.isActive ? 'deactivate' : 'activate'} the "${confirmModalState.flagName}" feature flag? This will ${confirmModalState.isActive ? 'disable' : 'enable'} this feature for all users.`}
          confirmText={confirmModalState.isActive ? 'Deactivate' : 'Activate'}
        />
        <AddNewFeatureFlagModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      <Box>
        <Flex justify="center" mb={8}>
          <Heading>Feature Flags Management</Heading>
        </Flex>

        <Flex justify="center" mb={6}>
          <HStack gap={4}>
            <Button
              colorScheme="blue"
              onClick={() => setIsModalOpen(true)}
              size="lg"
            >
              <FiPlus />
              Add New Feature Flag
            </Button>
          </HStack>
        </Flex>

        <Flex justify="center">
          <Tabs.Root variant="enclosed" minW="xl" fitted defaultValue="Active">
            <Tabs.List>
              <Tabs.Trigger value="Active">
                Active Flags ({activeFlags.length})
              </Tabs.Trigger>
              <Tabs.Trigger value="Inactive">
                Inactive Flags ({inactiveFlags.length})
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="Active">
              <Box p={4}>
                {activeFlags.length === 0 ? (
                  <Text color="fg.muted" textAlign="center" py={8}>
                    No active feature flags
                  </Text>
                ) : (
                  <Stack gap={4}>
                    {featureFlagsRender(activeFlags)}
                  </Stack>
                )}
              </Box>
            </Tabs.Content>

            <Tabs.Content value="Inactive">
              <Box p={4}>
                {inactiveFlags.length === 0 ? (
                  <Text color="fg.muted" textAlign="center" py={8}>
                    No inactive feature flags
                  </Text>
                ) : (
                  <Stack gap={4}>
                    {featureFlagsRender(inactiveFlags)}
                  </Stack>
                )}
              </Box>
            </Tabs.Content>
          </Tabs.Root>
        </Flex>
      </Box>
    </AuthGuard>
  );
}

export default App;
