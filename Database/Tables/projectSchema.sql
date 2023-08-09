BEGIN 
    TRY
        CREATE TABLE projectsTable(
            id VARCHAR(200) PRIMARY KEY,
            project_name VARCHAR(500) NOT NULL,
            description VARCHAR(1000) NOT NULL,
            project_location VARCHAR(200) NOT NULL,
            startdate DATE NOT NULL,
            enddate DATE NOT NULL
        )
    END TRY
BEGIN   
    CATCH
        THROW 50001, 'Table already Exists!', 1;
    END CATCH

DROP TABLE IF EXISTS projectsTable
SELECT * FROM projectsTable
INSERT INTO projectsTable (id, project_name, description, project_location, startdate, enddate)
VALUES ('1', 'Jitu Constructions', 'Construction of a 3 storey building', 'Kathmandu', '2020-01-01', '2020-12-31')
```

