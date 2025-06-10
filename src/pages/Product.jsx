import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../Components/productslice";
import { addToCart } from "../Components/cartSlice";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Row,
  Spinner,
} from "react-bootstrap";
import "../css/product.css";


function Product() {
  const { items, status, error } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // add to cart product
  const handleCart = (product) => {
    dispatch(addToCart(product));
  

  };
  if (status === "loading") {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "50vh" }}
      >
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }
  if (status === "failed") {
    return (
      <Container className="my-5">
        <Alert variant="danger">Error :{error}</Alert>
      </Container>
    );
  }
  return (
    <Container className="my-5">
      <h2 className="text-center mb-5">Products</h2>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {items.map((product) => (
          <Col key={product.id}>
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={product.image}
                alt={product.title}
                style={{
                  height: "200px",
                  objectFit: "contain",
                  padding: "10px",
                }}
              />
              <Card.Body>
                <Card.Title
                  style={{
                    fontSize: "1rem",
                    height: "2.5rem",
                    overflow: "hidden",
                  }}
                >
                  {product.title}
                </Card.Title>
                <Card.Text className="text-success fw-bold">
                  ${product.price}
                </Card.Text>
              </Card.Body>
              <Card.Footer className="text-center">
              <Button onClick={() => handleCart(product)}>Add To Cart</Button>

              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Product;
