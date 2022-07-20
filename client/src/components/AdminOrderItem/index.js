import ReactStars from "react-rating-stars-component";
import "./index.css";
import Axios from "../../axios";
import Cookies from "js-cookie";

function AdminOrderItem({ productData }) {
  const { title, price, rating, imageUrl, percentageOff, id } = productData;

  const getPercentageOffValue = () => {
    const onePercentageValue = price / (100 - percentageOff);
    const value = price + onePercentageValue * percentageOff;
    return parseInt(value);
  };

  const onClickDeleteButton = async () => {
    const jwtToken = Cookies.get("jwtToken");
    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    Axios.delete(`/products/${id}`, config);
  };

  return (
    <div className="cart_item">
      <img alt="cart item" src={imageUrl} />
      <div className="cart_item__info">
        <h3>{title}</h3>

        <p className="product__price">
          <small>&#8377;</small>
          <strong>{price}</strong>
          <span className="percentage_MRP">
            M.R.P: Rs{" "}
            <span className="percentage_off_value">
              {getPercentageOffValue()}.00
            </span>
          </span>

          <span className="percentage_off">{percentageOff}% off</span>
        </p>

        <ReactStars
          classNames="cart_item__stars"
          count={5}
          value={rating}
          size={20}
          activeColor="#ffd700"
        />

        <div className="admin_orders_updatesButton">
          <button
            onClick={onClickDeleteButton}
            className="order_deleteBtn"
            type="button"
          >
            DELETE
          </button>
          <button disabled={true} className="order_updateBtn" type="button">
            UPDATE
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminOrderItem;
