module.exports = {
  extends: ['airbnb-base'],
  parser: 'babel-eslint',
  rules: {
     // Desactivar la regla de los puntos y coma
    'semi': 'off',
    // Crear una regla personalizada que prohíba los puntos y coma
    'no-extra-semi': 'error'
  }
};
