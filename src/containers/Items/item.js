import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function Item(props) {
  const itemsFromCart = JSON.parse(
    JSON.stringify(localStorage.getItem("cartItems") || "")
  );
  let existingItem;
  if (itemsFromCart && itemsFromCart.length) {
    existingItem = JSON.parse(itemsFromCart).find(
      (item) => item.id === props.item.id
    );
  }
  const addItemToCart = (item) => {
    const getCartItem = JSON.parse(
      JSON.stringify(localStorage.getItem("cartItems"))
    );
    const orderDetails = JSON.parse(
      JSON.stringify(localStorage.getItem("myOrders"))
    );
    const userDetails = JSON.parse(
      JSON.stringify(localStorage.getItem("loggedUser"))
    );
    const userId = JSON.parse(userDetails).id;
    const items = JSON.parse(getCartItem);
    const myOrders = JSON.parse(orderDetails);
    const itemToCart = {
      ...item,
      quantity: 1,
    };
    if (items) {
      localStorage.setItem("cartItems", JSON.stringify([...items, itemToCart]));
      props.setTotalItem(items.length + 1);
    } else {
      localStorage.setItem("cartItems", JSON.stringify([itemToCart]));
      props.setTotalItem(items.length + 1);
    }
  };

  return (
    <>
      <Card className="mx-2 my-3 card__container" style={{ width: "18rem" }}>
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
          <Card.Text className="text-truncate">
            {props.item.description}
          </Card.Text>

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
