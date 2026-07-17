

## Restaurant Management System
## Overview
The Restaurant Management System is a full stack web application built to help restaurant
staff manage tables, tickets, and employees in real time. It was a collaborative project: I
owned the backend, while a teammate handled the frontend. The stack is React on the
frontend and Node.js, Express, and MySQL on the backend.
## Backend Responsibilities
My work on the backend included:
- Multiple Express route files, organized by resource (tables, tickets, employees),
following REST conventions
- Stored procedures in MySQL for common multi-step operations, keeping business
logic close to the data and reducing round trips from the API layer
- A real time ticket stopwatch feature to track how long a ticket has been open so
staff can see which tables need attention
- Employee and table display components' backing data the endpoints that fed the
frontend's live views of restaurant state
## The Ticket Stopwatch Feature
The stopwatch feature required thinking about state that changes continuously without
needing a database write on every tick. Rather than updating the database every second,
the approach was to store a ticket's “created_at” timestamp once, and let the frontend
calculate elapsed time client-side by diffing against the current time. This keeps the
database load low while still giving staff an accurate, constantly updating view of ticket
age.
## What I'd Do Differently
A few things worth improving:

- Add more granular error handling on the stored procedure calls, so failures surface
more specific messages to the frontend instead of generic 500 errors
- Write integration tests for the route handlers the project was built under time
pressure, and testing was the first thing cut