# This is the complete CDAC internship code 
## The application name is : SONIC
## Tech Stack:
Express.js, React.js, Node.js, MySQL, Sequelize, JWT, Apache

## Description
SONIC is a web application built on the MERN stack that allows users to upload and search for audio 
files along with their transcription and metadata. The platform enables users to filter audio files,
view transcriptions, and visualize the audio waveform and spectrogram using wavesurfer.js. Users can also download the audio files.

## Key feature
- Audio Upload: Upload audio files along with transcription and metadata.
- Search Functionality: Search for audio files by metadata or transcriptions.
- Visualization: Waveform and spectrogram visualizations for audio analysis.
- Authentication: JWT token-based login and logout.
- Admin Features: Admin roles for managing audio and transcription data, with future expansions for more admin types.

## Database
MySQL is used for storing data, with Sequelize as the ORM for easy data management. The application handles user data, audio file metadata in the database.

## Running the Project
### Backend (Node.js + Express)
Navigate to the backend directory and install dependencies:
```bash
# To run the backend:
cd newfolder/
npm install
npm start
```
Set up the MySQL database and configure the environment variables:
Create a .env file and configure the database connection:
```plaintext
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=cdac_project
JWT_SECRET=your_secret_key
```
Start the backend server:
```bash
node server
```
The backend will run on http://localhost:5000

### Frontend (React.js)
Navigate to the frontend directory and install dependencies:
```bash
cd frontend
npm install
```
Start the frontend server:
```bash
npm start
```
The frontend will run on http://localhost:3000
