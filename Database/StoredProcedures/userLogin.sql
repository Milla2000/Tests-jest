CREATE OR ALTER PROCEDURE employeeLoginProc(@email VARCHAR(200))
AS
BEGIN
    SELECT * FROM employeeTable WHERE email = @email
END