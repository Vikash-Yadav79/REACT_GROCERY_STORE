import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function Item(props) {
  const [existingItem, setExistingItem] = useState({})
  const _items = JSON.parse(
    JSON.stringify(localStorage.getItem("cartItems") || "")
  );
  const userDetails = JSON.parse(JSON.stringify(localStorage.getItem('loggedUser')));
  const userId = JSON.parse(userDetails).id;

  const itemsFromCart = JSON.parse(_items)[`${userId}`];
  useEffect(() => {
    setExistingItem(itemsFromCart.find(_item => _item.id === props.item.id && _item.type === props.item.type))
  }, []);
  const addItemToCart = (item) => {
    props.setTotalItem();
    const getCartItem = JSON.parse(
      JSON.stringify(localStorage.getItem("cartItems"))
    );
    const userDetails = JSON.parse(
      JSON.stringify(localStorage.getItem("loggedUser"))
    );
    const userId = JSON.parse(userDetails).id;
    const _items = JSON.parse(getCartItem);
    const itemToCart = {
      ...item,
      quantity: 1,
    };
    const _myItems = [..._items[`${userId}`]];
    _myItems.push({...itemToCart});
    const setCartDetails = {..._items, [`${userId}`]: [..._myItems]};
    localStorage.setItem("cartItems", JSON.stringify(setCartDetails));
    setExistingItem({...itemToCart})
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
            <Button variant="success" disabled>
              Added To Cart
            </Button>
          )}
        </Card.Body>
      </Card>
    </>
  );
}

export default Item;
