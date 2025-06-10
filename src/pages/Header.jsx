import React from "react";
import { Badge, Container, Nav, Navbar } from "react-bootstrap";
import { SiRedux } from "react-icons/si";
import { useSelector } from "react-redux";

function Header() {
  const cartItems = useSelector((state) => state.cart?.items || []);
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">
          <SiRedux fontSize={45} style={{ color: "purple" }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/product">Product</Nav.Link>
            <Nav.Link
              href="/cart"
              className="position-relative"
              aria-label={`View Cart, ${totalQuantity} item${
                totalQuantity !== 1 ? "s" : ""
              }`}
              title="Shopping Cart"
            >
              Cart
              {totalQuantity > 0 && (
                <Badge
                  pill
                  bg="warning"
                  text="dark"
                  className="position-absolute top-0 start-100 translate-middle"
                  style={{
                    fontSize: "0.7rem",
                    minWidth: "18px",
                    height: "18px",
                  }}
                  aria-live="polite"
                >
                  {totalQuantity}
                </Badge>
              )}
            </Nav.Link>
            <Nav.Link href="/movie">Movie</Nav.Link>
            <Nav.Link href="/blog">Blog</Nav.Link>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
