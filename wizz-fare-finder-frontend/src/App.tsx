import {BrowserRouter, Routes, Route} from "react-router-dom";
import NotFound from "./pages/NotFound";
import FlightsPage from "./pages/FlightsPage.tsx";

const App = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FlightsPage/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );

}

export default App;
