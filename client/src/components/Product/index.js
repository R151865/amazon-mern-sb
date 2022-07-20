import ReactStars from "react-rating-stars-component";

import AppContext from "../../context/AppContext";

import "./index.css";

function Product({ eachProduct, onClickAddedCartButtonShowHidePopup }) {
  return (
    <AppContext.Consumer>
      {(value) => {
        const { addCartItem } = value;
        const { title, price, rating, itemImage, percentageOff } = eachProduct;

        const onClickAddToCartButton = () => {
          const quantity = 1;
          const product = { ...eachProduct, quantity: quantity };
          addCartItem(product);
          onClickAddedCartButtonShowHidePopup();
        };

        const getPercentageOffValue = () => {
          const onePercentageValue = price / (100 - percentageOff);
          const value = price + onePercentageValue * percentageOff;
          return parseInt(value);
        };

        return (
          <div className="product">
            <p className="product__title">{title}</p>
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
              classNames="product__stars"
              count={5}
              value={rating}
              size={20}
              activeColor="#ffd700"
            />
            <img alt="product" src={itemImage} />
            <button type="button" onClick={onClickAddToCartButton}>
              Add to cart
            </button>
          </div>
        );
      }}
    </AppContext.Consumer>
  );
}

export default Product;
