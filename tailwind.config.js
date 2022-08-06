/** @type {import('tailwindcss').Config} */
module.exports = {
  // tailwind 应用范围
  // 应用html和src下的所有vue，js文件
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
