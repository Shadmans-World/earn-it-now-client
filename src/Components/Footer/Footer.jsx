import React from "react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <footer className="footer bg-neutral text-neutral-content p-10">
        <aside>
          <img src="/income.png" alt="" className="w-20"/>
          <p>
            Earn It Now || EIN
            <br />
            Providing reliable task since 2025
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">Social</h6>
          <div className="grid grid-flow-col gap-4">
            <a href="https://www.facebook.com/shadman.shoumik.shaon" target="_blank">
              <FaFacebook className="text-3xl"/>
            </a>
            <a href="https://www.linkedin.com/in/shadman-undefined-839b65291/" target="_blank">
              <FaLinkedin className="text-3xl"/>
            </a>
            <a href="https://github.com/Shadmans-World" target="_blank">
             <FaGithub className="text-3xl" />
            </a>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
