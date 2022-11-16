import "./aboutus.css";
import profile from "../assets/unnamed.png";

const Aboutus = () => {
  return (
    <>
      <div className="main4" id="aboutus">
        <div className="aboutContainer">
          <div className="profile">
            <img src={profile} alt="profile Img" />
            <h1>Zeel Rabadiya</h1>
          </div>
          <div className="aboutInfo">
            <h3>
              The Z-Transfer web app is a publicly accessible crypto-transfer
              web application with a Interactive Giphy images Record. Using
              Z-Transfer You Can Easily Transfer Your Crypto Currency Balance
              From One Account To Another Account Seconds and also you record
              your transaction with the use of Z-transfer Provide Giphy image
              utility to store image and transaction records.
            </h3>

            <div className="links">
              <ul>
                <li>
                  <a href="https://twitter.com/Zeel562?s=08" target="_blank">
                    <i className="fa-brands fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/ze_el_0_0/"
                    target="_blank"
                  >
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                </li>
                <li>
                  <a href="https://github.com/l33Z" target="_blank">
                    <i className="fa-brands fa-github"></i>
                  </a>
                </li>

                <li>
                  <a
                    href="https://www.linkedin.com/in/zeel-rabadiya-3a2510200/"
                    target="_blank"
                  >
                    <i className="fa-brands fa-linkedin"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <footer>
          <h3>&copy; Copyright 2022, Z-Transfer</h3>
        </footer>
      </div>
    </>
  );
};

export default Aboutus;
