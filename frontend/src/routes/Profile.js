import React, { useContext, useEffect, useState } from 'react'
import * as api from '../api/api'
import { useNavigate, Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext';

function Profile() {

    const {userData, setUserData} = useContext(UserContext)

    const navigate = useNavigate();
    
    const [inputData, setInputData] = useState({
        newEmail: userData.email || "", 
        newPassword: "",
        confirmPassword: "" 
    });

    const handleInputChange = (e) => {
        setInputData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const checkValidations = () => {
        if(inputData.newEmail.length < 5 || inputData.newEmail.length > 25) return alert("Input Error:\n- Enter Valid Email!"), false
        if(!inputData.newPassword.length) return true;
        else {
            if(inputData.newPassword.length < 5 || inputData.newPassword.length > 20) return alert("Input Error:\n- Enter Valid Password (5-20 Symbol)!"), false;
            if(inputData.newPassword !== inputData.confirmPassword) return alert("Input Error:\nPasswords Don't match!"), false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(checkValidations());
        if(checkValidations()) {
            try {
                const res = await api.updateUser(userData._id, inputData);
                if(res && res.updatedUser) {
                    console.log(res.updatedUser);
                    setUserData(res.updatedUser);
                    navigate("/");
                } else {
                    console.log("Error fetching Update User");
                }
            } catch(err) {
                console.log(err);
            }
        } else return;
    };

    const handleLogout = async () => {
        const data = await api.logoutUser();
        if(data.data) { 
            alert(data.data);
            navigate('/login');
        } else if(data.err) {
            alert(data.err);
        }
    };

    return (
    <>
        <Link to="/">Go to Todos</Link>
        <hr/>
        {
            userData && 
            <>
                <div>
                    <h1>Profile ({userData.username})</h1>
                    <button onClick={handleLogout}>Logout</button>
                </div>
                <form className='user-data-form' onSubmit={handleSubmit}>
                    <div className="user-data-form-row">
                        <p>Name: <b>{userData.username}</b></p>
                    </div>
                    <div className="user-data-form-row">
                        <label>Email:</label>
                        <input 
                            type="text" 
                            placeholder='Enter email' 
                            name="newEmail" 
                            onChange={handleInputChange}
                            value={inputData.newEmail}
                        />
                    </div>
                    <br />
                    <h3>Reset Password</h3>
                    <div className="user-data-form-row">
                        <label>Enter Password:</label>
                        <input 
                            type="password" 
                            placeholder='Enter Password' 
                            name="newPassword" 
                            onChange={handleInputChange}
                            value={inputData.newPassword} 
                            autoComplete='off'
                        />
                    </div>
                    <div className="user-data-form-row">
                        <label>Confirm Password:</label>
                        <input 
                            type="password" 
                            placeholder='Confirm Password' 
                            name="confirmPassword" 
                            onChange={handleInputChange}
                            value={inputData.confirmPassword} 
                            autoComplete='off'
                        />
                    </div>
                    <br/>
                    <button type="submit">UPDATE</button>
                </form>
            </>
        }
    </>
    );
}

export default Profile;
