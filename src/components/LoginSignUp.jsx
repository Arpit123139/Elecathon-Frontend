import React, { useRef, useEffect, Fragment, useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { login, register, token } from '../../src/actions/userAction';
import { useAlert } from 'react-alert';
import './login-signup.css'
import { clearErrors } from '../../src/actions/userAction';
import logo from '../pages/images/logo.png';



const LoginSignUp = () => {

    const classTab = useRef(null);

    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useNavigate();
    const location = useLocation();

    const {error, loading, isAuthenticated, user:user1, token:userToken} = useSelector((state)=>state.user);

    console.log(user1);
    console.log(userToken);


   

    localStorage.setItem('token',userToken);
    localStorage.setItem('user', user1?._id);
    localStorage.setItem('userName',user1?.name);
    localStorage.setItem('userImage',user1?.url)



    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [user, setUser] = useState({
      name:"",
      email:"",
      password:"",
      mobileNumber:"",
      Address:"",
    });

    const { name, email, password, mobileNumber, Address } = user;


    const loginSubmit = (e) => {
      e.preventDefault();
      dispatch(login(loginEmail, loginPassword));
      dispatch(token(loginEmail,loginPassword));
    console.table(loginEmail, loginPassword);
    }

    const registerSubmit = (e) => {
      e.preventDefault();

      const myForm = new FormData();

      myForm.set("name", name);
      myForm.set("email", email);
      myForm.set("password", password);
      myForm.set("mobileNumber", mobileNumber);
      myForm.set("Address", Address);
      dispatch(register(myForm));
    }
    const registerDataChange = (e) => {
        setUser({...user,[e.target.name] : e.target.value});
    }

    const redirect = location.search ? location.search.split("=")[1] : "/home";
    console.log(error);
    useEffect(() => {
      if(error){
        alert.error(error);
        dispatch(clearErrors());
      }
      if(isAuthenticated){
        history(redirect);
      }
    
    }, [dispatch, error, alert,history,isAuthenticated]);


    const switchTabs = (e, tab) => {
        if(tab === "signUp"){
          classTab.current.classList.add("right-panel-active");
        }
  
        if(tab === "signIn" ){
         
          classTab.current.classList.remove("right-panel-active");
        }
      }
    

  return (
    <Fragment>
       
        <div className='loginSignUpContainer'>
        <img src={logo} alt="" />
        <div className='container' id='main' ref={classTab}>
            <div className='sign-up' onSubmit={registerSubmit}>
                <form action="#"  >
                    <h1>Create Account</h1>
                    <input 
                        type="text" 
                        name='name' 
                        placeholder='Name' 
                        required 
                        value={name}
                        onChange={registerDataChange}
                        />
                    <input 
                        type="email" 
                        name='email' 
                        placeholder='Email' 
                        required 
                        value={email}
                        onChange={registerDataChange}
                        />
                    <input 
                        type="password" 
                        name='password' 
                        placeholder='Password' 
                        required 
                        value={password}
                        onChange={registerDataChange}
                        />
                    <input 
                        type="number" 
                        name='mobileNumber' 
                        placeholder='Mobile Number' 
                        required 
                        value={mobileNumber}
                        onChange={registerDataChange}
                        />
                    <input 
                        type="text" 
                        name='Address' 
                        placeholder='Address' 
                        required
                        value={Address}
                        onChange={registerDataChange}
                        />
                    <button>Sign Up</button>
                </form>
            </div>
            <div className='sign-in'>
                <form action="#" onSubmit={loginSubmit}>
                    <h1>Sign in</h1>
                    <input 
                        type="email"
                        name='email' 
                        placeholder='Email' 
                        required 
                        value={loginEmail}
                        onChange={(e)=>setLoginEmail(e.target.value)}
                        />
                    <input 
                        type="password" 
                        name='pswd' 
                        placeholder='Password' 
                        required 
                        value={loginPassword}
                        onChange={(e)=>setLoginPassword(e.target.value)}
                        />
                    <a href="#">Forgot password?</a>
                    <button >Sign In</button>
                </form>
            </div>
            <div className='overlay-container'>
                <div className='overlay'>
                    <div className='overlay-left'>
                        <h1>Welcome Back!</h1>
                        <p className='loginSignup-para'>To keep connected with us please login with your personal info</p>
                        <button id='signIn' onClick={(e) => switchTabs(e,"signIn")}>Sign In</button>
                    </div>
                    <div className='overlay-right'>
                        <h1>Hello, Friend</h1>
                        <p className='loginSignup-para'>Enter your personal details and start journey with us.</p>
                        <button id='signUp'onClick={(e) => switchTabs(e,"signUp")} >Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
       
    </Fragment>
  )
}

export default LoginSignUp