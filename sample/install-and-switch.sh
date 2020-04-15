#!/bin/zsh

rm -rf node_modules
yarn install

# Move the old files out of the way but keep for reference
mv node_modules/table-react-native-sdk/lib node_modules/table-react-native-sdk/lib-moved

# Link the source files into node_modules so that we can code 'live' on the dev app from Xcode or Android Studio
pushd ..
ln -s `pwd`/lib `pwd`/sample/node_modules/table-react-native-sdk
popd

