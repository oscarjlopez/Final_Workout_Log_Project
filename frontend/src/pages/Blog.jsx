import { useState, useEffect } from "react";
import Header from "../components/Header";

const site = "demo5435.wordpress.com";

function Blog2() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State to store error messages

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`https://public-api.wordpress.com/wp/v2/sites/${site}/posts`);
        if (!res.ok) throw new Error(`Failed to fetch posts: ${res.statusText}`);

        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        setError("Failed to load blog posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <>
      <Header />
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
        <h1 style={{ textAlign: "center", color: "#333" }}>Workout & Nutrition Blog</h1>

        {loading ? (
          <p style={{ textAlign: "center" }}>Loading blog posts...</p>
        ) : error ? (
          <p style={{ textAlign: "center", color: "red" }}>{error}</p>
        ) : posts.length === 0 ? (
          <p style={{ textAlign: "center" }}>No blog posts found.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: "0" }}>
            {posts.map((post) => (
              <li
                key={post.id}
                style={{
                  borderBottom: "1px solid #ddd",
                  paddingBottom: "15px",
                  marginBottom: "15px",
                }}
              >
                <h2 style={{ color: "#2d2d2d", fontSize: "1.5em" }}>{post.title.rendered}</h2>
                <div
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                  style={{ color: "#555", marginBottom: "10px" }}
                />
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#0066cc",
                    textDecoration: "none",
                    fontWeight: "bold",
                  }}
                >
                  Read More
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default Blog2;
