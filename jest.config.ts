// import type { Config } from "@jest/types";

// const config: Config.InitialOptions = {
//   preset: "ts-jest",
//   testEnvironment: "jsdom",
//   moduleFileExtensions: ["js", "ts", "tsx"],

//   transformIgnorePatterns: [
//     "/node_modules/(?!react-redux|other-module-you-want-to-transform)/"
//   ],  
//   transform: {
//     "^.+\\.(ts|tsx)$": "ts-jest", // Transform ts and tsx files using ts-jest
//     "^.+\\.js$": "babel-jest", // Transform JS files using babel-jest
//   },
//   globals: {
//     "ts-jest": {
//       isolatedModules: true,
//     },
//   },
// };

// export default config;


import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "ts", "tsx"],

  // Selectively transform node_modules if needed
  transformIgnorePatterns: [
    "/node_modules/(?!react-redux|some-other-module-you-want-to-transform)/"
  ], 

  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", // Transform TypeScript files using ts-jest
    "^.+\\.js$": "babel-jest",    // Transform JavaScript files using babel-jest (if needed)
  },
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy', // Mock all .css imports using identity-obj-proxy
  },
  
  globals: {
    "ts-jest": {
      isolatedModules: true,  // Use isolatedModules for faster compilation (if no inter-file type checking is needed)
    },
  },
};

export default config;
