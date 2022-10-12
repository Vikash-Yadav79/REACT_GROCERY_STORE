import React from "react";
import Item from "./item";

function itemList(props) {
  return (
    <div className="d-flex flex-row flex-wrap justify-content-center mt-3">
      {props.data?.map((elem) => {
        return (
          <div key={elem.id}>
            <Item item={elem} setTotalItem={() => props.setTotalItem()} />
          </div>
        );
      })}
    </div>
  );
}

export default itemList;
