import React, { useState, useEffect, useRef } from 'react';
import ScreenHeading from '../../utilities/ScreenHeading/ScreenHeading';
import ScrollService from '../../utilities/ScrollService';
import Animations from '../../utilities/Animations';
import './Resume.css';
// import icons
import educationIcon from "../../assets/Resume/education.svg";
import workHistoryIcon from "../../assets/Resume/work-history.svg";
import programmingSkillsIcon from "../../assets/Resume/programming-skills.svg";
import projectsIcon from "../../assets/Resume/projects.svg";
import interestsIcon from "../../assets/Resume/interests.svg";

export default function Resume(props) {
    const [selectedBulletIndex, setSelectedBulletIndex] = useState(0);
    const [carousalOffSetStyle, setCarousalOffSetStyle] = useState({});
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef(null); // Reference to observe for fade-in

    let fadeInScreenHandler = (screen) => {
        if (screen.fadeInScreen !== props.id) return;
        Animations.animations.fadeInScreen(props.id);
    };

    useEffect(() => {
        const fadeInSubscription = ScrollService.currentScreenFadeIn.subscribe(fadeInScreenHandler);
        return () => {
            fadeInSubscription.unsubscribe();
        };
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    setIsVisible(true); // Set visible when the component enters the view
                    observer.unobserve(containerRef.current); // Stop observing after fade-in
                }
            },
            { threshold: 0.3 } // Trigger when 30% of the component is visible
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    const ResumeHeading = (props) => {
        return (
            <div className="resume-heading">
                <div className="resume-main-heading">
                    <div className="heading-bullet"></div>
                    <span>{props.heading ? props.heading : ""}</span>
                    {props.fromDate && props.toDate ? (
                        <div className="heading-date">
                            {props.fromDate + " - " + props.toDate}
                        </div>
                    ) : null}
                </div>
                <div className="resume-sub-heading">
                    <span>{props.subHeading ? props.subHeading : ""}</span>
                </div>
                <div className="resume-heading-description">
                    <span>{props.description ? props.description : ""}</span>
                </div>
            </div>
        );
    };

    const resumeBullets = [
        { label: "Education", logoSrc: educationIcon },
        { label: "Work History", logoSrc: workHistoryIcon },
        { label: "Programming Skills", logoSrc: programmingSkillsIcon },
        { label: "Projects", logoSrc: projectsIcon },
        { label: "Interests", logoSrc: interestsIcon },
    ];

    const programmingSkillDetails = [
        { skill: "JavaScript", ratingPercentage: 85 },
        { skill: "React Js", ratingPercentage: 85 },
        { skill: "Python", ratingPercentage: 70 },
        { skill: "WordPress", ratingPercentage: 85 },
        { skill: "HTML", ratingPercentage: 90 },
        { skill: "CSS", ratingPercentage: 90 },
        { skill: "SQL", ratingPercentage: 75 },
        { skill: "GitHub & GitBash", ratingPercentage: 75 },
    ];

    const projectDetails = [
        {
            title: "Personal Portfolio Website",
            duration: { fromDate: "2024", toDate: "2024" },
            description: "A personal portfolio website to showcase all my details and projects in one place.",
            subHeading: "Technologies Used: React JS, Bootstrap",
        },
        {
            title: "E-commerce Website",
            duration: { fromDate: "2024", toDate: "2024" },
            description: "An e-commerce website with dynamic features and secure payments.",
            subHeading: "Technologies Used: React JS, Node.js, MongoDB",
        },
        {
            title: "Weather App",
            duration: { fromDate: "2023", toDate: "2023" },
            description: "A weather app that provides current weather details using API.",
            subHeading: "Technologies Used: JavaScript, API, HTML, CSS",
        },
    ];

    const resumeDetails = [
        <div className="resume-screen-container" key={"education"}>
            <ResumeHeading
                heading={"Vantaa Ammattiopisto Varia, Finland"}
                subHeading={"Information Communication Technology"}
                fromDate={"2023"}
                toDate={"2025"}
            />
            <ResumeHeading
                heading={"Bangladesh Islami University, Bangladesh"}
                subHeading={"Bachelor of Law"}
                fromDate={"2009"}
                toDate={"2013"}
            />
            <ResumeHeading
                heading={"Higher Secondary, Bangladesh"}
                fromDate={"2007"}
                toDate={"2009"}
            />
        </div>,
        <div className="resume-screen-container" key="work-experience">
            <ResumeHeading
                heading={"Azzad Technology, Lappeenranta, Finland"}
                subHeading={"Front-end Developer Intern"}
                fromDate={"09/2024"}
                toDate={"Present"}
            />
            <div className="experience-description">
                <span className="resume-description-text">
                    As a Front-End Developer at Azzad Technology, I am responsible for creating visually appealing, responsive, and user-friendly web applications.
                </span>
            </div>
            <div className="experience-description">
                <span className="resume-description-text">
                    - Developing dynamic, interactive, and intuitive user interfaces using HTML5, CSS3, JavaScript, and modern libraries/frameworks like React.js.
                </span>
                <br />
                <span className="resume-description-text">
                    - Managing codebases using Git and GitHub for version control.
                </span>
                <br />
                <span className="resume-description-text">
                    - Collaborating with back-end developers to seamlessly integrate RESTful APIs.
                </span>
            </div>
        </div>,
        <div className="resume-screen-container programming-skills-container" key="programming-skills">
            {programmingSkillDetails.map((skill, index) => (
                <div className="skill-parent" key={index}>
                    <div className="heading-bullet"></div>
                    <span>{skill.skill}</span>
                    <div className="skill-percentage">
                        <div
                            style={{ width: skill.ratingPercentage + "%" }}
                            className="active-percentage"
                        ></div>
                    </div>
                </div>
            ))}
        </div>,
        <div className="resume-screen-container" key="projects">
            {projectDetails.map((projectDetail, index) => (
                <ResumeHeading
                    key={index}
                    heading={projectDetail.title}
                    subHeading={projectDetail.subHeading}
                    description={projectDetail.description}
                    fromDate={projectDetail.duration.fromDate}
                    toDate={projectDetail.duration.toDate}
                />
            ))}
        </div>,
        <div className="resume-screen-container" key="interests">
            <ResumeHeading
                heading="Teaching"
                description="Apart from being a tech enthusiast, I enjoy teaching programming and mentoring others."
            />
            <ResumeHeading
                heading="Traveling"
                description="Exploring new cultures, cuisines, and landscapes is one of my passions."
            />
            <ResumeHeading
                heading="Music"
                description="Music is a vital part of my life. It offers relaxation and inspiration."
            />
            <ResumeHeading
                heading="Competitive Gaming"
                description="I enjoy challenging my reflexes by competing in online games."
            />
        </div>,
    ];

    const handleCarousal = (index) => {
        let offsetHeight = 360;
        let newCarousalOffset = {
            style: { transform: "translateY(" + index * offsetHeight * -1 + "px)" },
        };
        setCarousalOffSetStyle(newCarousalOffset);
        setSelectedBulletIndex(index);
    };

    const getBullets = () => {
        return resumeBullets.map((bullet, index) => (
            <div
                onClick={() => handleCarousal(index)}
                className={index === selectedBulletIndex ? "bullet selected-bullet" : "bullet"}
                key={index}
            >
                <img className="bullet-logo" src={bullet.logoSrc} alt="logo" />
                <span className="bullet-label">{bullet.label}</span>
            </div>
        ));
    };

    const getResumeScreen = () => {
        return (
            <div style={carousalOffSetStyle.style} className="resume-details-carousal">
                {resumeDetails.map((ResumeDetail) => ResumeDetail)}
            </div>
        );
    };

    return (
        <div className={`resume-container screen-container ${isVisible ? 'fade-in' : ''}`} id={props.id || ""} ref={containerRef}>
            <div className="resume-content">
                <ScreenHeading title={'Resume'} subHeading={'My Formal Bio Details'} />
                <div className="resume-card">
                    <div className="resume-bullets">
                        <div className="bullet-container">
                            <div className="bullet-icons">
                                <div className="bullets">{getBullets()}</div>
                            </div>
                        </div>
                    </div>
                    <div className="resume-bullet-details">{getResumeScreen()}</div>
                </div>
            </div>
        </div>
    );
}
