import Header from "./Header";
import Nav from "./Nav";
import Meta from "./Meta";
export default function Layout({ children }) {
  return (
    <div>
      <Meta />
      <header>
        <Nav />
      </header>

      <main>
        <Header />
        {children}
      </main>

      <footer>{"Copyright © Kaltersia Network 2021"}</footer>
    </div>
  );
}
