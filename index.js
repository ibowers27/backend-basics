// usually we put these commands at the top of file
const { validateCourse } = require("./validations");

// basic crud api
const express = require("express");
const app = express();
app.use(express.json()); // middleware, help parse json data

const port = process.env.PORT || 3000; // use local port 3001 or any other port set by your environment

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

app.get("/", async (req, res) => {
  res.send("Backend Basics...");
});

app.get("/api/courses", async (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", async (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send("Course does not exist...");
  else res.send(course);
});

app.listen(port, () => console.log(`Listening on port: ${port}`));

app.put("/api/courses/:id", async (req, res) => {
  //step 1: look up the course, if not found return 404, resource not found
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("Course does not exist...");

  //step2: validate and return 400 if the input is not in good shape
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // step3: if no error, then update the course and return the updated course in the response with proper status
  course.name = req.body.name;
  course.enrollment = req.body.enrollment;
  res.status(200).send(course);
});

app.delete("/api/courses/:id", async (req, res) => {
  // look up the course
  const course = courses.find(c => c.id === parseInt(req.params.id));
  // if it doesn't exist, return 404
  if (!course) return res.status(404).send("Course does not exist...");
  
  // otherwise delete and return appropriate message
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.status(200).send(course);
});

app.post("/api/courses", async (req, res) => {
  const userInput = {
    name: req.body.name,
    enrollment: req.body.enrollment,
  };
  const { error, value } = validateCourse(userInput);

  if (error) {
    return res.status(400).send(error.message);
  } else {
    const newCourse = {
      id: courses.length + 1,
      name: req.body.name,
      enrollment: req.body.enrollment,
    };
    courses.push(newCourse); // add to the course list
    return res.send(newCourse); //convention, return the new object
  }
});