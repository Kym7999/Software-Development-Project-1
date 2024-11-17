CREATE DATABASE SQLServer4ClinicApp;
USE SQLServer4ClinicApp;

CREATE TABLE Patients (
	id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    name VARCHAR(100) NOT NULL,
    dob VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    allergies VARCHAR(200)
);

INSERT INTO Patients (email, password, name, dob, address, phone, allergies)
VALUES
('patient1@example.com', 'password', 'John Doe', '1990-01-01', '123 Main St, Anytown, CA 12345', '123-456-7890', 'None'),
('patient2@example.com', 'password', 'Jane Smith', '1985-05-15', '456 Elm St, Anytown, CA 12345', '234-567-8901', 'Peanuts'),
('patient3@example.com', 'password', 'Michael Johnson', '1972-12-25', '789 Oak St, Anytown, CA 12345', '345-678-9012', 'Shellfish'),
('patient4@example.com', 'password', 'Emily Brown', '1995-09-09', '101 Pine St, Anytown, CA 12345', '456-789-0123', 'None'),
('patient5@example.com', 'password', 'David Lee', '1980-02-20', '212 Cedar St, Anytown, CA 12345', '567-890-1234', 'Dairy'),
('patient6@example.com', 'password', 'Sarah Kim', '1998-07-07', '323 Maple St, Anytown, CA 12345', '678-901-2345', 'Eggs'),
('patient7@example.com', 'password', 'Thomas Wilson', '1975-11-11', '434 Willow St, Anytown, CA 12345', '789-012-3456', 'Tree Nuts'),
('patient8@example.com', 'password', 'Olivia Taylor', '2002-03-13', '545 Birch St, Anytown, CA 12345', '890-123-4567', 'Soy'),
('patient9@example.com', 'password', 'James Anderson', '1968-08-08', '656 Aspen St, Anytown, CA 12345', '901-234-5678', 'Wheat'),
('patient10@example.com', 'password', 'Sophia Martinez', '2005-12-12', '767 Elm St, Anytown, CA 12345', '012-345-6789', 'None');


CREATE TABLE Medications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),    
    type VARCHAR(200),
    dosage VARCHAR(200),
    form VARCHAR(100),
    stock INT
);

INSERT INTO Medications (name, type, dosage, form, stock) VALUES
('Paracetamol', 'Analgesic', '500mg', 'Tablet', 100),
('Ibuprofen', 'NSAID', '400mg', 'Tablet', 0),
('Aspirin', 'Analgesic', '325mg', 'Tablet', 120),
('Amoxicillin', 'Antibiotic', '500mg', 'Capsule', 50),
('Metformin', 'Antidiabetic', '500mg', 'Tablet', 0),
('Atorvastatin', 'Statin', '10mg', 'Tablet', 90),
('Lisinopril', 'ACE Inhibitor', '10mg', 'Tablet', 0),
('Albuterol', 'Bronchodilator', '2.5mg/puff', 'Inhaler', 0),
('Levothyroxine', 'Thyroid Hormone', '100mcg', 'Tablet', 150),
('Fluoxetine', 'Antidepressant', '20mg', 'Capsule', 30);


CREATE TABLE Prescriptions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patientId INT,
    medicationId INT,
    status VARCHAR(100),    
    FOREIGN KEY (patientId) REFERENCES Patients(id),
    FOREIGN KEY (medicationId) REFERENCES Medications(id)
);

INSERT INTO Prescriptions (patientId, medicationId, status) VALUES
(1, 10, 'Pending'),
(2, 9, 'Pending'),
(3, 8, 'Pending'),
(4, 7, 'Pending'),
(5, 6, 'Pending'),
(6, 5, 'Pending'),
(7, 4, 'Pending'),
(8, 3, 'Pending'),
(9, 2, 'Pending'),
(10, 1, 'Pending');

CREATE TABLE Staff(
	id INT AUTO_INCREMENT PRIMARY KEY,
    role VARCHAR(100) NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);

