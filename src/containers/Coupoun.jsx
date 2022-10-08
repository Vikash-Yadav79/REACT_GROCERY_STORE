import { Modal } from "react-bootstrap";
import React from "react";

export const CoupounModal = (props) => {
  const [coupoun, setCoupoun] = React.useState("");
  const coupounsList = [
    {
      imageURL:
        "https://m.economictimes.com/thumb/msid-75342060,width-1200,height-900,resizemode-4,imgsize-119770/axis-bank-agencies.jpg",
      name: "Axis credit card",
      discount: "5%",
      description: "Instant 5% Discount on axis credit card",
      value: 5,
    },
    {
      imageURL:
        "https://skpet.in/wp-content/uploads/2021/10/hdfcbank-1586426671.jpeg",
      name: "HDFC credit card",
      discount: "10%",
      description: "Instant 5% Discount on HDFC credit card",
      value: 10,
    },
    {
      imageURL: "http://cetking.com/wp-content/uploads/2016/08/images-3.jpg",
      name: "SBI Debit card or credit card",
      discount: "12%",
      description: "Instant 12% Discount on SBI debit or credit card",
      value: 12,
    },
  ];

  React.useEffect(() => {
    const value = JSON.parse(
      JSON.stringify(localStorage.getItem("Coupoun") || "")
    );
    setCoupoun(Number(value));
  }, []);

  return (
    <>
      <Modal show={props.show} size="md" onHide={() => props.onClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Add Coupoun</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {coupounsList.map((list) => {
            return (
              <div className="row d-flex align-items-center">
                <div class="col-xl-2 form-check ms-3">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    checked={list.value === coupoun}
                    onChange={() => {
                      setCoupoun(list.value);
                      localStorage.setItem("Coupoun", list.value);
                    }}
                  />
                </div>
                <div className="col-xl-9 card mb-3">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={list.imageURL}
                        className="img-fluid rounded-start"
                        alt={list.name}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{list.name}</h5>
                        <p className="card-text">{list.description}</p>
                        <p className="card-text">
                          <small className="text-muted">{list.discount}</small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Modal.Body>
      </Modal>
    </>
  );
};
