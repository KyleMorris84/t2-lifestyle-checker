import './questionnaire.css'

export default function Questionnaire() {
    return(
        <div className="container">
            <div className="intro-container">
                <h2>Questionnaire</h2>
                <p>Please answer the following three lifestyle questions</p>
            </div>
            <form id="questionnaire" className="input-container">
                <div className="question">
                    <p>Q1. Do you drink on more than 2 days a week?</p>
                    <div>
                        <input type="radio" name="q1" value="yes"></input>
                        <label> Yes</label>
                    </div>
                    <div>
                        <input type="radio" name="q1" value="no"></input>
                        <label> No</label>
                    </div>
                </div>

                <div className="question">
                    <p>Q2. Do you smoke?</p>
                    <div>
                        <input type="radio" name="q2" value="yes"></input>
                        <label> Yes</label>
                    </div>
                    <div>
                        <input type="radio" name="q2" value="no"></input>
                        <label> No</label>
                    </div>
                </div>

                <div className="question">
                    <p>Q3. Do you exercise more than 1 hour per week?</p>
                    <div>
                        <input type="radio" name="q3" value="yes"></input>
                        <label> Yes</label>
                    </div>
                    <div>
                        <input type="radio" name="q3" value="no"></input>
                        <label> No</label>
                    </div>
                </div>
            </form>
        </div>
    )
}