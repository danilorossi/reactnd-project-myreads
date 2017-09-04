/** Configuration file for mocking broowser API > https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#srcsetuptestsjs */
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock
