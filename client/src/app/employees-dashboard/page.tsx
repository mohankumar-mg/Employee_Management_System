import Link from "next/link";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

interface APIResponse {
  empId: string;
  empName: string;
  email: string;
  phone: string;
  department: string;
  dateOfJoining: string;
  empRole: string;
}

async function fetchEmployees(): Promise<APIResponse[]> {
  try {
    const response = await axios.get<APIResponse[]>(`${process.env.NEXT_PUBLIC_SERVER_URL}/read-employees`);

    return response.data;
  } catch (error) {
    // console.error(error);
    return [];
  }
}

export default async function Page() {
  const employees = await fetchEmployees();

  return (
    <div>
      <h1 className="text-center font-semibold text-lg m-2">
        Employees Dashboard
      </h1>
      <button className="m-2">
        <Link
          href="/"
          className="w-[150px] bg-violet-400 text-white rounded-lg p-2 mt-4"
        >
          &#8592; Go to Home
        </Link>
      </button>
      {employees.length > 0 ? (
        <table className="w-full border border-violet-300 border-collapse">
          <thead>
            <tr className="bg-green-300">
              <th className="border border-gray-300 px-4 py-2">Employee Id</th>
              <th className="border border-gray-300 px-4 py-2">
                Employee Name
              </th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Phone</th>
              <th className="border border-gray-300 px-4 py-2">Department</th>
              <th className="border border-gray-300 px-4 py-2">
                Date of Joining
              </th>
              <th className="border border-gray-300 px-4 py-2">
                Employee Role
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-violet-50"}
              >
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {employee.empId}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {employee.empName}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {employee.email}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {employee.phone}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {employee.department}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {employee.dateOfJoining}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {employee.empRole}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-red-400 font-semibold m-4">
          No data found
        </p>
      )}
    </div>
  );
}
