import './content.css'

export default function Content() {
    return(
        <div className="container">
            <div className="intro-container">
                <h2>Sign in</h2>
                <p>Welcome to the T2 Lifestyle Checker. Please sign in with your NHS number, surname and date of birth to continue</p>
            </div>
            <div className = "input-container">
                <div className="entries">
                    <div>
                        <label for="nhsNumber">NHS Number</label>
                        <input className="input" type="text" name="nhsNumber"></input>
                    </div>
                    <div>
                        <label for="surname">Surname</label>
                        <input className="input" type="text" name="surname"></input>
                    </div>
                    <div>
                        <label for="dateOfBirth">Date of birth</label>
                        <input className="input" type="date" name="dateOfBirth"></input>
                    </div>
                </div>
                <button className="submit">Submit</button>
            </div>
        </div>
    );
}