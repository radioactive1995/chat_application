import './Signup.css'
import React, {useRef, useState, useEffect} from 'react';
import { useAuth } from '../contexts/AuthContext'
import {  useNavigate, Link  } from 'react-router-dom'

export default function Signup() {
    const { signup, currentUser  } = useAuth();
    const password = useRef();
    const confirmPassword = useRef()
    const [formData, setFormData]  = useState({
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const onChangeEmail = (e) => 
    { 
        setFormData((prevFormState => ({email: e.target.value, password: prevFormState.password, confirmPassword: prevFormState.confirmPassword})))
        setError('')
    }
    const onChangePassword = (e) => 
    { 
        setFormData((prevFormState => ({email: prevFormState.email, password: e.target.value, confirmPassword: prevFormState.confirmPassword})))
        setError('')
    }
    const onChangeConfirmPassword = (e) => 
    { 
        setFormData((prevFormState => ({email: prevFormState.email, password: prevFormState.password, confirmPassword: e.target.value})))
        setError('')
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        if(password.current.value !== confirmPassword.current.value) {
            setError('Passwords doesn\'t match.')
            return;
        }
        try {
            setLoading(true)
            setError('')
            await signup(formData.email, formData.password, "username")
            navigate('/')
        }
        catch(e) {
            setError(e);
        }

        finally {
            setLoading(false)
        }

    }

    useEffect(() => {
        if(currentUser !== null) navigate("/")
    })

    return (
    
    <>
    {currentUser === null ?
    <div className= 'signup-container'>
        <h1 className='title'>Signup</h1>
        {error && <h2 className='error'>{error}</h2>}
        <form onSubmit={onSubmit}>
            <fieldset>  
                <label>
                    Email 
                <input type='email' required name='email' value={formData.email} onChange={onChangeEmail} />
                </label>
                <label>
                    Password 
                <input type='password' ref={password} required name='password' value={formData.password} onChange={onChangePassword} minLength="6" />
                </label>
                <label>
                    Confirm Password 
                <input type='password' id='confirm' required ref={confirmPassword} value={formData.confirmPassword} onChange={onChangeConfirmPassword}
                 />
                </label>
            </fieldset>
            <input type='submit' disabled={loading} value='Signup' />
        </form>
        <Link className="loginNavigate" to="/login" >Already have user? Login instead</Link>
    </div> : (navigate('/')) } </>)
}