import './questionnaire.css'
import React from 'react'
import {useState} from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

export default function Questionnaire({userInfo, setUserInfo}) {

    const scoring = [
        [1, 2, 1],
        [2, 2, 3],
        [3, 2, 2],
        [3, 3, 1]
    ]
    const boundaryAges = [21, 40, 65, 200]

    const [answers, setAnswers] = useState([-1, -1, -1])
    const [popupOpen, setPopupOpen] = useState(false)
    const [score, setScore] = useState(0)

    function updateAnswers(event) {
        let {name, value} = event.target
        const nextAnswers = answers.map((a, i) => {
            if (i === parseInt(name[1])-1) return parseInt(value)
            return a
        })
        setAnswers(nextAnswers)
    }

    function calculateScore() {
        let total = 0
        for (let i=0; i<4; i++) {
            if (userInfo.age <= boundaryAges[i]) {
                for (let j=0; j<3; j++) {
                    total += scoring[i][j] * answers[j] 
                }
                break
            }
        }
        return total
    }

    function submitQuestionnaire(event) {
        event.preventDefault()
        setScore(calculateScore())
        if (answers[0] !== -1 && answers[1] !== -1 && answers[2] !== -1) {
            setPopupOpen(o => !o)
        }
        console.log(score)
    }

    return(
        <div className="container">
            <div className="intro-container">
                <h2>Questionnaire</h2>
                <p>Please answer the following three lifestyle questions</p>
            </div>
            <form id="questionnaire" className="input-container" onSubmitCapture={submitQuestionnaire}>
                <div className="question">
                    <p>Q1. Do you drink on more than 2 days a week?</p>
                    <div>
                        <input type="radio" name="q1" value={1} onChange={updateAnswers} required></input>
                        <label> Yes</label>
                    </div>
                    <div>
                        <input type="radio" name="q1" value={0} onChange={updateAnswers}></input>
                        <label> No</label>
                    </div>
                </div>

                <div className="question">
                    <p>Q2. Do you smoke?</p>
                    <div>
                        <input type="radio" name="q2" value={1} onChange={updateAnswers} required></input>
                        <label> Yes</label>
                    </div>
                    <div>
                        <input type="radio" name="q2" value={0} onChange={updateAnswers}></input>
                        <label> No</label>
                    </div>
                </div>

                <div className="question">
                    <p>Q3. Do you exercise more than 1 hour per week?</p>
                    <div>
                        <input type="radio" name="q3" value={0} onChange={updateAnswers} required></input>
                        <label> Yes</label>
                    </div>
                    <div>
                        <input type="radio" name="q3" value={1} onChange={updateAnswers}></input>
                        <label> No</label>
                    </div>
                </div>
                <button className="submit" onClick={() => submitQuestionnaire}>
                    Submit
                </button>
                <div className="popup-wrapper">
                    <Popup open={popupOpen} onClose={()=>setPopupOpen(false)}>
                        <p className="popup-text">{
                            score < 4 ?
                            "Thank you for answering our questions, we don't need to see you at this time. Keep up the good work!" :
                            "We think there are some simple things you could do to improve you quality of life, please phone to book an appointment."
                        }</p>
                    </Popup>
                    { popupOpen && <div onClick={()=>setPopupOpen(false)} className="close-button"></div> }
                </div>
            </form>
        </div>
    )
}