const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
const testFech = async () => {
  const res = await fetch(apiUrl);
  const data = await res.json();
  console.log(data.length);
}

testFech();
