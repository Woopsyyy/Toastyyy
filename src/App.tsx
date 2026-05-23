import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ToastProvider } from "./hooks/useToasts";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import ExamplesPage from "./pages/ExamplesPage";
import PlaygroundPage from "./pages/PlaygroundPage";
import DocsSection from "./pages/DocsPage";
import ChangelogPage from "./pages/ChangelogPage";

export default function App() {
  return (
    <ToastProvider>
      <AnimatePresence mode="wait">
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/examples" element={<ExamplesPage />} />
            <Route path="/builder" element={<PlaygroundPage />} />
            <Route path="/docs" element={<DocsSection />} />
            <Route path="/changelog" element={<ChangelogPage />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </ToastProvider>
  );
}
