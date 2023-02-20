import React, { useState } from "react";
import {createUserWithEmailAndPassword, sendEmailVerification} from 'firebase/auth'
import {auth, db} from '../Config/fbconfig'
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthValue } from "../Context/AuthContext";



function Devenirvendeur() {
  const [nomComplet, setnomComplet] = useState("");
  const [boutique, setBoutique] = useState("");
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
        setDoc(doc(db, "vendor", res.user.uid), {
          boutique,
          nomComplet,
          email,
          role:"Vendor",
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
    setBoutique("")
    setPassword("")
    setnomComplet("")
    setConfirmpassword("")
  }

  return (
    <div className="container">
      <div className="row d-flex align-items-center justify-content-center">
        <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-12">
          <form className="inputsize" onSubmit={EnvoiFormulaire}>
            {error && <div className="auth__error"> {error} </div>}
            <div className="mb-3">
              <label htmlFor="nomComplet" className="form-label">
                nom Complet
              </label>
              <input
                type="text"
                className="form-control"
                id="nomComplet"
                required
                value={nomComplet}
                onChange={(e) => setnomComplet(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="boutique" className="form-label">
                Boutique
              </label>
              <input
                type="text"
                className="form-control"
                id="boutique"
                required
                value={boutique}
                onChange={(e) => setBoutique(e.target.value)}
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

export default Devenirvendeur;
