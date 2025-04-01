# Music Booking

Music Booking is a platform for managing artists, events, and bookings. This project is built using **Node.js**, **Express**, **TypeScript**, and **MongoDB**.

## Features

- User authentication (Sign-up and Sign-in)
- Artist profile management
- Event creation and management
- Booking artists for events

## Prerequisites

- **Node.js** (v16 or later)
- **npm** (v8 or later)
- **MongoDB** (running locally or a connection string for a cloud database)

## Installation

```bash
git clone https://github.com/your-username/music-booking.git
cd music-booking
npm install
```

## Environment Variables

Create a `.env` file in the root directory:

```env
MONGODB_DEV_URI=mongodb+srv://breellz:t5T4RfT4WbjczDC7@cluster0.blhx8jy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
PORT=9999
JWT_SECRET=uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu
```

## Running the Application

```bash
npm run dev   # Start the development server
npm run build # Build the project
npm start     # Start the production server
```

## Project Structure

```
music-booking/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── index.ts
├── dist/
├── package.json
├── tsconfig.json
├── .env
├── README.md
```

## API Endpoints

### Authentication

- `POST /api/auth/sign-up` - Sign up a new user
- `POST /api/auth/sign-in` - Sign in an existing user

### Artists

- `POST /api/artists/profile` - Create an artist profile
- `GET /api/artists/profile` - Get artist profile
- `PATCH /api/artists/availability` - Update artist availability

### Events

- `POST /api/events` - Create an event
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get a specific event
- `PATCH /api/events/:id` - Update an event
- `DELETE /api/events/:id` - Delete an event

### Bookings

- `POST /api/bookings` - Book an artist for an event
- `GET /api/bookings/event/:eventId` - Get bookings for an event
- `PATCH /api/bookings/:bookingId/cancel` - Cancel a booking

## Scripts

```bash
npm run build  # Build the project
npm run start  # Start the production server
npm run dev    # Start the development server
```

## Dependencies

- `bcryptjs`
- `express`
- `joi`
- `jsonwebtoken`
- `mongoose`
- `winston`

## Dev Dependencies

- `TypeScript`
- `@types/node`
- `@types/express`
- `nodemon`
- `dotenv`
