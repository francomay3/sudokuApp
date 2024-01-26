import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";

import NavBar from "./NavBar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Stack gap={3}>
        <NavBar />
        <Container>{children}</Container>
      </Stack>
    </>
  );
};

export default Layout;
