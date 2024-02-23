import { Link } from "react-router-dom";

export default function TopBar() {
  return (
    <div className="d-flex  topbar">
      <h1>Store </h1>

      <Link to="/home" className="btn btn-primary">
        Go to Web site
      </Link>
    </div>
  );
}
