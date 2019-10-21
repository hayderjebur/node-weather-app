const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forcast");

const app = express();
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
// Setup handlers engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Hayder Jebur"
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Hayder Jebur"
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Hayder Jebur"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please enter valid location"
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address
        });
      });
    }
  );
  // res.send({
  //   location: "San Francisco",
  //   forecast: "50",
  //   address: req.query.address
  // });
});

app.get("/help/*", (req, res) => {
  res.render("notFound", {
    name: "Hayder Jebur",
    title: "404",
    errorMassage: "Help artical not found"
  });
});

app.get("*", (req, res) => {
  res.render("notFound", {
    name: "Hayder Jebur",
    title: "404",
    errorMassage: "page not found"
  });
});

app.listen(3000, () => {
  console.log("first express");
});
