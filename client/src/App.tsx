import { Routes, Route } from "react-router-dom";
import styles from "./App.module.scss";
import Header from "./components/Header/Header";
import { Home } from "./components/home/Home";
import { About } from "./components/about/About";
import { Contact } from "./components/contact/Contact";
import { Menu } from "./components/menu/Menu";
import { Footer } from "./components/Footer/Footer";

// minimize accessing states in App component to reduce rerendering of entire app
function App() {
  console.log("rendering App....");
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
