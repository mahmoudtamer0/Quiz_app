import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, Form, Alert } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MoonLoader from "react-spinners/MoonLoader";
import "./quiz.css"
import logoGoogle from "../google.svg"


const Signup = () => {
    //Please check your emails for a message with your code. Your code is 6 numbers long.

    const { checkkkk, setVerifyBtn, codeSignUp, resendeVerify, setEmailSignUp, codeVerify, setPassSignUp, google } = useAuth()
    const [error, setError] = useState("")
    const [active, setActive] = useState(false)
    const [loading, setLoading] = useState(false)
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwrodConfirmationRef = useRef()
    const [message, setMessage] = useState("")
    const location = useLocation()
    const redirectPath = location.state?.path || "/";

    const navigate = useNavigate()

    const handlesubmit = async (e) => {
        e.preventDefault()
        setActive(true)
        let flage = false;
        const code = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
        if (passwordRef?.current.value !== passwrodConfirmationRef?.current.value) {
            return setError("passwrod doesn't match")
        }

        if (passwordRef?.current.value !== "" && emailRef?.current.value !== "" &&
            passwrodConfirmationRef?.current.value !== "") {
            flage = true
        } else flage = false

        if (passwordRef?.current.value !== passwrodConfirmationRef?.current.value) {

        }
        try {
            setLoading(true)
            if (flage) {
                let isExist = true
                await checkkkk(emailRef?.current.value)
                    .then(emailExists => {
                        if (emailExists) {
                            isExist = true
                        } else {
                            isExist = false
                        }
                    }
                    )

                if (!isExist) {
                    setError("")
                    setLoading(true)
                    setEmailSignUp(emailRef?.current.value)
                    setPassSignUp(passwordRef?.current.value)
                    setTimeout(() => {
                        navigate('/verification')
                    }, 1000)
                    await codeVerify(emailRef.current.value, code)
                } else {
                    setError("this email already exist, you can go to login and click forgot password")
                }
            }
        } catch (Error) {
            console.log(Error)
        }
        setTimeout(() => {
            setLoading(false)
        }, 1000)

        // setTimeout(() => {
        //     setVerifyBtn(false)
        // }, 60000)
    }

    const googleSignIn = async () => {
        try {
            await google()
            navigate(redirectPath, { replace: true })
        } catch { }
    }

    return (
        <div className='mainDivOf'>
            <Card style={{ width: "400px" }}>
                <Card.Body>
                    <h2 className='text-center mb-4'>Signup</h2>
                    {error && !loading && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handlesubmit}>
                        <Form.Group className='mb-3'>
                            <Form.Label htmlFor='email'>Email: </Form.Label>
                            <Form.Control ref={emailRef} type='email' id='email' />
                            {active && emailRef.current.value == "" && <p color='dragon'>this field is required</p>}
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label htmlFor='password'>Passwrod: </Form.Label>
                            <Form.Control ref={passwordRef} type='password' id='password' />
                            {active && passwordRef.current.value == "" && <p color='dragon'>this field is required</p>}
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label htmlFor='password'>Confirm Password: </Form.Label>
                            <Form.Control ref={passwrodConfirmationRef} type='password' id='Confirmpassword' />
                            {active && passwrodConfirmationRef.current.value == "" && <p color='dragon'>this field is required</p>}
                        </Form.Group>
                        <Form.Group>
                            {loading &&
                                <div className='mb-3 d-flex justify-content-center'>
                                    <MoonLoader
                                        color='#0075ff'
                                        loading={true}
                                        size={30}
                                        aria-label="Loading Spinner"
                                        data-testid="loader"
                                    />
                                </div>
                            }
                            <Button disabled={loading} variant='primary' type='submit' className='w-100'>
                                Signup
                            </Button>

                            {message}
                        </Form.Group>

                    </Form>
                    <Button style={{ gap: "10px" }} onClick={() => googleSignIn()} variant='secondary' type='submit'
                        className='w-100 mt-3 d-flex justify-content-center align-items-center'>
                        <img src={logoGoogle} style={{ width: "25px" }} />   Continue with google
                    </Button>
                </Card.Body>
                <div className='w-100 text-center mt-2'>
                    Already have an account? <Link to='/login'>Log-in</Link>
                </div>
            </Card>
        </div>
    )
}

export default Signup;