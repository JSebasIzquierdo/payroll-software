import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import AddEmployeeModal from "./AddEmployeeModal";

export interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  position_title: string;
  date_arrival: string;
  status: string;
  details: {
    middle_name: string;
    location_city: string;
    address: string;
    date_birth: string;
    telephone: string;
  };
  position_details: {
    hire_date: string;
    email: string;
    salary: string;
    time_in_position: string;
  };
}

const getRandomColor = () => {
  const colors = [
    "bg-blue-500",
    "bg-red-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const EmployeeView = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    fetch("https://my-json-server.typicode.com/jsebasizquierdo/db-payroll/db")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.employees) {
          setEmployees(data.employees);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Employee Management</h1>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => setIsAddModalOpen(true)}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Add Employee
        </button>
        {isAddModalOpen && (
          <AddEmployeeModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
          />
        )}
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-red-500 text-xl">Error fetching data</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {employees.map((employee) => (
            <div
              key={employee.id}
              className="flex flex-col border p-4 rounded-md shadow-md space-y-4"
            >
              <div className="flex items-center justify-center">
                <div
                  className={`flex items-center justify-center w-16 h-16 rounded-full text-white text-xl ${getRandomColor()}`}
                >
                  {employee.first_name[0]}
                </div>
              </div>

              <div className="text-center">
                <h2 className="text-xl font-bold">
                  {employee.first_name} {employee.last_name}
                </h2>
                <p>{employee.position_title}</p>
              </div>
              <div className="bg-gray-100 p-2 rounded-md">
                <p className="text-sm">Start Date: {employee.date_arrival}</p>
              </div>
              <div className="mt-auto">
                <Link
                  to={`/employee/${employee.id}`}
                  className="bg-blue-500 text-white px-2 py-1 rounded flex items-center justify-center"
                >
                  View Details
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeView;
