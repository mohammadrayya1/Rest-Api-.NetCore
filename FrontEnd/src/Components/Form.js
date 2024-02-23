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
import { useContext, useState } from "react";
import axios from "axios";
import { User } from "../Context/UserProvider";
import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";

export default function Form(props) {
  const userused = useContext(User);

  console.log(userused);
  const [FormData, SetFormData] = useState({
    name: "",
    email: "",
    password: "",
    repeatpassword: "",
  });

  useEffect(() => {
    SetFormData({
      ...FormData,
      name: props.name || "",
      email: props.email || "",
    });
  }, [props.name, props.email]);

  //const [flage, SetFlage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    SetFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [passwordError, setPasswordError] = useState({
    lengthpassword: "",
    errormatch: "",
  });
  const [nameError, SetnameError] = useState("");
  const [errorFromBackend, seterrorFromBackend] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let flage = true;
    if (FormData.name === "") {
      SetnameError("User name is required");
      flage = false;
    }

    if (FormData.password !== FormData.repeatpassword) {
      setPasswordError({
        ...passwordError,
        errormatch: "Passwords do not match",
      });
      flage = false;
    }

    if (FormData.password.length < 4) {
      setPasswordError({
        ...passwordError,
        lengthpassword: "Passwords must be more than 4 letters",
      });
      flage = false;
    }

    // Check if any error exists, if not, proceed with form submission
    if (
      FormData.name !== "" &&
      FormData.password === FormData.repeatpassword &&
      FormData.password.length >= 4
    ) {
      SetnameError("");
      setPasswordError({
        lengthpassword: "",
        errormatch: "",
      });
      flage = true;
    }

    if (flage) {
      try {
        const response = await axios[props.method](
          `https://localhost:7016/api/${props.endpoint}`,
          FormData
        );
        flage = false;
        console.log("response");
        if (Array.isArray(response.data)) {
          seterrorFromBackend(response.data);
        } else if (typeof response.data === "object") {
          toast.success(`  successfully! ${response.data.user}`, {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            marginRight: "50px",
            className: "Toastify__toast--success",
            onClose: () => {
              if (props.method === "post" && response.status === 200) {
                userused.setAuth(response.data.token);
                window.location.pathname = "/home";
              } else if (props.method === "put" && response.status === 200) {
                window.location.pathname = "/dashboard/users";
              }
            },
          });
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
          toast.error("Error sending data: Request failed");
        }
      }
    }
  };

  return (
    <MDBContainer fluid>
      <ToastContainer />

      <MDBRow className="justify-content-center">
        <MDBCol md="8">
          {errorFromBackend.length > 0 && (
            <div className="alert alert-warning">
              {errorFromBackend.map((error, index) => (
                <p key={index}>{error.description}</p>
              ))}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <MDBCardBody>
              <MDBRow>
                <MDBCol
                  md="10"
                  lg="6"
                  className="order-2 order-lg-1 d-flex flex-column align-items-center"
                >
                  <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                    {props.title}
                  </p>

                  <div className="d-flex flex-row align-items-center mb-4 ">
                    <MDBIcon fas icon="user me-3" size="lg" />
                    <MDBInput
                      label="Your Name"
                      id="form1"
                      name="name"
                      type="text"
                      className="w-100"
                      value={FormData.name}
                      onChange={handleChange}
                    />
                  </div>
                  {nameError && (
                    <p className="text-danger   alert-warning errorMessage">
                      {nameError}
                    </p>
                  )}
                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="envelope me-3" size="lg" />
                    <MDBInput
                      label="Your Email"
                      id="form2"
                      type="email"
                      name="email"
                      value={FormData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="" style={{ color: "red" }}>
                    {errorMessage && <p>{errorMessage}</p>}
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="lock me-3" size="lg" />
                    <MDBInput
                      label="Password"
                      id="form3"
                      type="password"
                      name="password"
                      required
                      value={FormData.password}
                      onChange={handleChange}
                    />
                  </div>
                  {passwordError.lengthpassword !== "" && (
                    <p className="text-danger mb-3 errorMessage ">
                      {passwordError.lengthpassword}
                    </p>
                  )}
                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="key me-3" size="lg" />
                    <MDBInput
                      label="Repeat your password"
                      id="form4"
                      type="password"
                      required
                      name="repeatpassword"
                      value={FormData.repeatpassword}
                      onChange={handleChange}
                    />
                  </div>
                  {passwordError.errormatch !== "" && (
                    <p className="text-danger mb-3  alert-warning errorMessage">
                      {passwordError.errormatch}
                    </p>
                  )}
                  <div className="mb-4">
                    <MDBCheckbox
                      name="flexCheck"
                      value=""
                      id="flexCheckDefault"
                      label="Subscribe to our newsletter"
                    />
                  </div>

                  <MDBBtn type="submit" className="mb-4" size="lg">
                    {props.botton}
                  </MDBBtn>
                </MDBCol>

                <MDBCol
                  md="10"
                  lg="6"
                  className="order-1 order-lg-2 d-flex align-items-center"
                >
                  <MDBCardImage
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                    fluid
                  />
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
