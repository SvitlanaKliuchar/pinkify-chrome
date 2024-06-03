import { Link } from "react-router-dom";

export default function MainPage() {
  return (
    <>
      <h1>Main page</h1>
      <p>This is a protected page.</p>

      <ul>
        <li><Link to="/main/invoices">Invoices</Link></li>
        <li><Link to="/">Return to index</Link></li>
      </ul>
    </>
  );
}