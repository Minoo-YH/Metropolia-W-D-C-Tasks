import { useEffect, useState } from 'react';

const Home = () => {
  const [blogs, setBlogs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  // Runs once when component mounts (empty dependency array)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(
          'https://jsonplaceholder.typicode.com/posts'
        );

        if (!res.ok) {
          throw new Error('Failed to fetch blogs');
        }

        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Blogs</h1>
      {blogs.slice(0, 5).map((blog) => (
        <div key={blog.id}>
          <h3>{blog.title}</h3>
          <p>{blog.body}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;

