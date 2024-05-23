import { LngLat } from "./store";

export function formatDateTime(dateTimeString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  const dateTime = new Date(dateTimeString);
  const formattedDateTime = new Intl.DateTimeFormat("zh-CN", options).format(dateTime);

  return formattedDateTime;
}

export function capitalizeFirstLetter(input: string): string {
  return input.charAt(0).toUpperCase() + input.slice(1);
}

export function calcZoom(points: LngLat[], pixel: number) {
  let sumLng = 0;
  let sumLat = 0;
  for (const point of points) {
    sumLng += point.lng;
    sumLat += point.lat;
  }
  const center = {
    lng: sumLng / points.length,
    lat: sumLat / points.length,
  };

  function haversineDistance(point1: LngLat, point2: LngLat) {
    const R = 6371e3;
    const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

    const φ1 = toRadians(point1.lat);
    const φ2 = toRadians(point2.lat);
    const Δφ = toRadians(point2.lat - point1.lat);
    const Δλ = toRadians(point2.lng - point1.lng);

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;
    return distance;
  }

  let maxDistance = 0;
  for (const point of points) {
    const distance = haversineDistance(center, point);
    if (distance > maxDistance) {
      maxDistance = distance;
    }
  }

  return calcZoomLevel(center.lat, maxDistance, pixel);
}

interface ZoomLevels {
  [key: number]: number[];
}

const zoomLevels: ZoomLevels = {
  0: [78271.484, 73551.136, 59959.436, 39135.742, 13591.701],
  1: [39135.742, 36775.568, 29979.718, 19567.871, 6795.850],
  2: [19567.871, 18387.784, 14989.859, 9783.936, 3397.925],
  3: [9783.936, 9193.892, 7494.929, 4891.968, 1698.963],
  4: [4891.968, 4596.946, 3747.465, 2445.984, 849.481],
  5: [2445.984, 2298.473, 1873.732, 1222.992, 424.741],
  6: [1222.992, 1149.237, 936.866, 611.496, 212.370],
  7: [611.496, 574.618, 468.433, 305.748, 106.185],
  8: [305.748, 287.309, 234.217, 152.874, 53.093],
  9: [152.874, 143.655, 117.108, 76.437, 26.546],
  10: [76.437, 71.827, 58.554, 38.218, 13.273],
  11: [38.218, 35.914, 29.277, 19.109, 6.637],
  12: [19.109, 17.957, 14.639, 9.555, 3.318],
  13: [9.555, 8.978, 7.319, 4.777, 1.659],
  14: [4.777, 4.489, 3.660, 2.389, 0.830],
  15: [2.389, 2.245, 1.830, 1.194, 0.415],
  16: [1.194, 1.122, 0.915, 0.597, 0.207],
  17: [0.597, 0.561, 0.457, 0.299, 0.104],
  18: [0.299, 0.281, 0.229, 0.149, 0.052],
  19: [0.149, 0.140, 0.114, 0.075, 0.026],
  20: [0.075, 0.070, 0.057, 0.037, 0.013],
  21: [0.037, 0.035, 0.029, 0.019, 0.006],
  22: [0.019, 0.018, 0.014, 0.009, 0.003],
};

function calcZoomLevel(_latitude: number, radiusMeters: number, pixel: number): number {
  let index: number;
  let latitude = Math.abs(_latitude);

  if (latitude < 20) {
    index = 1;
  } else if (latitude < 40) {
    index = 2;
  } else if (latitude < 60) {
    index = 3;
  } else if (latitude < 80) {
    index = 4;
  } else {
    index = 5;
  }

  let bestZoom: number | null = 0;
  // let minDiff: number = Number.MAX_VALUE;

  for (let zoom in zoomLevels) {
    const zoomLevel = parseInt(zoom);
    const metersPerPixel = zoomLevels[zoomLevel][index];
    // const pixelRadius = radiusMeters / metersPerPixel;
    // const diff = Math.abs(radiusMeters - metersPerPixel * pixelRadius);

    // Check if the current zoom level is suitable
    // console.log(metersPerPixel)
    // console.log(radiusMeters)
    if (metersPerPixel * pixel <= radiusMeters * 2) {
      break;
    }
    bestZoom = zoomLevel;
  }

  // console.log(bestZoom!)
  return bestZoom!;
}
