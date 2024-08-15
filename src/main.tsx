import ReactDOM from "react-dom/client";
import "./index.css";
import "./fonts.css";
import App from "./App";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import store from "./redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <Provider store={store}>
        <div className="scroll-smooth">
          <NextUIProvider>
            <App />
          </NextUIProvider>
        </div>
      </Provider>
    </QueryClientProvider>
  </>
);
