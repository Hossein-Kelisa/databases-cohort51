DROP DATABASE IF EXISTS meetup;

CREATE DATABASE meetup;

USE meetup;

CREATE TABLE Invitee (
  invitee_no INT AUTO_INCREMENT PRIMARY KEY,
  invitee_name VARCHAR(255) NOT NULL,
  invited_by VARCHAR(255) NOT NULL
);

CREATE TABLE Room (
  room_no INT AUTO_INCREMENT PRIMARY KEY,
  room_name VARCHAR(255) NOT NULL,
  floor_number INT NOT NULL
);

CREATE TABLE Meeting (
  meeting_no INT AUTO_INCREMENT PRIMARY KEY,
  meeting_title VARCHAR(255) NOT NULL,
  starting_time DATETIME NOT NULL,
  ending_time DATETIME NOT NULL,
  room_no INT,
  FOREIGN KEY (room_no) REFERENCES Room(room_no)
);

INSERT INTO Invitee (invitee_name, invited_by) VALUES
('Ali', 'Hossein'),
('Samira', 'Feras'),
('Rizan', 'Jo'),
('Stas', 'Konjit'),
('Salih', 'Khiro');

INSERT INTO Room (room_name, floor_number) VALUES
('Conference Room A', 1),
('Meeting Room B', 2),
('Small Room C', 3),
('Main Hall', 1),
('VIP Room', 5);

INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no) VALUES
('Team Sync', '2025-03-11 10:00:00', '2025-03-11 11:00:00', 1),
('Project Kickoff', '2025-03-12 09:30:00', '2025-03-12 10:30:00', 2),
('Client Meeting', '2025-03-13 14:00:00', '2025-03-13 15:30:00', 3),
('Training Session', '2025-03-14 16:00:00', '2025-03-14 17:30:00', 4),
('Board Meeting', '2025-03-15 18:00:00', '2025-03-15 19:30:00', 5);
