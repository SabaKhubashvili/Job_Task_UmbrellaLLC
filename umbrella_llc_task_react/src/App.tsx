import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./router/Router";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { CreateProductModal } from "./components/Modals/CreateProductModal";
import { CreatetagModal } from "./components/Modals/CreateTagModal";
import { Footer } from "./components/Footer/Footer";

const queryClient = new QueryClient();

function App() {
  return (
    <React.Fragment>
      <div className="flex flex-col !h-full justify-between gap-[40px]">
        <QueryClientProvider client={queryClient}>
          <Toaster />
          <CreateProductModal />
          <CreatetagModal />
          <HelmetProvider>
            <BrowserRouter>
              <Router />
            </BrowserRouter>
          </HelmetProvider>
        </QueryClientProvider>
        <Footer />
      </div>
    </React.Fragment>
  );
}

export default App;
