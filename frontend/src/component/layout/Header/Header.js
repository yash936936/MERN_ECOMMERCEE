import {React} from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo.png";
import { useRef } from "react";

const options = {
  burgerColorHover: "#eb4034",
  logo,
  logoWidth: "20vmax",
  navColor1: "white",
  logoHoverSize: "10px",
  logoHoverColor: "#eb4034",
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Contact",
  link4Text: "About",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "1.3vmax",
  link1Color: "rgba(35, 35, 35,0.8)",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "#eb4034",
  link1Margin: "1vmax",
  profileIconUrl: "/login",
  profileIconColor: "rgba(35, 35, 35,0.8)",
  searchIconColor: "rgba(35, 35, 35,0.8)",
  cartIconColor: "rgba(35, 35, 35,0.8)",
  profileIconColorHover: "#eb4034",
  searchIconColorHover: "#eb4034",
  cartIconColorHover: "#eb4034",
  cartIconMargin: "1vmax",
};

const Header = () => {
  const navbarRef = useRef();

  const handleNavClick = (url) => (e) => {
    e.preventDefault();
    window.open(url, "_blank", "noopener,noreferrer");
    if (navbarRef.current && navbarRef.current.closeNavbar) {
      navbarRef.current.closeNavbar();
    }
  };

  return (
    <nav>
      <ReactNavbar ref={navbarRef} {...options} />
      <a
        href="https://github.com/yash936936"
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleNavClick("https://github.com/yash936936")}
        style={{ display: "none" }}
      >
        GitHub
      </a>
    </nav>
  );
};

export default Header;