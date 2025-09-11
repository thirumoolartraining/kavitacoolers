import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigationType } from "react-router-dom";
import { useEffect, useState } from 'react';
import { CartProvider } from "./features/cart";
import { ProductsProvider } from "./features/products";
import Layout from "./components/Layout";
import Index from "./pages/index";
import Shop from "./pages/shop";
import ProductDetails from "./pages/products/[id]";
import Services from "./pages/services";
import Brands from "./pages/brands";
import About from "./pages/about";
import Contact from "./pages/contact";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout";
import { OrderConfirmation } from "./pages/OrderConfirmation";
import NotFound from "./pages/NotFound";
import { ErrorBoundary } from "./components/ErrorBoundary";
import Privacy from "./pages/privacy";
import Terms from "./pages/terms";
import Shipping from "./pages/shipping";
import CancellationRefund from "./pages/cancellation-refund";

// Configure query client with proper defaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Scroll to top functionality with smooth scroll and back-to-top button
const ScrollToTop = () => {
  const { pathname } = useLocation();
  const navType = useNavigationType();
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    if (navType !== 'POP') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [pathname, navType]);

  // Handle scroll to top with smooth behavior
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
          aria-label="Back to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m18 15-6-6-6 6" />
          </svg>
        </button>
      )}
    </>
  );
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/shop" element={<Shop />} />
    <Route path="/products/:id" element={<ProductDetails />} />
    <Route path="/services" element={<Services />} />
    <Route path="/brands" element={<Brands />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/cart" element={<Cart />} />
    <Route 
      path="/checkout" 
      element={
        <ErrorBoundary>
          <Checkout />
        </ErrorBoundary>
      } 
    />
    <Route path="/order-confirmation" element={<OrderConfirmation />} />
    <Route path="/privacy" element={<Privacy />} />
    <Route path="/terms" element={<Terms />} />
    <Route path="/shipping" element={<Shipping />} />
    <Route path="/cancellation-refund" element={<CancellationRefund />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Sonner position="top-right" richColors closeButton />
        <CartProvider>
          <ProductsProvider>
            <BrowserRouter>
              <ScrollToTop />
              <Layout>
                <AppRoutes />
              </Layout>
            </BrowserRouter>
          </ProductsProvider>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
