import React, { useState } from 'react'
import "./quiz.css"
const Quiz = ({ question, of, score, setScore, index, accept }) => {
    const [answer, setAnswer] = useState('')
    const handleChange = (value) => {
        setAnswer(value)
        if (value === question.right_answer) {
            setScore(score + 1)
        }
    }

    const [answers, setAnswers] = useState(question.answers)
    return (
        <div className="quiz-app">
            <div>
                <div className="quiz-area">
                    <h2>{index + 1 + ")"} {question.title}</h2>
                </div>
                <div className="answers-area">
                    {answers.map(ans => (
                        <div
                            className=
                            {
                                ans.answer === question.right_answer
                                    &&
                                    accept
                                    ?
                                    "right answer" : "answer"
                                        &&
                                        ans.answer === answer
                                        &&
                                        accept ?
                                        "wrong answer" : "answer"
                            }
                        >
                            <input
                                onChange={(e) => handleChange(e.target.dataset.answer)}
                                data-answer={ans.answer}
                                type='radio'
                                id={ans.answer}
                                disabled={of}
                                name={question.title} />
                            <label htmlFor={ans.answer}>{ans.answer}</label>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bullets">
                <div className="spans"></div>
                <div className="countdown"></div>
            </div>
            <div className="results"></div>
        </div>
    )
}

export default Quiz