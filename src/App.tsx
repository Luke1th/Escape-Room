import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/dashboard";
import NotFound from "./pages/NotFound";
import BackgroundMusic from "@/components/ui/BackgroundMusic";
import IntroCutscene from "./pages/IntroCutscene";
import Act1Infiltration from "./pages/Act1Infiltration";
import Act1Index from "./pages/Act1Index";
import Act2Index from "./pages/Act2Index";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BackgroundMusic src="/public/audio/heist-theme.mp3" /> {/* Render outside Routes */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/intro" element={<IntroCutscene />} />
          <Route path="/act1" element={<Act1Index />} />
          <Route path="/infiltration" element={<Act1Infiltration />} />
          <Route path="/act2" element={<Act2Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
