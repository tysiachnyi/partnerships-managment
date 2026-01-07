import { Card, Heading } from "@chakra-ui/react";

type Props = {
  name: string;
  description?: string;
};

export const FeatureFlag = ({ name, description }: Props) => {
  return (
    <Card.Root size="sm">
      <Card.Header>
        <Heading size="md">{name}</Heading>
      </Card.Header>
      <Card.Body color="fg.muted">{description}</Card.Body>
    </Card.Root>
  );
};
