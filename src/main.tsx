import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "./main.css";
import store from "./store";

const elem = document.querySelector("#root")!;

const root = ReactDOM.createRoot(elem);
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
