import "./index.css";
import AdminOrders from "../AdminOrders";
import AdminOrd from "../AdminOrd";
import AdminTransactions from "../AdminTransactions";
import { useState } from "react";

function AdminHome() {
  const [activeTab, setActiveTab] = useState("PRODUCTS");

  const getTabContentBasedOnActiveTab = () => {
    switch (activeTab) {
      case "PRODUCTS":
        return <AdminOrders />;

      case "ORDERS":
        return <AdminOrd />;

      case "TRANSACTIONS":
        return <AdminTransactions />;

      default:
        return null;
    }
  };

  return (
    <div className="admin">
      <h1 className="admin__head">Welcome to Admin Page</h1>
      <div className="admin__header">
        <p
          className="admin__headerOption"
          onClick={() => setActiveTab("PRODUCTS")}
        >
          Products
        </p>
        <p
          className="admin__headerOption"
          onClick={() => setActiveTab("ORDERS")}
        >
          Orders
        </p>
        <p
          className="admin__headerOption"
          onClick={() => setActiveTab("TRANSACTIONS")}
        >
          Transactions
        </p>
        <p className="admin__headerOption">Users</p>
      </div>
      {getTabContentBasedOnActiveTab()}
    </div>
  );
}

export default AdminHome;
