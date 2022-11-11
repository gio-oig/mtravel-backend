type CityArr = [string, number, number];

const citiesArr: CityArr[] = [
  ["Paris", 48.856614, 2.352222],
  ["Marseille", 43.296482, 5.36978],
  ["Lyon", 45.764043, 4.835659],
  ["Toulouse", 43.604652, 1.444209],
  ["Nice", 43.710173, 7.261953],
  ["Nantes", 47.218371, -1.553621],
  ["Strasbourg", 48.573405, 7.752111],
  ["Montpellier", 43.610769, 3.876716],
  ["Bordeaux", 44.837789, -0.57918],
  ["Lille", 50.62925, 3.057256],
  ["Rennes", 48.117266, -1.677793],
  ["Reims", 49.258329, 4.031696],
  ["Le Havre", 49.49437, 0.107929],
  ["Saint-Étienne", 45.439695, 4.387178],
  ["Toulon", 43.124228, 5.928],
  ["Angers", 47.478419, -0.563166],
  ["Grenoble", 45.188529, 5.724524],
  ["Dijon", 47.322047, 5.04148],
  ["Nîmes", 43.836699, 4.360054],
  ["Aix-en-Provence", 43.529742, 5.447427],
];

export const cities = citiesArr.map(createCityLocaltionObjects);
export const cityNames = cities.map(getCityName);

export function getFilterCities(keword: string) {
  return cityNames.filter((city) =>
    city.toLowerCase().includes(keword.toLowerCase())
  );
}

function createCityLocaltionObjects(cityArr: CityArr) {
  return {
    name: cityArr[0],
    latitude: cityArr[1],
    longitude: cityArr[2],
  };
}

function getCityName({ name }: { name: string }) {
  return name;
}

export function distance(
  lat1: number,
  lat2: number,
  lon1: number,
  lon2: number
) {
  // The math module contains a function
  // named toRadians which converts from
  // degrees to radians.
  lon1 = (lon1 * Math.PI) / 180;
  lon2 = (lon2 * Math.PI) / 180;
  lat1 = (lat1 * Math.PI) / 180;
  lat2 = (lat2 * Math.PI) / 180;

  // Haversine formula
  let dlon = lon2 - lon1;
  let dlat = lat2 - lat1;
  let a =
    Math.pow(Math.sin(dlat / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

  let c = 2 * Math.asin(Math.sqrt(a));

  // Radius of earth in kilometers. Use 3956
  // for miles
  let r = 6371;

  // calculate the result
  return c * r;
}

export function findCityByName(cityName: string) {
  return cities.find(({ name }) => name === cityName);
}
