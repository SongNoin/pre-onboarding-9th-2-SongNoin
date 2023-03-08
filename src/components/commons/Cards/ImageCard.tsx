import {
  Card,
  CardFooter,
  Divider,
  Heading,
  CardBody,
  Stack,
  Image,
  Text,
  Button,
} from "@chakra-ui/react";

interface ImageCardProps {
  buttonText: string;
  onClickCard: () => void;
  onClickButton: () => void;
  idx: number;
  imageUrl: string;
  name: string;
  space: string;
  price: number;
}

export const ImageCard = ({
  idx,
  imageUrl,
  name,
  space,
  price,
  buttonText,
  onClickCard,
  onClickButton,
}: ImageCardProps) => {
  return (
    <Card
      maxW={"xs"}
      onClick={onClickCard}
      cursor="pointer"
      _hover={{ bg: "blue.100" }}
    >
      <CardBody>
        <Image
          src={imageUrl}
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{idx + " - " + name}</Heading>
          <Text>{space}</Text>
          <Text color="blue.600" fontSize="2xl">
            {price.toLocaleString("kr")}원
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <Button
          variant="solid"
          colorScheme="blue"
          w={"100%"}
          onClick={(event) => {
            event.stopPropagation();
            onClickButton();
          }}
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
};
