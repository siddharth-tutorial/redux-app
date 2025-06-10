import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  Container,
  Image,
  Alert,
  Row,
  Col,
} from "react-bootstrap";
import {
  decrementQty,
  incrementQty,
  removeFromCart,
} from "../Components/cartSlice";

function Cart() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart?.items || []);
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <Alert variant="danger" className="text-center">
          Your cart is empty.
        </Alert>
      ) : (
        <>
          <Row>
            {/* Cart Items List */}
            <Col lg={8} md={12}>
              {cartItems.map((item) => (
                <Card
                  key={item.id}
                  className="mb-3 shadow-sm"
                  style={{ borderRadius: "8px" }}
                >
                  <Row className="g-0 align-items-center p-3">
                    <Col xs={3} md={2}>
                      <Image
                        src={item.image}
                        alt={item.title}
                        fluid
                        rounded
                        style={{
                          objectFit: "contain",
                          maxHeight: 90,
                          background: "#f1f3f6",
                        }}
                      />
                    </Col>
                    <Col xs={9} md={4}>
                      <h6 style={{ fontWeight: 600 }}>{item.title}</h6>
                      <div
                        className="text-muted"
                        style={{ fontSize: "0.9rem" }}
                      >
                        Price: ₹{item.price.toFixed(2)}
                      </div>
                    </Col>
                    <Col xs={12} md={3} className="my-2 my-md-0">
                      <div
                        className="d-flex align-items-center border rounded"
                        style={{ maxWidth: 120 }}
                      >
                        <Button
                          size="sm"
                          variant="light"
                          onClick={() => dispatch(decrementQty(item.id))}
                          disabled={item.quantity === 1}
                          style={{ borderRadius: "0 0 0 0.25rem" }}
                        >
                          −
                        </Button>
                        <div
                          className="text-center flex-grow-1"
                          style={{ lineHeight: "32px", fontWeight: 600 }}
                        >
                          {item.quantity}
                        </div>
                        <Button
                          size="sm"
                          variant="light"
                          onClick={() => dispatch(incrementQty(item.id))}
                          style={{ borderRadius: "0 0.25rem 0.25rem 0" }}
                        >
                          +
                        </Button>
                      </div>
                    </Col>
                    <Col xs={6} md={2} className="text-md-center mt-2 mt-md-0">
                      <div style={{ fontWeight: 600, fontSize: "1rem" }}>
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </div>
                    </Col>
                    <Col xs={6} md={1} className="text-md-end mt-2 mt-md-0">
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => dispatch(removeFromCart(item.id))}
                        title="Remove Item"
                      >
                        ×
                      </Button>
                    </Col>
                  </Row>
                </Card>
              ))}
            </Col>

            {/* Summary & Checkout */}
            <Col lg={4} md={12}>
              <Card className="shadow-sm p-3" style={{ borderRadius: "8px" }}>
                <h5 className="mb-3" style={{ fontWeight: 600 }}>
                  Price Details
                </h5>
                <hr />
                <div className="d-flex justify-content-between mb-2">
                  <span>Price ({cartItems.length} items)</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Delivery Charges</span>
                  <span className="text-success">Free</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fs-5 fw-bold">
                  <span>Total Amount</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
                <Button
                  variant="warning"
                  className="w-100 mt-4"
                  style={{ fontWeight: 600 }}
                >
                  Place Order
                </Button>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}

export default Cart;
