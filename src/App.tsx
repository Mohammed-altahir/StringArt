import StringArtGenerator from "./pages/StringArt";

const App = () => {
  // You can manage authentication globally if needed
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="min-h-screen bg-slate-900">
      <StringArtGenerator/>
    </div>
  );
};

export default App;