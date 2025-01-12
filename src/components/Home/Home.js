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


{/**************************     Section 4      ******************************** */}

                    {/*officers pfp which if the mouse hovers over a officer both email and linkedin icon will pop up and is linked to their socials*/}

                    <section id="meet-the-team">
                        <h1>Meet the Team</h1>
                        <div className="officers-grid">
                            {[
                                {
                                    name: "John Cena",
                                    role: "President",
                                    img: "/images/officers_pfp/2025/cute_cat_1.jpg",
                                    email: "johncena@example.com"
                                },
                                {
                                    name: "John Cena",
                                    role: "Vice President",
                                    img: "/images/officers_pfp/2025/cute_cat_2.jpg",
                                    email: "johncena@example.com"
                                },
                                {
                                    name: "John Cena",
                                    role: "Technical Director",
                                    img: "/images/officers_pfp/2025/cute_cat.jpeg",
                                    email: "johncena@example.com"
                                },
                                {
                                    name: "John Cena",
                                    role: "Technical Director",
                                    img: "/images/officers_pfp/2025/cute_cat_1.jpg",
                                    email: "johncena@example.com"
                                },
                                {
                                    name: "John Cena",
                                    role: "Data Science Lead",
                                    img: "/images/officers_pfp/2025/cute_cat_2.jpg",
                                    email: "johncena@example.com"
                                },
                                {
                                    name: "John Cena",
                                    role: "Data Science Lead",
                                    img: "/images/officers_pfp/2025/cute_cat_3.jpg",
                                    email: "johncena@example.com"
                                },
                                {
                                    name: "John Cena",
                                    role: "Data Structure Lead",
                                    img: "/images/officers_pfp/2025/cute_cat_1.jpg",
                                    email: "johncena@example.com"
                                },
                                {
                                    name: "John Cena",
                                    role: "Data Structure Lead",
                                    img: "/images/officers_pfp/2025/cute_cat_3.jpg",
                                    email: "johncena@example.com"
                                },
                                {
                                    name: "John Cena",
                                    role: "Event Coordinator",
                                    img: "/images/officers_pfp/2025/cute_cat.jpeg",
                                    email: "johncena@example.com"
                                },
                                {
                                    name: "John Cena",
                                    role: "Event Coordinator",
                                    img: "/images/officers_pfp/2025/cute_cat_1.jpg",
                                    email: "johncena@example.com"
                                },
                                {
                                    name: "John Cena",
                                    role: "Event Coordinator",
                                    img: "/images/officers_pfp/2025/cute_cat_2.jpg",
                                    email: "johncena@example.com"
                                },
                                {
                                    name: "John Cena",
                                    role: "Engagement & Outreach Director",
                                    img: "/images/officers_pfp/2025/cute_cat_3.jpg",
                                    email: "johncena@example.com"
                                },
                                {
                                    name: "John Cena",
                                    role: "Creative Director",
                                    img: "/images/officers_pfp/2025/cute_cat_3.jpg",
                                    email: "johncena@example.com"
                                },
                                {
                                    name: "John Cena",
                                    role: "Social Media Director",
                                    img: "/images/officers_pfp/2025/cute_cat_3.jpg",
                                    email: "johncena@example.com"
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
                                            href="https://www.linkedin.com"
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