import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap/dist/js/bootstrap.bundle";
import Sidebar from "../components/Sidebar";
import NavigationBar from "../components/NavigationBar";

const RequestQuotationPage = () => {
  return (
    <>
      <NavigationBar />
      <div className="container">
        <div className="row">
          <h2 class="mb-4">
            <b>Request Quotation</b>
          </h2>
          <div className="col px-4">
            <div>
              <label class="mb-3">
                <b>Full Name</b>
              </label>
              <p class='px-2'>Jane Smith</p>
            </div>
            <div>
              <label class="mb-3">
                <b>Email address</b>
              </label>
              <p class='px-2'>email@janesfakedomain.net</p>
            </div>
            <div>
              <label class="mb-3">
                <b>Phone Number</b>
              </label>
              <p class='px-2'>(415) 555-0132</p>
            </div>
            <div>
              <label class="mb-3">
                <b>Description</b>
              </label>
              <p class='px-2'>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularized in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
            </div>
            <div>
              <label class="mb-3">
                <b>Budget</b>
              </label>
              <p class='px-2'>150000$-500000$</p>
            </div>
          </div>
          <div className="col px-4">
            <p>
              <b>Main Diamond Quality</b>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default RequestQuotationPage;
