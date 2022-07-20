import React, { useState, useEffect } from "react";
import BlogList from "./BlogList";
import useFetch from "./useFetch";

// USING (installed) JSON package SERVER FOR GETIING DATA (npx json-server --watch data/db.json --port 8000)

export const Home = () => {
  const {
    data: blogs,
    setData,
    isPending,
    error,
  } = useFetch("http://localhost:8000/blogs");

  // FUNCTION FOR DELETING BLOGS
  const handleDelete = (id) => {
    const newBlogs = blogs.filter((blog) => blog.id !== id);
    setData(newBlogs);
  };

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {blogs && (
        <BlogList blogs={blogs} title="All Blogs" handleDelete={handleDelete} />
      )}
      {/* {blogs && (
        <BlogList
          blogs={blogs.filter((blog) => blog.author === "Nikola")}
          title="Nikola's blogs"
          handleDelete={handleDelete}
        />
      )} */}
    </div>
  );
};
