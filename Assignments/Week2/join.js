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

  // 3.1 Query to get authors and their mentors
  const joinAuthorsMentors = `
    SELECT a.author_name AS author, b.author_name AS mentor
    FROM authors a
    LEFT JOIN authors b ON a.mentor = b.author_id;
  `;
  
  connection.query(joinAuthorsMentors, (err, result) => {
    if (err) {
      console.error('Error fetching authors and mentors: ' + err.stack);
    } else {
      console.log('Authors and their mentors:');
      console.log(result);
    }
  });

  // 3.2 Query to get authors and their papers
  const joinAuthorsPapers = `
    SELECT a.author_name, p.paper_title
    FROM authors a
    LEFT JOIN research_Papers p ON a.author_id = p.author_id;
  `;

  connection.query(joinAuthorsPapers, (err, result) => {
    if (err) {
      console.error('Error fetching authors and papers: ' + err.stack);
    } else {
      console.log('Authors and their papers:');
      console.log(result);
    }
  });

  // Close connection after queries are complete
  connection.end();
});
