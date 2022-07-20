import { TailSpin } from "react-loader-spinner";
import "./index.css";

function ReactLoader() {
  return (
    <div className="loading-styling">
      <TailSpin color="green" height={50} width={50} />
    </div>
  );
}

// color="#00BFFF"
export default ReactLoader;
