import React, { useState } from "react";
import stores from "../utils/Products";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ItemList from "./Items/itemList";

function Home(props) {
  const { amazon, filpkart, myntra } = stores;
  const [data, setData] = useState([...amazon, ...filpkart, ...myntra]);
  const [storeName, setStoreName] = useState("AllStore");
  const [itemsLength, setItemsLength] = useState(0);
  const [activeStore, setActiveStore] = useState("all");
  return (
    <>
      
      <div className="d-flex">
        <Dropdown>
          <Dropdown.Toggle
            id="dropdown-button-dark-example1"
            variant="secondary"
          >
            {storeName}
          </Dropdown.Toggle>

          <Dropdown.Menu variant="dark">
            <Dropdown.Item
              onClick={() => {
                return (
                  setData([...amazon, ...filpkart, ...myntra]),
                  setStoreName("AllStore")
                );
              }}
            >
              All Store Item
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                return setData([...filpkart]), setStoreName("Flipkart");
              }}
            >
              Flipkart
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                return setData([...amazon]), setStoreName("Amazon");
              }}
            >
              Amazon
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                return setData([...myntra]), setStoreName("Myntra");
              }}
            >
              Myntra
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <ItemList
        data={data}
        setTotalItem= {props.setTotalItem}
        // addToCart={() => {
        //   const items = JSON.parse(localStorage.getItem("ADD_TO_CART") || "");
        //   setItemsLength(items.length);
        // }}
      />
    </>
  );
}

export default Home;