INSERT INTO Staff (role, name, email, password) VALUES ('clinicAdmin', 'Clinic Admin Team 3', 'clinicadmin@gmail.com','password');
INSERT INTO Staff (role, name, email, password) VALUES ('receptionist', 'Receptionist Team 3', 'receptionist@gmail.com','password');
INSERT INTO Staff (role, name, email, password) VALUES ('doctor', 'Doctor Team 3 #1', 'doctor1@gmail.com','password');
INSERT INTO Staff (role, name, email, password) VALUES ('doctor', 'Doctor Team 3 #2', 'doctor2@gmail.com','password');
INSERT INTO Staff (role, name, email, password) VALUES ('doctor', 'Doctor Team 3 #3', 'doctor3@gmail.com','password');
INSERT INTO Staff (role, name, email, password) VALUES ('nurse', 'Nurse Team 3', 'nurse@gmail.com','password');
INSERT INTO Staff (role, name, email, password) VALUES ('pharmacist', 'Pharmacist Team 3', 'pharmacist@gmail.com','password');
INSERT INTO Staff (role, name, email, password) VALUES ('healthcoach', 'Health Coach Team 3', 'healthcoach@gmail.com','password');



CREATE TABLE Schedules(
	id INT AUTO_INCREMENT PRIMARY KEY,
    staffid INT,
	date VARCHAR(100),
	start_time TIME,
	end_time TIME,
	FOREIGN KEY (staffid) REFERENCES Staff(id)
); 
    
INSERT INTO Schedules (staffid, date, start_time, end_time)
VALUES
	(1, '2024-11-07', '09:00:00', '17:00:00'),
	(2, '2024-11-07', '10:00:00', '16:00:00'),
	(3, '2024-11-08', '08:00:00', '12:00:00'),
	(4, '2024-11-08', '13:00:00', '17:00:00');
    
INSERT INTO Schedules (staffid, date, start_time, end_time)
VALUES
	(1, '2024-11-09', '06:00:00', '14:00:00'),
	(2, '2024-11-09', '07:00:00', '13:00:00'),
	(3, '2024-11-10', '09:00:00', '15:00:00'),
	(4, '2024-11-10', '05:00:00', '12:00:00');
    

CREATE TABLE Appointment(
	id INT AUTO_INCREMENT PRIMARY KEY,
    patientid INT,
    doctorid INT,
	date VARCHAR(100),
	time TIME,
	FOREIGN KEY (patientid) REFERENCES Patients(id)
);

USE SQLServer4ClinicApp;
CREATE TABLE RefillRequests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    medication_id INT NOT NULL,
    patient_id  INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (medication_id) REFERENCES Medications(id),
    FOREIGN KEY (patient_id) REFERENCES Patients(id)
);


INSERT INTO RefillRequests (medication_id, patient_id, quantity)
VALUES
(1, 10, 20),
(2, 9, 10),
(3, 8, 25),
(4, 7, 18),
(5, 6, 14),
(6, 5, 30),
(7, 4, 28),
(8, 3, 10),
(9, 2, 8),
(10, 1, 14);

    

USE SQLServer4ClinicApp;
CREATE TABLE MedicalHistory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT,
    date DATE,
    diagnosis VARCHAR(255),
    symptoms VARCHAR(255),
    treatment VARCHAR(255),
    notes TEXT,
    FOREIGN KEY (patient_id) REFERENCES Patients(id)
);

INSERT INTO MedicalHistory (patient_id, date, diagnosis, symptoms, treatment, notes)
VALUES (1, '2023-11-10', 'Common Cold', 'Cough, Sore Throat', 'Over-the-counter medication', 'Resolved within a week');

INSERT INTO MedicalHistory (patient_id, date, diagnosis, symptoms, treatment, notes)
VALUES (1, '2022-05-15', 'Flu', 'Fever, Body Aches', 'Flu shot, rest, fluids', 'Recovered after a week');

