import { useEffect, useState } from "preact/hooks";
import "@/styles/app.css";
import "@/styles/searchBar.css";
import "@/styles/admin.css";
import { signal } from "@preact/signals";
import { Navigate, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { checkPassword } from "@/api/login";

export const isLoggedIn = signal(false);

const Login = () => {
  const [inputValue, setInputValue] = useState("");
  const [displayError, setDisplayError] = useState(false);

  const navigate = useNavigate();

  const checkPasswordMutation = useMutation({
    mutationFn: checkPassword,
    onSuccess: (status) => {
      if (status === 200) {
        isLoggedIn.value = true;
        navigate("/admin");
      }
    },
  });

  const login = () => {
    checkPasswordMutation.mutate({ password: inputValue });
    sessionStorage.setItem("admin_password", inputValue);
    setInputValue("")
    setDisplayError(true);
    setTimeout(setDisplayError, 1000, false)
  };

  useEffect(() => {
    checkPasswordMutation.mutate({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoggedIn.value) {
    return <Navigate to="/admin" />;
  }

  return (
    <>
      <h1>Login</h1>
      <div className="loginBox gradient-border">
        <input
          type="password"
          className="login"
          placeholder="Passord.."
          value={inputValue}
          onChange={(e) => setInputValue((e.target as HTMLInputElement).value)}
          onKeyDown={(e) => e.key === "Enter" && login()}
        />
      </div>
      <div className="loginBtn gradient-border">
        <input type="button" value="LOGIN" onClick={login} />
      </div>
        <p className="wrong-password" style={{ opacity: checkPasswordMutation.data == 401 && displayError ? 1 : 0}}>Feil passord</p>
      <br />
    </>
  );
};

export default Login;
