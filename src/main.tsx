import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./fonts.css";
import App from "./App";
import { NextUIProvider } from "@nextui-org/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    <div className="scroll-smooth">
      <NextUIProvider>
        <App />
      </NextUIProvider>
    </div>

    {/* </Provider> */}
  </React.StrictMode>
);
