import { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  Input,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFeatureFlagStore } from '@/stores/featureFlagStore';
import { toaster } from '@/components/ui/toasterCall';

const featureFlagSchema = z.object({
  id: z.string().min(1, 'ID is required').regex(/^[a-z0-9-]+$/, 'ID must contain only lowercase letters, numbers, and hyphens'),
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  description: z.string().min(1, 'Description is required').max(500, 'Description must be less than 500 characters'),
});

type FeatureFlagForm = z.infer<typeof featureFlagSchema>;

interface AddNewFeatureFlagModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddNewFeatureFlagModal = ({ isOpen, onClose }: AddNewFeatureFlagModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const addFlag = useFeatureFlagStore((state) => state.addFlag);
  const flags = useFeatureFlagStore((state) => state.flags);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<FeatureFlagForm>({
    resolver: zodResolver(featureFlagSchema),
  });

  const onSubmit = async (data: FeatureFlagForm) => {
    setIsLoading(true);
    try {
      const existingFlag = flags.find(flag => flag.id === data.id);
      if (existingFlag) {
        setError('id', {
          type: 'manual',
          message: 'A feature flag with this ID already exists',
        });
        setIsLoading(false);
        return;
      }

      addFlag({
        name: data.name,
        description: data.description,
        isActive: false,
      });

      toaster.create({
        title: 'Feature Flag Added',
        description: `${data.name} has been added successfully.`,
        type: 'success',
      });

      reset();
      onClose();
    } catch {
      toaster.create({
        title: 'Error',
        description: 'Failed to add feature flag. Please try again.',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog.Root placement="center" open={isOpen} onOpenChange={handleClose}>
      <Dialog.Trigger />
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Add New Feature Flag</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack gap={4}>
                <Box>
                  <label>ID</label>
                  <Input
                    placeholder="feature-flag-id"
                    {...register('id')}
                  />
                  {errors.id && <Text color="red">{errors.id.message}</Text>}
                </Box>

                <Box>
                  <label>Name</label>
                  <Input
                    placeholder="Feature Flag Name"
                    {...register('name')}
                  />
                  {errors.name && <Text color="red">{errors.name.message}</Text>}
                </Box>

                <Box>
                  <label>Description</label>
                  <Textarea
                    placeholder="Describe what this feature flag controls..."
                    rows={3}
                    {...register('description')}
                  />
                  {errors.description && <Text color="red">{errors.description.message}</Text>}
                </Box>
              </Stack>
            </form>
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.ActionTrigger asChild>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
            </Dialog.ActionTrigger>
            <Button
              colorScheme="blue"
              onClick={handleSubmit(onSubmit)}
              loading={isLoading}
              loadingText="Adding..."
            >
              Add Feature Flag
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};