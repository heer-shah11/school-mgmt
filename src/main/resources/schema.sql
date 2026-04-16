SHOW DATABASES;
SELECT DATABASE();
USE college;
SELECT * FROM students;


/*INSERT INTO students VALUES (2, 'Heer', 19);*/
INSERT INTO students VALUES (4, 'Riya', 19);
DELETE FROM students WHERE id = 2410483;

SELECT * FROM students;

USE school;

SHOW CREATE TABLE students;




DESCRIBE students;
INSERT INTO students VALUES (7, 'bro', 11);
ALTER TABLE students MODIFY id INT(11) NOT NULL AUTO_INCREMENT;



CREATE TABLE users (
                       id INT AUTO_INCREMENT PRIMARY KEY,
                       user_id VARCHAR(50) NOT NULL,
                       password VARCHAR(100) NOT NULL,
                       role VARCHAR(20) NOT NULL
);

INSERT INTO users (user_id, password, role) VALUES
                                                ('teacher01', 'teacher123', 'teacher'),
                                                ('student01', 'student123', 'student');