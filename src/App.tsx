
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from "./components/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import ResumeServices from "./pages/ResumeServices";
import ResumeServiceDetails from "./pages/ResumeServiceDetails";
import CareerProgram from "./pages/CareerProgram";
import CareerProgramDetails from "./pages/CareerProgramDetails";
import About from "./pages/About";
import SuccessStories from "./pages/SuccessStories";
import Industries from "./pages/Industries";
import CxoJobSupport from "./pages/CxoJobSupport";
import InternationalJobSupport from "./pages/InternationalJobSupport";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";
import AdminManagement from "./pages/AdminManagement";
import MediaManagement from "./pages/MediaManagement";
import Gallery from "./pages/Gallery";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/terms-of-service";
import DataDeletion from "./pages/DataDeletion";


const queryClient = new QueryClient();
const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <BrowserRouter>
            <ScrollToTop />
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/resume-services" element={<ResumeServices />} />
                  <Route path="/resume-services/details" element={<ResumeServiceDetails />} />
                  <Route path="/career-program" element={<CareerProgram />} />
                  <Route path="/career-program/details" element={<CareerProgramDetails />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/story-success" element={<SuccessStories />} />
                  <Route path="/industries" element={<Industries />} />
                  <Route path="/cxo-job-support" element={<CxoJobSupport />} />
                  <Route path="/international-job-support" element={<InternationalJobSupport />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms-of-service" element={<TermsAndConditions />} />
                  <Route path="/data-deletion" element={<DataDeletion />} />

                  <Route 
                    path="/admin" 
                    element={
                      <ProtectedRoute>
                        <AdminDashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/management" 
                    element={
                      <ProtectedRoute>
                        <AdminManagement />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/media" 
                    element={
                      <ProtectedRoute>
                        <MediaManagement />
                      </ProtectedRoute>
                    } 
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
);

export default App;
