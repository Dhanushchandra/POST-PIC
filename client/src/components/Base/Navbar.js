import React, { useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import Logout from "../Forms/Logout";
import "./styles/Navbar.css";
import { isAuthenticated } from "../../helpers/Authenticated";

function Navbar() {
  const userName = localStorage.getItem("userName");

  const [token, setToken] = React.useState(false);

  useLayoutEffect(() => {
    isAuthenticated()
      .then((res) => {
        if (res) {
          setToken(true);
        } else {
          setToken(false);
        }
      })
      .catch((err) => {
        setToken(false);
      });
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          POST-PI
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end "
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav ">
            {token ? (
              <a className="nav-link active user-name " aria-current="page">
                <Link className="link" to="/">
                  <span className="user-name-text">
                    <i className="fa fa-solid fa-user"></i>
                    {userName}
                  </span>
                </Link>
              </a>
            ) : null}

            <a className="nav-link active " aria-current="page">
              <Link className="link" to="/">
                Home
              </Link>
            </a>

            {token ? (
              <a className="nav-link  " aria-current="page">
                <Link className="link" to="/myposts">
                  My Posts
                </Link>
              </a>
            ) : null}

            {token ? (
              <a className="nav-link  " aria-current="page">
                <Link className="link" to="/createpost">
                  Create
                </Link>
              </a>
            ) : null}

            <a className="nav-link">
              {token ? null : (
                <Link className="link" to="/register">
                  Register
                </Link>
              )}
            </a>
            <a className="nav-link">
              {token ? null : (
                <Link className="link" to="/login">
                  Login
                </Link>
              )}
            </a>
            {token ? <Logout /> : null}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
