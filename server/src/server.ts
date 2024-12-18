import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3001;

(async () => {
  try {
    prisma.$connect();
    // console.log("Connection to database established.");
  } catch (error) {
    // console.error("Error connecting to the database: ", error);
    process.exit(1);
  }
})();

app.post("/add-employee", async (req, res) => {
  try {
    const { empId, empName, email, phone, department, dateOfJoining, empRole } =
      req.body;

    const existingById = await prisma.employee.findUnique({
      where: { empId },
    });

    const existingByEmail = await prisma.employee.findUnique({
      where: { email },
    });

    if (existingById && existingByEmail) {
      res.json({
        message: "Employee already exists with the mentioned Id and Email.",
      });
      return;
    } else if (existingById) {
      res.json({ message: "Employee already exists with the mentioned Id." });
      return;
    } else if (existingByEmail) {
      res.json({
        message: "Employee already exists with the mentioned Email.",
      });
      return;
    }

    await prisma.employee.create({
      data: {
        empId,
        empName,
        email,
        phone,
        department,
        dateOfJoining,
        empRole,
      },
    });

    res.status(200).json({ message: "Employee added successfully." });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ message: "Error fetching data." });
  }
});

app.get("/read-employees", async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();

    // console.log(employees);
    res.status(200).json(employees);
  } catch (err) {
    // console.error(err);
    res.status(500).json([]);
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
