
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import api from '../../services/api';

export default () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');
    const history = useHistory();

    const handleRegister = (event) => {
        event.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf,
        };

        return api.post('ongs', data).then((response) => {
            alert(`Seu ID de acesso: ${ response.data.id }`);
            history.push('/');
        }, (error) => {
            console.error(error);
            alert('Erro no cadastro. Tente Novamente');
        });
    };
    
    return (
        <div className="register__container">
            <section className="register">
                <div className="register__content">
                    <p className="register__logo">Be the Hero</p>
                    <h1 className="register__title">Cadastre-se</h1>
                    <p className="register__text">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <Link to="/" className="register__login"><FiArrowLeft size={ 16 } color="#e02041"/> Já tenho Login</Link>
                </div>
                <form className="register__form" onSubmit={ handleRegister }>
                    <label className="register__label">
                        <p className="register__placeholder">Nome da ONG</p>
                        <input
                            type="text"
                            value={ name }
                            onChange={ (event) => setName(event.target.value) }
                            className="register__input"
                        />
                    </label>
                    <label className="register__label">
                        <p className="register__placeholder">E-mail</p>
                        <input
                            type="text"
                            value={ email }
                            onChange={ (event) => setEmail(event.target.value) }
                            className="register__input"
                        />
                    </label>
                    <label className="register__label">
                        <p className="register__placeholder">WhatsaApp</p>
                        <input
                            type="text"
                            value={ whatsapp }
                            onChange={ (event) => setWhatsapp(event.target.value) }
                            className="register__input"
                        />
                    </label>
                    <div className="register__input-group">
                        <label className="register__label">
                            <p className="register__placeholder">Cidade</p>
                            <input
                                type="text"
                                value={ city }
                                onChange={ (event) => setCity(event.target.value) }
                                className="register__input"
                            />
                        </label>
                        <label className="register__label" style={ { width: 80 } }>
                            <p className="register__placeholder">UF</p>
                            <input
                                type="text"
                                value={ uf }
                                onChange={ (event) => setUf(event.target.value) }
                                className="register__input"
                            />
                        </label>
                    </div>
                    <button type="submit" className="button register__submit">Salvar</button>
                </form>
            </section>
        </div>
    );
};
