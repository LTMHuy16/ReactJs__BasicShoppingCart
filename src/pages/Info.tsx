import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSingleContactQuery } from "../services/contactApi";
import "./Info.css";

const Info = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useSingleContactQuery(id!);

  useEffect(() => {
    if (error) {
      toast.error("Something went wrong !!!");
    } else {
    }
  }, []);

  return (
    <div style={{ marginTop: 150 }}>
      <h2 style={{ textAlign: "center" }}>Contact Info</h2>
      <div className="card-header">
        <p>User Contact Detail</p>
      </div>
      <div className="container">
        <strong>ID: </strong>
        <span>{id}</span>

        <br />
        <br />
        <strong>Name: </strong>
        <span>{data && data.name}</span>

        <br />
        <br />
        <strong>Email: </strong>
        <span>{data && data.email}</span>

        <br />
        <br />
        <strong>Contact: </strong>
        <span>{data && data.contact}</span>

        <br />
        <br />
        <Link to="/">
          <button className="btn btn-edit">Go back</button>
        </Link>
      </div>
    </div>
  );
};

export default Info;
