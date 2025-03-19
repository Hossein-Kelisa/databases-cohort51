import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'researchDB'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as ID ' + connection.threadId);

  // 1.1 Create authors table
  const createAuthorsTable = `
    CREATE TABLE IF NOT EXISTS authors (
      author_id INT AUTO_INCREMENT PRIMARY KEY,
      author_name VARCHAR(255),
      university VARCHAR(255),
      date_of_birth DATE,
      h_index INT,
      gender VARCHAR(10)
    );
  `;
  
  connection.query(createAuthorsTable, (err, result) => {
    if (err) {
      console.error('Error creating authors table: ' + err.stack);
    } else {
      console.log('Authors table created or already exists.');

      // Check if the mentor column exists before adding it
      const checkColumnExists = `
        SELECT COLUMN_NAME
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_NAME = 'authors' AND COLUMN_NAME = 'mentor';
      `;

      connection.query(checkColumnExists, (err, results) => {
        if (err) {
          console.error('Error checking column existence: ' + err.stack);
          return;
        }

        if (results.length === 0) {
          // Add mentor column only if it doesn't exist
          const addMentorColumn = `
            ALTER TABLE authors 
            ADD COLUMN mentor INT,
            ADD FOREIGN KEY (mentor) REFERENCES authors(author_id);
          `;
          connection.query(addMentorColumn, (err, result) => {
            if (err) {
              console.error('Error adding mentor column: ' + err.stack);
            } else {
              console.log('Mentor column added successfully.');
            }
          });
        } else {
          console.log('Mentor column already exists.');
        }
      });
    }
  });
});
