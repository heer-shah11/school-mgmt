<<<<<<< HEAD
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

## Database tables design:
- Student table
  student id
  name
  class
  age

- Teacher table
  teacher id
  name
  subject specialization
  experience

- Subject table
  subject code
  subject name
  teacher id
  

- Attendance table
  attendance id
  student id
  subject id
  status
  date

Schema overview:

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

## Functional modules:
Student module
- add new student
- update student details
- delete student record
- view student deatils

Teacher module
- add teacher
- assign subject
- update teacher data
- view teacher data

Subject module
- add subjects
- assign teacher
- update subject details
- view subject list

Attendance module
- mark attedance
- update attendance
- view attadance by student
- view attendance by subject

## Prerequisites 
- MariaDB installed and running
- IntelliJ IDEA or any code editor
- A morden web browser


   


  
=======
# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).
>>>>>>> 4c239ff (added login page)
