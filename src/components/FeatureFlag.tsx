import { Card, Heading, Switch, Flex, Text, Badge, IconButton, Button } from "@chakra-ui/react";
import { FiTrash2 } from "react-icons/fi";
import { useFeatureFlagStore, type FeatureFlag as FeatureFlagType } from "@/stores/featureFlagStore";
import { toaster } from "@/components/ui/toasterCall";

type Props = FeatureFlagType & {
  onToggleConfirm: () => void;
};

export const FeatureFlag = ({ id, name, description, isActive, onToggleConfirm }: Props) => {
  const removeFlag = useFeatureFlagStore((state) => state.removeFlag);

  const handleRemove = () => {
    removeFlag(id);
    toaster.create({
      title: 'Feature Removed',
      description: `${name} has been removed from the feature flags.`,
      type: 'warning',
    });
  };

  return (
    <Card.Root size="sm">
      <Card.Header>
        <Flex justify="space-between" align="center">
          <Heading size="md">{name}</Heading>
          <Flex gap={2} align="center">
            <Badge colorScheme={isActive ? 'green' : 'red'}>
              {isActive ? 'Active' : 'Inactive'}
            </Badge>
            <IconButton
              aria-label="Remove feature flag"
              size="sm"
              variant="ghost"
              colorScheme="red"
              onClick={handleRemove}
            >
              <FiTrash2 />
            </IconButton>
          </Flex>
        </Flex>
      </Card.Header>
      <Card.Body color="fg.muted" pb={4}>
        <Text mb={3}>{description || "No description available."}</Text>
        <Flex justify="space-between" align="center">
          <Text fontSize="sm" color="fg.subtle">
            ID: {id}
          </Text>
          <Button
            size="sm"
            colorScheme={isActive ? "green" : "red"}
            onClick={() => onToggleConfirm()}
          >
            {isActive ? "Deactivate" : "Activate"}
          </Button>
        </Flex>
      </Card.Body>
    </Card.Root>
  );
};
