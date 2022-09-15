import './Login.css'
import {  useAuth  } from '../contexts/AuthContext'
import {useRef, useEffect, useState} from 'react'
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
    
    const password = useRef()
    const { login, currentUser } = useAuth();
    const [formData, setFormData]  = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const onChangeEmail = (e) => {
        setFormData((prevState) => ({email: e.target.value, password: prevState.password}))
        setError('')
    }

    const onChangePassword = (e) => {
        setFormData((prevState) => ({email: prevState.email, password: e.target.value}))
        setError('')
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)
            setError('')
            await login(formData.email, formData.password)
        }

        catch  {
            setError('Failed to login')
        }

        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (currentUser) navigate("/")
    })

    return (<div className= 'login-container'>
    <h1 className='title'>Login</h1>
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
        </fieldset>
        <input type='submit' disabled={loading} value='Login' />
    </form>
    <Link className="loginNavigate" to="/signup">Don't have an user? Signup instead</Link>
</div>)
}