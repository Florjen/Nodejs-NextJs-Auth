import Link from "next/link";
import { useRouter } from "next/router";

const Nav = props => {
  const router = useRouter();
  //logout function
  const logout = async () => {
    await fetch("http://localhost:8000/api/users/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    await router.push("/login");
  };

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/login">
              <a>Login</a>
            </Link>
          </li>
          <li>
            <Link href="/signup">
              <a>Signup</a>
            </Link>
          </li>
          <li>
            <Link href="#">
              <a onClick={logout}>Logout</a>
            </Link>
          </li>

          <li>
            <Link href="/isauth" to="/isauth">
              <a>Check if Authorized</a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
