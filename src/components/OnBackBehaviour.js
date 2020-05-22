import {useFocusEffect} from '@react-navigation/native';
import React from 'react';
import {BackHandler} from 'react-native';

export const OnBackBehaviour = function({onBack}) {
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        onBack();
        return false;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [onBack]),
  );

  return null;
};
