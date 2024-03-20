// __mocks__/@react-native-async-storage/async-storage.js

const mockAsyncStorage = {
  data: {},
  setItem: jest.fn((key, value) => {
    return new Promise((resolve, reject) => {
      mockAsyncStorage.data[key] = value;
      resolve(value);
    });
  }),
  getItem: jest.fn((key) => {
    return new Promise((resolve, reject) => {
      resolve(mockAsyncStorage.data[key]);
    });
  }),
  removeItem: jest.fn((key) => {
    return new Promise((resolve, reject) => {
      delete mockAsyncStorage.data[key];
      resolve();
    });
  }),
  clear: jest.fn(() => {
    return new Promise((resolve, reject) => {
      mockAsyncStorage.data = {};
      resolve();
    });
  }),
};

export default mockAsyncStorage;
