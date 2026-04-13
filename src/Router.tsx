import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./lib/authContext";
import App from "./App";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Impressum from "./pages/Impressum";
import ImageGenerator from "./pages/ImageGenerator";

const VideoPage = lazy(() => import("./pages/VideoPage"));
const AdminApp = lazy(() => import("./admin/AdminApp"));
const PortalApp = lazy(() => import("./portal/PortalApp"));

function PageLoader() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#191e23" }}>
      <div style={{ width: 20, height: 20, border: "2px solid #272f37", borderTopColor: "#7AA2FF", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
    </div>
  );
}

export default function Router() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/video" element={<Suspense fallback={<PageLoader />}><VideoPage /></Suspense>} />
          <Route path="/datenschutz" element={<PrivacyPolicy />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/generate-image" element={<ImageGenerator />} />
          <Route
            path="/admin/*"
            element={
              <Suspense fallback={<PageLoader />}>
                <AdminApp />
              </Suspense>
            }
          />
          <Route
            path="/portal/*"
            element={
              <Suspense fallback={<PageLoader />}>
                <PortalApp />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
