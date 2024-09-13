import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
interface IDetail {
  id: number;
  name: string;
  email: string;
  number: string;
}
const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  console.log("Detail Page ID", id);

  const [data, setData] = useState<IDetail>({
    id: Number(id),
    name: "",
    email: "",
    number: "",
  });
  useEffect(() => {
    axios.get(`http://localhost:8000/users/${id}`).then((response) => {
      setData(response.data);
    });
  }, []);
  return (
    <div className="bg-white p-10">
      <Link
        to="/"
        className="bg-blue-600 text-white rounded-md py-1 px-2 mb-4 text-sm"
      >
        Back
      </Link>
      <h1 className="text-3xl text-cyan-600 mb-3 mt-3">User Info</h1>
      <div>
        <div className="text-2xl mb-1">{data.name}</div>
        <div className="text-2xl mb-1">{data.email}</div>
        <div className="text-2xl mb-1">{data.number}</div>
      </div>
    </div>
  );
};
export default Detail;
