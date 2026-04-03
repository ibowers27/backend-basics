// basic crud api
const express = require("express");
const app = express();
app.use(express.json()); // middleware, help parse json data

const port = process.env.PORT || 3000; // use local port 3001 or any other port set by your environment

//locally stored data

const courses = [
  {
    id: 1,
    name: "SWE",
    enrollment: 20,
  },
  {
    id: 2,
    name: "FP",
    enrollment: 10,
  },
  {
    id: 3,
    name: "Python",
    enrollment: 30,
  },
];

app.get("/api/courses", async (req, res) => {
  res.send(courses);
});

app.get("/", async (req, res) => {
  res.send("Backend Basics...");
});

app.listen(port, () => console.log(`Listening on port: ${port}`));
