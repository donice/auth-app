import { useState, useEffect, useRef } from "react";

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
   const [pwdFocus, setpwdFocus] = useState(false);

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


   return (
      <section>
         <p ref={errRef} className={errMssg ? 'errmsg' : 'offscreen'} 
         aria-live = 'assertive'> {errMssg} </p>
         <h1>Register</h1>

         <label htmlFor="username">
            Username:
         </label>
         <input 
            type = 'text'
            id = "username"
            ref = {userRef}
            autoComplete = 'off'
            onChange = {(e)  => setUser(e.target.value)}
            required
            aria-invalid = {validName ? 'false' : 'true'}
            aria-describedby = 'uidnote'
            onFocus = {() => setUserFocus(true)}
            onBlur = {() => setUserFocus(false)}
         />
         <p id="uidnote" >

         </p>
      </section>
   )
}

export default Register;


