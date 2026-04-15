
# School Management System
*A DBMS mini project for managing student,teacher,subject and attendance records.*

## Project description:
The school management system is a simple database project developed as part of a DBMS mini project.
It uses  **MariaDB** for database management and **JavaScript** for front-end interaction.

## About:
The school managment system is a dbms mini project developed to explore and apply core dbms concepts. it uses mariadb as the database engine and a javascript+html frontend to provide a browser based interface for managing school records.

The system covers everything from registering students and teachers to tracking subject assignments and daily attednace.

## Objectives:
- To understand DBMS concepts 
- To design relational database tables
- To maintain structured records of students,teachers,subjects, and attendance
- To use MariaDB with Intellij IDEA

## Technologies Used:
- JavaScript- Front-end logic
- HTML & CSS- User interface and styling
- MariaDB- Dbms
- Intellij IDEA
- Github

## Tables:
- Student
- Teacher
- Attendance
- Subject

## Relation
- One teacher can teach multiple subjects
- One student can have attendance records for multiple subjects
- Attedance table connects students and subjects

Schema overview:
```text
┌─────────────────┐         ┌──────────────────────┐
│    Student      │         │       Teacher         │
│─────────────────│         │──────────────────────│
│ student_id (PK) │         │ teacher_id (PK)       │
│ name            │         │ name                  │
│ class           │         │ subject               │
│ age             │         │ specialization        │
└────────┬────────┘         │ experience            │
         │                  └──────────┬────────────┘
         │                             │ 1
         │ 1                           │
         │                           MANY
       MANY                            │
         │                             ▼
         │                  ┌──────────────────────┐
         │                  │       Subject         │
         │                  │──────────────────────│
         │                  │ subject_code (PK)     │
         │                  │ subject_name          │
         │                  │ teacher_id (FK)       │
         │                  └──────────┬────────────┘
         │                             │
         └──────────┬──────────────────┘
                    │
                    ▼
         ┌──────────────────────┐
         │      Attendance       │
         │──────────────────────│
         │ attendance_id (PK)    │
         │ student_id (FK)       │
         │ subject_id (FK)       │
         │ status                │
         │ date                  │
         └──────────────────────┘
```

## Team memebers:
- Heer shah
- Hemangi Makwana
- Sonam dwivedi
  
