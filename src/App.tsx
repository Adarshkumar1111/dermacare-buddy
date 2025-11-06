import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SkinInsights from "./pages/SkinInsights";
import Products from "./pages/Products";
import Diseases from "./pages/Diseases";
import DietPlan from "./pages/DietPlan";
import Precautions from "./pages/Precautions";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/skin-insights" element={<SkinInsights />} />
          <Route path="/skin-insights/products" element={<Products />} />
          <Route path="/skin-insights/diseases" element={<Diseases />} />
          <Route path="/skin-insights/diet-plan" element={<DietPlan />} />
          <Route path="/skin-insights/precautions" element={<Precautions />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
