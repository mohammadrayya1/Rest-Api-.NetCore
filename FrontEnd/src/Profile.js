import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { useState } from "react";
import axios from "axios";
import Form from "./Components/Form";
import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";

export default function Profile() {
  const id = window.location.pathname.split("/").slice(-1)[0];

  const [FormData, SetFormData] = useState({
    name: "",
    email: "",
    password: "",
    repeatpassword: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://localhost:7016/api/User/userById/${id}`
        );

        const user = await res.json();
        SetFormData(user);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };

    fetchData();
  }, []);

  return (
    <MDBContainer fluid>
      <ToastContainer />
      <Form
        botton="Update"
        title="Update User"
        name={FormData.name}
        email={FormData.email}
        endpoint={`User/update/${id}`}
        method="put"
      />
    </MDBContainer>
  );
}
