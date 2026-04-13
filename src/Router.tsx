import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Impressum from "./pages/Impressum";
import ImageGenerator from "./pages/ImageGenerator";
import Admin from "./pages/Admin";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/datenschutz" element={<PrivacyPolicy />} />
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/generate-image" element={<ImageGenerator />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}
