import { Container, Navbar } from "react-bootstrap";

export default function Header() {
  return (
    <div className="header">
      <header>
        <Navbar collapseOnSelect fixed="top" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#">AI Chatin Dashboard</Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>Welcome ABC美食</Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </div>
  );
}
