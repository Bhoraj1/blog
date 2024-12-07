import React from "react";
import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";

export default function FooterComponent() {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div>
            <Link
              to="/"
              className="slef-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white "
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white ">
                Bhoraj's
              </span>
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="About" className="mb-2" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://github.com/Bhoraj1/blog"
                  target="_blank"
                  rel="noopener noreference"
                >
                  03 js projects
                </Footer.Link>
                <Footer.Link
                  href="/about"
                  target="_blank"
                  rel="noopener noreference"
                >
                  Bhoraj's Blog
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us" className="mb-2" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://github.com/Bhoraj1"
                  target="_blank"
                  rel="noopener noreference"
                >
                  GitHub
                </Footer.Link>
                <Footer.Link
                  href="/#"
                  target="_blank"
                  rel="noopener noreference"
                >
                  Discoard
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" className="mb-2" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="/#">Terms and Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className=" w-full flex sm:justify-between sm:items-center  ">
          <Footer.Copyright
            href="#"
            by="Bhoraj's blog"
            year={new Date().getFullYear()}
          />
        </div>
        <div className="flex gap-4 mt-4 sm:mt-0 sm:justify-end">
          <Footer.Icon href="#" icon={FaFacebook} />
          <Footer.Icon href="#" icon={FaInstagram} />
          <Footer.Icon href="#" icon={FaXTwitter} />
          <Footer.Icon href="#" icon={FaGithub} />
        </div>
      </div>
    </Footer>
  );
}
