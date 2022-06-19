import { useState } from "react";

function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // useEffect(() => {
  //     let url = 'https://unopass-api.herokuapp.com/user/'
  //     fetch(url)
  //     .then(res => res.json())
  //     .then(data => console.log(data))
  // }, [])

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("https://unopass-api.herokuapp.com/user/create", {
         method: "POST",
         body: JSON.stringify({ 
            name: name,
            email: email,
            password: password,
         }),
      });

      let resJson = await res.json();
      console.log(resJson, 'hello world')
      console.log(name, email, password)
      
      if (res.status === 200) {
         setName("");
         setEmail("");
         setPassword("")
         setMessage("User created successfully");
      } else {
         setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <input
            type="text"
            value={name}
            placeholder="Name"
            autoComplete = 'off'
            onChange={(e) => setName(e.target.value)}
        />
        <input
            type="text"
            value={email}
            placeholder="Email"
            autoComplete = 'off'
            onChange={(e) => setEmail(e.target.value)}
        />
        <input
            type="password"
            value={password}
            placeholder="password"
            autoComplete = 'off'
            onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Create</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  );
}

export default Login;