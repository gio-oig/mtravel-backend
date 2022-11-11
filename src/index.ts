import express from "express";
import morgan from "morgan";
import cors from "cors";

import { cities, distance, findCityByName, getFilterCities } from "./data";

const app = express();

app.use(express.json());
app.use(morgan("common"));
app.use(cors());

app.get("/", (req, res) => {
  res.json({ cities });
});

app.get("/cities/:keyword", (req, res, next) => {
  const { keyword } = req.params;

  if (keyword === "fail") {
    throw new Error("something went wrong");
  }

  const filteredcityNames = getFilterCities(keyword);

  return res.json([...filteredcityNames]);
});

app.post("/citiesDistance", (req, res) => {
  const { cities: citiesList } = req.body;
  const distances = [];

  if (citiesList.includes("Dijon")) {
    throw new Error("Please remove Dijon");
  }

  for (let i = 1; i < citiesList.length; i++) {
    const citiNameOne = citiesList[i - 1];
    const citiNameTwo = citiesList[i];

    const cityOne = findCityByName(citiNameOne);
    const cityTwo = findCityByName(citiNameTwo);

    if (!cityOne || !cityTwo) {
      return res.status(500).json({ message: "Could not find the city" });
    }

    const calculatedDistance = distance(
      cityOne.latitude,
      cityTwo.latitude,
      cityOne.longitude,
      cityTwo.longitude
    );

    distances.push({
      cityOne: cityOne.name,
      cityTwo: cityTwo.name,
      distance: calculatedDistance,
    });
  }

  const total = distances.reduce((acc, curr) => acc + curr.distance, 0);

  return res.json({ distances, total });
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Listen on the port 5000...");
});
