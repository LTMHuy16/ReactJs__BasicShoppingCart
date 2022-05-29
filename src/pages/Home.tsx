import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  useContactsQuery,
  useDeleteContactMutation,
} from "../services/contactApi";
import "./Home.css";
import { Id, toast } from "react-toastify";
import { Contact } from "../models/contact.model";

const Home = () => {
  const { data, isLoading, isError } = useContactsQuery();
  const [deleteContact] = useDeleteContactMutation();

  const handleDelete = async (id: any) => {
    if (window.confirm("Are you want to delete this contact !!!")) {
      await deleteContact(id)
      toast.success("Contact deleted successfully !!!")
    }
  };

  useEffect(() => {
    if (isError) {
      toast("🦄 Something went wrong !!!");
    }
  }, [isError]);

  if (isLoading) {
    return <h3>Loading... </h3>;
  }

  return (
    <div style={{ marginTop: 100 }}>
      <h2 style={{ textAlign: "center" }}>Home</h2>
      <Link to="/add">
        <button className="btn btn-add">Add contact</button>
      </Link>
      <br />
      <br />
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>ID</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Contact</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item.id}>
              <th scope="row">{item.id}</th>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.email}</td>
              <td>{item.contact}</td>
              <td>
                <Link to={`/edit/${item.id}`}>
                  <button className="btn btn-edit">Edit</button>
                </Link>
                <button
                  className="btn btn-delete"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
                <Link to={`/info/${item.id}`}>
                  <button className="btn btn-view">View</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
