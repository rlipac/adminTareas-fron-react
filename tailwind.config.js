module.exports = {
  content: ["index.html", "./src/**/*.jsx", './node_modules/tw-elements/dist/js/**/*.js'],
  theme: {
    extend: {},
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ],
}
// content: ['./src/**/*.{html,js}', './node_modules/tw-elements/dist/js/**/*.js'],
// plugins: [
//   require('tw-elements/dist/plugin')
// ]