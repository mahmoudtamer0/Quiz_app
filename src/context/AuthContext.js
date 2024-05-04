import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithPopup,
    sendEmailVerification,
    applyActionCode,
    signInWithEmailLink,
    isSignInWithEmailLink,
    sendSignInLinkToEmail,
    SignInMethod,
    fetchSignInMethodsForEmail,
} from "firebase/auth";
import { auth, provider, faceProvider } from '../firebase'
import emailjs from 'emailjs-com';

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const [veryfied, setVeryfied] = useState(false)
    const [verifyBtn, setVerifyBtn] = useState(false);
    const [emailSignUp, setEmailSignUp] = useState()
    const [passSignUp, setPassSignUp] = useState()
    const [codeSignUp, setCodeSignUp] = useState()
    const [canGoToverify, setCanGoToverify] = useState(false)


    const signup = async (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    console.log(codeSignUp)

    const codeVerify = async (email, code) => {
        setCodeSignUp(code)
        try {
            await emailjs.send('service_5qhb8wa', 'template_up48ilh', {
                to_email: email,
                to_name: 'name',
                message: code
            }, 's8d_HsS8GsbrNNZvN')
                .then((response) => {
                    alert('Email sent successfully!');
                })
                .catch((error) => {
                    console.error('Error sending email:', error);
                    alert('Failed to send email. Please try again later.');
                });
        } catch { }

    }

    const resendeVerify = () => {
        return sendEmailVerification(auth.currentUser).then(() =>
            alert("verifycation link sent to your email")
        )
    }



    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        return signOut(auth)
    }

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
    }

    const google = () => {
        return signInWithPopup(auth, provider).then((payload) => console.log(payload))
    }

    const face = () => {
        return signInWithPopup(auth, faceProvider).then((payload) => console.log(payload))
    }


    useEffect(() => {
        const unSub = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            setLoading(false)
        })
        return () => {
            unSub();
        }
    }, [])

    const checkkkk = (email) => {
        return fetchSignInMethodsForEmail(auth, email)
            .then(signInMethods => {
                return signInMethods.length > 0;
            })
            .catch(error => {
                console.log("Error checking email existence:", error);
                return false;
            });
    }

    return <AuthContext.Provider value={{
        currentUser, signup, logOut, login,
        setVeryfied, resendeVerify, verifyBtn, setVerifyBtn,
        resetPassword, google, face, veryfied, emailSignUp, setEmailSignUp,
        codeSignUp, codeVerify, passSignUp, setPassSignUp, checkkkk,
        canGoToverify, setCanGoToverify
    }}>
        {!loading && children}
    </AuthContext.Provider>
}

export default AuthProvider

export const useAuth = () => {
    return useContext(AuthContext)
}