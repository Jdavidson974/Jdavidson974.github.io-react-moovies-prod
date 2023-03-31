import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import './styles/index.scss'
import HomePage from "./page/HomePage";
import CoupDeCoeur from "./page/CoupDeCoeur";
import ErrorPage from "./page/ErrorPage";
function App() {
  return (
    // ROUTING 


    <BrowserRouter>
      <HashRouter basename="/">
        <Routes>
          <Route path="/" element={<HomePage />} ></Route>
          <Route path="/coup-de-coeur" element={<CoupDeCoeur />}  ></Route>
          <Route path="/*" element={<ErrorPage />}  ></Route>
        </Routes>
      </HashRouter>
    </BrowserRouter>
  );
}

export default App;
