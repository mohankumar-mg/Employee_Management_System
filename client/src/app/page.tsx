"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

interface APIResponse {
  message: string;
}

export default function Page() {
  const [name, setName] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [dept, setDept] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [date, setDate] = useState<string | null>(null);
  const [today, setToday] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [msg, setMsg] = useState<string>("");

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setToday(currentDate);
  }, []);

  const handleReset = () => {
    setName("");
    setId("");
    setEmail("");
    setPhone("");
    setDept("");
    setRole("");
    setDate(null);
  };

  const validateField = (Name: string, Value: string): string => {
    switch (Name) {
      case "name":
        return Value.trim() === "" ? "name must be provided" : "";
      case "id":
        return Value.trim() === "" || Value?.length > 10
          ? Value?.length > 10
            ? "id can't be more than 10 characters"
            : "id must be provided"
          : "";
      case "email":
        return Value.trim() === "" || !/\S+@\S+\.\S+/.test(Value.trim())
          ? "provide proper email"
          : "";
      case "phone":
        return !/^[0-9]{10}$/.test(Value.trim()) ? "invalid phone number" : "";
      case "dept":
        return Value.trim() === "" ? "department must be choosen" : "";
      case "date":
        return Value?.trim() === "" ? "joining date should be mentioned" : "";
      case "role":
        return Value.trim() === "" ? "role must be specified" : "";
      default:
        return "";
    }
  };

  const handleFieldChange = (name: string, value: string) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));

    switch (name) {
      case "name":
        setName(value);
        break;
      case "id":
        setId(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "phone":
        setPhone(value);
        break;
      case "dept":
        setDept(value);
        break;
      case "date":
        setDate(value);
        break;
      case "role":
        setRole(value);
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};

    if (name.trim() === "") {
      newErrors.name = "name must be provided";
    }
    if (id.trim() === "") {
      newErrors.id = "id must be provided";
    }
    if (email.trim() === "" || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "provide proper email";
    }
    if (phone.trim().length != 10 || /[a-zA-Z]/.test(phone.trim())) {
      newErrors.phone = "invalid phone number";
    }
    if (dept.trim() === "") {
      newErrors.dept = "department must be choosen";
    }
    if (date?.trim() === "") {
      newErrors.date = "joining date should be mentioned";
    }
    if (role.trim() === "") {
      newErrors.role = "role must be specified";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      //validation success
      try {
        const employee = {
          empId: id,
          empName: name,
          email: email,
          phone: phone,
          department: dept,
          dateOfJoining: date,
          empRole: role,
        };

        const response = await axios.post<APIResponse>(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/add-employee`,
          employee
        );
        setMsg(response.data.message);
        if(msg === "Employee added successfully.")
          handleReset();
      } catch (error) {
        setMsg("error in adding employee");
      } 
    } else {
      //validation failure
      setMsg("validation failure!");
    }
  };

  return (
    <div>
      <h1 className="text-center text-lg font-semibold mt-4">
        Employee Management System
      </h1>
      <button className="mt-2 font-semibold ml-[80%]">
        <Link
          href="employees-dashboard"
          className="w-[150px] bg-violet-400 text-white rounded-lg p-2 mt-4"
        >
          Employees Dashboard &#8594;
        </Link>
      </button>

      <div className="flex flex-col items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center mt-[0px] mt-[8%]"
        >
          <div className="flex">
            <div className="flex flex-col mr-[50px]">
              <label className="m-2">
                <span className="font-semibold">Employee Name:</span>
                <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600 w-[400px]">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => handleFieldChange("name", e.target.value)}
                    onBlur={(e) => handleFieldChange("name", e.target.value)}
                    className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                  />
                </div>
                {errors.name && (
                  <p className="text-red-400 font-geistMono">{errors.name}</p>
                )}
              </label>

              <label className="m-2">
                <span className="font-semibold">Employee Id:</span>
                <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600 w-[400px]">
                  <input
                    type="text"
                    value={id}
                    onChange={(e) => handleFieldChange("id", e.target.value)}
                    onBlur={(e) => handleFieldChange("id", e.target.value)}
                    className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                  />
                </div>
                {errors.id && (
                  <p className="text-red-400 font-geistMono">{errors.id}</p>
                )}
              </label>

              <label className="m-2">
                <span className="font-semibold">Email:</span>
                <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600 w-[400px]">
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => handleFieldChange("email", e.target.value)}
                    onBlur={(e) => handleFieldChange("email", e.target.value)}
                    className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-400 font-geistMono">{errors.email}</p>
                )}
              </label>
            </div>

            <div className="flex flex-col">
              <label className="m-2">
                <span className="font-semibold">Phone:</span>
                <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600 w-[400px]">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => handleFieldChange("phone", e.target.value)}
                    onBlur={(e) => handleFieldChange("phone", e.target.value)}
                    className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-400 font-geistMono">{errors.phone}</p>
                )}
              </label>

              <label className="m-2">
                <span className="font-semibold">Department:</span>
                <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600 w-[400px]">
                  <select
                    value={dept}
                    onChange={(e) => handleFieldChange("dept", e.target.value)}
                    onBlur={(e) => handleFieldChange("dept", e.target.value)}
                    className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                  >
                    <option value="">--select department--</option>
                    <option value="HR">HR</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>
                {errors.dept && (
                  <p className="text-red-400 font-geistMono">{errors.dept}</p>
                )}
              </label>

              <label className="m-2">
                <span className="font-semibold">Date of Joining</span>
                <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600 w-[400px]">
                  <input
                    type="date"
                    max={today}
                    value={date || ""}
                    onChange={(e) => handleFieldChange("date", e.target.value)}
                    onBlur={(e) => handleFieldChange("date", e.target.value)}
                    className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                  />
                </div>
                {errors.date && (
                  <p className="text-red-400 font-geistMono">{errors.date}</p>
                )}
              </label>
            </div>
          </div>

          <div>
            <label className="m-2">
              <span className="font-semibold">Role:</span>
              <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600 w-[400px]">
                <input
                  type="text"
                  value={role}
                  onChange={(e) => handleFieldChange("role", e.target.value)}
                  onBlur={(e) => handleFieldChange("role", e.target.value)}
                  className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                />
              </div>
              {errors.role && (
                <p className="text-red-400 font-geistMono">{errors.role}</p>
              )}
            </label>
          </div>

          <button
            type="submit"
            className="w-[150px] bg-green-400 text-white rounded-lg p-2 mt-4"
          >
            Add Employee
          </button>

          {<p className="m-4 font-geistMono font-semibold">{msg}</p>}
        </form>

        <button
          onClick={handleReset}
          className="w-[150px] bg-red-400 text-white rounded-lg p-2 mt-4"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
