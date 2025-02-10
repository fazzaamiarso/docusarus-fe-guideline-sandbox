---
sidebar_label: Development
title: Development
---
Some things to note when developing

## General
- When using `Touchables` or `Pressables`, always use import from `react-native` instead of `react-native-gesture-handler` as it have some issue that's hard to debug. Refer to [Stack Overflow](https://stackoverflow.com/questions/64742265/difference-between-touchables-from-react-native-and-react-native-gesture-handler)

## Bare/React Native CLI
### Android
- For Bundling Android, mainly we use the script configured listed in `package.json`
- When bundling Gradle, sometimes will have out of memory error. To solve it you can uninstall the app's on the emulator and rerun the build.
- When bundling sometimes occured insufficient memory error which caused by build cache piling up. To solve it, simply `cd` into the android directory and run `./gradlew --stop`

### IOS
- For bundling IOS, always use XCode. The flow for bundling and publishing to AppStore is:
    - In Xcode, select `build` tab on Xcode bar.
    - select clean build and wait until it's done
    - after clean sucess can start to archive the bundle by `build > Archive`. Wait until the bundling process done and organizer window will open.
    - Select the build that we want to upload, then 'Distribute App'. If the bundle is for testing only then, select Test Flight only. For publishing, select AppStore Connect.


## Expo
*Not Completed nor comprehensive. Will be periodically updated when development with Expo started*
- For libraries, always search from Expo first-party libraries first to ensure compatibility with the framework. You can see all the list of Expo SDK libraries on [https://docs.expo.dev/versions/latest/](https://docs.expo.dev/versions/latest/)
- We use Expo Router which use a file-based routing paradigm and quite different with Bare Workflow. If you are coming from Next.js than it should feel familiar. Make sure to read understand the concepts on [https://docs.expo.dev/router/introduction/](https://docs.expo.dev/router/introduction/)
- We will most certainly use managed Expo with development build and Continuous Native Generation. So Expo Go, unlikey to work with our apps.
- To see all compatible libraries with expo or new architecture, search in [https://reactnative.directory/](https://reactnative.directory/)
- Note that currently we use react native New Architecture (RN 0.76+) which introduces new way bridging with Native Code, so make sure the library that we install is compatible with new architecture.


