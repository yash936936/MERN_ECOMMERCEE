import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>ECOMMERCEE</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2025 &copy; Yash</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Me</h4>
        <a href="www.linkedin.com/in/yashmalik-">LinkedIn</a>
        <a href="https://www.instagram.com/yashmalik936">Instagram</a>
        <a href="https://github.com/yash936936">GitHub</a>
      </div>
    </footer>
  );
};

export default Footer;
