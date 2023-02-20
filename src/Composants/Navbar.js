import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../Config/fbconfig";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

function Navbar({data}) {

const deconnexion = () =>{
  signOut(auth)
  toast.success("deconnexion reussi")
}

  return (
    <nav className="navbar navbar-expand-lg bg-body-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <h3 className="navbrand"> OUMOU'S SHOP</h3>
        </Link>
        {/* <h5>cart</h5> */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Accueil
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/boutique">
                Boutique
              </Link>
            </li>
            {auth.currentUser ? null : (
              <li className="nav-item">
                <Link className="nav-link" to="/devenirvendeur">
                  Devenirvendeur
                </Link>
              </li>
            )}

            {auth.currentUser ? null : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Connexion
                </Link>
              </li>
            )}

            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>

            {!auth.currentUser ? null : (
              <li className="nav-item">
                <Link className="nav-link" to={data}>
                  Dashboard
                </Link>
              </li>
            )}

            {!auth.currentUser ? null : (
              <li className="nav-item">
                <Link className="nav-link" to="/"
                 onClick={deconnexion}
                >
                  Deconnexion
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
