import React, { useState, useEffect } from 'react';
import Layout from '../shared/Layout';
import Typewriter from 'typewriter-effect';
import './Home.css';

function Home() {
    const [showMessageScreen, setShowMessageScreen] = useState(true);
    const [message, setMessage] = useState('');
    const [messageIndex, setMessageIndex] = useState(0);
    const [isFading, setIsFading] = useState(false);

    const fullMessage = "Ready for your next challenge?";

    // Typing effect logic
    useEffect(() => {
        if (messageIndex < fullMessage.length) {
            const timer = setTimeout(() => {
                setMessage(message + fullMessage[messageIndex]);
                setMessageIndex(messageIndex + 1);
            }, 100);
            return () => clearTimeout(timer);
        } else {
            setTimeout(() => {
                setShowMessageScreen(false);
            }, 2000);
        }
    }, [message, messageIndex]);

    // Scroll event listener to trigger fade-out
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsFading(true);
                setTimeout(() => setShowMessageScreen(false), 1000); // Smooth transition and remove after fade
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <Layout>
            {showMessageScreen && (
                <div className={`message-screen ${isFading ? 'fade-out' : ''}`}>
                    <h1>{message}</h1>
                </div>
            )}

            {!showMessageScreen && (
                <div className="home-content">

{/**************************     Section 1      ******************************** */}
                    {/* Introduction Section */}
                    <section id="about-us">
                        <img
                            src="/images/media/Photos/Challenger_Coogs.jpg"
                            alt="Coog Challenger"
                        />{" "}
                        {/* Add your image path here */}
                        <div className="content">
                            <h2>
                                <Typewriter
                                    onInit={(typewriter) => {
                                        typewriter
                                            // .typeString(
                                            //     'Ready for a great <span style=color:green; font-weight:bold>challenge</span>?'
                                            // )
                                            // .pauseFor(1000)
                                            // .deleteAll()
                                            .typeString(
                                                '<span style="color:green; font-weight:bold; font-size:40px; letter-spacing:0;">C</span>' +
                                                '<span style="color:red; font-weight:bold; font-size:40px; letter-spacing:0;">o</span>' +
                                                '<span style="color:#ffe135; font-weight:bold; font-size:40px; letter-spacing:0;">o</span>' +
                                                '<span style="color:blue; font-weight:bold; font-size:40px; letter-spacing:0;">g</span> <span "font-size:40px; font-weight:bold">Challengers </span> Welcomes You! '
                                            )
                                            .start();
                                    }}
                                />
                            </h2>
                            <h3> Your Next Great Challenge Awaits! </h3>
                            <p>
                                Welcome to Coogs Challengers, an organization dedicated to helping
                                students dive into the world of Data Science and Data Structure
                                competitions. Our goal is to create a supportive environment where
                                students can tackle meaningful challenges, sharpen their skills, and
                                build the confidence necessary to succeed in technical interviews
                                and beyond.
                            </p>
                            <p>
                                Through engaging competitions and collaborative problem-solving, we
                                aim to provide students with the tools they need to thrive in coding
                                challenges often encountered during internships and job
                                applications.
                            </p>
                            <p>
                                With the generous support and sponsorship of Google, we are proud to
                                offer not only guidance and mentorship but also monetary awards for
                                top-performing participants.
                            </p>
                            <p>
                                Join us as we tackle exciting challenges, sharpen our skills, and
                                build a community of innovators ready to shape the future of
                                technology.
                            </p>
                        </div>
                    </section>

{/**************************     Section 2      ******************************** */}

                    <section id="what-we-offer">
                        <h1>Ready to Take on the Challenge?</h1>
                        <h2>Level up your coding skills, compete with the best, and earn real-world rewards!</h2>
                        <p>
                            Solve real-world problems, enhance your resume, and have fun—all while getting the chance to win cash prizes and exclusive perks. This is your moment to prove you’ve got what it takes!
                        </p>

                        <h2>What We Offer</h2>
                        <div className="perks-container">
                            <div className="perk-box">
                                <img src="/images/media/graphics/perks/skill_development.png" alt="Skill Development Icon" />
                                <h3>Skill Development</h3>
                                <p>Sharpen your data science and algorithm skills with real-world challenges.</p>
                            </div>
                            <div className="perk-box">
                                <img src="/images/media/graphics/perks/experience.png" alt="Career Boost Icon" />
                                <h3>Career Boost</h3>
                                <p>Stand out to recruiters with Google-backed competition experience.</p>
                            </div>
                            <div className="perk-box">
                                <img src="/images/media/graphics/perks/cash_reward.png" alt="Prizes & Recognition Icon" />
                                <h3>Prizes & Recognition</h3>
                                <p>Win cash prizes and gain recognition from Google and the tech community.</p>
                            </div>
                            <div className="perk-box">
                                <img src="/images/media/graphics/perks/perks.png" alt="Exclusive Perks Icon" />
                                <h3>Exclusive Perks</h3>
                                <p>Get event t-shirts and other perks to enjoy special benefits.</p>
                            </div>
                            <div className="perk-box">
                                <img src="/images/media/graphics/perks/network.png" alt="Networking Opportunities Icon" />
                                <h3>Networking Opportunities</h3>
                                <p>Connect with passionate CS enthusiasts and grow your professional network.</p>
                            </div>
                            <div className="perk-box">
                                <img src="/images/media/graphics/perks/inclusive.png" alt="Fun Experience Icon" />
                                <h3>A Fun Experience</h3>
                                <p>Compete, learn, and enjoy in a supportive environment for all skill levels.</p>
                            </div>
                        </div>
                    </section>

{/**************************     Section 3      ******************************** */}
                    {/*Small thank you message to our sponosor, Google and its logo below which i have save */}

                    {/* Special Thank you too! */}
                    <section id="our-sponsors">
                        <h2>Special Thanks to our Sponsor!</h2>
                        <p>
                            A heartfelt thank you to Google for their generous support, which
                            enables us to create valuable opportunities for students and help them
                            reach new heights in their coding journey.
                        </p>
                        <div className="sponsor-logo">
                            <img src="/images/sponsors/google.png" alt="Google" />
                        </div>
                    </section>


{/**************************    Section 4      ******************************** */}

                    {/*officers pfp which if the mouse hovers over a officer both email and linkedin icon will pop up and is linked to their socials*/}

                    <section id="meet-the-team">
                        <h1>Meet the Team</h1>
                        <div className="officers-grid">
                            {[
                                {
                                    name: "Xavier Mares",
                                    role: "President",
                                    img: "/images/officers_pfp/2025/shasta.jpg",
                                    email: "johncena@example.com",
                                    linkedin:"linkedin.com"
                                },
                                {
                                    name: "Miguel Rodriguez",
                                    role: "Vice President",
                                    img: "/images/officers_pfp/2025/shasta.jpg",
                                    email: "marodr77@cougarnet.uh.edu",
                                    linkedin:"https://www.linkedin.com/in/miguel-rodriguez302002 "
                                },
                                {
                                    name: "Mustafa Sahin",
                                    role: "Technical Director",
                                    img: "/images/officers_pfp/2025/shasta.jpeg",
                                    email: "mesahin2@cougarnet.uh.edu", 
                                    linkedin:"http://linkedin.com/in/mustafa-sahin03"
                                },
                                {
                                    name: "Jacqueline Sanchez",
                                    role: "Technical Director",
                                    img: "/images/officers_pfp/2025/shasta.jpg",
                                    email: "jsanchez75@uh.edu",
                                    linkedin:"https://www.linkedin.com/in/jacquelinesa7/"
                                },
                                {
                                    name: "Tan Tran",
                                    role: "Data Science Lead",
                                    img: "/images/officers_pfp/2025/shasta.jpg",
                                    email: "thtran39@cougarnet.uh.edu", 
                                    linkedin:"https://www.linkedin.com/in/tan-h-tran/"
                                },
                                {
                                    name: "Adriana Alvarez",
                                    role: "Data Science Lead",
                                    img: "/images/officers_pfp/2025/shasta.jpg",
                                    email: "aalvar55@cougarnet.uh.edu",
                                    linkedin:"https://www.linkedin.com/in/adriana-alvarez8"
                                },
                                {
                                    name: "Gabriela Romero Ramirez",
                                    role: "Data Structure Lead",
                                    img: "/images/officers_pfp/2025/shasta.jpg",
                                    email: "email.com",
                                    linkedin: "http://linkedin.com/in/gabriela-romero-ramirez"

                                },
                                {
                                    name: "Jayson Luong",
                                    role: "Data Structure Lead",
                                    img: "/images/officers_pfp/2025/shasta.jpg",
                                    email: "jkluong2@cougarnet.uh.edu",
                                    linkedin: "https://www.linkedin.com/in/jaysonluong/"
                                },
                                {
                                    name: "Widyan Hussien",
                                    role: "Data Structure Lead",
                                    img: "/images/officers_pfp/2025/shasta.jpg",
                                    email: "whussien@cougarnet.uh.edu", 
                                    linkedin: "https://www.linkedin.com/in/widyan-hussien"
                                },
                                {
                                    name: "Shinelle Barretto",
                                    role: "Event Coordinator",
                                    img: "/images/officers_pfp/2025/shasta.jpg",
                                    email: "srbarret@cougarnet.uh.edu",
                                    linkedin:"https://www.linkedin.com/in/shinelle-barretto-8a7487268"
                                },
                                {
                                    name: "Stephanie Alvarez",
                                    role: "Event Coordinator",
                                    img: "/images/officers_pfp/2025/shasta.jpg",
                                    email: "Salvar27@cougarnet.uh.edu",
                                    linkedin:"http://linkedin.com/in/stephanie-alvarez-pleasehireme"
                                },
                                {
                                    name: "Jacqueline Tran",
                                    role: "Event Coordinator",
                                    img: "/images/officers_pfp/2025/shasta.jpg",
                                    email: "Jatran7@cougarnet.uh.edu",
                                    linkedin:"https://www.linkedin.com/in/jacqueline-tran-319a28288?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                                },
                                {
                                    name: "Angela-Marie Abrea",
                                    role: "Social Media Director",
                                    img: "/images/officers_pfp/2025/shasta.jpg",
                                    email: "afabrea@cougarnet.uh.edu",
                                    linkedin:"https://www.linkedin.com/in/angelam-abrea/"
                                },
                                {
                                    name: "Abigail Bradshaw ",
                                    role: "Creative Director",
                                    img: "/images/officers_pfp/2025/shasta.jpg",
                                    linkedin: "https://www.linkedin.com/in/abigail-bradshaw/", 
                                    email: "aabradsh@cougarnet.uh.edu"
                                },
                                {
                                    name: "Sam Khudairi",
                                    role: "Engagement & Outreach Director",
                                    img: "/images/officers_pfp/2025/shasta.jpg",
                                    email: "sskhudai@cougarnet.uh.edu", 
                                    linkedin: "www.linkedin.com/in/sam-khudairi-b51b74317"
                                }
                            ].map((officer, index) => (
                                <div className="officer" key={index}>
                                    <div className="profile-container">
                                        <img
                                            src={officer.img}
                                            alt={officer.name}
                                            className="officer-img"
                                        />
                                    </div>
                                    <h4>{officer.name}</h4>
                                    <p>{officer.role}</p>
                                    <div className="officer-contact">
                                        <a
                                            href={officer.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="contact-icon"
                                        >
                                            <i className="fab fa-linkedin"></i>
                                        </a>
                                        <a href={`mailto:${officer.email}`} className="contact-icon">
                                            <i className="fas fa-envelope"></i>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Event pannel that slides event posters (for the near future) */}

                </div>
            )}
        </Layout>
    );
}

export default Home;
