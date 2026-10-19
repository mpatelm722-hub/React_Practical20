
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function NewEmployee({ employees, onSave }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const selectedEmployee = id
    ? employees.find((employee) => String(employee.id) === id)
    : null;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("IT");

  useEffect(() => {
    if (selectedEmployee) {
      setName(selectedEmployee.name);
      setEmail(selectedEmployee.email);
      setDepartment(selectedEmployee.department);
    } else {
      setName("");
      setEmail("");
      setDepartment("IT");
    }
  }, [id, selectedEmployee?.id]);

  async function handleSubmit(e) {
    e.preventDefault();

    const employee = { name, email, department };
    const success = await onSave(employee, selectedEmployee);

    if (success) {
      navigate("/");
    }
  }

  return (
    <div className="max-w-xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg space-y-5"
      >
        <h2 className="text-2xl font-bold text-indigo-700">
          {id ? "Edit Employee" : "New Employee"}
        </h2>

        <div>
          <label className="block mb-2 font-medium">
            Employee Name
          </label>

          <input
            type="text"
            placeholder="Enter employee name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Department
          </label>

          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg"
          >
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-5 py-3 rounded-lg hover:bg-indigo-700"
          >
            {id ? "Update Employee" : "Save Employee"}
          </button>

          <Link
            to="/"
            className="bg-gray-200 text-gray-700 px-5 py-3 rounded-lg"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default NewEmployee;
