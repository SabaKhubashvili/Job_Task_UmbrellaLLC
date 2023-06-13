import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./router/Router";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { CreateProductModal } from "./components/Modals/CreateProductModal";
import { CreatetagModal } from "./components/Modals/CreateTagModal";

const queryClient = new QueryClient();

function App() {
  return (
    <React.Fragment>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <CreateProductModal/>
        <CreatetagModal/>
        <HelmetProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </HelmetProvider>
      </QueryClientProvider>
    </React.Fragment>
  );
}

export default App;
