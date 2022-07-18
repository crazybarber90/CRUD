import React from "react";

export const Navbar = (props) => {
  return (
    <nav className="navbar">
      <h1>Nikolin Blog</h1>
      <div className="links">
        <a href="/">Home </a>
        <a href="/create">Novi Blog</a>
      </div>
    </nav>
  );
};
