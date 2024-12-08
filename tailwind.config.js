/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Scan all files in the `app` folder
    "./components/**/*.{js,ts,jsx,tsx}", // Scan files in a `components` folder (if applicable)
    "./pages/**/*.{js,ts,jsx,tsx}", // If you're using a `pages` folder
    "./globals.css", // Include your global CSS file
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))", // Define the custom `border` color
      },
    },
  },
  plugins: [],
};
