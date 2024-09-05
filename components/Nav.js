"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "../public/assets/images/logo.svg";
import NavDropArrow from "../public/assets/images/nav_dropdown.svg";
import { useState } from "react";

export default function Nav({ menuItems }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSecondaryMenuOpen, setIsSecondaryMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
    if (isMenuOpen) {
      setIsSecondaryMenuOpen(false);
    }
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false); // Close the menu when a link is clicked
    setIsSecondaryMenuOpen(false); // Optionally close the secondary menu as well
  };

  return (
    <nav className="column">
      <div className="row nav_row">
        <Link href="/" className="flex gap-2 flex-center">
          <Logo className="nav_logo" />
        </Link>
        <div className={`nav_menu`}>
          {menuItems.nodes.map((page) => (
            <div key={page.id} className="nav_menu-item">
              {page.childItems.edges && page.childItems.edges.length ? (
                <div className="dropdown">
                  <Link
                    className="dropdown_btn"
                    href={page.path}
                    onClick={handleLinkClick}
                  >
                    {page.label}
                    <NavDropArrow className="dropdown_icon" />
                  </Link>
                  <div className="dropdown_menu">
                    {page.childItems.edges.map((child) => (
                      <Link
                        href={child.node.path}
                        key={child.node.id}
                        className="dropdown_menu-item subMenu_text"
                        onClick={handleLinkClick}
                      >
                        <p>{child.node.label}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link href={page.path} onClick={handleLinkClick}>
                  <p>{page.label}</p>
                </Link>
              )}
            </div>
          ))}
        </div>
        <div
          className={`nav_hamburger ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      {/* <div className="nav_bg"></div> */}

      <div className={`nav_menuDrop ${isMenuOpen ? "active" : ""}`}>
        {menuItems.nodes.map((page) => (
          <div key={page.id} className="nav_menuDrop-item">
            {page.childItems.edges && page.childItems.edges.length ? (
              <div className="nav_menuDrop_dropdown">
                <div
                  className={`dropdown_btn nav_menuDrop_menu-link ${
                    isSecondaryMenuOpen ? "active" : ""
                  }`}
                  onClick={() =>
                    setIsSecondaryMenuOpen((prevState) => !prevState)
                  }
                >
                  {page.label === "Blogs" ? "View " + page.label : page.label}
                  <NavDropArrow className="dropdown_icon" />
                </div>
                <div
                  className={`menu_divider ${
                    isSecondaryMenuOpen ? "active" : ""
                  } `}
                ></div>
                <div
                  className={`nav_menuDrop_subMenu ${
                    isSecondaryMenuOpen ? "active" : ""
                  }`}
                >
                  <Link
                    className="dropdown_btn nav_menuDrop_subMenu-item subMenu_text"
                    href={page.path}
                    onClick={handleLinkClick}
                  >
                    {page.label}
                  </Link>
                  {page.childItems.edges.map((child) => (
                    <Link
                      href={child.node.path}
                      key={child.node.id}
                      className="nav_menuDrop_subMenu-item subMenu_text"
                      onClick={handleLinkClick}
                    >
                      <p>{child.node.label}</p>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                href={page.path}
                className="nav_menuDrop_menu-link"
                onClick={handleLinkClick}
              >
                <p>{page.label}</p>
              </Link>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}
