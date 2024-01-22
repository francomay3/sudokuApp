import { Stack } from "react-bootstrap";
import NavBar from "./NavBar";
import Container from "react-bootstrap/Container";

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
