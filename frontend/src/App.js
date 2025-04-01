import React, { useState, useEffect, useContext } from 'react';
import "./App.css";
import Header from "./layouts/Header";
import Main from "./layouts/Main";
import Footer from "./layouts/Footer";
import { Routes, Route, useNavigate } from 'react-router-dom'
import Todos from './routes/Todos';
import Login from './routes/Login';
import Register from './routes/Register'
import Profile from './routes/Profile'
import * as api from './api/api'
import { UserContext } from './context/UserContext';
import './scss/styles.scss';

const App = () => {    

    const {setUserData} = useContext(UserContext)

    const [isResponseGiven, setIsResponseGiven] = useState(false)

    useEffect(() => {    
        const getUserInfo = async () => {
          const res = await api.getToken()
          if(res.data.token) {
            const res2 = await api.getUser(res.data.token)
            if(res2.data) {
                setUserData(res2.data)
            }
            setIsResponseGiven(true)
          } else {
            setIsResponseGiven(true)
          }
        }
        getUserInfo()
    
    }, []);

    return (
        <>
            <Header />
            <Main>
                {
                isResponseGiven 
                ? 
                <Routes>
                    <Route 
                        path='/'
                        element={<Todos />}
                    />
                    <Route 
                        path='/login'
                        element={<Login />}
                    />
                    <Route 
                        path='/register'
                        element={<Register />}
                    />
                    <Route 
                        path='/profile'
                        element={<Profile />}
                    />
                </Routes> 
                :
                <></>
                }            
            </Main>
            <Footer />
        </>
    );
};

export default App;

