import React, {useContext, useState} from 'react'
import { loginUser } from '../api/api'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

function Login() {
    
    const {setUserData} = useContext(UserContext)

    const [state, setState] = useState({
        usernameOrEmail: '',
        password: ''
    })

    // const [wrongPasswordCoutner, setWrongPasswordCounter] = useState(0);

    const navigate = useNavigate()

    const handleFormChange = (e) => {
        setState(p => ({
            ...p,
            [e.target.name]: e.target.value
        }))
    }

    const handleLoginFormSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await loginUser(state.usernameOrEmail, state.password)
            if(res.data.data) { 
                setUserData(res.data.data)
                navigate('/')
            } else if(res.data.err) {
                alert(res.data.err)
            }
        }
        catch(err) {
            // if(err.response && err.response.status === 404) {
            //     alert("Error: Wrong Username or Password!");
            //     setWrongPasswordCounter(wrongPasswordCoutner+1);
            //     if(wrongPasswordCoutner >= 3) return setWrongPasswordCounter(0), navigate("/restore");
            // } else {
                alert(err.message || "An error occurred");
            // }
        }

    }

  return (
    <div>
        <form className='form' onSubmit={handleLoginFormSubmit}>
            <h2>Login</h2>
            <input 
                type='text' 
                name='usernameOrEmail'
                placeholder='enter username or email...'
                value={state.usernameOrEmail}
                onChange={handleFormChange}
            />
            <input 
                type='password' 
                name='password'
                placeholder='enter password...'
                value={state.password}
                onChange={handleFormChange}
            />
            <a href='/register'>Not logged in?</a>
            <a href='/restore'>Forgot Password? Reset</a>
            <button type='submit'>submit</button>
        </form>
    </div>
  )
}

export default Login