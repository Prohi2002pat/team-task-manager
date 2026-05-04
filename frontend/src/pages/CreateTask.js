import { useState } from "react";
import API from "../services/api";
import "../App.css";

function CreateTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [message, setMessage] = useState("");

  const role = localStorage.getItem("role");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/tasks",
        { title, description, assignedTo },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage("Task created successfully ✅");

      setTitle("");
      setDescription("");
      setAssignedTo("");

    } catch (error) {
      setMessage(error.response?.data?.message || "Error ❌");
    }
  };

  if (role !== "Admin") return null;

  return (
    <div className="container">
      <div className="card">
        <h2>Create Task</h2>

        {message && <p style={{ color: "green" }}>{message}</p>}

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            placeholder="Assigned User ID"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          />

          <button className="btn" type="submit">
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateTask;
