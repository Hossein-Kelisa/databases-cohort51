const mysql = require('mysql2');
const fs = require('fs'); // file system module

const connection = mysql.createConnection({  // create connection
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  multipleStatements: true
});

connection.connect((err) => {  // connect to the database
  if (err) {
    console.error('Error in connection:', err);
    return;
  }
  console.log('✅ connection success !');

  fs.readFile('meetup.sql', 'utf8', (err, sql) => { // read the sql file
    if (err) {
      console.error('Error in Read SQL:', err);
      return;
    }

    connection.query(sql, (err, results) => {  // run the query
      if (err) {
        console.error('❌ Error in run query:', err);
        return;
      }
      console.log('✅ Database and tabels created succesfully !');
      connection.end(); // close the connection
    });
  });
});
