// app.js
const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

const blogId = 1;

const getOneBlog = async () => {
  const res = await fetch(`${apiUrl}/${blogId}`);
  const data = await res.json();
  console.log(data);
};

getOneBlog();

 /*const getAllBlogs = async () => {
  const res = await fetch(apiUrl);
  const data = await res.json();
  console.log(data);
};
*/
/*
getAllBlogs();

const blog = {
  title: 'My First Blog',
  body: 'Hello from fetch!',
  userId: 1,
};

/*const createBlog = async () => {
  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(blog),
  });

  const data = await res.json();
  console.log('CREATED:', data);
};

createBlog();
*/
