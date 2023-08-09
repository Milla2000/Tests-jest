CREATE OR ALTER PROCEDURE registerEmployeePROC
(
    @id VARCHAR(200),
    @e_name VARCHAR(200),
    @email VARCHAR(200),
    @password VARCHAR(200)
)
AS
BEGIN
    INSERT INTO employeeTable (id, e_name, email, password)
    VALUES (@id, @e_name, @email, @password)
END; 