import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap/dist/js/bootstrap.bundle";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import axios from "axios";

const WaitManager = ({ order }) => {
  return (
    <>
      <Toaster position="top-center" richColors expand={true} />
      <div className="container"></div>
    </>
  );
};
const WaitSaleStaff = ({ order }) => {
  return (
    <>
      <div className="container">
        <div class="row mt-5">
          <h3>
            <b>Request Quotation</b>
          </h3>
          <div class="col px-3">
            <p>
              <b>Full Name</b>
            </p>
            <p class="px-3">{order.customer.name}</p>
            <p>
              <b>Description</b>
            </p>
            <p class="px-3">{order.description}</p>
            <p>
              <b>Budget</b>
            </p>
            <p class="px-3">{order.budget}</p>
          </div>
          <div class="col px-3">
            <div>
              <p>
                <b>Main Diamond Quality</b>
              </p>
              <div class="col-6 form-floating mb-2">
                <select class="form-select">
                  <option selected>Choose shape</option>
                  <option value="1">Round</option>
                  <option value="2">Princess</option>
                  <option value="3">Cushion</option>
                  <option value="4">Emerald</option>
                  <option value="5">Oval</option>
                  <option value="6">Radiant</option>
                  <option value="7">Asscher</option>
                  <option value="8">Marquise</option>
                  <option value="9">Heart</option>
                  <option value="10">Pear</option>
                </select>
                <label>Shape</label>
              </div>
              <div class="form-floating col-6 mb-2">
                <select class="form-select">
                  <option selected>Choose cut</option>
                  <option value="1">Excellent</option>
                  <option value="2">Very Good</option>
                  <option value="3">Good</option>
                  <option value="4">Fair</option>
                  <option value="5">Poor</option>
                </select>
                <label>Cut</label>
              </div>
              <div class="col-6 form-floating mb-2">
                <select class="form-select">
                  <option selected>Choose color</option>
                  <option value="1">K</option>
                  <option value="2">J</option>
                  <option value="3">I</option>
                  <option value="4">H</option>
                  <option value="5">G</option>
                  <option value="6">F</option>
                  <option value="7">E</option>
                  <option value="8">D</option>
                </select>
                <label>Color</label>
              </div>
              <div class="col-6 form-floating mb-2">
                <select class="form-select">
                  <option selected>Choose clarity</option>
                  <option value="1">SI2</option>
                  <option value="2">SI1</option>
                  <option value="3">VS2</option>
                  <option value="4">VS1</option>
                  <option value="5">VVS2</option>
                  <option value="6">VVS1</option>
                  <option value="7">IF</option>
                  <option value="8">FL</option>
                </select>
                <label>Clarity</label>
              </div>
              <div className="col-6 d-flex justify-content-between align-items-center">
                <p class="fw-semibold">Price</p>
                <p>tinh total cc gi day</p>
              </div>
              <button type="button" class="btn btn-secondary">
                Add
              </button>
            </div>
            <div>
              <p>
                <b>Material</b>
              </p>
              <div class="form-floating col-6 mb-2">
                <select class="form-select">
                  <option selected>Choose material</option>
                  <option value="1">14K Yellow Gold</option>
                  <option value="2">14K White Gold</option>
                  <option value="3">14K Rose Gold</option>
                  <option value="4">18K Yellow Gold</option>
                  <option value="5">Platinum</option>
                </select>
                <label>Material</label>
              </div>
              <div class="input-group col-6 mb-2">
                <textarea></textarea>
              </div>
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control col-6"
                  placeholder="Recipient's username"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const RequestDetailPage = () => {
  const orderId = useParams().orderId;

  const [order, setOrder] = useState(undefined);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/sales/order-select/${orderId}`)
      .then((response) => {
        setOrder(response.data);
      })
      .catch((error) => {
        if (error.response) {
          toast(error.response);
        }
        toast("Something went wrong...");
      });
  }, []);

  if (order === undefined) {
    return <h1>Loading...</h1>;
  } else {
    switch (order.status) {
      case "wait_sale_staff":
        return <WaitSaleStaff order={order} />;
        break;
      case "wait_manager":
        return <WaitManager order={order} />;
      case "manager_approved":
        break;
      case "wait_customer":
        break;
      case "customer_accept":
        break;
      case "designing":
        break;
      case "pending_design":
        break;
      case "production":
        break;
      case "delivered":
        break;
      case "completed":
        break;
      default:
    }
  }
};

export default RequestDetailPage;
