import CartItem from "../CartItem";
import SubTotalCart from "../SubTotalCart";

import AppContext from "../../context/AppContext";
import { Link } from "react-router-dom";

import "./index.css";

function Cart() {
  return (
    <AppContext.Consumer>
      {(value) => {
        const { cartList } = value;

        return (
          <div className="cart">
            <div className="cart__HeaderAndSubTotal">
              <div className="cart__header">
                <h3>Your amazon cart is here</h3>
                <p>
                  Check your save for later items below or{" "}
                  <span>
                    <Link to="/" className="link-item">
                      continue shopping
                    </Link>
                  </span>
                </p>
              </div>
              <SubTotalCart />
            </div>

            <div className="cart__itemList">
              {cartList.map((each) => (
                <CartItem key={each.id} eachCartItemData={each} />
              ))}
            </div>
          </div>
        );
      }}
    </AppContext.Consumer>
  );
}

export default Cart;
