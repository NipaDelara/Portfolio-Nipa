import React, { useState, useEffect, useRef } from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import axios from "axios";
import { toast } from "react-toastify";

import imgBack from "../../../src/images/mailz.jpeg";
import load1 from "../../../src/images/load2.gif";
import ScreenHeading from "../../utilities/ScreenHeading/ScreenHeading";
import ScrollService from "../../utilities/ScrollService";
import Animations from "../../utilities/Animations";
import "./ContactMe.css";

export default function ContactMe(props) {
  let fadeInScreenHandler = (screen) => {
    if (screen.fadeInScreen !== props.id) return;
    Animations.animations.fadeInScreen(props.id);
  };
  const fadeInSubscription =
    ScrollService.currentScreenFadeIn.subscribe(fadeInScreenHandler);

  const [typeEffect] = useTypewriter({
    words: ["Get In Touch 📧"],
    loop: true,
    delaySpeed: 1000,
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [banner, setBanner] = useState("");
  const [bool, setBool] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // State for fade-in
  const contactRef = useRef(null); // Ref for the contact section

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleMessage = (e) => {
    setMessage(e.target.value);
  };
  console.log(name);
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      let data = {
        name,
        email,
        message,
      };
      setBool(true);
      const res = await axios.post(`/contact`, data);
      if (name.length === 0 || email.length === 0 || message.length === 0) {
        setBanner(res.data.msg);
        toast.error(res.data.msg);
        setBool(false);
      } else if (res.status === 200) {
        setBanner(res.data.msg);
        toast.success(res.data.msg);
        setBool(false);

        setName("");
        setEmail("");
        setMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // IntersectionObserver to detect visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(contactRef.current); // Stop observing after fade-in
        }
      },
      { threshold: 0.3 } // Trigger when 30% of the section is visible
    );

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => {
      if (contactRef.current) {
        observer.unobserve(contactRef.current);
      }
    };
  }, []);

  return (
    <div className="main-container" id={props.id || ""} ref={contactRef}>
      <ScreenHeading subHeading={"Lets Keep In Touch"} title={"Contact Me"} />
      <div className={`central-form ${isVisible ? "fade-in" : ""}`}>
        <div className="col">
          <h2 className="title">
            <span>{typeEffect}</span>
            <Cursor cursorStyle="|" />
          </h2>
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
        <div className="back-form">
          <div className="img-back">
            <h4>Send Your E-mail Here!</h4>
            <img src={imgBack} alt="image not found" />
          </div>
          <form onSubmit={submitForm}>
            <p>{banner}</p>
            <label htmlFor="name">Name</label>
            <input type="text" onChange={handleName} value={name} />

            <label htmlFor="email">Email</label>
            <input type="email" onChange={handleEmail} value={email} />

            <label htmlFor="message">Message</label>
            <textarea type="text" onChange={handleMessage} value={message} />

            <div className="send-btn">
              <button type="submit">
                send
                <i className="fa fa-paper-plane" />
                {bool ? (
                  <b className="load">
                    <img src={load1} alt="image not responding" />
                  </b>
                ) : (
                  ""
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
