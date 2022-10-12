import { useState } from "react";
import Button from "react-bootstrap/Button";
import { ButtonGroup } from "react-bootstrap";

const Cart = (props) => {
  const [cartItem, setCartItem] = useState({ ...props.item });
  const userDetails = JSON.parse(JSON.stringify(localStorage.getItem('loggedUser')));
  const userId = JSON.parse(userDetails).id;
  const _items = JSON.parse(
    JSON.stringify(localStorage.getItem("cartItems"))
  );
  const items = JSON.parse(_items)[`${userId}`];
  const decrementItemHandle = () => {
    const _myItems = JSON.parse(
      JSON.stringify(localStorage.getItem("cartItems"))
    );
    const currItems = JSON.parse(_myItems)[`${userId}`].map((item) => {
      if (item.id === props.item.id) {
        item.quantity = item.quantity - 1;
        setCartItem(item);
      }
      return item;
    });
    const index = currItems.findIndex(item => item.quantity === 0);
    if (index > -1) {
      currItems.splice(index, 1);
    }
    const setDetails = {...JSON.parse(_items), [`${userId}`]: [...currItems]};
    localStorage.setItem('cartItems', JSON.stringify(setDetails));
    props.setCartItems([...currItems]);
    props.setTotalItem();
  };
  const incrementItemHandle = () => {
    const _myItems = JSON.parse(
      JSON.stringify(localStorage.getItem("cartItems"))
    );
    const currItems = JSON.parse(_myItems)[`${userId}`].map((item) => {
      if (item.id === props.item.id) {
        item.quantity = item.quantity + 1;
        setCartItem(item);
      }
      return item;
    });
    const setDetails = {...JSON.parse(_items), [`${userId}`]: [...currItems]};
    localStorage.setItem('cartItems', JSON.stringify(setDetails));
    props.setCartItems([...currItems]);
    props.setTotalItem();
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
