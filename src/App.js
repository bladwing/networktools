import { BrowserRouter } from "react-router-dom";

import SideMenu from "./components/sidemenu/SideMenu.tsx";
import TopMenu from "./components/topmenu/TopMenu.tsx";
import TopBar from "./components/topbar/TopBar.tsx";
import RoutesRoute from "./routes/Routes.tsx";

import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <TopBar />
        <TopMenu />
        <SideMenu />
        <RoutesRoute />
      </BrowserRouter>
    </div>
  );
}

export default App;
