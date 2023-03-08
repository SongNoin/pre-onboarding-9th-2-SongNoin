import { Box, Button, Flex, Heading, Spacer } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigation = useNavigate();
  return (
    <Flex
      alignItems="center"
      borderBottom={"1px solid #708090"}
      h="100%"
      pr={"50px"}
    >
      <Heading
        pl={10}
        size={"lg"}
        height="100%"
        display={"flex"}
        alignItems={"center"}
      >
        Like a local
      </Heading>
      <Spacer />
      <Button onClick={() => navigation("/reservations")} colorScheme={"teal"}>
        장바구니
      </Button>
    </Flex>
  );
};
