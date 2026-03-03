import useFetch from "../hooks/useFetch";
import BookListings from "../components/BookListings";

const Home = () => {
  const { data: books, loading: isPending, error } = useFetch("/api/books");

  

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {books && <BookListings books={books} />}
    </div>
  );
};

export default Home;
