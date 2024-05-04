import { Button, Card, Form, Alert } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext';
import "./quiz.css"
import logoGoogle from "../google.svg"
import {
    onAuthStateChanged,
} from "firebase/auth";
import { auth } from '../firebase';

const Login = () => {

    const { login, checkkkk, google } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)
    const [accept, setAccept] = useState(false)
    const emailRef = useRef()
    const passwordRef = useRef()
    const navigate = useNavigate()
    const location = useLocation()
    const redirectPath = location.state?.path || "/";


    const handlelogin = async (e) => {
        e.preventDefault()
        let flage = true;
        let isExist = false;
        setAccept(true)
        if (emailRef.current?.value == '' || passwordRef.current?.value == '') {
            flage = false;
        } else flage = true;
        try {
            if (flage) {
                setError("")
                setLoading(true)
                await checkkkk(emailRef?.current.value)
                    .then(emailExists => {
                        if (emailExists) {
                            isExist = true
                        } else {
                            isExist = false
                        }
                    }
                    )
                if (isExist) {
                    await login(emailRef.current.value, passwordRef.current.value);
                    navigate(redirectPath, { replace: true })
                } else {
                    setError("user not found , please sign-up first")
                }
            }
        }
        catch (error) {
            setError("Wrong passsword, you can click forgot password")
        }
        setLoading(false)
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
                    <h2 className='text-center mb-4'>Login</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handlelogin}>
                        <Form.Group className='mb-3'>
                            <Form.Label htmlFor='email'>Email: </Form.Label>
                            <Form.Control ref={emailRef} type='email' id='email' />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label htmlFor='password'>Passwrod: </Form.Label>
                            <Form.Control ref={passwordRef} type='password' id='password' />
                        </Form.Group>
                        <Form.Group>
                            <Button variant='primary' type='submit' className='w-100'>
                                Login
                            </Button>
                        </Form.Group>
                    </Form>
                    <Button style={{ gap: "10px" }} onClick={() => googleSignIn()} variant='secondary' type='submit'
                        className='w-100 mt-3 d-flex justify-content-center align-items-center'>
                        <img src={logoGoogle} style={{ width: "25px" }} />   Continue with google
                    </Button>
                    <div className='w-100 text-center mt-3'>
                        <Link to='/forgot-password'>Forgot Passwrod</Link>
                    </div>

                </Card.Body>
                <div className='w-100 text-center mt-2'>
                    Don't have an account? <Link to='/Signup'>Signup</Link>
                </div>
            </Card>

        </div>
    )
}

export default Login;