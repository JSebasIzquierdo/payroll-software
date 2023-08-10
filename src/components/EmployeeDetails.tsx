import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Employee } from "./EmployeeView";

const EmployeeDetail: React.FC = () => {
  const { id } = useParams<{ id: any }>();
  const employeeId = parseInt(id);
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [editModeEmployeeSection, setEditModeEmployeeSection] = useState(false);
  const [editModePositionInfo, setEditModePositionInfo] = useState(false);

  useEffect(() => {
    fetch(
      "https://my-json-server.typicode.com/jsebasizquierdo/db-payroll/employees/" +
        employeeId
    )
      .then((response) => response.json())
      .then((data) => {
        setEmployee(data);
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
        setEmployee(null);
      });
  }, [employeeId]);

  if (!employee) {
    return <p className="text-red-500 text-xl">Employee not found</p>;
  }

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <div className="flex items-center justify-center">
          <div
            className={`flex items-center justify-center w-16 h-16 rounded-full text-white text-xl bg-blue-500`}
          >
            {employee?.first_name[0]}
          </div>
        </div>
        <div className="ml-4">
          <h1 className="text-2xl font-bold">
            {employee?.first_name} {employee?.details.middle_name}{" "}
            {employee?.last_name}
          </h1>
          <p className="text-gray-600">{employee?.position_title}</p>
          <p className="text-gray-600">
            {employee?.position_details.hire_date}
          </p>
        </div>
        <Link
          to="/"
          className="ml-auto bg-blue-500 text-white px-4 py-2 rounded flex items-center"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Back
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2 text-black-600">
          Employee Section
          <button
            onClick={() => setEditModeEmployeeSection(!editModeEmployeeSection)}
            className="ml-2 text-blue-500"
          >
            {editModeEmployeeSection ? "Done" : "Edit"}
          </button>
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="text-gray-600 mb-4">
            <p className="mb-1 font-semibold">First Name:</p>
            <input
              type="text"
              value={employee?.first_name}
              className={`text-gray-800 rounded-md p-2 w-full ${
                !editModeEmployeeSection ? "bg-gray-100" : "bg-white"
              } border border-gray-300`}
              readOnly={!editModeEmployeeSection}
            />
          </div>
          <div className="text-gray-600 mb-4">
            <p className="mb-1 font-semibold">Middle Name:</p>
            <input
              type="text"
              value={employee?.details.middle_name}
              className={`text-gray-800 rounded-md p-2 w-full ${
                !editModeEmployeeSection ? "bg-gray-100" : "bg-white"
              } border border-gray-300`}
              readOnly={!editModeEmployeeSection}
            />
          </div>
          <div className="text-gray-600 mb-4">
            <p className="mb-1 font-semibold">Last Name:</p>
            <input
              type="text"
              value={employee?.last_name}
              className={`text-gray-800 rounded-md p-2 w-full ${
                !editModeEmployeeSection ? "bg-gray-100" : "bg-white"
              } border border-gray-300`}
              readOnly={!editModeEmployeeSection}
            />
          </div>

          <div className="text-gray-600 mb-4">
            <p className="mb-1 font-semibold">Location City:</p>
            <input
              type="text"
              value={employee?.details?.location_city}
              className={`text-gray-800 rounded-md p-2 w-full ${
                !editModeEmployeeSection ? "bg-gray-100" : "bg-white"
              } border border-gray-300`}
              readOnly={!editModeEmployeeSection}
            />
          </div>
          <div className="text-gray-600 mb-4">
            <p className="mb-1 font-semibold">Date Birth:</p>
            <input
              type="text"
              value={employee?.details?.date_birth}
              className={`text-gray-800 rounded-md p-2 w-full ${
                !editModeEmployeeSection ? "bg-gray-100" : "bg-white"
              } border border-gray-300`}
              readOnly={!editModeEmployeeSection}
            />
          </div>
          <div className="text-gray-600 mb-4">
            <p className="mb-1 font-semibold">Telephone:</p>
            <input
              type="text"
              value={employee?.details?.telephone}
              className={`text-gray-800 rounded-md p-2 w-full ${
                !editModeEmployeeSection ? "bg-gray-100" : "bg-white"
              } border border-gray-300`}
              readOnly={!editModeEmployeeSection}
            />
          </div>
        </div>
        <hr className="my-6" />
        <div>
          <h2 className="text-xl font-semibold mb-2 text-gray-600">
            Position Information
            <button
              onClick={() => setEditModePositionInfo(!editModePositionInfo)}
              className="ml-2 text-blue-500"
            >
              {editModePositionInfo ? "Done" : "Edit"}
            </button>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="text-gray-600 mb-4">
              <p className="mb-1 font-semibold">Position Title:</p>
              <input
                type="text"
                value={employee?.position_title}
                className={`text-gray-800 rounded-md p-2 w-full ${
                  !editModePositionInfo ? "bg-gray-100" : "bg-white"
                } border border-gray-300`}
                readOnly={!editModePositionInfo}
              />
            </div>
            <div className="text-gray-600 mb-4">
              <p className="mb-1 font-semibold">Hire Date:</p>
              <input
                type="text"
                value={employee?.position_details?.hire_date}
                className={`text-gray-800 rounded-md p-2 w-full ${
                  !editModePositionInfo ? "bg-gray-100" : "bg-white"
                } border border-gray-300`}
                readOnly={!editModePositionInfo}
              />
            </div>
            <div className="text-gray-600 mb-4">
              <p className="mb-1 font-semibold">Email:</p>
              <input
                type="text"
                value={employee?.position_details?.email}
                className={`text-gray-800 rounded-md p-2 w-full ${
                  !editModePositionInfo ? "bg-gray-100" : "bg-white"
                } border border-gray-300`}
                readOnly={!editModePositionInfo}
              />
            </div>
            <div className="text-gray-600 mb-4">
              <p className="mb-1 font-semibold">Salary:</p>
              <input
                type="text"
                value={employee?.position_details?.salary}
                className={`text-gray-800 rounded-md p-2 w-full ${
                  !editModePositionInfo ? "bg-gray-100" : "bg-white"
                } border border-gray-300`}
                readOnly={!editModePositionInfo}
              />
            </div>
            <div className="text-gray-600 mb-4">
              <p className="mb-1 font-semibold">Time in Position:</p>
              <input
                type="text"
                value={employee?.position_details?.time_in_position}
                className={`text-gray-800 rounded-md p-2 w-full ${
                  !editModePositionInfo ? "bg-gray-100" : "bg-white"
                } border border-gray-300`}
                readOnly={!editModePositionInfo}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
