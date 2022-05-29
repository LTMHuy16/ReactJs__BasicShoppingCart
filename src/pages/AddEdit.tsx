import { useState, useEffect, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useAddContactsMutation,
  useSingleContactQuery,
  useUpdateContactMutation,
} from "../services/contactApi";
import "./AddEdit.css";

const initialState = {
  name: "",
  email: "",
  contact: "",
};

const AddEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [addContact, { isLoading }] = useAddContactsMutation();
  const { data, error } = useSingleContactQuery(id!);
  const [updateContact] = useUpdateContactMutation();

  const [formValue, setFormValue] = useState(initialState);
  const { name, email, contact } = formValue;

  const [editMode, setEditMode] = useState(false);

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    let { name, value } = e.currentTarget;
    console.log({ name: name, value: value });
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!name && !email && !contact) {
      toast.error("Please enter all input");
    } else {
      if (!editMode) {
        await addContact(formValue);
        navigate("/");
        toast.success("Contact added successfully");
      } else {
        await updateContact(formValue);
        navigate("/");
        toast.success("Contact updated successfully");
        setEditMode(false);
      }
    }
  };

  useEffect(() => {
    if (error && id) {
      toast.error("Something went wrong !!!");
    }
  }, [error]);

  useEffect(() => {
    if (id) {
      setEditMode(true);
      if (data) {
        setFormValue({ ...data });
      }
    } else {
      setEditMode(false);
      setFormValue({ ...initialState });
    }
  }, [id]);

  return (
    <div style={{ marginTop: 100 }}>
      <h2 style={{ textAlign: "center" }}>Add Edit</h2>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={(e) => handleSubmit(e)}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter name"
          value={name}
          onChange={(e) => handleInputChange(e)}
        />
        <label htmlFor="email">Name</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => handleInputChange(e)}
        />
        <label htmlFor="contact">Name</label>
        <input
          type="number"
          id="contact"
          name="contact"
          placeholder="Enter contact"
          value={contact}
          onChange={(e) => handleInputChange(e)}
        />
        <button type="submit">{editMode ? "Update" : "Add"}</button>
      </form>
    </div>
  );
};

export default AddEdit;
