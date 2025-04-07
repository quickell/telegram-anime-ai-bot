module.exports = function normalize(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/gi, '');
};
