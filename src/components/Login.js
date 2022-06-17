import { useState, useEffect, useRef } from "react";

const Register = () => {

   const userRef = useRef();
   const errRef = useRef();

   const [user, setUser] = useState('')
   const [pwd, setPwd] = useState('')
   const [errMsg, setErrMsg] = useState('')
   const [success, setSucess] = useState(false)

   // useEffect(() => {
   //    useRef.current.focus();
   // }, [])

   // useEffect(() => {
   //    setErrMsg('')
   // }, [user, pwd])

   return (
      <section>
         <p ref={errRef} className={errMsg ? 'errmsg' : 
         'offscreen'} aria-live='assertive'>{errMsg}</p>
         <h1>Sign In</h1>
         <form>
            <label htmlFor="usernae">Username:</label>
            <input 
               type='text' 
               id='' 
            />
         </form>

      </section>
   )
}

export default Register;