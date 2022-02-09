function generateRandomInt() {
  return ((Math.random() * 500 + Math.random() * 3000) | 0) + 1;
}

export { generateRandomInt };
