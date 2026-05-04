import { useEffect, useState } from "react";
import API from "../services/api";
import "../App.css";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");

        const url = role === "Admin" ? "/tasks" : "/tasks/my";

        const res = await API.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTasks(res.data);
      } catch (error) {
        console.log(error.response?.data || error.message);
        setMessage("Error loading tasks ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [role]);

  // ✅ Update Task Status
  const updateStatus = async (taskId) => {
    try {
      const token = localStorage.getItem("token");

      await API.patch(
        `/tasks/${taskId}`,
        { status: "Completed" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage("Task marked as completed ✅");

      setTasks((prev) =>
        prev.map((t) =>
          t._id === taskId ? { ...t, status: "Completed" } : t
        )
      );

    } catch (err) {
      setMessage("Error updating task ❌");
    }
  };

  // ✅ Delete Task
  const deleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage("Task deleted successfully 🗑️");

      setTasks((prev) => prev.filter((t) => t._id !== taskId));

    } catch (err) {
      setMessage("Error deleting task ❌");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "Completed").length;
  const pendingTasks = tasks.filter((t) => t.status !== "Completed").length;

  return (
    <div className="container">

      <div className="header">
        <h2>Dashboard</h2>
        <button className="btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {message && (
        <p style={{ color: "green", marginTop: "10px" }}>
          {message}
        </p>
      )}

      <div className="stats">
        <div className="stat-box">
          <h4>Total</h4>
          <p>{totalTasks}</p>
        </div>

        <div className="stat-box">
          <h4>Completed</h4>
          <p>{completedTasks}</p>
        </div>

        <div className="stat-box">
          <h4>Pending</h4>
          <p>{pendingTasks}</p>
        </div>
      </div>

      <h3>Tasks</h3>

      {loading && <p>Loading tasks...</p>}

      {!loading && tasks.length === 0 && (
        <p>No tasks available 📭</p>
      )}

      {!loading &&
        tasks.map((task) => (
          <div className="card" key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>

            <p>
              Status:{" "}
              <span
                className={
                  task.status === "Completed"
                    ? "status-completed"
                    : "status-pending"
                }
              >
                {task.status}
              </span>
            </p>

            {role === "Member" && task.status !== "Completed" && (
              <button
                className="btn-success"
                style={{ marginRight: "10px" }}
                onClick={() => updateStatus(task._id)}
              >
                Mark Completed
              </button>
            )}

            {role === "Admin" && (
              <button
                className="btn-danger"
                onClick={() => deleteTask(task._id)}
              >
                Delete
              </button>
            )}
          </div>
        ))}
    </div>
  );
}

export default Dashboard;
