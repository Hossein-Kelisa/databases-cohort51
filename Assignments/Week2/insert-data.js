import connection from './join.js';

// Sample data to insert into authors table
const insertAuthorsData = () => {
  const query = `
    INSERT INTO authors (author_name, university, date_of_birth, h_index, gender) 
    VALUES 
    ('John Doe', 'Harvard University', '1980-02-14', 35, 'Male'),
    ('Jane Smith', 'Stanford University', '1990-07-25', 40, 'Female'),
    ('Mike Johnson', 'Harvard University', '1985-11-30', 30, 'Male'),
    ('Anna Brown', 'MIT', '1992-05-15', 28, 'Female');
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error inserting data:', err);
      return;
    }
    console.log('Data inserted successfully.');
  });
};

// Execute the function to insert sample data
insertAuthorsData();

// Close the connection after the script runs
connection.end();
