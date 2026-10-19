
import { Link } from "react-router-dom";
import EmployeeRecord from "../pages/EmployeeRecord";

function Home({ employees, loading, onEdit, onDelete }) {
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Employee Records
          </h2>

          <p className="text-gray-500 mt-1">
            Total Employees: {employees.length}
          </p>
        </div>

        <Link
          to="/new"
          className="bg-indigo-600 text-white px-5 py-3 rounded-lg text-center hover:bg-indigo-700"
        >
          + New Employee
        </Link>
      </div>

      {loading ? (
        <p className="text-indigo-700 font-semibold">
          Loading employees...
        </p>
      ) : employees.length === 0 ? (
        <div className="bg-white rounded-xl p-8 text-center shadow">
          <p className="text-gray-600 mb-4">
            No employees found.
          </p>

          <Link
            to="/new"
            className="text-indigo-600 font-semibold"
          >
            Add your first employee
          </Link>
        </div>
      ) : (
        <EmployeeRecord
          employees={employees}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
    </div>
  );
}

export default Home;
