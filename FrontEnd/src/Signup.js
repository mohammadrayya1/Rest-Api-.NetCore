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
export default function Signup() {
  return (
    <MDBContainer fluid>
      <Form
        botton="signup"
        title="Signup"
        endpoint="user/Signup"
        method="post"
      />
    </MDBContainer>
  );
}
