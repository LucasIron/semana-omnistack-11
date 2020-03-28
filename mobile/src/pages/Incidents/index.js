
import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import styles from './styles';
import logo from '../../assets/logo.png';
import api from '../../services/api';

export default () => {
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const navigateToDetail = (incident) => {
        navigation.navigate('details', { incident });
    };

    const loadIncidents = () => {
        if (loading || (total > 0 && incidents.length === total)) return;

        setLoading(true);
        api.get('incidents', {
            params: { page },
        }).then((response) => {
            setIncidents(incidents.concat(response.data));
            setTotal(response.headers['x-total-count']);
            setPage(page + 1);
            setLoading(false);
        });
    }

    useEffect(loadIncidents, []);

    return (
        <View style={ styles.container }>
            <View style={ styles.header }>
                <Image source={ logo }/>
                <Text style={ styles.header__text }>
                    Total de <Text style={ styles.header__textBold }>{ total } casos</Text>.
                </Text>
            </View>

            <Text style={ styles.title }>Bem-vindo</Text>
            <Text style={ styles.description }>Escolha um dos casos abaixo e salve o dia!</Text>

            <FlatList
                data={ incidents }
                keyExtractor={ incident => String(incident.id) }
                showsVerticalScrollIndicator={ false }
                style={ styles.incidentList }
                onEndReached={ loadIncidents }
                onEndReachedThreshold={ 0.2 }
                renderItem={ ({ item: incident }) => (
                    <View style={ styles.incident }>
                        <Text style={ styles.incident__property }>ONG:</Text>
                        <Text style={ styles.incident__value }>{ incident.ong.name }</Text>

                        <Text style={ styles.incident__property }>Caso:</Text>
                        <Text style={ styles.incident__value }>{ incident.title }</Text>

                        <Text style={ styles.incident__property }>Valor:</Text>
                        <Text style={ styles.incident__value }>{ Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                        }).format(incident.value) }</Text>

                        <TouchableOpacity style={ styles.incident__details } onPress={ () => navigateToDetail(incident) }>
                            <Text style={ styles.incident__detailsText }>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={ 16 } color="#e02041"/>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};
