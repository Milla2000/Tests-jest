USE JituConstructions;

-- Batch 1: Create the stored procedure
IF OBJECT_ID('createProjectPROC', 'P') IS NULL
BEGIN
    EXEC('
        CREATE PROCEDURE createProjectPROC
        (
            @id VARCHAR(200),
            @project_name VARCHAR(500),
            @description VARCHAR(1000),
            @project_location VARCHAR(200),
            @startdate DATE,
            @enddate DATE
        )
        AS
        BEGIN
            INSERT INTO projectsTable (id, project_name, description, project_location, startdate, enddate)
            VALUES (@id, @project_name, @description, @project_location, @startdate, @enddate)
        END
    ');
END;

-- Batch 2: Select data from the 'projectsTable'
SELECT * FROM projectsTable;

SELECT DB_NAME() AS DatabaseName;
