module.exports = function escapeHTML(s) {
  if (s.includes ('&') || s.includes ('<') || s.includes ('>')) {
    return false;
  } else {
    return true;
  }
};
