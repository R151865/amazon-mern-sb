import { AiOutlineClose } from "react-icons/ai";

import CartItem from "../CartItem";
import DeliverAddress from "../DeliverAddress";
import Popup from "reactjs-popup";
import { useSpring, animated } from "react-spring";

import "./index.css";
import AppContext from "../../context/AppContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../../axios";
import Cookies from "js-cookie";

function Payments() {
  const navigate = useNavigate();

  const [openPoup, setOpenPoup] = useState(false);
  const [purchaseAmoutErr, setPurchaseErrorAmout] = useState("");
  const [openAnimated, setOpenAnimated] = useState(false);
  const [transDetails, setTransDetails] = useState();

  const contentProps = useSpring({
    marginTop: openAnimated ? 0 : -500,
  });

  return (
    <AppContext.Consumer>
      {(value) => {
        const { cartList, clearAllCartItems } = value;

        const getTransactionDetails = (details) => {
          setTransDetails(details);
        };

        const placeOrdersOfUserAPI = async () => {
          const productsData = cartList.map((each) => ({
            product_id: each.id,
            quantity: each.quantity,
          }));

          const orderDetailsBackend = {
            productsData,
            amount: getTotalPrice(),
            phoneNumber: transDetails.phoneNumber,
            address: transDetails.address,
            transactionImageUrl: transDetails.transactionImageUrl,
          };

          const jwtToken = Cookies.get("jwtToken");
          const config = {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          };
          await Axios.post("/orders", orderDetailsBackend, config)
            .then()
            .catch((err) => console.log(`Posting Orders Error: ${err}`));

          clearAllCartItems();
        };

        const onClickCloseAnimatedWindwow = () => {
          setOpenAnimated(false);
          navigate("/orders");
        };

        const getAnimatedSuccessPurchase = () => {
          return (
            openAnimated && (
              <animated.div
                style={contentProps}
                className="animated-success-purchase"
              >
                <button type="button" onClick={onClickCloseAnimatedWindwow}>
                  <AiOutlineClose size={25} />
                </button>
                <img
                  alt="payment"
                  src="https://img.freepik.com/free-vector/successful-purchase-concept-illustration_114360-1003.jpg?w=2000"
                />

                <p>
                  Thanking you <br /> from dev@sbch team Amazon
                </p>
              </animated.div>
            )
          );
        };

        const onClickByNowButton = () => {
          setOpenPoup(true);
        };

        const onClickPurchaseButton = () => {
          if (getTotalPrice() <= 0) {
            setPurchaseErrorAmout("*Mininum Amount Required to purchase");
          } else if (transDetails == undefined) {
            setPurchaseErrorAmout("*Adress and screenshot required");
          } else {
            setOpenAnimated(true);
            setOpenPoup(false);
            placeOrdersOfUserAPI();
          }
        };

        const getPoup = () => {
          return (
            openPoup && (
              <Popup
                onClose={() => setOpenPoup(false)}
                modal
                className="popup-content"
                open={openPoup}
              >
                <div className="popup-styling">
                  <p className="popup-styling-para">
                    Your total price <strong>Rs: {getTotalPrice()}</strong>
                  </p>
                  <p className="popup-styling-para">
                    Card no: <strong> xxxx xxxx xxxx xxxx </strong>
                  </p>

                  <p className="popup-styling-delivery-address">
                    <strong>Delivery to: </strong>
                    {transDetails !== undefined
                      ? transDetails.address
                      : "Address needed"}
                  </p>

                  <p>Procced to purchase checkout ({cartList.length}) items</p>

                  {purchaseAmoutErr.length > 0 ? (
                    <p className="purchase_err">{purchaseAmoutErr}</p>
                  ) : null}

                  <div>
                    <button onClick={onClickPurchaseButton}>Purchase</button>
                    <button
                      onClick={() => setOpenPoup(false)}
                      className="cancel-buttton"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </Popup>
            )
          );
        };

        const getTotalPrice = () => {
          return cartList.reduce(
            (prv, curr) => prv + curr.price * curr.quantity,
            0
          );
        };

        return (
          <div className="payments">
            {getPoup()}
            {getAnimatedSuccessPurchase()}
            <p className="checkout_count">
              Checkout (<span>{cartList.length} items</span>)
            </p>
            <div className="payments__section">
              <h3> Delivery Address</h3>
              <div className="payments__sectionRight">
                <DeliverAddress getTransactionDetails={getTransactionDetails} />
              </div>
            </div>

            <div className="payments__section">
              <h3> Payment method</h3>
              <div className="payments__sectionRight">
                <div className="card_details">
                  <h3>Card Details</h3>
                  <p>
                    Card no: <strong> xxxx xxxx xxxx xxxx </strong>
                  </p>
                  <p className="note-for-transaction">
                    Phone pay, Google pay, Paytm , Others cards accepted{" "}
                  </p>
                </div>
                <div className="buy_now_container">
                  <p>Order Total: Rs {getTotalPrice()}</p>
                  <button type="button" onClick={onClickByNowButton}>
                    Buy now
                  </button>
                </div>
              </div>
            </div>

            <div className="payments__section">
              <h3> Review items and delivery</h3>
              <div className="payments__sectionRight">
                {cartList.map((each) => (
                  <CartItem key={each.id} eachCartItemData={each} />
                ))}
              </div>
            </div>
          </div>
        );
      }}
    </AppContext.Consumer>
  );
}

export default Payments;
