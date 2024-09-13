import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface IUpdate {
  id: number;
  name: string;
  email: string;
  number: string;
}

const Update: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the id from params
  console.log("Page ID", id);
  const [inputData, setInputData] = useState<IUpdate>({
    id: Number(id),
    name: "",
    email: "",
    number: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/users/${id}`) // Append id to the URL
      .then((response) => {
        setInputData(response.data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .put(`http://localhost:8000/users/${id}`, inputData) // Corrected PUT request
      .then((response) => {
        alert("Data updated successfully");
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="bg-white p-10">
        <h1 className="text-3xl text-cyan-600 mb-3">Update User Data</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="name"
              value={inputData.id}
              disabled
              className="border p-2 w-full"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="name"
              value={inputData.name}
              onChange={handleInputChange}
              className="border p-2 w-full"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={inputData.email}
              onChange={handleInputChange}
              className="border p-2 w-full"
              placeholder="Enter your Email"
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              name="number"
              value={inputData.number}
              onChange={handleInputChange}
              className="border p-2 w-full"
              placeholder="Enter your Number"
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-600 text-white rounded-md py-2 px-3"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Update;
