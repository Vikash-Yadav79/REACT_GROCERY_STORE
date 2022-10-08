import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

function Item(props) {
  const itemsFromCart = JSON.parse(
    JSON.stringify(localStorage.getItem("CART_ITEMS") || "")
  );
  let existingItem;
  if (itemsFromCart && itemsFromCart.length) {
    existingItem = JSON.parse(itemsFromCart).find(
      (item) => item.id === props.item.id
    );
  }
  const addItemToCart = (item) => {
    const getCartItem = JSON.parse(
      JSON.stringify(localStorage.getItem("CART_ITEMS"))
    );
    const items = JSON.parse(getCartItem);
    const itemToCart = { ...item, quantity: 1 };
    if (items) {
      localStorage.setItem(
        "CART_ITEMS",
        JSON.stringify([...items, itemToCart])
      );
      props.setTotalItem([...items, itemToCart]);
    } else {
      localStorage.setItem("CART_ITEMS", JSON.stringify([itemToCart]));
      props.setTotalItem([itemToCart]);
    }
  };

  // React.useEffect(() => {
  //   setInitialPrice(props.item.price * itemCount);
  // }, [itemCount]);

  return (
    <>
      <Card className="mx-2 my-3" style={{ width: "18rem" }}>
        <Card.Img
          style={{ height: "10rem" }}
          variant="top"
          src={props.item.img}
        />
        <Card.Body>
          <Card.Title>
            <div>
              <span>{props.item.name} </span>
              <span style={{ float: "right" }}>${props.item.price}</span>
            </div>
          </Card.Title>
          <Card.Text>{props.item.description}</Card.Text>
          {/* {props.cart ? (
            <Button variant="primary" onClick={() => goToCart(props.item)}>
              Add To Cart
            </Button>
          ) : (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                variant="primary"
                onClick={() => {
                  setItemCount(itemCount + 1);
                }}
              >
                +
              </Button>
              <h2>{itemCount}</h2>
              <Button
                disabled={itemCount < 1}
                variant="danger"
                onClick={() => setItemCount(itemCount - 1)}
              >
                -
              </Button> */}
          {!existingItem ? (
            <Button variant="primary" onClick={() => addItemToCart(props.item)}>
              Add To Cart
            </Button>
          ) : (
            <Button variant="success" onClick={() => addItemToCart(props.item)}>
              Added To Cart
            </Button>
          )}
        </Card.Body>
      </Card>
    </>
  );
}

export default Item;
