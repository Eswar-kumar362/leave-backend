USE leave_mgmt;

INSERT INTO hrs (email, password, createdAt, updatedAt)
VALUES (
  'admin@example.com',
  '$2a$10$CwTycUXWue0Thq9StjUM0uJ8ZTnbT0T92pT1jO3pUtHGanK8W7T/m',
  NOW(),
  NOW()
);


INSERT INTO Employees (name, email, department, joiningDate, leaveBalance) VALUES
('Aarav Singh','aarav@acme.com','Engineering','2024-01-10',20),
('Priya Nair','priya@acme.com','HR','2023-11-05',18),
('Rohit Mehta','rohit@acme.com','Sales','2024-03-01',15);