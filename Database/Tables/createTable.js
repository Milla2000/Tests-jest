const mssql = require("mssql");
const { sqlConfig } = require("../../Config/config");

const createEmployeeTable = async (req, res) => {
  try {
    const table = `
        BEGIN
    TRY 
       CREATE TABLE employeeTable (
            id VARCHAR(200) NOT NULL,
            e_name VARCHAR(200) NOT NULL,
            email VARCHAR(200) NOT NULL,
            password VARCHAR(200) NOT NULL,
            role VARCHAR(200) DEFAULT 'user',
            issent BIT DEFAULT 0,
            
        );
        PRINT 'Table employeeTable created successfully';
    END TRY
    BEGIN CATCH
        THROW 50002, 'Table employeeTable already exists', 1;
    END CATCH;`;

    const pool = await mssql.connect(sqlConfig);
    pool.request().query(table, (err) => {
      if (err instanceof mssql.RequestError) {
        console.log({ Error: err.message });
      } else {
        console.log("Table created Successfully");
      }
    });
  } catch (error) {
    return { Error: error };
  }
};

module.exports = {
  createEmployeeTable,
};
