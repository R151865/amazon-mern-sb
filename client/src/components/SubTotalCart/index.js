import "./index.css";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";

function SubTotalCart() {
  const navigate = useNavigate();
  return (
    <AppContext.Consumer>
      {(value) => {
        const { cartList } = value;

        const getTotalPrice = () => {
          return cartList.reduce(
            (prv, curr) => prv + curr.price * curr.quantity,
            0
          );
        };

        const onClickCheckoutButton = () => {
          navigate("/payments");
        };

        return (
          <div className="sub_total_cart">
            <p>
              Subtotal ({cartList.length} items):
              <strong>
                <small> &#8377; </small>
                {getTotalPrice()}
              </strong>
            </p>
            <div>
              <input id="giftCheckBox" type="checkbox" />
              <label htmlFor="giftCheckBox">This order contains a Gift</label>
            </div>
            <button type="button" onClick={onClickCheckoutButton}>
              Checkout items
            </button>
          </div>
        );
      }}
    </AppContext.Consumer>
  );
}

export default SubTotalCart;
