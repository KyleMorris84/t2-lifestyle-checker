import Header from './components/Header.jsx'
import SignIn from './components/SignIn.jsx'
import Questionnaire from './components/Questionnaire.jsx'

import {useState} from 'react'

export default function App() {

  const [userInfo, setUserInfo] = useState({
    nhsNumber: "",
    name: "",
    born: "",
    age: ""
});

  const [signInComplete, setSignInComplete] = useState(false)

  return (
    <div className="main">
      <Header />
      { 
        signInComplete ? 
        <Questionnaire 
          userInfo={userInfo} 
          setUserInfo={setUserInfo} 
        /> : 
        <SignIn 
          setSignInComplete={setSignInComplete}
          userInfo={userInfo}
          setUserInfo={setUserInfo} 
        />
      }
    </div>
  );
}