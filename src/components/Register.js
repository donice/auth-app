import { useState, useEffect, useRef } from "react";
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/axios";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_.]{3,23}$/;
const EMAIL_REGEX = /^[a-zA-Z][a-zA-Z0-9-_](?=.*[.]).{3,23}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const REGISTER_URL = './create'; // the route on the backend

const Register = () => {

   const userRef = useRef();
   const errRef = useRef();

   const [user, setUser] = useState('');
   const [validName, setValidName] = useState(false);
   const [userFocus, setUserFocus] = useState(false);

   const [email, setEmail] = useState('');
   const [validEmail, setValidEmail] = useState(false);
   const [emailFocus, setEmailFocus] = useState(false);

   const [password, setPassword] = useState('');
   const [validPassword, setValidPassword] = useState(false);
   const [passwordFocus, setPasswordFocus] = useState(false);

   const [errMssg, setErrMsg] = useState('');
   const [success, setSucess] = useState(false);   

   useEffect(() => {
      userRef.current.focus();
   }, [])

   // an effect that tests if the username matches the regex requirements 
   useEffect(() => {
      const result = USER_REGEX.test(user);
      console.log(result);
      console.log(user)
      setValidName(result);
   }, [user])

   // an effect that tests if the email matches the regex requirements
   useEffect(() => {
      const result = EMAIL_REGEX.test(email)
      console.log(result)
      console.log(email)
      setValidEmail(result)
   }, [email])

   // an effect that checks if the password matches the regex requirements
   useEffect(() => {
      const result = PASSWORD_REGEX.test(password);
      console.log(result);
      console.log(password)
      setValidPassword(result);
   }, [password])

   // an effect that clears the error message when either of the dependencies changes 
   useEffect(() => {
      setErrMsg('')
   }, [user, email, password])

   const handleSubmit = async (e) => {
      e.preventDefault();

      // to prevent javascript from being hacked
      const v1 = USER_REGEX.test(user)
      const v2 = PASSWORD_REGEX.test(password)
      if (!v1 || !v2) {
         setErrMsg('inavlid Entry');
         return;
      }
      // .......................................
      
      try {
         const response = await axios.post(REGISTER_URL,
            JSON.stringify({ user, pwd: password }),
            {
               headers: { 'Content-Type': 'application/json' },
               withCredentials: true
            }
         );
         console.log(response.data)
         console.log(JSON.stringify(response))
         setSucess(true);
      } catch (err) {
         if (!err?.response) {
            setErrMsg('No server Response')
         } else if (err.response?.status === 402) {
            setErrMsg('Username Taken')
         } else {
            setErrMsg('Registration Failed')
         }
         errRef.current.focus()
      }
   }

   return (
      <>
      {success ? 
         (
            <section>
               <h1>Success!</h1>
               <p>
                  <a href='google.com' >Sign In</a>
               </p>
            </section>
         )
         :
         (
            <section>
               <p ref={errRef} className={errMssg ? 'errmsg' : 'offscreen'} 
               aria-live = 'assertive'> {errMssg} </p>
               <h1>Register</h1>

               <form onSubmit={handleSubmit} >

                  <label htmlFor="username">
                     Username:
                     <span className={validName ? 'valid' : 'hide'} >
                           <FontAwesomeIcon icon={faCheck} />
                     </span>
                     <span className={validName || !user ? 'hide' : 'invalid'} >
                           <FontAwesomeIcon icon={faTimes} />
                     </span>
                  </label>
                  <input 
                     type = 'text'
                     id = "username" //matches the label's htmlFor
                     ref = {userRef}
                     autoComplete = 'off'
                     onChange = {(e)  => setUser(e.target.value)}
                     required
                     aria-invalid = {validName ? 'false' : 'true'}
                     aria-describedby = 'uidnote' // matches the error paragraph id
                     onFocus = {() => setUserFocus(true)}
                     onBlur = {() => setUserFocus(false)}
                  />
                  <p id="uidnote" className={userFocus && user && !validName 
                  ? "instructions" : "offscreen" } >
                     <FontAwesomeIcon icon={faInfoCircle} />
                     4 to 24 characters. <br />
                     Must begin with a letter. <br />
                     Letters, numbers, underscores hyphens allowed.
                  </p>


                  <label htmlFor="email">
                     Email:
                     <span className={validEmail ? 'valid' : 'hide'} >
                           <FontAwesomeIcon icon={faCheck} />
                     </span>
                     <span className={validEmail || !email ? 'hide' : 'invalid'} >
                           <FontAwesomeIcon icon={faTimes} />
                     </span>
                  </label>
                  <input 
                     type = 'text'
                     id = "email"  // matches the label's htmlFor
                     onChange = {(e)  => setEmail(e.target.value)}
                     required
                     aria-invalid = {validEmail ? 'false' : 'true'}
                     aria-describedby = 'emailconfirm' // matches the error paragraph id
                     onFocus = {() => setEmailFocus(true)}
                     onBlur = {() => setEmailFocus(false)}
                  />
                  <p id="emailconfirm" className={emailFocus && !validEmail ? "instructions" : "offscreen" } >
                     <FontAwesomeIcon icon={faInfoCircle} />
                     Enter a valid email address
                  </p>

                  <label htmlFor="password">
                     Password:
                     <span className={validPassword ? 'valid' : 'hide'} >
                           <FontAwesomeIcon icon={faCheck} />
                     </span>
                     <span className={validPassword || !password ? 'hide' : 'invalid'} >
                           <FontAwesomeIcon icon={faTimes} />
                     </span>
                  </label>
                  <input 
                     type = 'password'
                     id = "password"  // matches the label's htmlFor
                     onChange = {(e)  => setPassword(e.target.value)}
                     autoComplete= 'false'
                     required
                     aria-invalid = {validPassword ? 'false' : 'true'}
                     aria-describedby = 'pwdnote' // matches the error paragraph id
                     onFocus = {() => setPasswordFocus(true)}
                     onBlur = {() => setPasswordFocus(false)}
                  />
                  <p id="pwdnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen" } >
                     <FontAwesomeIcon icon={faInfoCircle} />
                     4 to 24 characters. <br />
                     Must include uppercase and lowercase letters, a number and a special character <br />
                     Allowed special characters: 
                     <span aria-label="exclamation mark">!</span>
                     <span aria-label="at symbol">@</span>
                     <span aria-label="hashtag">#</span>
                     <span aria-label="dollar sign">$</span>
                     <span aria-label="percent">%</span>
                  </p>

                  

                  <button disabled={!validName || !validPassword || !validEmail ? true : false } > 
                     Sign Up
                  </button>
               </form>

               <p>
                  Already Registered? <br />
                  <span className="line" >
                     <a href="google.com" >Sign up</a>
                  </span>
               </p>
            </section>
         )
      }
      </>
   )
}

export default Register;


