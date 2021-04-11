import React, {useEffect, useState } from "react"
import {Switch, Route} from "react-router-dom"
import {auth} from "./firebaseConfig"
import { useHistory } from "react-router-dom";


import HomeContainer from "./containers/HomeContainer"
import Header from "./components/Header"
import LoginComponent from "./components/LoginComponent"
import SingleContainer from "./containers/SingleContainer"

function App() {
  const history = useHistory();
  const [user, setUser] = useState(null)
 
  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{if(user) setUser(user.email)})},[]) 

    const logOut = () => {
      auth.signOut().then(()=>
      {setUser(null)
        return history.push("/")
       });
     };

   return (
  <>
    <Header user={user} logout={logOut}  />
    <div id="container">
       <Switch>
           <Route exact path="/" render={()=><HomeContainer user={user} />}></Route>
           <Route exact path="/signup" render={()=><LoginComponent/>}></Route>
           <Route exact path="/details/:id" render={()=><SingleContainer/>}></Route>
       </Switch>
    </div>
    </>
  )
}

export default App
