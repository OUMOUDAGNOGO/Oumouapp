  
import {useAuthValue} from '../Context/AuthContext'
import {useState, useEffect} from 'react'
import {auth, db }from '../Config/fbconfig'
import {sendEmailVerification} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
import { doc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth';

function VerificationEmail() {

  const {currentUser} = useAuthValue()
  const [time, setTime] = useState(60)
  const {timeActive, setTimeActive} = useAuthValue()
  const navigate = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(!user){
        navigate("/login")
      }
    });
  }, [navigate]);

  

  useEffect(() => {
    const interval = setInterval(() => {
      currentUser?.reload()
      .then(() => {
        if(currentUser?.emailVerified){
          clearInterval(interval)
          onSnapshot(doc(db, "vendor", currentUser.uid), (doc) => {
            if (doc.data().role === "Vendor") {
              navigate("/vendor");
            } 
          });
          onSnapshot(doc(db, "client", currentUser.uid), (doc) => {
            if (doc.data().role === "Admin") {
              navigate("/admin");
            } else if(doc.data().role === "Client") {
              navigate("/client");
            } else {
              navigate("/client");
            }
          });
        }
      })
      .catch((err) => {
        alert(err.message)
      })
    }, 1000)
  }, [navigate, currentUser])

  useEffect(() => {
    let interval = null
    if(timeActive && time !== 0 ){
      interval = setInterval(() => {
        setTime((time) => time - 1)
      }, 1000)
    }else if(time === 0){
      setTimeActive(false)
      setTime(60)
      clearInterval(interval)
    }
    return () => clearInterval(interval);
  }, [timeActive, time, setTimeActive])

  const resendEmailVerification = () => {
    sendEmailVerification(auth.currentUser)
    .then(() => {
      setTimeActive(true)
    }).catch((err) => {
      alert(err.message)
    })
  }
  return (
    <div className='text-center'>
      <div className='verifyEmail'>
        <h1>Verifer votre adresse email</h1>
        <p>
          <strong>Un email de verification a été envoyer a votre email:</strong><br/>
          Verifiez votre spam au cas ou vous ne voyez pas dans votre boite de reception
          <span>{currentUser?.email}</span>
        </p>
        <span>Suivez les instruction envoyer par email dans votre compte</span>       
        <button 
         className=" btn btn-primary mx-3"
          onClick={resendEmailVerification}
          disabled={timeActive}
        >Renvoyer email {timeActive && time}</button>
      </div>
    </div>
  )
}

export default VerificationEmail