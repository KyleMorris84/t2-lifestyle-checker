import './signin.css'
import {useState} from 'react'

export default function SignIn({userInfo, setUserInfo, setSignInComplete}) {
    
    const [submissionResult, setSubmissionResult] = useState("Valid")

    function handleChange(event) {
        let {name, value} = event.target

        if (name === "name") {
            value = value.toUpperCase()
        }

        setUserInfo(prevUserInfo => {
            return({...prevUserInfo, [name]:value})
        })
    }

    async function submitSignIn(event) {
        event.preventDefault()
        try {
            let response = await fetch(`https://al-tech-test-apim.azure-api.net/tech-test/t2/patients/${userInfo.nhsNumber}`, {
                headers: {
                    "Ocp-Apim-Subscription-Key": process.env.REACT_APP_Api_Subscription_Key
                } 
            })
            if(!response.ok) throw Error("BadRequest")
            response = await response.json()
            response = {...response, "name":response.name.split(",")[0]}
            response = {...response, "born":(response.born.substring(6,10) + "-"  + response.born.substring(3,5) + "-" + response.born.substring(0,2))}

            const detailsMatch = await response.nhsNumber === userInfo.nhsNumber && response.name === userInfo.name && response.born === userInfo.born
            if (!detailsMatch) throw Error("IncorrectDetails")
            
            const dateNow = new Date()
            const dob = new Date(response.born)
            const diffTime = Math.abs(dateNow - dob)
            const age = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365.25))
            setUserInfo(prevUserInfo => {
                return({...prevUserInfo, "age" : age})
            })
            if (age < 16) throw Error("Ineligible")
            setSubmissionResult("Valid")
            setSignInComplete(true)
        } catch (error) {
            if (error.message === "Ineligible") setSubmissionResult("You are not eligble for this service")
            else setSubmissionResult("Your details could not be found")
        }
    }

    return(
        <div className="container">
            <div className="intro-container">
                <h2>Sign in</h2>
                <p>Welcome to the T2 Lifestyle Checker. Please sign in with your NHS number, surname and date of birth to continue</p>
            </div>
            <form className="input-container" onSubmit={submitSignIn}>
                <div className="entries">
                    <div>
                        <label>NHS Number</label>
                        <input className="input" type="text" name="nhsNumber" onChange={handleChange} required></input>
                    </div>
                    <div>
                        <label>Surname</label>
                        <input className="input" type="text" name="name" onChange={handleChange} required></input>
                    </div>
                    <div>
                        <label>Date of birth</label>
                        <input className="input" type="date" name="born" onChange={handleChange} required></input>
                    </div>
                </div>
                <button className="submit">Submit</button>
            </form>
            {submissionResult!=='Valid' && <p className="error-container">{submissionResult}</p> }
        </div>
    )
}