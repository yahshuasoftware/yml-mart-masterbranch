import React from "react";
import { FaInstagram, FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa";
// import "../Footer/footer.css";
<style>
  
</style>
const Footer = () => {
  return (
    <div className="footer">
      <div className="top">
        <div className="footer-top-img">
          <a href="/about" >
            <div className="company-img">
              <img src="comp1.png" alt="" />
            </div>
            <p>About Company</p>
          </a>

          <a href="contact">
            <div className="company-img">
              <img src="contact.png" alt="" />
            </div>
            <p>Contact Us</p>
          </a>

          <a href="/askquestion">
            <div className="company-img">
              <img src="comp2.png" alt="" />
            </div>
            <p>Ask Question</p>
          </a>
        </div>
      </div>
      <div className="bottom">
        <div className="horizantal">
          <div className="Download-section">
            <div className="vertical">

            <a href="/">
            <img className="logo" src="logo.png" alt="" />
            </a>
            
            <h2>Install our app</h2>
            <div className="images">
                <a href="https://play.google.com/"><img className="img1" src="Google-play.png" alt="img"/></a>
                <a href="https://www.apple.com/in/app-store/"><img className="img2" src="App-store.png" alt="img"/></a>
              
            </div>
            </div>
          </div>
          <div className="Special-section">
            <h3>Special</h3>
            <a href="">Featured Products</a>
            <a href="">Latest Products</a>
            <a href="">Best Selling Products</a>
            <a href="">Top Rated Products</a>
          </div>
          <div className="Account-shipping">
            <h3> Account and Shipping Information</h3>
            <a href="">Profile Information</a>
            <a href="/wishlist">Wishlist</a>
            <a href="">Track Order</a>
            <a href="">Refund Policy</a>
            <a href="">Return Policy</a>
            <a href="">Cancellation Policy</a>
          </div>
          <div className="Newsletter">
            <h3>Newsletter</h3>
            <p>Subscribe to our new channel to receive the latest updates.</p>
            <form action="">
              <input
                className="text"
                type="email"
                placeholder="arjunahanwate358@gmail.com"
                name=""
                id=""
              />
              <input className="btn" type="button" value="Subscribe" />
            </form>
          </div>
        </div>

        <div className="address">
          <div className="left"></div>
          <div className="right">
            <div className="up">
              <p>Start a conversation</p>
              <p>Address</p>
            </div>
            <div className="down">
              <p>+91-8888888888</p>
              <p>support@ymlmart.com</p>
              <p>+91-8888888888</p>
              <p>Pune, Maharashtra</p>
            </div>
          </div>
        </div>

        <div className="socials">
          <p>&copy; 2024 | Yahshua Marketing Limited.</p>
          <div className="social-icons">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook size={20} />
            </a>
          </div>
          <a>Terms and Conditions</a>
          <a>Privacy Policy</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
