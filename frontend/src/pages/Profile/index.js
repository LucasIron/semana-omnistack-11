
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import './styles.css';
import api from '../../services/api';

export default () => {
    const [incidents, setIncidents] = useState([]);

    const { name, id } = JSON.parse(localStorage.getItem('ong'));
    const history = useHistory();

    const handleDeleteIncident = (incident_id) => api.delete(`incidents/${ incident_id }`, {
        headers: {
            Authorization: id,
        },
    }).then(() =>
        setIncidents(incidents.filter((incident) => incident.id !== incident_id))
    , () =>
        alert('Erro ao deletar. Tente novamente.')
    );

    const handleLogout = () => {
        localStorage.clear();
        history.push('/');
    }

    useEffect(() => {
        api.get('ongs/incidents', {
            headers: {
                Authorization: id,
            },
        }).then((response) => setIncidents(response.data));
    }, [id]);

    return (
        <div className="profile">
            <header className="profile__header">
                <p className="profile__logo">Be the Hero</p>
                <span className="profile__welcome">Bem vinda, { name }</span>
                <Link to="/incidents/new" className="button">Cadastrar novo caso</Link>
                <button type="submit" onClick={ handleLogout } className="button"><FiPower size={ 18 } color="#e02041"/></button>
            </header>
            <main className="profile__main">
                <h1 className="profile__title">Casos cadastrados</h1>
                <ul className="profile__incidents shelf">
                    { incidents.map(({ id, name, description, value }) => (
                        <li key={ id } className="profile__incident shelf__item">
                            <article className="incident">
                                <h2 className="incident__title">{ name }</h2>
                                <p className="incident__description">{ description }</p>
                                <p className="incident__value">{ Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(value) }</p>
                                <button onClick={ () => handleDeleteIncident(id) } className="incident__delete"><FiTrash2 size={ 20 } color="a8a8b3"></FiTrash2></button>
                            </article>
                        </li>
                    )) }
                </ul>
            </main>
        </div>
    );
};
