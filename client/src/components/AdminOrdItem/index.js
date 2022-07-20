import ReactStars from "react-rating-stars-component";
import Axios from "../../axios";
import "./index.css";
import Cookies from "js-cookie";

function AdminOrdItem({ orderData }) {
  const {
    title,
    price,
    rating,
    imageUrl,
    quantity,
    isDelivered,
    name,
    email,
    orderId,
  } = orderData;

  const updateOrderDeliveryStatusApi = async (isDelivered) => {
    const jwtToken = Cookies.get("jwtToken");
    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    await Axios.put(`admin-orders/${orderId}`, { isDelivered }, config)
      .then()
      .catch((err) => console.log(`Admin delivery status update : ${err}`));
  };

  const onClickDeliveryStatus = () => {
    updateOrderDeliveryStatusApi(false);
  };

  const onClickYetToDeliverStatus = () => {
    updateOrderDeliveryStatusApi(true);
  };

  return (
    <div className="order_item">
      <img alt="order item" src={imageUrl} />
      <div className="order_item__info">
        <h3>{title}</h3>
        <p>
          <small>&#8377;</small>
          <strong>{price}</strong>
        </p>
        <ReactStars
          classNames="order_item__stars"
          count={5}
          value={rating}
          size={20}
          activeColor="#ffd700"
        />

        <div className="deliver_status">
          <p className="qauntity">
            quantity: <strong>{quantity}</strong>
          </p>
        </div>

        <div className="deliver_status">
          <p className="qauntity">Update delivery status:</p>
          {isDelivered ? (
            <p onClick={onClickDeliveryStatus} className="delivered">
              DELIVERED
            </p>
          ) : (
            <p onClick={onClickYetToDeliverStatus} className="yet_to_deliver">
              YET TO DELIVER
            </p>
          )}
        </div>
        <div className="order_user_details">
          <p>{name}</p>
          <p>{email}</p>
        </div>
      </div>
    </div>
  );
}

export default AdminOrdItem;
