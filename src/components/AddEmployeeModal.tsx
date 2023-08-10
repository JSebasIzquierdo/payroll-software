import React, { useState } from "react";

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddEmployeeModal = ({ isOpen, onClose }: AddEmployeeModalProps) => {
  const [employeeData, setEmployeeData] = useState<any>({
    first_name: "",
    middle_name: "",
    last_name: "",
    location_city: "",
    address: "",
    date_birth: "",
    telephone: "",
    position_title: "",
    hire_date: "",
    email: "",
    salary: "",
    time_in_position: "",
  });

  const [errors, setErrors] = useState<any>({});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEmployeeData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateDate = (dateString: string) => {
    const pattern = /^\d{4}-\d{2}-\d{2}$/;
    return pattern.test(dateString) && !isNaN(Date.parse(dateString));
  };

  const validateEmail = (email: string) => {
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return pattern.test(email);
  };

  const validateAddress = (address: string) => {
    const pattern = /^[a-zA-Z0-9\s,'-]*$/;
    return pattern.test(address);
  };

  const validateCity = (city: string) => {
    return true;
  };

  const validateTelephone = (telephone: string) => {
    const pattern = /^[0-9]{10}$/;
    return pattern.test(telephone);
  };

  const validateSalary = (salary: string) => {
    const pattern = /^\d+(\.\d{1,2})?$/;
    return pattern.test(salary);
  };

  const validateTimeInPosition = (time: string) => {
    const pattern = /^[0-9]+$/;
    return pattern.test(time);
  };

  const handleAddEmployee = () => {
    const validationErrors: any = {};

    for (const key in employeeData) {
      if (!employeeData[key]) {
        validationErrors[key] = "This field is required";
      }
    }

    if (!validateCity(employeeData.location_city)) {
      validationErrors.location_city = "Invalid city";
    }

    if (!validateAddress(employeeData.address)) {
      validationErrors.address = "Invalid address format";
    }

    if (!validateDate(employeeData.date_birth)) {
      validationErrors.date_birth = "Invalid date format";
    }

    if (!validateDate(employeeData.hire_date)) {
      validationErrors.hire_date = "Invalid date format";
    }

    if (!validateEmail(employeeData.email)) {
      validationErrors.email = "Invalid email format";
    }

    if (!validateTelephone(employeeData.telephone)) {
      validationErrors.telephone = "Invalid telephone format";
    }

    if (!validateSalary(employeeData.salary)) {
      validationErrors.salary = "Invalid salary format";
    }

    if (!validateTimeInPosition(employeeData.time_in_position)) {
      validationErrors.time_in_position = "Invalid time in position format";
    }

    if (Object.keys(validationErrors).length === 0) {
      onClose();
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div
      className={`fixed inset-0 ${
        isOpen ? "block" : "hidden"
      } z-50 overflow-y-auto`}
    >
      <div className="modal-overlay fixed inset-0 bg-gray-600 opacity-75 z-10"></div>
      <div className="modal-container mx-auto mt-20 p-6 rounded-lg bg-white w-full sm:w-8/12 z-20 relative">
        <div className="modal-content">
          <h2 className="text-xl font-bold mb-4">Add Employee</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="first_name"
              >
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                value={employeeData.first_name}
                onChange={handleInputChange}
                className={`form-input rounded border border-gray-300 w-full ${
                  errors.first_name ? "border-red-500" : ""
                }`}
              />
              {errors.first_name && (
                <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="location_city"
              >
                Location City
              </label>
              <input
                type="text"
                name="location_city"
                value={employeeData.location_city}
                onChange={handleInputChange}
                className={`form-input rounded border border-gray-300 w-full ${
                  errors.location_city ? "border-red-500" : ""
                }`}
              />
              {errors.location_city && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.location_city}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="address"
              >
                Address
              </label>
              <input
                type="text"
                name="address"
                value={employeeData.address}
                onChange={handleInputChange}
                className={`form-input rounded border border-gray-300 w-full ${
                  errors.address ? "border-red-500" : ""
                }`}
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="date_birth"
              >
                Date Birth
              </label>
              <input
                type="text"
                name="date_birth"
                value={employeeData.date_birth}
                onChange={handleInputChange}
                className={`form-input rounded border border-gray-300 w-full ${
                  errors.date_birth ? "border-red-500" : ""
                }`}
              />
              {errors.date_birth && (
                <p className="text-red-500 text-sm mt-1">{errors.date_birth}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="telephone"
              >
                Telephone
              </label>
              <input
                type="text"
                name="telephone"
                value={employeeData.telephone}
                onChange={handleInputChange}
                className={`form-input rounded border border-gray-300 w-full ${
                  errors.telephone ? "border-red-500" : ""
                }`}
              />
              {errors.telephone && (
                <p className="text-red-500 text-sm mt-1">{errors.telephone}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="position_title"
              >
                Position Title
              </label>
              <input
                type="text"
                name="position_title"
                value={employeeData.position_title}
                onChange={handleInputChange}
                className={`form-input rounded border border-gray-300 w-full ${
                  errors.position_title ? "border-red-500" : ""
                }`}
              />
              {errors.position_title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.position_title}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="hire_date"
              >
                Hire Date
              </label>
              <input
                type="text"
                name="hire_date"
                value={employeeData.hire_date}
                onChange={handleInputChange}
                className={`form-input rounded border border-gray-300 w-full ${
                  errors.hire_date ? "border-red-500" : ""
                }`}
              />
              {errors.hire_date && (
                <p className="text-red-500 text-sm mt-1">{errors.hire_date}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="text"
                name="email"
                value={employeeData.email}
                onChange={handleInputChange}
                className={`form-input rounded border border-gray-300 w-full ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="salary"
              >
                Salary
              </label>
              <input
                type="text"
                name="salary"
                value={employeeData.salary}
                onChange={handleInputChange}
                className={`form-input rounded border border-gray-300 w-full ${
                  errors.salary ? "border-red-500" : ""
                }`}
              />
              {errors.salary && (
                <p className="text-red-500 text-sm mt-1">{errors.salary}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="time_in_position"
              >
                Time in Position
              </label>
              <input
                type="text"
                name="time_in_position"
                value={employeeData.time_in_position}
                onChange={handleInputChange}
                className={`form-input rounded border border-gray-300 w-full ${
                  errors.time_in_position ? "border-red-500" : ""
                }`}
              />
              {errors.time_in_position && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.time_in_position}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={handleAddEmployee}
            >
              Add Employee
            </button>
            <button className="text-gray-600 ml-2" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
