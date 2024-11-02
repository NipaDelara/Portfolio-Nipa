import React from "react";
import {useTypewriter, Cursor} from 'react-simple-typewriter';
import ScrollService from "../../../utilities/ScrollService";
import "./Profile.css"

export default function Profile() {
    const [typeEffect] = useTypewriter({
        words: ['Front-end Dev💻','React Dev📲' , 'Wordpress dev🖥️'],
        loop: {},
        typeSpeed: 100,
        deleteSpeed: 40
    
      });
  return (
    <div className="profile-container">
      <div className="profile-parent">
        <div className="profile-details-name">
          <div className="colz">
            <div className="colz-icon">
            <a href="https://www.facebook.com/delara.nipa/">
              <i className="fa fa-facebook"></i>
            </a>
            <a href="https://www.instagram.com/jannatroj">
              <i className="fa fa-instagram"></i>
            </a>
            <a href="https://x.com/delaranipa7">
              <i className="fa fa-twitter"></i>
            </a>
            <a href="https://github.com/NipaDelara?tab=repositories">
              <i className="fa fa-github"></i>
            </a>
            </div>
          </div>
          <h5>Hello!👋</h5>
          <h6>I'm Delara Nipa👩‍💻.</h6>
          <div className="profile-details-role">
            <h1>
            I'm a
            <span className="primary-text"
            style={{ fontWeight: "bold", color: "green", marginLeft: "5px" }}
            >
            {typeEffect}
            </span> 
            <Cursor /> 

            </h1>
          </div>
          <div className="profile-role-tagline">
          <span className=""> Knock me for build application or website with front and back end
            operations. 
            </span>
          </div>
          
        
        <div className="profile-options">
            <button className="btn primary-btn" 
            onClick={() => ScrollService.scrollHandler.scrollToHireMe()}

            > 
              Hire Me  </button>

            <a href="interncv.pdf" download> 

                <button className="btn highlighted-btn"> Get Resume</button>
            </a>
        </div>
       
        </div>
    

    <div className="profile-picture">
          <div className="profile-picture-background"></div>
          </div> 
          </div>
    </div>
);
}
