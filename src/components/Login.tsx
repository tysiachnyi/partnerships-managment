import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  Center,
  Heading,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '@/stores/authStore';
import { toaster } from '@/components/ui/toasterCall';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginForm = z.infer<typeof loginSchema>;

export const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    try {
      const success = await login(data.email, data.password);
      if (!success) {
        setError('password', {
          type: 'manual',
          message: 'Invalid email or password',
        });
        toaster.create({
          title: 'Login Failed',
          description: 'Please check your credentials and try again.',
          type: 'error',
        });
      } else {
        toaster.create({
          title: 'Login Successful',
          description: 'Welcome back!',
          type: 'success',
        });
      }
    } catch (error) {
      toaster.create({
        title: 'Login Failed',
        description: 'An unexpected error occurred. Please try again.',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Center minH="100vh" bg="gray.50">
      <Card.Root maxW="md" w="full">
        <Card.Header>
          <Center>
            <Heading size="lg">Partner Portal Login</Heading>
          </Center>
        </Card.Header>
        <Card.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack gap={4}>
              <div>
                <label>Email</label>
                <Input
                  type="email"
                  placeholder="partner@example.com"
                  {...register('email')}
                />
                {errors.email && <Text color="red">{errors.email.message}</Text>}
              </div>

              <div>
                <label>Password</label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...register('password')}
                />
                {errors.password && <Text color="red">{errors.password.message}</Text>}
              </div>

              <Button
                type="submit"
                colorScheme="blue"
                width="full"
                loading={isLoading}
                loadingText="Signing in..."
              >
                Sign In
              </Button>
            </VStack>
          </form>

          <Box mt={4} p={3} bg="blue.50" borderRadius="md">
            <Text fontSize="sm" color="blue.700">
              <strong>Demo Credentials:</strong><br />
              Email: partner@example.com<br />
              Password: password123
            </Text>
          </Box>
        </Card.Body>
      </Card.Root>
    </Center>
  );
};