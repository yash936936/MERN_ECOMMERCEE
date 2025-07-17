import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import { IoLogoAndroid } from 'react-icons/io';
import { IoLogoInstagram, IoLogoYoutube } from 'react-icons/io5';
import { IoLogoLinkedin } from "react-icons/io5";
import { IoLogoGithub } from "react-icons/io5";

const About = () => {
  const visitLinkedIn = () => {
    window.location = "www.linkedin.com/in/yashmalik-";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dlfdhtcyj/image/upload/v1752536583/samples/cup-on-a-table.jpg"
              alt="Founder"
            />
            <Typography>Yash Malik</Typography>
            <Button onClick={visitLinkedIn} color="primary">
              Visit LinkedIn 
            </Button>
            <span>
              This is a sample wesbite made by @Yash. Only with the
              purpose of learning and practicing MERN Stack. It is not a real
              e-commerce website. It is a part of my portfolio.
              <br />
              <br />
              You can find the source code of this project on my GitHub.
            </span>
          </div>
        <div className="aboutSectionContainer2">
            <Typography component="h2">Profiles</Typography>

            <a
            href="www.linkedin.com/in/yashmalik-"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            >
            <IoLogoLinkedin className="linkedinSvgIcon" />
            </a>

            <a
            href="https://www.instagram.com/yashmalik936"
           target="_blank"
           rel="noopener noreferrer"
           aria-label="Instagram Profile"
           >
           <IoLogoInstagram className="instagramSvgIcon" />
          </a>

           <a
            href="https://github.com/yash936936"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            >
            <IoLogoGithub className="githubSvgIcon" />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;
