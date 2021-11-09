### Before you start

***App-name*** requires a couple of previous steps to start with the installation. 

- You will need to have [npm](https://www.npmjs.com/) to install the application dependencies. If you don't have it, please follow [these](https://www.npmjs.com/get-npm) steps to install it.
- You will need to belong to an Apple organization development team for this project in order to run the application on iOS. 
- Also, this is a React Native project, so you must install React Native. Follow [these](https://facebook.github.io/react-native/docs/getting-started.html#content) steps to do it.

### Installation

1. Clone the repo locally:

```sh
git clone https://github.com/f-felicio/rickmorty.git
```

2. Navigate into project
```sh
cd rickmorty
```

3. Install dependencies
```sh
npm install
```

4. Configurate iOS project
```sh
cd ios
pod install
```

5. Go back to main project folder
```sh
cd ..
```

### Run application

##### iOS #####
```sh
npx react-native run-ios
```



##### Android #####

```sh
npx react-native run-android
```
