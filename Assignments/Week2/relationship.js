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

  // 2.1 Create research papers table
  const createResearchPapersTable = `
    CREATE TABLE IF NOT EXISTS research_Papers (
      paper_id INT AUTO_INCREMENT PRIMARY KEY,
      paper_title VARCHAR(255),
      conference VARCHAR(255),
      publish_date DATE,
      author_id INT,
      FOREIGN KEY (author_id) REFERENCES authors(author_id)
    );
  `;
  
  connection.query(createResearchPapersTable, (err, result) => {
    if (err) {
      console.error('Error creating research papers table: ' + err.stack);
    } else {
      console.log('Research papers table created or already exists.');
    }
  });

  // 2.2 Add mentor column if it doesn't exist
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
});
