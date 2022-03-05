export const ColorGenerator = () => {
  let data = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F"
  ];
  let getRandomIntInclusive = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color = color + data[getRandomIntInclusive(0, data.length - 1)];
  }
  return color + "15";
};
