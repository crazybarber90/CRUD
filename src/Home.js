import React, { useState, useEffect } from "react";
import BlogList from "./BlogList";

// USING (installed) JSON package SERVER FOR GETIING DATA (npx json-server --watch data/db.json --port 8000)

export const Home = () => {
  const [blogs, setBlogs] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setErrors] = useState(null);

  // FUNCTION FOR DELETING BLOGS
  const handleDelete = (id) => {
    const newBlogs = blogs.filter((blog) => blog.id !== id);
    setBlogs(newBlogs);
  };

  //  FETCHING DATA FROM data/db
  //  setTimeout used to make fetch more realistic with 1sec delay while getting the data.
  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:8000/blogs")
        .then((res) => {
          if (!res.ok) {
            throw Error("could not fetch the data for that resource");
          }
          return res.json();
        })
        .then((data) => {
          // console.log(data);
          setBlogs(data);
          setIsPending(false);
          setErrors(null);
        })
        .catch((err) => {
          setIsPending(false);
          setErrors(err.message);
        });
    }, 1000);
  }, []);

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {blogs && (
        <BlogList blogs={blogs} title="All Blogs" handleDelete={handleDelete} />
      )}
      {/* <BlogList
        blogs={blogs.filter((blog) => blog.author === "Nikola")}
        title="Nikola's blogs"
      /> */}
    </div>
  );
};
