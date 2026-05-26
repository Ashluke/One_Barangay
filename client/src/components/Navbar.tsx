import "../styles/navbar.css";
import { Link, useLocation } from "react-router-dom";

function Navbar() {

  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="card">

      <div className="title">
        <h2>Barangay Admin Panel</h2>
      </div>

      <div className="buttonContainer">

        {!isActive("/") && (
          <Link to="/">
            <button id="Dashboard">Home</button>
          </Link>
        )}

        {!isActive("/certificates") && (
          <Link to="/certificates">
            <button id="Certificates">Certificates</button>
          </Link>
        )}

        {!isActive("/residents") && (
          <Link to="/residents">
            <button id="Residents">Residents</button>
          </Link>
        )}

      </div>
    </div>
  );
}

export default Navbar;