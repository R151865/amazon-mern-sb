import "./index.css";

function FailureView({ retryAgain }) {
  return (
    <div className="failure-view">
      <img
        alt="failure view"
        src="https://thumbs.dreamstime.com/b/no-internet-connection-slow-network-connection-slow-internet-slow-loading-internet-slow-internet-connection-illustration-concept-197027496.jpg"
      />
      <h1>Oops check your connection </h1>
      <p>check internet connection or server running time out or retry again</p>
      <button type="button" onClick={() => retryAgain()}>
        Try again
      </button>
    </div>
  );
}

export default FailureView;
