import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { useAuth } from "@clerk/clerk-react";
import RootLayout from "@/layouts/RootLayout";
import Home from "@/pages/Home";
import Projects from "@/pages/Projects";
import Project from "@/pages/Project";

const App = () => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return (
      <div className="flex h-screen justify-center items-center">
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route
            path="projects"
            element={isSignedIn ? <Projects /> : <Navigate to="/" />}
          />
          <Route
            path="/projects/:id"
            element={isSignedIn ? <Project /> : <Navigate to="/" />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
