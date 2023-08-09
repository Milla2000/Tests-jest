CREATE OR ALTER PROCEDURE updateProject (@id VARCHAR(200), @project_name  VARCHAR(500), @description VARCHAR(1000), @project_location VARCHAR(200), @startdate DATE, @enddate DATE)
AS
    BEGIN
        UPDATE projectsTable SET id= @id, project_name = @project_name, description = @description, project_location = @project_location, startdate = @startdate, enddate = @enddate WHERE id= @id
    END