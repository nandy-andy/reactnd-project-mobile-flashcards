import {Dimensions, StyleSheet} from 'react-native';
import Colors from './Colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const global = {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
};


export const layout = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background
    },
    contentContainer: {
        paddingTop: 30,
    },
});
