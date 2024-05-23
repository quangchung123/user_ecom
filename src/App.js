import {BrowserRouter as Router} from "react-router-dom";
import {AppRoutes} from "./routes";

function App() {
  return (
    <div>
      <Router>
        <AppRoutes />
      </Router>
    </div>
  );
}

export default App;
