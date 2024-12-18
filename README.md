# React / Next JS Hospital Finder

This is easy to use web application that help people find details about hospital in specific location by searching.
## See demo 
[https://hospital-finder-nig.vercel.app/](https://hospital-finder-nig.vercel.app/) 

## Watch the Video on How to Use It
[![Watch the Video](./images/thumbnail.png)](https://youtu.be/a120JIX8DNE)

## Getting Started

### Prerequisites
Before setting up the project, ensure you have the following installed on your machine:

Node.js (LTS recommended)
Download from [Node.js official website](https://nodejs.org/en).
#### Verify installation:
```bash
node -v
```
##### npm or yarn
npm comes with Node.js by default. To check:
```bash
npm -v
```
Alternatively, install Yarn:
```bash
npm install --global yarn
```
#### Git
Download from [Git official website](https://git-scm.com/).
Verify installation:
```bash
git --version
```
### Local Setup
Follow these steps to set up the project locally.

#### Clone the Repository
Open your terminal or command prompt.
Run the following command to clone the repository:

```bash
git clone https://github.com/MBBmisau/hospital-finder.git
```

#### Navigate to the project directory:
```bash
cd hospital-finder
```

#### Install Dependencies
Install the necessary packages for the project. Run the following command:
##### If you're using npm:
```bash
npm install
```
##### If you're using yarn:

```bash
yarn install
```

Add the required environment variables to the .env.local file.
#### Create a MongoDB Database
- Sign up for [MongoDB Atlas](https://www.mongodb.com/)(cloud-hosted) or set up a local mongodb server.
- Create a database and a collection in MongoDB Atlas.
- Get the connection URI from MongoDB Atlas (eg., mongodb+srv://<username>:<password>@cluster0.mongodb.net/mydatabase?retryWrites=true&w=majority)
- Import hospitals data files to mongodb. The **hospitals.json** file is located at [data](./data/) directory. You can view sample of the data format at [data/sample.json](./data/sample.json)

#### Set Environment Variables
Create a .env.local file in the root of the project directory to store the connection string securely.
```bash
touch .env.local
```
Add the following in the env file
```bash
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/mydatabase?retryWrites=true&w=majority
```
**Note:** Replace the <password> and <database> with your actual credentials.

#### Start the Development Server
If you're using npm:
```bash
npm run dev
```
If you're using yarn:
```bash
yarn dev
```
Open http://localhost:3000 in your browser to view the application.

#### Build and Production
To build and run the project in production mode:
If you're using npm:
```bash
npm run build
```
If you're using yarn:
```bash
yarn build
```
#### Start the production server:
If you're using npm:
```bash
npm start
```
If you're using yarn:
```bash
yarn start
```