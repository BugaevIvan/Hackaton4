-- Создание базы данных
CREATE DATABASE AccommodationManagement;

-- Использование базы данных
USE AccommodationManagement;

-- Создание таблицы для мест проживания
CREATE TABLE Accommodations (
    AccommodationID INT AUTO_INCREMENT PRIMARY KEY,
    Type ENUM('общага', 'гостиница') NOT NULL,
    Capacity INT NOT NULL,
    Location VARCHAR(255) NOT NULL,
    Description TEXT,
    AvailabilityStatus BOOLEAN DEFAULT TRUE
);

-- Создание таблицы для сотрудников
CREATE TABLE Employees (
    EmployeeID INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(255) NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    ArrivalDate DATE NOT NULL
);

-- Создание таблицы для назначения мест проживания сотрудникам
CREATE TABLE Assignments (
    AssignmentID INT AUTO_INCREMENT PRIMARY KEY,
    EmployeeID INT,
    AccommodationID INT,
    AssignmentDate DATE NOT NULL,
    FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID),
    FOREIGN KEY (AccommodationID) REFERENCES Accommodations(AccommodationID)
);

-- Добавление начальных данных в таблицу мест проживания
INSERT INTO Accommodations (Type, Capacity, Location, Description) VALUES
('общага', 100, 'Москва, ул. Ленина, 10', 'Общага для сотрудников компании'),
('гостиница', 50, 'Санкт-Петербург, Невский проспект, 25', 'Гостиница для временного проживания'),
('общага', 80, 'Казань, ул. Габдуллы Тукая, 5', 'Общага для сотрудников компании'),
('гостиница', 30, 'Екатеринбург, ул. Малышева, 15', 'Гостиница для временного проживания');

-- Добавление начальных данных в таблицу сотрудников
INSERT INTO Employees (FirstName, LastName, ArrivalDate) VALUES
('Иван', 'Иванов', '2023-10-01'),
('Петр', 'Петров', '2023-10-02'),
('Анна', 'Сидорова', '2023-10-03'),
('Елена', 'Смирнова', '2023-10-04');

-- Добавление начальных данных в таблицу назначений
INSERT INTO Assignments (EmployeeID, AccommodationID, AssignmentDate) VALUES
(1, 1, '2023-10-01'),
(2, 2, '2023-10-02'),
(3, 3, '2023-10-03'),
(4, 4, '2023-10-04');