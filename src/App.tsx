import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { I18nProvider } from "@/lib/i18n";
import Index from "./pages/Index";
import Posters from "./pages/Posters";
import History from "./pages/History";
import HangulDay from "./pages/HangulDay";
import Quotes from "./pages/Quotes";
import News from "./pages/News";
import NotFound from "./pages/NotFound";
import YouTubePlayer from "./components/YouTubePlayer";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <I18nProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/글자마당" element={<Posters />} />
            <Route path="/역사" element={<History />} />
            <Route path="/한글날" element={<HangulDay />} />
            <Route path="/소식" element={<News />} />
            <Route path="/명언" element={<Quotes />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <YouTubePlayer />
      </I18nProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
