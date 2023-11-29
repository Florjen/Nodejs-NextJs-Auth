import { useEffect, useState } from "react";

const profile = props => {
  const [message, setMessage] = useState("");

  const [auth, setAuth] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("http://localhost:8000/api/users/user", {
          credentials: "include",
        });
        const content = await response.json();
        setAuth(true);
        setMessage(`Welcome ${content.name}`);
      } catch (err) {
        setAuth(false);
        setMessage("You are not authenticated user");
      }
    })();
  });

  return <div className="default">{message}</div>;
};

export default profile;
