import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Link,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import Home from "./components/Home";
import NewEmployee from "./components/NewEmployee";

function AppContent() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // Read employees from API
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load employees");
        }

        return response.json();
      })
      .then((data) => {
        const employeeData = data.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          department: user.id % 2 === 0 ? "HR" : "IT",
        }));

        setEmployees(employeeData);
      })
      .catch(() => {
        setMessage("Unable to load employees.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Create or update employee
  async function saveEmployee(employee, selectedEmployee) {
    const isEditing = Boolean(selectedEmployee);

    const url = isEditing
      ? `https://jsonplaceholder.typicode.com/users/${selectedEmployee.id}`
      : "https://jsonplaceholder.typicode.com/users";

    try {
      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      });

      if (!response.ok) {
        throw new Error("Save failed");
      }

      if (isEditing) {
        setEmployees((previous) =>
          previous.map((item) =>
            item.id === selectedEmployee.id ? { ...item, ...employee } : item,
          ),
        );

        setMessage("Employee updated successfully!");
      } else {
        setEmployees((previous) => [
          ...previous,
          { id: Date.now(), ...employee },
        ]);

        setMessage("Employee added successfully!");
      }

      return true;
    } catch {
      setMessage("Unable to save employee. Please try again.");
      return false;
    }
  }

  // Delete employee
  async function deleteEmployee(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        { method: "DELETE" },
      );

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      setEmployees((previous) =>
        previous.filter((employee) => employee.id !== id),
      );

      setMessage("Employee deleted successfully!");
    } catch {
      setMessage("Unable to delete employee. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100">
      {/* Navigation bar */}
      <nav className="bg-indigo-700 text-white px-6 py-5 shadow-lg">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link to="/" className="text-2xl font-bold">
            Employee Manager
          </Link>

          <div className="flex gap-3">
            <Link
              to="/"
              className="bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-500"
            >
              Home
            </Link>

            <Link
              to="/new"
              className="bg-white text-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-100"
            >
              + New Employee
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-5 md:p-10">
        {message && (
          <div className="bg-indigo-100 text-indigo-800 p-4 rounded-lg mb-6 flex justify-between">
            <p>{message}</p>

            <button
              onClick={() => setMessage("")}
              className="font-bold text-xl"
            >
              ×
            </button>
          </div>
        )}

        <Routes>
          <Route
            path="/"
            element={
              <Home
                employees={employees}
                loading={loading}
                onEdit={(id) => navigate(`/edit/${id}`)}
                onDelete={deleteEmployee}
              />
            }
          />

          <Route
            path="/new"
            element={
              <NewEmployee employees={employees} onSave={saveEmployee} />
            }
          />

          <Route
            path="/edit/:id"
            element={
              <NewEmployee employees={employees} onSave={saveEmployee} />
            }
          />

          <Route
            path="*"
            element={
              <div className="bg-white p-8 rounded-xl text-center">
                <h2 className="text-2xl font-bold">Page Not Found</h2>

                <Link
                  to="/"
                  className="text-indigo-600 underline mt-3 inline-block"
                >
                  Return Home
                </Link>
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
