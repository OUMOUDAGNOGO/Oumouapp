import { useEffect, useState } from "react";
import {
  Accueil,
  AdminDashboard,
  Boutique,
  Clientdashboard,
  Contact,
  Devenirvendeur,
  Login,
  Notfound,
  Resetpassword,
  Singup,
  VendorDashboard,
  VerificationEmail,
} from "./Layouts";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Composants/Navbar";
import Footer from "./Composants/Footer";
import { AuthProvider } from "./Context/AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./Config/fbconfig";
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { doc, onSnapshot } from "firebase/firestore";


const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [timeActive, setTimeActive] = useState(false);


   useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
          setCurrentUser(user)
    })
   })

   const [data, setData] = useState("");
  const getdata = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        onSnapshot(doc(db, "client", user.uid), (doc) => {
          if (doc.data().role === "Admin") {
            setData("admin");
          }
          else {
            setData("client");
          }
        });
      }
    });
    onAuthStateChanged(auth, (user) => {
      if (user) {
        onSnapshot(doc(db, "vendor", user.uid), (doc) => {
          if (doc.data().role === "Vendor") {
            setData("vendor");
          }
        });
      }
    });
  };

  useEffect(() => {
   getdata()
  }, [setData, data]);

 

  // const [cat, setCat] = React.useState([]);

  // useEffect(() => {
  //   const q = query(collection(db, "categories"));
  //   const unsub = onSnapshot(q, (querySnapshot) => {
  //     let todosArray = [];
  //     querySnapshot.forEach((doc) => {
  //       todosArray.push({ ...doc.data(), id: doc.id });
  //     });
  //     setCat(todosArray);
  //   });
  //   return () => unsub();
  // }, []);



  return (
    <>
     <AuthProvider value={{currentUser, timeActive, setTimeActive}}>
      <ToastContainer autoClose={3000} />
     <Navbar data={data} user={currentUser}/>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/boutique" element={<Boutique />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/singup" element={<Singup />} />
        <Route path="/devenirvendeur" element={<Devenirvendeur />} />
        <Route path="/reset" element={<Resetpassword />} />
        <Route path="/email" element={<VerificationEmail />} />
        <Route path="/vendor" element={<VendorDashboard />} />
        <Route path="/client" element={<Clientdashboard />} />

        <Route path="*" element={<Notfound />} />
      </Routes>
      <Footer />
     </AuthProvider>
    </>
  );
};

export default App;
