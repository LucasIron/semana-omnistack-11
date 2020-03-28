

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
    header__text: {
        color: '#737380',
        fontSize: 15,
    },
    header__textBold: {
        fontWeight: 'bold',
    },
    title: {
        marginTop: 48,
        marginBottom: 16,
        color: '#13131a',
        fontSize: 30,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#737380',
    },
    incidentList: {
        marginTop: 32,
    },
    incident: {
        marginBottom: 16,
        padding: 24,
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
});
