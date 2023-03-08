import { Grid, GridItem } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export const DefaultLayout = () => {
  return (
    <Grid
      templateAreas={`"header"
                  "main"
                  "footer"`}
      gridTemplateRows={"100px 1fr"}
      gridTemplateColumns={"1fr"}
      h={"100vh"}
    >
      <GridItem area={"header"}>
        <Header />
      </GridItem>
      <GridItem area={"main"} p={"20"}>
        <Outlet />
      </GridItem>
    </Grid>
  );
};
