-- CreateTable
CREATE TABLE "Employee" (
    "empId" TEXT NOT NULL,
    "empName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "dateOfJoining" TEXT NOT NULL,
    "empRole" TEXT NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("empId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_phone_key" ON "Employee"("phone");
