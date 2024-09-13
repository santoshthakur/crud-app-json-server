import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
interface User {
  id: number;
  name: string;
  email: string;
  number: string;
}
const Home: React.FC = () => {
  const [info, setInfo] = useState<User[]>([]);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>("");
  useEffect(() => {
    axios
      .get<User[]>("http://localhost:8000/users")
      .then((response) => {
        setInfo(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error.message);
        setErrorMessage(error.message);
      });
  }, []);
  return (
    <>
      <h1 className="text-3xl text-cyan-600 mt-10 mb-10">User Data</h1>
      <div className="mb-5">
        <Link
          to="/create"
          className="bg-green-600 text-white rounded-md py-2 px-3"
        >
          Create
        </Link>
      </div>
      <div className="bg-white p-10">
        <div>
          {errorMessage ? (
            <div>{errorMessage}</div>
          ) : (
            <div>
              {info.length > 0 ? (
                <>
                  <table className="table">
                    <thead>
                      <tr>
                        <td>ID</td>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Number</td>
                        <td>Action</td>
                      </tr>
                    </thead>
                    <tbody>
                      {info.map((item, index) => (
                        <tr key={index}>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td>{item.number}</td>
                          <td>
                            <Link
                              to={`/detail/${item.id}`}
                              className="bg-gray-600 mr-2 text-white rounded-md py-2 px-3"
                            >
                              Read More
                            </Link>

                            <Link
                              to={`/update/${item.id}`}
                              className="bg-blue-600 text-white rounded-md py-2 px-3 mr-2"
                            >
                              Update
                            </Link>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="bg-red-600 text-white rounded-md py-2 px-3"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              ) : (
                "No Data"
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
  function handleDelete(id: number) {
    axios.delete("http://localhost:8000/users/" + id).then((response) => {
      alert("Data Deleted");
      window.location.reload();
    });
  }
};
export default Home;