INSERT INTO MedicalHistory (patient_id, date, diagnosis, symptoms, treatment, notes)
VALUES  
  (1, '2023-10-26', 'Common Cold', 'Sore throat, cough, runny nose', 'Over-the-counter medication, rest', 'Symptoms resolved within a week'),
  (1, '2022-05-12', 'Sprained Ankle', 'Swelling, pain in ankle', 'RICE therapy (Rest, Ice, Compression, Elevation)', 'Ankle healed completely'),
  
  (2, '2023-09-01', 'Food Allergy (Shellfish)', 'Nausea, vomiting, hives', 'Emergency room visit, epinephrine injection', 'Diagnosed with shellfish allergy, advised to avoid shellfish'),
  (2, '2021-02-10', 'Urinary Tract Infection (UTI)', 'Burning sensation when urinating, frequent urination', 'Antibiotics', 'UTI cleared up with antibiotics'),
  
  (3, '2023-07-15', 'High Blood Pressure', 'Headache, dizziness', 'Blood pressure medication', 'Blood pressure under control with medication'),
  (3, '2020-12-25', 'Seasonal Allergies', 'Sneezing, runny nose, itchy eyes', 'Antihistamines', 'Symptoms managed with medication'),  
  (4, '2023-04-05', 'Migraine Headache', 'Severe headache, nausea, vomiting', 'Pain medication, rest in a dark room', 'Migraine resolved with medication and rest'),
  (4, '2022-08-18', 'Skin Rash', 'Red, itchy rash on arm', 'Topical corticosteroid cream', 'Rash cleared up with cream'),
  
  (5, '2023-11-10', 'Back Pain', 'Pain in lower back', 'Over-the-counter pain medication, physical therapy', 'Back pain improved with treatment'),
  (5, '2021-03-20', 'Dental Cavity', 'Toothache', 'Dental filling', 'Cavity filled, toothache resolved'),
  
  (6, '2023-06-12', 'Food Allergy (Soy)', 'Digestive issues, skin rash', 'Avoidance of soy products', 'Symptoms resolved with dietary changes'),
  (6, '2022-10-01', 'Common Cold', 'Sore throat, cough, runny nose', 'Over-the-counter medication, rest', 'Symptoms resolved within a week'),
  
  (7, '2023-02-28', 'High Cholesterol', 'No symptoms', 'Statin medication', 'Cholesterol levels reduced with medication'),
  (7, '2021-07-15', 'Seasonal Allergies', 'Sneezing, runny nose, itchy eyes', 'Antihistamines', 'Symptoms managed with medication'),
  
  (8, '2023-05-05', 'Anxiety', 'Feeling anxious, difficulty sleeping', 'Therapy, medication', 'Symptoms improved with treatment'),
  (8, '2022-12-25', 'Food Allergy (Gluten)', 'Digestive issues, fatigue', 'Gluten-free diet', 'Symptoms resolved with dietary changes'),
  
  (9, '2023-09-20', 'Depression', 'Sadness, loss of interest', 'Antidepressant medication, therapy', 'Symptoms improved with treatment'),
  (9, '2021-04-10', 'Food Allergy (Dairy)', 'Digestive issues, skin rash', 'Dairy-free diet', 'Symptoms resolved with dietary changes'),
  
  (10, '2023-08-15', 'Minor Skin Infection', 'Redness, itching on arm', 'Topical antibiotic cream', 'Skin infection cleared up with treatment'),
  (10, '2020-01-01', 'Headache', 'Throbbing pain in head', 'Over-the-counter pain medication', 'Headache resolved with medication');
  
  
  
  
-- USE SQLServer4ClinicApp;
-- SHOW TABLES;

-- SELECT * FROM STAFF;
-- SELECT * FROM SCHEDULES;
-- SELECT * FROM REFILLREQUESTS;
-- SELECT * FROM PRESCRIPTIONS;
-- SELECT * FROM PATIENTS;
-- SELECT * FROM MEDICATIONS;
-- SELECT * FROM MEDICALHISTORY;
-- SELECT * FROM APPOINTMENT;