import ReactDOM from "react-dom/client";
import App from "./App";
import "./main.css";

const elem = document.querySelector("#root")!;

const root = ReactDOM.createRoot(elem);
root.render(<App />);
