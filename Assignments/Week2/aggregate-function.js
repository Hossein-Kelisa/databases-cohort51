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

  // 4.1 Count of authors per paper
  const papersAuthorCount = `
    SELECT p.paper_title, COUNT(r.author_id) AS authors_count
    FROM research_Papers p
    LEFT JOIN authors r ON p.author_id = r.author_id
    GROUP BY p.paper_id;
  `;

  connection.query(papersAuthorCount, (err, result) => {
    if (err) {
      console.error('Error fetching paper author counts: ' + err.stack);
    } else {
      console.log('Research papers and the number of authors:');
      console.log(result);
    }
  });

  // 4.2 Sum of research papers by female authors
  const femaleAuthorsPaperCount = `
    SELECT SUM(1) AS female_authors_papers
    FROM research_Papers p
    JOIN authors a ON p.author_id = a.author_id
    WHERE a.gender = 'Female';
  `;

  connection.query(femaleAuthorsPaperCount, (err, result) => {
    if (err) {
      console.error('Error fetching female authors paper count: ' + err.stack);
    } else {
      console.log('Sum of research papers by female authors:');
      console.log(result);
    }
  });

  // 4.3 Average of the h-index per university
  const avgHIndexPerUniversity = `
    SELECT university, AVG(h_index) AS avg_h_index
    FROM authors
    GROUP BY university;
  `;

  connection.query(avgHIndexPerUniversity, (err, result) => {
    if (err) {
      console.error('Error fetching average h-index per university: ' + err.stack);
    } else {
      console.log('Average h-index per university:');
      console.log(result);
    }
  });

  // Close connection after queries
  connection.end();
});
