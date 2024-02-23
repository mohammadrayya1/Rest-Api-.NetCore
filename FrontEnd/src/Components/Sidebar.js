import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faPaperPlane,
  faQuestion,
  faImage,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Nav, Button } from "react-bootstrap";
import classNames from "classnames";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Button
          variant="link"
          style={{ color: "#fff" }}
          className="mt-4"
        ></Button>
      </div>

      <Nav className="flex-column pt-2">
        <Nav.Item className="active">
          <FontAwesomeIcon
            icon={faUser}
            style={{ marginRight: "10px", marginLeft: "10px" }}
          />
          <Link to="/dashboard/users" className="ml-5">
            Users
          </Link>
        </Nav.Item>

        <Nav.Item>
          <FontAwesomeIcon
            icon={faBriefcase}
            style={{ marginRight: "10px", marginLeft: "10px" }}
          />
          <Link to="/dashboard/about">About</Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link href="/">
            <FontAwesomeIcon icon={faImage} className="mr-2" />
            Portfolio
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link href="/">
            <FontAwesomeIcon icon={faQuestion} className="mr-2" />
            FAQ
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link href="/">
            <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
            Contact
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}
