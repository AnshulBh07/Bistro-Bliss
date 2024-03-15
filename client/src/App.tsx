import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import styles from "./App.module.scss";
import Header from "./components/Header/Header";
import { Home } from "./components/home/Home";
import { About } from "./components/about/About";
import { Contact } from "./components/contact/Contact";
import { Menu } from "./components/menu/Menu";
import { Footer } from "./components/Footer/Footer";
import { useEffect } from "react";
import { Login } from "./components/login-page/Login";
import { useSelector } from "react-redux";
import { RootState } from "./store";
// minimize accessing states in App component to reduce rerendering of entire app
function App() {
  // we will only show navbar and footer if the url pathname doesn't include login
  const { pathname } = useLocation();
  const { isAuthenticated } = useSelector((state: RootState) => state.login);

  useEffect(() => {
    localStorage.setItem("query", JSON.stringify("?type=all"));
  }, []);

  return (
    <div className={styles.container_app}>
      {!pathname.includes("/login") && <Header />}

      {/* we will create protected routes using react router dom which aims at redirecting 
      to login page if isAuthenticated is false */}
      <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/contact"
          element={
            isAuthenticated ? <Contact /> : <Navigate to={"/login"} replace />
          }
        />
        <Route path="/menu" element={<Menu />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      {!pathname.includes("/login") && <Footer />}
    </div>
  );
}

export default App;
