import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import store from "./redux/store";
import { NotificationProvider } from "./components/NotificationProvider";
import GlobalNotification from "./components/GlobalNotification";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <NotificationProvider>
      <BrowserRouter>
        <GlobalNotification />
        <App />
      </BrowserRouter>
    </NotificationProvider>
  </Provider>
);
