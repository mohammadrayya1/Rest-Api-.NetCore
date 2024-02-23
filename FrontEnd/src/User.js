import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
export default function User() {
  const [dataOfUsers, setdataofusers] = useState([{}]);
  const [run, setrun] = useState(0);
  useEffect(() => {
    // تعريف الدالة الغير متزامنة داخل useEffect
    const fetchData = async () => {
      try {
        const res = await fetch("https://localhost:7016/api/User/users");

        const data = await res.json();
        setdataofusers(data);
        console.log(dataOfUsers);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };

    fetchData();
  }, []);

  const deleteUser = async (id) => {
    try {
      const result = await axios.delete(
        `https://localhost:7016/api/User/${id}`
      );
      console.log(result);
      toast.success(` Delete successfully! ${result.data.name}`, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      const updatedUsers = dataOfUsers.filter((user) => user.id !== id);
      setdataofusers(updatedUsers);
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
      }
    }
  };

  return (
    <div style={{ width: "70%" }} className=" mt-3 ms-5">
      <table className="table  ">
        <thead>
          <tr className="table-primary">
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">email</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {dataOfUsers.map((user, index) => (
            <tr key={user.id + 1}>
              <th scope="row">{user.id}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <FontAwesomeIcon
                  className="me-3"
                  onClick={() => deleteUser(user.id)}
                  icon={faTrash}
                  style={{ color: "red", fontSize: "15", cursor: "pointer" }}
                />
                <Link to={`/dashboard/users/${user.id}`}>
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    style={{
                      color: "green",
                      fontSize: "15",
                      cursor: "pointer",
                    }}
                  />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
