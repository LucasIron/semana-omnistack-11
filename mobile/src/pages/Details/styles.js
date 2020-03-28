

import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight + 20,
        paddingHorizontal: 24,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    incident: {
        marginTop: 48,
        marginBottom: 16,
        padding: 24,
        paddingBottom: 4,
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    incident__property: {
        color: '#41414d',
        fontSize: 14,
        fontWeight: 'bold',
    },
    incident__value: {
        marginTop: 8,
        marginBottom: 24,
        color: '#737380',
        fontSize: 15,
    },
    incident__details: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    incident__detailsText: {
        color: '#e02041',
        fontSize: 18,
        fontWeight: 'bold',
    },
    contact: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    contact__title: {
        color: '#13131a',
        fontSize: 20,
        fontWeight: 'bold',
        lineHeight: 30,
    },
    contact__description: {
        marginTop: 16,
        color: '#737380',
        fontSize: 15,
    },
    contact__buttons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    contact__button: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    contact__buttonText: {
        width: '100%',
        borderRadius: 8,
        paddingVertical: 17,
        paddingHorizontal: 34,
        color: '#fff',
        fontWeight: 'bold',
        lineHeight: 16,
        backgroundColor: '#e02041',
    }
});
