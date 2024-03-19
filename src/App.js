import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Menu from "./components/menu/Menu";
import CreateDevice from "./components/createDevice/CreateDevice";
import DeviceList from "./components/devices/DeviceList";
import CreateBrand from "./components/createBrand/CreateBrand";
import RuckusMacToBSSID from "./components/Tools/RuckusMacToBSSID"
import ArubaWLCgenerator from "./components/Tools/ArubaWLCgenerator"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path="/" element={<TempPage />} />
          <Route path="/create-device" element={<CreateDevice />} />
          <Route path="/create-brand" element={<CreateBrand />} />

          <Route path="/tools" element={<RuckusMacToBSSID />} />

          <Route path="/tools2" element={<ArubaWLCgenerator />} />

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
      <h1>Welcome</h1>
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
