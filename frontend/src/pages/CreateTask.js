// import { useState } from "react";
// import axios from "axios";

// function CreateTask() {
//   const role = localStorage.getItem("role");

//   // ✅ Hooks MUST be at top
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [assignedTo, setAssignedTo] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const token = localStorage.getItem("token");

//       await axios.post(
//         "http://localhost:5000/api/tasks",
//         { title, description, assignedTo },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       alert("Task created!");

//       // clear form
//       setTitle("");
//       setDescription("");
//       setAssignedTo("");

//     } catch (error) {
//       alert(error.response?.data?.message || "Error");
//     }
//   };

//   // ✅ CONDITION HERE (SAFE)
//   if (role !== "Admin") return null;

//   return (
//     <div>
//       <h2>Create Task</h2>

//       <form onSubmit={handleSubmit}>
//         <input
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <br /><br />

//         <input
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />
//         <br /><br />

//         <input
//           placeholder="Assigned User ID"
//           value={assignedTo}
//           onChange={(e) => setAssignedTo(e.target.value)}
//         />
//         <br /><br />

//         <button type="submit">Create</button>
//       </form>
//     </div>
//   );
// }

// export default CreateTask;

// import { useState } from "react";
// import axios from "axios";
// import "../App.css";

// function CreateTask() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [assignedTo, setAssignedTo] = useState("");

//   const role = localStorage.getItem("role");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const token = localStorage.getItem("token");

//       await axios.post(
//         "http://localhost:5000/api/tasks",
//         { title, description, assignedTo },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       alert("Task created!");
//       window.location.reload();
//     } catch (error) {
//       alert(error.response?.data?.message || "Error");
//     }
//   };

//   if (role !== "Admin") return null;

//   return (
//     <div className="container">
//       <div className="card">
//         <h2>Create Task</h2>

//         <form onSubmit={handleSubmit}>
//           <input
//             placeholder="Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />

//           <input
//             placeholder="Description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />

//           <input
//             placeholder="Assigned User ID"
//             value={assignedTo}
//             onChange={(e) => setAssignedTo(e.target.value)}
//           />

//           <button className="btn" type="submit">
//             Create Task
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default CreateTask;

import { useState } from "react";
import axios from "axios";
import "../App.css";

function CreateTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [message, setMessage] = useState(""); // ✅ NEW

  const role = localStorage.getItem("role");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/tasks",
        { title, description, assignedTo },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage("Task created successfully ✅");

      // reset fields
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

        {/* ✅ MESSAGE */}
        {message && (
          <p style={{ color: "green" }}>{message}</p>
        )}

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