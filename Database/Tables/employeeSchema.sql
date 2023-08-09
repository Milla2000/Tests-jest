BEGIN
    TRY 
       CREATE TABLE employeeTable (
            id VARCHAR(200) NOT NULL,
            e_name VARCHAR(200) NOT NULL,
            email VARCHAR(200) UNIQUE NOT NULL,
            password VARCHAR(200) NOT NULL,
            role VARCHAR(200) DEFAULT 'user',
            issent BIT DEFAULT 0,
        );
         PRINT 'Table employeeTable created successfully';
    END TRY
    BEGIN CATCH
        THROW 50002, 'Table employeeTable already exists', 1;
    END CATCH;

DROP TABLE IF EXISTS employeeTable;
END
 SELECT * FROM employeeTable;

 DROP employeeTable;


