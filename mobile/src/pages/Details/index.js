
import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

import styles from './styles';
import logo from '../../assets/logo.png';

export default () => {
    const navigation = useNavigation();
    const route = useRoute();

    const { incident } = route.params;
    const { ong } = incident;
    const value = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value);
    const message = `Olá ${ ong.name }, estou entrando em contato pois gostaria de ajudar no caso "${ incident.title }" com o valor de ${ value }`;
    
    const navigateBack = () => {
        navigation.goBack();
    };
    const sendMail = () => {
        MailComposer.composeAsync({
            subject: `Herói do caso: ${ incident.title }`,
            recipients: [ong.email],
            body: message,
        })
    };
    const sendWhatsApp = () => {
        Linking.openURL(`whatsapp://send?phone=${ ong.whatsapp }&text=${ message }`);
    };

    return (
        <View style={ styles.container }>
            <View style={ styles.header }>
                <Image source={ logo }/>

                <TouchableOpacity onPress={ navigateBack }>
                    <Feather name="arrow-left" size={ 20 } color="#e02041"/>
                </TouchableOpacity>
            </View>

            <View style={ styles.incident }>
                <Text style={ styles.incident__property }>ONG:</Text>
                <Text style={ styles.incident__value }>{ ong.name } de { ong.city }/{ ong.uf }</Text>

                <Text style={ styles.incident__property }>Caso:</Text>
                <Text style={ styles.incident__value }>{ incident.title }</Text>

                <Text style={ styles.incident__property }>Valor:</Text>
                <Text style={ styles.incident__value }>{ value }</Text>
            </View>

            <View style={ styles.contact }>
                <Text style={ styles.contact__title }>Salve o dia!</Text>
                <Text style={ styles.contact__title }>Seja o herói desse caso.</Text>

                <Text style={ styles.contact__description }>Entre em contato:</Text>
                
                <View style={ styles.contact__buttons}>
                    <TouchableOpacity style={ styles.contact__button } onPress={ sendWhatsApp }>
                        <Text style={ styles.contact__buttonText }>WhatsApp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={ styles.contact__button } onPress={ sendMail }>
                        <Text style={ styles.contact__buttonText }>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
