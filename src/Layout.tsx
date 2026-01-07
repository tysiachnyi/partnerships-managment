import Navigation from "@/Navigation";
import { Box, Container } from "@chakra-ui/react";
import { Outlet } from "react-router";

function Layout() {
  return (
    <>
      <Container maxW="6xl" py={8}>
        <Box mb={10}>
          <Navigation />
        </Box>
        <Outlet />
      </Container>
    </>
  );
}

export default Layout;
