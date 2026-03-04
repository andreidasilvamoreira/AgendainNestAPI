# Agenda API

REST API for appointment scheduling and availability management.

## Technologies

- NestJS
- Prisma ORM
- MariaDB / MySQL
- JWT Authentication
- Class Validator

## Features

### Authentication
- JWT login
- Protected routes
- Role-based access control

### Users
- Create users
- Update users
- List users
- Delete users

Roles:
- ADMIN
- FUNCIONARIO
- CLIENTE

### Services
Manage services offered by the business:

- Create service
- Update service
- List services
- Activate / deactivate services

### Availability
Employees define when they are available to work.

Features:
- Weekly availability
- Time validation (HH:mm)
- Overlap prevention

### Appointments

Customers can schedule services with employees.

Features:
- Appointment creation
- Conflict validation
- Automatic end time calculation
- Snapshot of service price and duration
- Status management

Appointment status:
- AGENDADO
- CANCELADO
- CONCLUIDO

### Client Self-Service

Customers can access their own data:

Routes:

GET /me
GET /me/appointments
POST /me/appointments
PATCH /me/appointments/:id/cancel

## Security

- JWT authentication
- Role-based authorization
- Users cannot access other users' appointments

## Project Structure

src/
auth/
users/
services/
availability/
appointments/
me/
prisma/

## Future Improvements (Roadmap)

- Generate available time slots
- Reschedule appointments
- Pagination
- Unit tests
- React frontend

## Author

Andrei
