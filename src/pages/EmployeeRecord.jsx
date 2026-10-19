
function EmployeeRecord({ employees, onEdit, onDelete }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {employees.map((employee) => (
        <div
          key={employee.id}
          className="bg-white p-6 rounded-2xl shadow-md border border-indigo-100"
        >
          <h2 className="text-xl font-bold text-indigo-700">
            {employee.name}
          </h2>

          <p className="text-gray-600 mt-2">
            Email: {employee.email}
          </p>

          <p className="text-gray-600 mt-1">
            Department: {employee.department}
          </p>

          <div className="flex gap-3 mt-5">
            <button
              onClick={() => onEdit(employee.id)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Edit
            </button>

            <button
              onClick={() => onDelete(employee.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EmployeeRecord;
