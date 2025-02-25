import React from "react";
import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">
            {/* <p className="footer-text">Stay connected to stay tuned to the latest updates</p> */}
            <div className="social-media">
                <a href="https://discord.gg/nHRbS2Gw" target="_blank" rel="noopener noreferrer" aria-label="Discord">
                    <i className="fab fa-discord"></i>
                </a>
                <a href="https://www.linkedin.com/company/coog-challengers" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <i className="fab fa-linkedin"></i>
                </a>
                <a href="https://www.instagram.com/coogchallengers/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <i className="fab fa-instagram"></i>
                </a>
                <a href="https://www.tiktok.com/@coogchallengers" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                    <i className="fab fa-tiktok"></i>
                </a>
                <a href="https://github.com/coogchallengers" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <i className="fab fa-github"></i>
                </a>
            </div>
            <p className="footer-text">© 2025 Challenger Coogs. All rights reserved.</p>
        </footer>
    );
}

export default Footer;
