import TransactionItem from "../TransactionItem";
import Axios from "../../axios";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import FailureView from "../FailureView";
import ReactLoader from "../ReactLoader";

import "./index.css";

const apiStatusConsts = {
  failure: "FAILURE",
  success: "SUCCESS",
  loading: "LOADING",
  initial: "INITIAL",
};

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConsts.initial);

  const fetchTransactionAPI = () => {
    setApiStatus(apiStatusConsts.loading);
    const jwtToken = Cookies.get("jwtToken");
    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    Axios.get("/transactions", config)
      .then((response) => {
        const convertedTransactions = response.data.map((each) => ({
          address: each.address,
          amount: each.amount,
          orderIds: each.order_ids,
          phoneNumber: each.phone_number,
          transactionDate: each.transaction_date,
          transactionImageUrl: each.transaction_image_url,
          transactionStatus: each.transaction_status,
          userId: each.user_id,
          transactionId: each._id,
        }));

        convertedTransactions.reverse();
        setTransactions(convertedTransactions);
        setApiStatus(apiStatusConsts.success);
      })
      .catch((err) => {
        setApiStatus(apiStatusConsts.failure);
        console.log(`Error at Transactions ${err}`);
      });
  };

  useEffect(() => {
    fetchTransactionAPI();
  }, []);

  const transactionSuccessView = () => {
    return transactions.map((each) => (
      <TransactionItem key={each.transactionId} transactionData={each} />
    ));
  };

  const renderViewsBasedOnApiStatus = () => {
    switch (apiStatus) {
      case apiStatusConsts.failure:
        return <FailureView retryAgain={fetchTransactionAPI} />;
      case apiStatusConsts.success:
        return transactionSuccessView();
      case apiStatusConsts.loading:
        return <ReactLoader />;
      default:
        return null;
    }
  };

  return (
    <div className="transaction">
      <h1>Your Transactions</h1>

      {renderViewsBasedOnApiStatus()}
    </div>
  );
}

export default Transactions;
