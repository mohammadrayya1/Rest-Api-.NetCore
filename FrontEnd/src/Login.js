import {
  MDBBtn,
  MDBContainer,
  MDBInput,
  MDBIcon,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { User } from "./Context/UserProvider";

export default function Login() {
  const [errorFromBackend, seterrorFromBackend] = useState({});
  const navigate = useNavigate();
  const user = useContext(User);
  console.log(user.auth);
  const [DataForm, SetDataForm] = useState({
    name: "",
    password: "",
  });

  const [errors, SetErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    SetDataForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let flage = true;

    if (DataForm.email === "") {
      SetErrors({
        ...errors,
        email: "User name is required",
      });
      flage = false;
    }

    if (DataForm.password === "") {
      SetErrors({
        ...errors,
        password: "password is required",
      });
      flage = false;
    }

    if (flage) {
      try {
        const response = await axios.post(
          "https://localhost:7016/api/user/login",
          DataForm
        );
        flage = false;
        console.log(response.data);
        console.log(response.status);
        if (response.status === 200 && response.data.tokent != null) {
          toast.success(` Login successfully! ${response.data.email}`, {
            position: "top-center",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: "Toastify__toast--success",
            onClose: () => {
              user.setAuth(response.data.tokent);

              navigate("/dashboard");
            },
          });
        } else if (response.data.error2 != null) {
          seterrorFromBackend(response.data);
          <Navigate to="/login" />;
        }
      } catch (error) {
        if (error.response && error.response.data) {
          toast.error(`Error: ${error.response.data}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,

            progress: undefined,
            className: "Toastify__toast--error",
          });
        } else if (error.request) {
          toast.error("Error sending data: No response from server");
        } else {
          console.log(error);
          toast.error("Error sending data: Request failed");
        }
      }
    }
  };

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-25">
      <ToastContainer />
      {errorFromBackend.error && (
        <div className="alert alert-warning">
          <p>{errorFromBackend.error}</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <MDBInput
          wrapperClass="mb-4"
          label="Email address"
          id="form1"
          type="email"
          name="email"
          onChange={handleChange}
          required
        />
        <MDBInput
          wrapperClass="mb-4"
          label="Password"
          id="form2"
          type="password"
          name="password"
          onChange={handleChange}
          required
        />

        <div className="d-flex justify-content-between mx-3 mb-4">
          <MDBCheckbox
            name="flexCheck"
            value=""
            id="flexCheckDefault"
            label="Remember me"
          />
          <a href="!#">Forgot password?</a>
        </div>

        <MDBBtn className="mb-4">Sign in</MDBBtn>
      </form>
      <div className="text-center">
        <p>
          Not a member? <Link to="/signup">Signup</Link>
        </p>
        <p>or sign up with:</p>

        <div
          className="d-flex justify-content-between mx-auto"
          style={{ width: "40%" }}
        >
          <MDBBtn
            tag="a"
            color="none"
            className="m-1"
            style={{ color: "#1266f1" }}
          >
            <MDBIcon fab icon="facebook-f" size="sm" />
          </MDBBtn>

          <MDBBtn
            tag="a"
            color="none"
            className="m-1"
            style={{ color: "#1266f1" }}
          >
            <MDBIcon fab icon="twitter" size="sm" />
          </MDBBtn>

          <MDBBtn
            tag="a"
            color="none"
            className="m-1"
            style={{ color: "#1266f1" }}
          >
            <MDBIcon fab icon="google" size="sm" />
          </MDBBtn>

          <MDBBtn
            tag="a"
            color="none"
            className="m-1"
            style={{ color: "#1266f1" }}
          >
            <MDBIcon fab icon="github" size="sm" />
          </MDBBtn>
        </div>
      </div>
    </MDBContainer>
  );
}
