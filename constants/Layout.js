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
        backgroundColor: Colors.background,
    },
    contentContainer: {
        padding: 10,
        alignItems: 'center'
    },
    deck: {
        width: 320,
        height: 50,
        margin: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Colors.deckBorderColor,
        alignItems: 'flex-start'
    },
    header: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 32,
        backgroundColor: Colors.tabBar,
        color: Colors.headlineColor,
        flexDirection: 'row'
    },
    button: {
        width: 320,
        margin: 10,
        padding: 10,
        borderRadius: 25,
        borderColor: Colors.deckBorderColor,
    },
    input: {
        width: 320,
        margin: 10,
        padding: 5,
        borderWidth: 0.5,
        borderColor: Colors.inactiveTintColor,
        backgroundColor: Colors.white
    }
});
