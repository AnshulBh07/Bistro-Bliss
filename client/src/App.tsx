import { Routes, Route } from "react-router-dom";
import styles from "./App.module.scss";
import Header from "./components/Header/Header";
import { Home } from "./components/home/Home";
import { About } from "./components/about/About";
import { Contact } from "./components/contact/Contact";
import { Menu } from "./components/menu/Menu";
import { Footer } from "./components/Footer/Footer";
import { useEffect } from "react";
// minimize accessing states in App component to reduce rerendering of entire app
function App() {
  useEffect(() => {
    localStorage.setItem("query", JSON.stringify("?type=all"));
  }, []);

  return (
    <div className={styles.container_app}>
      <Header />

      <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
