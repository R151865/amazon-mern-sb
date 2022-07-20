import OrderItem from "../OrderItem";
import { useEffect, useState } from "react";
import Axios from "../../axios";
import Cookies from "js-cookie";
import ReactLoader from "../ReactLoader";
import FailureView from "../FailureView";

import "./index.css";

const apiStatusConsts = {
  failure: "FAILURE",
  success: "SUCCESS",
  loading: "LOADING",
  initial: "INITIAL",
};

function Orders() {
  const [orders, setOrders] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConsts.initial);

  const fetchOrders = async () => {
    setApiStatus(apiStatusConsts.loading);
    const jwtToken = Cookies.get("jwtToken");
    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    Axios.get("/orders", config)
      .then((response) => {
        console.log(response);
        const convertedOrderData = response.data.map((each) => ({
          orderId: each.order_id,
          timestamp: each.timestamp,
          quantity: each.quantity,
          isDelivered: each.is_delivered,
          productId: each.product_id,
          userId: each.user_id,
          title: each.title,
          price: each.price,
          rating: each.rating,
          imageUrl: each.image_url,
          percentageOff: each.percentage_off,
        }));
        setOrders(convertedOrderData);
        setApiStatus(apiStatusConsts.success);
      })
      .catch((err) => {
        setApiStatus(apiStatusConsts.failure);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getOrdersDividedByDateList = () => {
    const ordersWithDateList = {};

    orders.map((each) => {
      if (ordersWithDateList[each.timestamp] === undefined) {
        ordersWithDateList[each.timestamp] = [each];
      } else {
        const previousOrders = ordersWithDateList[each.timestamp];
        ordersWithDateList[each.timestamp] = [...previousOrders, each];
      }
      return each;
    });

    const convertedOrderList = Object.entries(ordersWithDateList).map(
      ([key, value]) => [key, value]
    );
    convertedOrderList.reverse();
    return convertedOrderList;
  };

  const getOrdersSection = (orderWithDate) => {
    const date = orderWithDate[0];
    const ordersList = orderWithDate[1];

    return (
      <div className="orders__Container">
        <p>
          <strong>Orders</strong>
          <br />
          <small>{date}</small>
        </p>
        {ordersList.map((each) => (
          <OrderItem key={each.order_id} orderData={each} />
        ))}
      </div>
    );
  };

  const getOrdersListSection = () => {
    const dateWiseOrders = getOrdersDividedByDateList();
    return dateWiseOrders.map((each) => getOrdersSection(each));
  };

  const renderViewsBasedOnApiStatus = () => {
    switch (apiStatus) {
      case apiStatusConsts.failure:
        return <FailureView retryAgain={fetchOrders} />;
      case apiStatusConsts.success:
        return getOrdersListSection();
      case apiStatusConsts.loading:
        return <ReactLoader />;
      default:
        return null;
    }
  };

  return (
    <div className="orders">
      <div className="orders__body">
        <h3>Your Orders</h3>

        {renderViewsBasedOnApiStatus()}
      </div>
    </div>
  );
}

export default Orders;
