import { Link } from "react-router-dom";

function Navbar({ isAuthenticated, setIsAuthenticated }) {
  const handleClick = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  const user = JSON.parse(localStorage.getItem("user")); // ممکنه null باشه
  const email = user?.email;

  return (
    <nav>
      {isAuthenticated && (
        <div>
          <span>Welcome{email ? `, ${email}` : ""}</span>

          <Link to="/">Home</Link>
          <Link to="/profile">Profile</Link>

          <button onClick={handleClick}>Log out</button>
        </div>
      )}

      {!isAuthenticated && (
        <div>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>
      )}
    </nav>
  );
  
}
export default Navbar;