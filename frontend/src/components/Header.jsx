import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header style={{ padding: "1rem", background: "#222", color: "#fff" }}>
      <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
        <h2>MERL Shop</h2>
      </Link>
    </header>
  );
};

export default Header;