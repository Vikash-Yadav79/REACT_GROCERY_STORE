import { useState } from "react";
import Button from "react-bootstrap/Button";
import { ButtonGroup } from "react-bootstrap";

let subTotal = 0;
const Cart = (props) => {
  const [cartItem, setCartItem] = useState({ ...props.item });
  //functions dispatching for incrementing and decrementing item in the cart
  const items = JSON.parse(
    JSON.stringify(localStorage.getItem("cartItems") || "")
  );
  const decrementItemHandle = () => {
    const existingItem = JSON.parse(items).find(
      (item) => item.id === props.item.id
    );
    if (existingItem && existingItem.quantity <= 1) {
      const currItems = JSON.parse(items).filter(
        (item) => item.id !== props.item.id
      );
      localStorage.setItem("cartItems", JSON.stringify(currItems));
      props.setCartItems([...currItems]);
      props.setTotalItem(currItems.length);
      subTotal = 0;
      currItems.forEach((element) => {
        subTotal = subTotal + element.price * element.quantity;
      });
      props.setTotalPrice(subTotal);
    } else {
      const currItems = JSON.parse(items).map((item) => {
        if (item.id === props.item.id) {
          item.quantity = item.quantity - 1;
          setCartItem(item);
        }
        return item;
      });
      localStorage.setItem("cartItems", JSON.stringify(currItems));
      props.setCartItems([...currItems]);
      subTotal = 0;
      currItems.forEach((element) => {
        subTotal = subTotal + element.price * element.quantity;
      });
      props.setTotalPrice(subTotal);
    }
  };
  const incrementItemHandle = () => {
    const currItems = JSON.parse(items).map((item) => {
      if (item.id === props.item.id) {
        item.quantity = item.quantity + 1;
        setCartItem(item);
      }
      return item;
    });
    subTotal = 0;
    currItems.forEach((element) => {
      subTotal = subTotal + element.price * element.quantity;
    });
    props.setTotalPrice(subTotal);
    localStorage.setItem("cartItems", JSON.stringify(currItems));
  };

  return (
    <div className="card mb-2" style={{ maxWidth: "540" }}>
      <div className="row no-gutters">
        <div className="col-2 col-sm-3 mt-2">
          <img
            src={props.item.img}
            className="card-img"
            alt="..."
            height="90rem"
          />
        </div>
        <div className="col-4">
          <div className="card-body">
            <p className={`card-text`}>{props.item.name}</p>
          </div>
        </div>
        <div className="col-3 mt-4">
          <ButtonGroup size="sm">
            <Button
              variant="secondary"
              type="button"
              onClick={decrementItemHandle}
            >
              -
            </Button>
            <span className="ms-1 me-1 mt-1">{cartItem.quantity}</span>
            <Button
              variant="success"
              type="button"
              onClick={incrementItemHandle}
            >
              +
            </Button>
          </ButtonGroup>
        </div>
        <div className="col-3 col-sm-2 mt-4">
          ${cartItem.quantity * cartItem.price}
        </div>
      </div>
    </div>
  );
};
export default Cart;
