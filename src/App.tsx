import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navbar';
import { Dashboard } from './pages/Dashboard';
import { LandingPage } from './pages/Landing';
import { AboutPage } from './pages/About';
import { PricingPage } from './pages/Pricing';
import { AuthPage } from './pages/Auth';
import { Analytics } from "@vercel/analytics/react"

const App = () => {
  // You can manage authentication globally if needed
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="min-h-screen bg-slate-900">
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
      <Analytics />
    </div>
  );
};

export default App;