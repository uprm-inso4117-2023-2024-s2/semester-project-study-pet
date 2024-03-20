// __mocks__/console.js

const originalConsoleError = console.error;

console.error = jest.fn((...args) => {
  originalConsoleError(...args);
});

export default console.error;
