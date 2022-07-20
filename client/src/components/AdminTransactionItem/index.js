import { useState, useEffect } from "react";
import Axios from "../../axios";
import Cookies from "js-cookie";

import "./index.css";

function AdminTransactionItem({ transactionData }) {
  const [status, setStatus] = useState("PENDING");

  const {
    transactionId,
    address,
    amount,
    phoneNumber,
    transactionDate,
    transactionImageUrl,
    transactionStatus,
  } = transactionData;

  useEffect(() => {
    setStatus(transactionStatus);
  });

  const changeTransactionStatusAPI = (status) => {
    const jwtToken = Cookies.get("jwtToken");
    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    Axios.put(
      `/admin-transactions/${transactionId}?status=${status}`,
      {},
      config
    )
      .then()
      .catch((err) => console.log(`transaction status update err: ${err}`));
  };

  const onChangeStatus = (e) => {
    changeTransactionStatusAPI(e.target.value);
  };

  const getStatusSelect = () => {
    return (
      <select
        value={status}
        onChange={onChangeStatus}
        className={getTransactionStatus()}
      >
        <option className="selection_option" value="PENDING">
          PENDING
        </option>
        <option className="selection_option" value="DONE">
          DONE
        </option>
        <option className="selection_option" value="REJECTED">
          REJECTED
        </option>
      </select>
    );
  };

  const getTransactionStatus = () => {
    switch (transactionStatus) {
      case "DONE":
        return "trans__done";

      case "PENDING":
        return "trans__pending";
      case "REJECTED":
        return "trans__rejected";
      default:
        return null;
    }
  };

  return (
    <div className="transaction_item">
      <img alt="transaction" src={transactionImageUrl} />
      <div className="transaction_item__info">
        <p>{transactionDate} </p>
        <p>
          Rs <strong>{amount}</strong>
        </p>
        {getStatusSelect()}
        <p>{address} </p>
        <p>{phoneNumber}</p>
      </div>
    </div>
  );
}

export default AdminTransactionItem;
