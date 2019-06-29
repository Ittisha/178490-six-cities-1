const RADIANS_IN_PI = 180;
const MINUTES_IN_DEGREE = 60;
const KILOMETRES_IN_MILE = 1.609344;
const MILES_IN_NAUTICAL_MILE = 1.1515;

export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const radlat1 = Math.PI * lat1 / RADIANS_IN_PI;
  const radlat2 = Math.PI * lat2 / RADIANS_IN_PI;
  const theta = lon1 - lon2;
  const radtheta = Math.PI * theta / RADIANS_IN_PI;
  let dist = Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = dist * RADIANS_IN_PI / Math.PI;
  dist = dist * MINUTES_IN_DEGREE * MILES_IN_NAUTICAL_MILE;
  dist = dist * KILOMETRES_IN_MILE;
  return dist;
};
