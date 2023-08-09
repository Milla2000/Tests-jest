CREATE OR ALTER PROCEDURE getOneProject (@id VARCHAR(200))
AS  
    BEGIN 
        SELECT * FROM projectsTable WHERE id = @id
    END