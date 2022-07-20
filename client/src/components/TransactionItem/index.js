import "./index.css";

function TransactionItem({ transactionData }) {
  const {
    address,
    amount,
    phoneNumber,
    transactionDate,
    transactionImageUrl,
    transactionStatus,
  } = transactionData;

  const getTransactionStatus = () => {
    switch (transactionStatus) {
      case "DONE":
        return <p className="trans_state__done">DONE</p>;

      case "PENDING":
        return <p className="trans_state__pending">PENDING</p>;
      case "REJECTED":
        return <p className="trans_state__reject ">REJECTED</p>;
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

        {getTransactionStatus()}
        <p>{address} </p>
        <p>{phoneNumber}</p>
      </div>
    </div>
  );
}

export default TransactionItem;
