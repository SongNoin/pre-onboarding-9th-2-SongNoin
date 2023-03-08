import { Heading } from "@chakra-ui/react";

export const Header = () => {
  return (
    <Heading
      pl={10}
      size={"lg"}
      height="100%"
      display={"flex"}
      alignItems={"center"}
      borderBottom={"1px solid #708090"}
    >
      Like a local
    </Heading>
  );
};
