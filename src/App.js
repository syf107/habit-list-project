import { BrowserRouter, Routes, Route } from "react-router-dom";
import SharedLayout from "./components/SharedLayout";
import Maker from "./pages/Maker";
import Progress from "./pages/Progress";
import Improve from "./pages/Improve";
import Error from "./pages/Error";
import "./styles/tailwind.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Maker />} />
          <Route path="progress" element={<Progress />} />
          <Route path="improve" element={<Improve />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
