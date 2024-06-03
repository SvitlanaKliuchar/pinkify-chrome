import { Link } from "react-router-dom";

export default function ContactPage() {
  return (
    <>
      <h1>Contacts</h1>
      <p>This is a page with the user's contacts</p>
      <ul>
        <li><Link to="/">Return to Index</Link></li>
        <li><Link to="/main">Main Page</Link></li>
      </ul>
    </>
  );
}