import { useNavigate } from "react-router-dom";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap/dist/js/bootstrap.bundle";

const ManagerApproved = ({ order }) => {
  const navigate = useNavigate;
  const forwardQuota = () => {};

  return (
    <>
      <div className="container-fluid">
        <div className="row mt-5">
          <div className="mb-3">
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
          </div>
          <div className="col-md-8 px-3">
            <p>
              <b>Diamond</b>
            </p>
            <p className="px-3">{order.product.diamonds.diamondId}</p>
            <p>
              <b>Description</b>
            </p>
            <p className="px-3">{order.description}</p>
            <p>
              <b>Budget</b>
            </p>
            <p className="px-3">{order.budget}</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default ManagerApproved;
