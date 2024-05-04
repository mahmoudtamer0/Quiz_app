import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddQuestion = () => {

    const [title, setTitle] = useState('')
    const [answer1, setAnswer1] = useState('')
    const [answer2, setAnswer2] = useState('')
    const [answer3, setAnswer3] = useState('')
    const [answer4, setAnswer4] = useState('')
    const [rightAnswer, setRightAnswer] = useState('')
    const [loading, setLoading] = useState(false)
    const [accept, setAccept] = useState(false)
    const [right, setRight] = useState(false)
    const [error, setError] = useState("")
    const [succes, setSucces] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setAccept(true)
        let flage = true;
        if (title !== "" && answer1 !== "" && answer2 !== "" && answer3 !== '' && rightAnswer !== "" && right) {
            flage = true;
            setError('')
        } else {
            flage = false
            setError("please fill all inputs")
        }

        try {
            if (flage) {
                setError("")
                setLoading(true)
                axios.post("http://localhost:9000/questions", {
                    title: title,
                    answers: [
                        {
                            answer: answer1
                        },
                        {
                            answer: answer2
                        },
                        {
                            answer: answer3
                        },
                        {
                            answer: answer4
                        }
                    ],
                    right_answer: rightAnswer
                }).then(data => {
                    setSucces('the question added succesfuly...you are now redirecting to main page')
                    setTimeout(() => {
                        setSucces("")
                        setAnswer1("")
                        setAnswer2("");
                        setAnswer3("");
                        setAnswer4("");
                        setRightAnswer("");
                        setTitle("");
                        navigate("/")
                    }, 2000);
                })
            }
        } catch (error) {
            setError(error.message)
        }
        setLoading(false)
    }

    const formref = useRef()
    useEffect(() => {
        if (rightAnswer == answer1 || rightAnswer == answer2 || rightAnswer == answer3 || rightAnswer == answer4) {
            setRight(true)
            setError('')
        } else {
            setRight(false)
            setError("The right answer doesn't match any answer")
        }
    }, [rightAnswer])


    return (
        <div>
            <div className='container'>
                <form ref={formref} onSubmit={handleSubmit} style={{ margin: "100px auto" }} className="row w-50 justify-content-center align-items-center">
                    <div className="col-12 mb-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Question title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="col-12 mb-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Answer-1"
                            aria-label="Last name"
                            value={answer1}
                            onChange={(e) => setAnswer1(e.target.value)}
                        />
                    </div>
                    <div className="col-12 mb-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Answer-2"
                            value={answer2}
                            onChange={(e) => setAnswer2(e.target.value)}
                        />
                    </div>
                    <div className="col-12 mb-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Answer-3"
                            value={answer3}
                            onChange={(e) => setAnswer3(e.target.value)}
                        />
                    </div>
                    <div className="col-12 mb-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Answer-4"
                            value={answer4}
                            onChange={(e) => setAnswer4(e.target.value)}
                        />
                    </div>
                    <div className="col-12 mb-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Right Answer"
                            value={rightAnswer}
                            onChange={(e) => setRightAnswer(e.target.value)}
                        />
                    </div>
                    {succes !== "" && accept && <div className="mb-3 mt-3 alert alert-success" role="success">{succes}</div>}
                    {error !== "" && accept && <div className="mb-3 mt-3 alert alert-danger" role="alert">{error}</div>}
                    <div className="col-12 mb-4">
                        <button type='submit' className='btn btn-primary w-100'>Add</button>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default AddQuestion