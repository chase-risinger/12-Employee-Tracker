INSERT INTO department (name)
VALUES
('Front of House'),
('Back of House');

INSERT INTO role (title, salary, department_id)
VALUES
('head chef', 75000, 2),
('sous chef', 58000, 2),
('cook', 33000, 2),
('dishwasher', 29000, 2),
('waiter', 42000, 1),
('bartender', 46000, 1),
('FOH Manager', 51000, 1),
('barback', 39000, 1),
('busser', 36000, 1),
('host', 34000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('John', 'Smith', 1, NULL),
('Kelly', 'Norris', 7, NULL),
('James', 'Fraser', 2, 1),
('Lionel', 'Johnson', 3, 1),
('Monica', 'Bellucci', 3, 1),
('Algernon', 'Blackwood', 4, 1),
('Harriet', 'Martineau', 4, 1),
('George', 'Harrison', 5, 2),
('Paul', 'McCartney', 5, 2),
('John', 'Lennon', 6, 2),
('Ringo', 'Starr', 6, 2),
('Chase', 'Risinger', 6, 2),
('Django', 'Reinhound', 8, 2),
('Martha', 'Stewart', 8, 2),
('Roberto', 'Fabre', 9, 2),
('Marque', 'Slap', 6, 2),
('Stephan', 'Grapelli', 10, 2),
('Starsky', 'Hutch', 9, 2),
('Lionel', 'Messi', 10, 2);

