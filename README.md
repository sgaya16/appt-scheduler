# Appointment Scheduler
Web app built with React and Firebase 
## Description 
This is a simple app built using React on the front end and Firebase on the back end. Users can sign up for an account and schedule appointments with other users. 
If a user receives an appointment request, they can either accept or reject the appointment. The home page will show all appointments the user has, and the appointments pending approval. 
## Getting Started
### Installing the project

- clone the project repository to your computer and access the project directory from the command line

#### Firebase back end

- to build the firebase back end in the root directory:

```
npm install 
```
-to run the firebase back end locally:

```
firebase serve
```
#### React front end

- Enter the client directory in the project

- to build the React front end in the client directory:

```
npm install 
```

- to run the firebase back end locally:

```
npm start
```
#### Notes 

- the proxy in the client package.json is configured to connect to the author's Firestore at localhost:5000. This will need to be changed for your project.

