import { Button, Card, Form, Alert } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext';
import emailjs from 'emailjs-com';
import "./quiz.css"
import MoonLoader from "react-spinners/MoonLoader";

const Verification = () => {

    const { signup, codeSignUp, emailSignUp, passSignUp, codeVerify } = useAuth()
    const [loading, setLoading] = useState(false)
    const [verified, setVerified] = useState()
    const [verifiedBool, setVerifiedBool] = useState(false)
    const codeRef = useRef()
    const navigate = useNavigate()
    const location = useLocation()
    const redirectPath = location.state?.path || "/";

    const [seconds, setSeconds] = useState(60);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds - 1);
        }, 1000);
        return () => {
            clearInterval(intervalId);
        };
    }, []);



    const getUser = async () => {
        const code = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
        try {
            setLoading(true)
            await codeVerify(emailSignUp, code)
            setSeconds(30)
        } catch { }
        setLoading(false)
    }

    const handlesubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            if (codeSignUp == codeRef?.current.value) {
                await signup(emailSignUp, passSignUp)
                setVerifiedBool(true)
                setVerified(<Alert variant="success">verified</Alert>)
                setTimeout(() => {
                    navigate(redirectPath, { replace: true })
                }, 3000)
            } else {
                setVerified(<Alert variant="danger">Wrong Code</Alert>)
            }
        } catch { }

        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }

    console.log(seconds)


    return (
        <div className='mainDivOf'>
            <Card style={{ width: "400px" }}>
                <Card.Body>
                    <h2 className='text-center mb-4'>Email Verification</h2>
                    <p>Please check your emails for a message with your code. Your code is 4 numbers long.</p>
                    <p>we sent code to: <strong>{emailSignUp}</strong></p>
                    <Form onSubmit={handlesubmit}>
                        <Form.Group className='mb-3'>
                            <Form.Label htmlFor='code'>Verification code: </Form.Label>
                            <Form.Control ref={codeRef} type='number' id='code' />
                        </Form.Group>
                        {!loading ?
                            <>
                                {verified}
                                <Button disabled={verifiedBool} type='submit' variant='primary' className='w-100'>
                                    Verify
                                </Button>
                            </>
                            :
                            <MoonLoader
                                color='#0075ff'
                                loading={true}
                                size={30}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />}
                    </Form>

                    {!loading &&
                        <Button className="mt-3 w-100" disabled={seconds > 0 || loading || verifiedBool ? true : false} onClick={() => getUser()} variant='primary'>
                            Re-send code {seconds > 1 ? seconds : null}
                        </Button>
                    }

                    <div className='w-100 text-center mt-3'>
                        <Link to='/signup'>Signup</Link>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Verification