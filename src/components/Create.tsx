import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ICreate {
  name: string;
  email: string;
  number: string;
}

const Create: React.FC = () => {
  const [inputData, setInputData] = useState<ICreate>({
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
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios.post("http://localhost:8000/users", inputData).then((response) => {
      alert("Add Data successfully");
      navigate("/");
    });
    console.log("Form Submitted", inputData);
  };

  return (
    <>
      <div className="bg-white p-10">
        <h1 className="text-3xl text-cyan-600 mb-3">New User</h1>

        <form onSubmit={handleSubmit}>
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

export default Create;
