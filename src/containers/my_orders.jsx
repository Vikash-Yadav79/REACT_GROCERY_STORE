import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import "./myOrders.css";

export const My_Orders = () => {
  const [myItems, setMyItems] = useState([]);
  const [userId, setUserId] = useState(NaN);

  useEffect(() => {
    const userDetails = JSON.parse(
      JSON.stringify(localStorage.getItem("loggedUser"))
    );
    const userId = JSON.parse(userDetails).id;
    setUserId(userId);
    const myOrderDetails = JSON.parse(
      JSON.stringify(localStorage.getItem("myOrders"))
    );
    const items = JSON.parse(myOrderDetails);
    setMyItems([...items[`${userId}`]]);
  }, []);

  const cancelOrder = (item) => {
    const _myItems = [...myItems];
    const index = _myItems.findIndex(
      (_item) => _item.id === item.id && _item.type === item.type
    );
    console.log(index);
    if (index > -1) {
      _myItems.splice(index, 1);
    }
    const myOrderDetails = JSON.parse(
      JSON.stringify(localStorage.getItem("myOrders"))
    );
    const _myOrder = JSON.parse(myOrderDetails);
    const setOrderDetails = { ..._myOrder, [`${userId}`]: _myItems };
    localStorage.setItem("myOrders", JSON.stringify(setOrderDetails));
    setMyItems([..._myItems]);
  };

  return (
    <div className="my-orders">
      {myItems.length ? (
        myItems.map((item, index) => {
          return (
            <Card
              key={index}
              style={{
                width: "18rem",
                height: "45vh",
                marginLeft: "40px",
                marginTop: "20px",
              }}
            >
              <Card.Img
                style={{ height: "8rem" }}
                variant="top"
                src={item.img}
              />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {item.type}
                </Card.Subtitle>
                <Card.Text className="text-truncate">
                  {item.description}
                </Card.Text>
                <button
                  className="btn btn-danger"
                  onClick={() => cancelOrder(item)}
                >
                  Cancel Order
                </button>
              </Card.Body>
            </Card>
          );
        })
      ) : (
        <h1>No Orders</h1>
      )}
    </div>
  );
};
