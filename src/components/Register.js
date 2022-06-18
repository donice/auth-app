import { useState, useEffect, useRef } from "react";
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {

   const userRef = useRef();
   const errRef = useRef();

   const [user, setUser] = useState('');
   const [validName, setValidName] = useState(false);
   const [userFocus, setUserFocus] = useState(false);

   const [pwd, setPwd] = useState('');
   const [validPwd, setValidPwd] = useState(false);
   const [pwdFocus, setPwdFocus] = useState(false);

   const [matchPwd, setMatchPwd] = useState('');
   const [validMatch, setValidMatch] = useState(false);
   const [matchFocus, setMatchFocus] = useState(false);

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

   // an effect that checks if the password and confirm password matches
   useEffect(() => {
      const result = PWD_REGEX.test(pwd);
      console.log(result);
      console.log(pwd)
      setValidPwd(result);
      const match = pwd === matchPwd;
      setValidMatch(match)
   }, [pwd, matchPwd])

   // an effect that clears trhe error message when either of the dependencies changes 
   useEffect(() => {
      setErrMsg('')
   }, [user, pwd, matchPwd])

   const handleSubmit = async (e) => {
      e.preventDefault();

      // to prevent javascript from being hacked
      const v1 = USER_REGEX.test(user)
      const v2 = PWD_REGEX.test(pwd)
      if (!v1 || !v2) {
         setErrMsg('inavlid Entry');
         return;
      }
      console.log(user, pwd)
      setSucess(true);
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

                  <label htmlFor="password">
                     Password:
                     <span className={validPwd ? 'valid' : 'hide'} >
                           <FontAwesomeIcon icon={faCheck} />
                     </span>
                     <span className={validPwd || !pwd ? 'hide' : 'invalid'} >
                           <FontAwesomeIcon icon={faTimes} />
                     </span>
                  </label>
                  <input 
                     type = 'password'
                     id = "password"  // matches the label's htmlFor
                     onChange = {(e)  => setPwd(e.target.value)}
                     required
                     aria-invalid = {validPwd ? 'false' : 'true'}
                     aria-describedby = 'pwdnote' // matches the error paragraph id
                     onFocus = {() => setPwdFocus(true)}
                     onBlur = {() => setPwdFocus(false)}
                  />
                  <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen" } >
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

                  <label htmlFor="confirm_pwd">
                     confirm Password:
                     <span className={validPwd && matchPwd ? 'valid' : 'hide'} >
                           <FontAwesomeIcon icon={faCheck} />
                     </span>
                     <span className={validMatch || !matchPwd ? 'hide' : 'invalid'} >
                           <FontAwesomeIcon icon={faTimes} />
                     </span>
                  </label>
                  <input 
                     type = 'password'
                     id = "confirm_pwd"  // matches the label's htmlFor
                     onChange = {(e)  => setMatchPwd(e.target.value)}
                     required
                     aria-invalid = {validMatch ? 'false' : 'true'}
                     aria-describedby = 'confirmnote' // matches the error paragraph id
                     onFocus = {() => setMatchFocus(true)}
                     onBlur = {() => setMatchFocus(false)}
                  />
                  <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen" } >
                     <FontAwesomeIcon icon={faInfoCircle} />
                     Passwords do not match
                  </p>

                  <button disabled={!validName || !validPwd || !validMatch ? true : false } > 
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


