import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [bodyData, setBodyData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setBodyData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: bodyData.email,
          password: bodyData.password,
        }),
      });

      const data = await res.json();
      console.log(data, "login");
      login({ email: data.user.email, name: data.user.name, isAuth: true });
      navigate("/user");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="insert your email"
        value={bodyData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        id="password"
        name="password"
        placeholder="insert your password"
        value={bodyData.password}
        onChange={handleChange}
      />
      <button>Login</button>
    </form>
  );
}

export default LoginPage;
