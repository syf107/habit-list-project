import { BrowserRouter, Routes, Route } from "react-router-dom";
import SharedLayout from "./components/SharedLayout";
import Maker from "./pages/Maker";
import Trainer from "./pages/Trainer";
import Improver from "./pages/Improver";
import HabitPerformer from "./pages/HabitPerformer";
import Error from "./pages/Error";
import "./styles/tailwind.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Maker />} />
          <Route path="trainer" element={<Trainer />} />
          <Route path="improver" element={<Improver />} />
        </Route>
        <Route path="habits/:id" element={<HabitPerformer />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
