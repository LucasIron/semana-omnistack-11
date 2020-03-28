
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import api from '../../services/api';

export default () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const { id } = JSON.parse(localStorage.getItem('ong'));
    const history = useHistory();

    const handleCreateIncident = (event) => {
        event.preventDefault();

        api.post('/incidents', { title, description, value }, {
            headers: {
                Authorization: id,
            },
        }).then(() => {
            history.push('/profile');
        }, () => alert('Erro ao cadastrar caso. Tente novamente.'))
    }

    return (
        <div className="new-incident__container">
            <section className="new-incident">
                <div className="new-incident__content">
                    <p className="new-incident__logo">Be the Hero</p>
                    <h1 className="new-incident__title">Cadastrar novo caso</h1>
                    <p className="new-incident__text">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <Link to="/profile" className="new-incident__login"><FiArrowLeft size={ 16 } color="#e02041"/> Voltar para a Home</Link>
                </div>
                <form onSubmit={ handleCreateIncident } className="new-incident__form">
                    <label className="new-incident__label">
                        <p className="new-incident__placeholder">Título do caso</p>
                        <input type="text" value={ title } onChange={ (event) => setTitle(event.target.value) } className="new-incident__input"/>
                    </label>
                    <label className="new-incident__label">
                        <p className="new-incident__placeholder">Description</p>
                        <textarea type="text" value={ description } onChange={ (event) => setDescription(event.target.value) } className="new-incident__input"/>
                    </label>
                    <label className="new-incident__label">
                        <p className="new-incident__placeholder">Valor em reais</p>
                        <input type="text" value={ value } onChange={ (event) => setValue(event.target.value) } className="new-incident__input"/>
                    </label>
                    <button type="submit" className="button new-incident__submit">Salvar</button>
                </form>
            </section>
        </div>
    );
};
