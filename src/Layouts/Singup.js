import React, { useState } from "react";
import {createUserWithEmailAndPassword, sendEmailVerification} from 'firebase/auth'
import {auth, db} from '../Config/fbconfig'
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthValue } from "../Context/AuthContext";



function Singup() {
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmpassword] = useState("");
  const [error, setError] = useState("");
  const {setTimeActive} = useAuthValue();
 
  const navigate = useNavigate()

  const validerMotdepasse = () =>{
    let EstValid = true
    if(password !== "" && confirmPassword !== ""){
      if(password !== confirmPassword){
        EstValid = false
        setError("Veillez enter le meme mot de passe")
      }
    }
    return EstValid
  }

  const EnvoiFormulaire = (e) =>{
    e.preventDefault()
    setError("")
    if(validerMotdepasse()){
      createUserWithEmailAndPassword(auth, email, password)
      .then((res) =>{ 
        setDoc(doc(db, "client", res.user.uid), {
          nom,
          prenom,
          email,
          role:"Client",
          userId: res.user.uid
        })
        
      })
      .then( () =>{
        toast.success("reussi")
        sendEmailVerification(auth.currentUser)
        .then(() =>{
          setTimeActive(true);
          navigate("/email")
        })
        .catch((err) => setError(err.message))
      })
      .catch((err) => setError(err.message))
    
    }
    setEmail("")
    setNom("")
    setPassword("")
    setPrenom("")
    setConfirmpassword("")
  }

  return (
    <div className="container">
      <div className="row d-flex align-items-center justify-content-center">
        <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-12">
        <div className="text-center">
              <h3 className="color-wh">Nouveau Utilisateur ?</h3>
            </div> 
          <form className="inputsize" onSubmit={EnvoiFormulaire}>
            {error && <div className="auth__error"> {error} </div>}
            <div className="mb-3">
              <label htmlFor="prenom" className="form-label">
                Prenom
              </label>
              <input
                type="text"
                className="form-control"
                id="prenom"
                required
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="nom" className="form-label">
                Nom
              </label>
              <input
                type="text"
                className="form-control"
                id="nom"
                required
                value={nom}
                onChange={(e) => setNom(e.target.value)}
              />
            </div>

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

            <div className="mb-3">
              <label htmlFor="confirmpassword" className="form-label">
                Confirmer
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmpassword"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmpassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Inscription
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Singup;
