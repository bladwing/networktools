import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateDevice from "./components/createDevice/CreateDevice";
import DeviceList from "./components/devices/DeviceList";
import CreateBrand from "./components/createBrand/CreateBrand";
import RuckusMacToBSSID from "./components/Tools/RuckusMacToBSSID";
import ArubaWLCgenerator from "./components/Tools/ArubaWLCgenerator";
import InterfaceCommands from "./components/Tools/InterfaceLLDPtoName";

import SideMenu from "./components/sidemenu/SideMenu.tsx";
import TopMenu from "./components/topmenu/TopMenu.tsx";
import ArubaConfigGenerator from "./components/ArubaConfigGenerator.jsx";

import TopBar from "./components/topbar/TopBar.tsx";

import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <TopBar />
        <TopMenu />
        <SideMenu />
        <Routes>
          <Route path="/dashboard" element={<ArubaConfigGenerator />} />
          <Route path="/create-device" element={<CreateDevice />} />
          <Route path="/create-brand" element={<CreateBrand />} />
          <Route
            path="/ruckusbssid-mac2wired-mac"
            element={<RuckusMacToBSSID />}
          />
          <Route path="/tools-list" element={<TempPage />} />
          <Route path="/arubawcaprename" element={<ArubaWLCgenerator />} />
          <Route path="/aruballdp2name" element={<InterfaceCommands />} />

          <Route path="/devices" element={<DeviceList />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

const TempPage = () => {
  return (
    <div>
      <h1>tools List</h1>
    </div>
  );
};

const NotFound = () => {
  return (
    <div>
      <h3>NOT FOUND MODULE or ROUTE</h3>
    </div>
  );
};
