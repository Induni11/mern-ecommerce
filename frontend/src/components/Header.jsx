import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    window.location.href = "/";
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <Navbar.Brand as={Link} to="/">
          MERL Shop
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* Cart */}
            <Nav.Link as={Link} to="/cart">
              Cart
            </Nav.Link>

            {/* Logged in user */}
            {userInfo ? (
              <>
                {/* User menu */}
                <NavDropdown title={userInfo.name} id="username">
                  <NavDropdown.Item as={Link} to="/myorders">
                    My Orders
                  </NavDropdown.Item>

                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>

                {/* Admin menu */}
                {userInfo.isAdmin && (
                  <NavDropdown title="Admin" id="adminmenu">
                    <NavDropdown.Item as={Link} to="/admin/orders">
                      Orders
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/admin/products">
                      Products
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
              </>
            ) : (
              <>
                {/* Not logged in */}
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
