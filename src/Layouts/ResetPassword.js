import { useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../Config/fbconfig";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        setMsg("An email has been sent to your mail address , please check it ");
      })
      .catch((err) => setError(err.message));
  };

  return (
    <>
      <div className="container   login-bg-color mt-3">
        <div className="row justify-content-center align-items-center">
          <div className=" col-6 .offset-3 main-color">
          <div className="text-center">
              <h3 className="color-wh">Mot de passe reset</h3>
              <Link
                to="/login"
                className="btn btn-danger boder rounded-3 fw-bold"
              >
                {" "}
                Connexion
              </Link>
            </div>
            <form className="p-4 p-md-2 my-3" onSubmit={handleSubmit}>
              {error && <div className="auth__error">{error}</div>}
              {msg && <div className="auth__error">{msg}</div>}
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control bgcolor"
                  id="email"
                  name="email"
                  placeholder="name@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: "30rem", height: "3rem" }}
                />
                <label for="floatingInput">Email address</label>
              </div>

              <div className="checkbox mb-3"></div>
              <button
                className=" btn btn-lg btn-primary color-wh"
                type="submit"
                style={{ width: "20rem", height: "3rem" }}
              >
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword

