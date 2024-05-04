
import { useEffect, useRef, useState } from 'react'
import './quiz.css'
import Quiz from './Quiz'
import { set } from 'firebase/database'
const Products = () => {

    const [questions, setQuestions] = useState([])
    const [score, setScore] = useState(0)
    const [final, setFinal] = useState(false)
    const [of, setOf] = useState(false)
    const [accept, setAccept] = useState(false)
    const [scoreMessage, setScoreMessage] = useState('')
    const [clear, setClear] = useState(false)
    const [minutes, setMinutes] = useState(`00`)
    const [seconds, setSeconds] = useState(`00`)



    const countDownFunc = (duration) => {
        let minutes, seconds;
        let countInterval;
        countInterval = setInterval(() => {
            minutes = parseInt(duration / 60)
            seconds = parseInt(duration % 60)
            minutes = minutes < 10 ? `0${minutes}` : minutes;
            seconds = seconds < 10 ? `0${seconds}` : seconds;
            setMinutes(minutes)
            setSeconds(seconds)
            if (--duration < 0 || clear) {
                btnRef.current?.click()
                clearInterval(countInterval);
            }

            if (duration < 30) {
                setClear(true)
            }

        }, 1000);
    }

    useEffect(() => {
        fetch("data.json").then(res => res.json())
            .then(data => setQuestions(data))
        countDownFunc(60)
    }, [])

    const handleSubmit = () => {
        setFinal(true)
        setOf(true)
        setAccept(true)
        if (score > 8 && score < 10) {
            setScoreMessage
                (
                    <div className='perfect'>
                        <span className='perfectspan'>Perfect</span>
                        you got
                        <span className='scorespan'>
                            {score}/{questions?.length}
                        </span>
                    </div>
                )
        } else if (score > 5 && score < 8) {
            setScoreMessage
                (
                    <div className='good'>
                        <span className='goodspan'>
                            Good
                        </span>
                        you got
                        <span className='scorespan'>
                            {score}/{questions?.length}
                        </span>
                    </div>
                )
        } else {
            setScoreMessage
                (
                    <div className='oops'>
                        <span className='oopsspan'>
                            oops...
                        </span>
                        you got
                        <span className='scorespan'>
                            {score}/{questions?.length}
                        </span>
                    </div>
                )
        }
    }





    const btnRef = useRef()

    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;

            setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollPos]);

    return (
        <>
            <div className={`${accept ? "d-none" : "countDown"} ${visible ? 'countVisible' : 'countHidden'}`}>
                <div className={clear ? "red" : "green"}>
                    {`${minutes}:${seconds}`}
                </div>
            </div>
            <div className='quiz-app'>

                {questions.map((question, index) => (

                    <Quiz
                        question={question}
                        score={score}
                        setScore={setScore}
                        index={index}
                        of={of}
                        accept={accept}
                    />
                ))}

                {final && (
                    scoreMessage
                )}
                <button ref={btnRef} onClick={() => handleSubmit()} className='submit-button'>submit answers</button>

            </div >
        </>
    )
}

export default Products