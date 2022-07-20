import ReactStars from "react-rating-stars-component";
import AppContext from "../../context/AppContext";

import "./index.css";

function CartItem({ eachCartItemData }) {
  return (
    <AppContext.Consumer>
      {(value) => {
        const { removeCartItem, updateCartItem } = value;
        const { title, price, rating, itemImage, id, quantity, percentageOff } =
          eachCartItemData;

        const onClickRemoveButton = () => {
          removeCartItem(id);
        };

        const handleIncreaseQuanity = () => {
          const cartProduct = { ...eachCartItemData, quantity: quantity + 1 };
          updateCartItem(cartProduct);
        };

        const handleDecreaseQuanity = () => {
          if (quantity > 1) {
            const cartProduct = { ...eachCartItemData, quantity: quantity - 1 };
            updateCartItem(cartProduct);
          }
        };

        const getPercentageOffValue = () => {
          const onePercentageValue = price / (100 - percentageOff);
          const value = price + onePercentageValue * percentageOff;
          return parseInt(value);
        };

        return (
          <div className="cart_item">
            <img alt="cart item" src={itemImage} />
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

              <div className="cart_item__quantity">
                <button onClick={handleDecreaseQuanity}> - </button>
                <p> {quantity} </p>
                <button onClick={handleIncreaseQuanity}> + </button>
              </div>

              <button type="button" onClick={onClickRemoveButton}>
                Remove
              </button>
            </div>
          </div>
        );
      }}
    </AppContext.Consumer>
  );
}

export default CartItem;
