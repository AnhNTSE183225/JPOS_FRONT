import { useNavigate } from "react-router-dom";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../node_modules/bootstrap/dist/js/bootstrap.bundle';
import { formatDate, formatPrice } from '../../helper_function/ConvertFunction'
import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';
import axios from 'axios';


const ManagerApproved = ({ order }) => {

  const navigate = useNavigate();

  const forwardQuotation = () => {
    let staff_id = sessionStorage.getItem('staff_id');
    if (staff_id !== null) {
      axios.post(`http://localhost:8080/api/${order.id}/forward-quotation`)
        .then(
          response => {
            console.log(response.data);
            navigate('/profile/request');
          }
        ).catch(
          error => {
            console.log(error);
          }
        )
    } else {
      toast.info('Logged out');
      navigate('/login');
    }
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="mb-2">
            <h3>
              <b>Forward Quotation</b>
            </h3>
          </div>
          <div className="col-md-4 px-3">
            <p>
              <b>Full Name</b>
            </p>
            <p className="px-3">{order.customer.name}</p>
            <p>
              <b>Description</b>
            </p>
            <p className="px-3">{order.description}</p>
            <p>
              <b>Budget</b>
            </p>
            <p className="px-3">{order.budget}</p>
            <p>
              <b>Reference image</b>
            </p>
            <img crossOrigin="anonymous" src={order.designFile} className="img-fluid" alt="" />
          </div>
          <div className="col-md-6 px-2">
            <div className='row'>
              <p><b>Product ID: </b> <b>{order.product.productId}</b></p>
              <p>
                <b>
                  Chosen diamonds
                </b>
              </p>
              <div className='col'>
                <table className='table table-hover text-center'>
                  <thead>
                    <tr>
                      <th>Num</th>
                      <th>ID</th>
                      <th>Code</th>
                      <th>Cut</th>
                      <th>Color</th>
                      <th>Clarity</th>
                      <th>Carat Weight</th>

                    </tr>
                  </thead>
                  <tbody className='table-group-divider'>
                    {order.product.diamonds.map((diamond, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{diamond.diamondId}</td>
                        <td>{diamond.diamondCode}</td>
                        <td>{diamond.cut}</td>
                        <td>{diamond.color}</td>
                        <td>{diamond.clarity}</td>
                        <td>{diamond.caratWeight}</td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <p className="fw-semibold">Diamond price: {formatPrice(order.qdiamondPrice + order.ediamondPrice)}</p>
              </div>

              <div className='col'>
                <table className='table table-hover'>
                  <thead>
                    <tr>
                      <th>Num</th>
                      <th>ID</th>
                      <th>Material Name</th>
                      <th>Weight</th>
                    </tr>
                  </thead>
                  <tbody className='table-group-divider'>
                    {order.product.materials.map(
                      (material, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{material.material.materialId}</td>
                          <td>{material.material.materialName}</td>
                          <td>{material.weight}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <p className="fw-semibold">Material price: {formatPrice(order.qmaterialPrice + order.ematerialPrice)}</p>
              </div>

              <div>
                <p className="fw-semibold">Extra diamond: {formatPrice(order.ediamondPrice)}</p>
                <p className="fw-semibold">Extra material: {formatPrice(order.ematerialPrice)}</p>
              </div>
              <div>
                <p className="fw-semibold">Production: {formatPrice(order.productionPrice + ((order.qdiamondPrice + order.ediamondPrice + order.qmaterialPrice + order.ematerialPrice + order.ediamondPrice + order.ematerialPrice) * order.markupRate) - (order.qdiamondPrice + order.ediamondPrice + order.qmaterialPrice + order.ematerialPrice + order.ediamondPrice + order.ematerialPrice))}</p>
              </div>
              <hr />
              <div>
                <p><b>Total Price: {formatPrice(order.totalAmount)}</b></p>
              </div>
              <div className='col'>
                <button onClick={forwardQuotation} className='btn btn-success w-100'>Forward to {order.customer.name}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ManagerApproved;
