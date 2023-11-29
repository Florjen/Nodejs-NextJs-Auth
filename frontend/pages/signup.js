import { useState } from "react";
import { useRouter } from "next/router";
const signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();

    await fetch("http://localhost:8000/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: userName,
        email,
        password,
      }),
    });

    await router.push("/login");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-div">
          <label htmlFor="userName">UserName</label>
          <input
            name="userName"
            type="text"
            id="userName"
            value={userName}
            onChange={e => setUserName(e.target.value)}
          />
        </div>
        <div className="form-div">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="form-div">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div className="form-div">
          <button className="button" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default signup;
