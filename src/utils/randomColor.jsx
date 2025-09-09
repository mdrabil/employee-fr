// utils/getRandomColor.js
// export const getRandomColor = () => {
//   const colors = [
//     "#10B981", // green
//     "#3B82F6", // blue
//     "#F59E0B", // amber
//     "#EF4444", // red
//     "#8B5CF6", // violet
//     "#EC4899", // pink
//     "#14B8A6", // teal
//     "#F97316", // orange
//   ];
//   const randomIndex = Math.floor(Math.random() * colors.length);
//   return colors[randomIndex];
// };


// utils/RandomColorHelper.js
export const getRandomColor = () => {
  // Pure HEX random color
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// ✅ Tailwind ke liye random safe colors
export const getRandomTailwindClass = (type = "bg") => {
  const shades = [100, 200, 300, 400, 500, 600, 700];
  const baseColors = [
    "red",
    "green",
    "blue",
    "yellow",
    "purple",
    "pink",
    "teal",
    "orange",
    "cyan",
    "lime",
    "indigo",
    "rose",
  ];

  const color = baseColors[Math.floor(Math.random() * baseColors.length)];
  const shade = shades[Math.floor(Math.random() * shades.length)];
  return `${type}-${color}-${shade}`; // ex: bg-blue-400 / text-red-600
};


export const getRandomStyle = () => {
  return { color: getRandomColor() }; // text ke liye
};
