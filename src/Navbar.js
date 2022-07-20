import React from "react";
import { Link } from "react-router-dom";

export const Navbar = (props) => {
  return (
    <nav className="navbar">
      <h1>Nikolin Blog</h1>
      <div className="links">
        <Link to="/">Home </Link>
        <Link to="/create">New Blog</Link>
      </div>
    </nav>
  );
};
