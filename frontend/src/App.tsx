import { BrowserRouter, Route, Routes } from "react-router";
import RootLayout from "@/layouts/RootLayout";
import Projects from "@/pages/Projects";
import Home from "@/pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
