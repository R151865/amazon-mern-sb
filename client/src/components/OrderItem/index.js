import ReactStars from "react-rating-stars-component";
import "./index.css";

function OrderItem({ orderData }) {
  const { title, price, rating, imageUrl, quantity, isDelivered } = orderData;

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
          {isDelivered ? (
            <p className="delivered">DELIVERED</p>
          ) : (
            <p className="yet_to_deliver">YET TO DELIVER</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderItem;
