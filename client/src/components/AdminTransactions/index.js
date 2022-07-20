import AdminTransactionItem from "../AdminTransactionItem";
import Axios from "../../axios";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "./index.css";

function AdminTransactions() {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactionAPI = () => {
    const jwtToken = Cookies.get("jwtToken");
    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    Axios.get("/admin-transactions", config)
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
      })
      .then((err) => {
        console.log(`Error at Transactions ${err}`);
      });
  };

  useEffect(() => {
    fetchTransactionAPI();
  });

  return (
    <div className="transaction">
      <h1>Users Transactions</h1>

      {transactions.map((each) => (
        <AdminTransactionItem key={each.transactionId} transactionData={each} />
      ))}
    </div>
  );
}

export default AdminTransactions;
