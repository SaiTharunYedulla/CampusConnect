USE campus_connect;

INSERT INTO users (email, password, role) VALUES
('student1@campus.edu', '$2a$10$examplehash', 'student'),
('teacher1@campus.edu', '$2a$10$examplehash', 'teacher');

INSERT INTO students (user_id, name, roll_number, department, year, skills, bio)
VALUES (1, 'Ava Thomas', 'CSE2023-001', 'CSE', 4, 'JavaScript, SQL', 'Final year student focused on full-stack');

INSERT INTO teachers (user_id, name, department, designation)
VALUES (2, 'Dr. Rahul Iyer', 'CSE', 'Professor');

INSERT INTO communities (name, description) VALUES
('CSE', 'Computer Science & Engineering community'),
('ECE', 'Electronics & Communication community');

INSERT INTO posts (student_id, title, description, hashtags, category, status)
VALUES (1, 'Hackathon Winner', 'Won 1st place in national hackathon', '#hackathon,#ai', 'Achievement', 'approved');

INSERT INTO approvals (post_id, teacher_id, score, suggestions, status)
VALUES (1, 1, 92, 'Great presentation and impact', 'approved');
