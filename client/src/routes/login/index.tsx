import { useState } from "preact/hooks";

import "@/styles/app.css";
import "@/styles/searchBar.css";
import "@/styles/admin.css";

const Login = () => {


    const [inputValue, setInputValue] = useState('');

    const handleChange = event => setInputValue(event.target.value);
    const handleKeyDown = event => event.key === "Enter" && login();
    
    const login = () => {
        sessionStorage.setItem("admin_password", inputValue);
        location.reload(); // probably not the best but it works
    }

    return (
        <>
            <h1>Login</h1>
            <div className="loginBox gradient-border">
                <input type="password" className="login" placeholder="Passord.." onChange={handleChange} onKeyDown={handleKeyDown} /> 
            </div>
            <div className="loginBtn gradient-border">
                <input type="button" value="LOGIN" onClick={login} />       
            </div>
            <br />
        </>
    );
}


export default Login;