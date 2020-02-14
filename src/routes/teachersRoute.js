const express = require("express");
const teacher = require("../models/data_teachers");
const teachersRoute = express.Router();

teachersRoute
  .get("/", (req, res) => {
    res.status(200).json({ teacher });
  })
  .post("/", (req, res) => {
    if (Array.isArray(req.body)) {
      req.body.map(elem => teacher.push(elem));
      res.status(200).send({ teacher });
    } else res.status(400).send("bad request");
    //console.log(teacher);
  })
  .delete("/:empNumber", (req, res) => {
    const empNumber = req.params.empNumber;
    const indexTeacher = teacher.findIndex(
      elem => elem.empNo === parseInt(empNumber, 10)
    );
    if (indexTeacher !== -1) {
      teacher.splice(indexTeacher, 1);
      console.log(teacher);
      res.status(200).send(`Employe number ${empNumber} removed`);
    } else {
      res.status(400).send(`Employe number ${empNumber} not found`);
    }
    //console.log(empNumber, indexTeacher);
  });

module.exports = teachersRoute;
