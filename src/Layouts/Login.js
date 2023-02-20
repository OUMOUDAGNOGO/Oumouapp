import React, { useState } from "react";
import {
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../Config/fbconfig";
import { doc, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import { useAuthValue } from "../Context/AuthContext";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { serTimeActive } = useAuthValue();
  const navigate = useNavigate();

  const EnvoiFormulaire = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        if (!auth.currentUser.emailVerified) {
          sendEmailVerification(auth.currentUser)
            .then(() => {
              serTimeActive(true);
              navigate("/email");
            })
            .catch((err) => setError(err.message));
        } else {
          toast.success("connexion avec success");
          const user = auth.currentUser;

          onSnapshot(doc(db, "client", user.uid), (doc) => {
            if (doc.data().role === "Admin") {
              navigate("/admin");
            } else {
              navigate("/client");
            }
          });

          onSnapshot(doc(db, "vendor", user.uid), (doc) => {
            if (doc.data().role === "Vendor") {
              navigate("/vendor");
            }
          });
        }
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div>
     
      <div className="container">
        <div className="row d-flex align-items-center justify-content-center">
          <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-12">
          <div className="text-center">
            <h3 className="color-wh">Votre Premier contact ?</h3>
            <Link
              to="/singup"
              className="btn btn-danger boder rounded-3 fw-bold"
            >
              {" "}
              Creer un Compte
            </Link>
          </div>
            <form className="inputsize" onSubmit={EnvoiFormulaire}>
              {error && <div className="auth__error"> {error} </div>}
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Addresse Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Mot de passe{" "}
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary">
                connexion
              </button>
              <div>
                <Link to="/reset" className="color-wh">
                  Mot de passe oublié ?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
