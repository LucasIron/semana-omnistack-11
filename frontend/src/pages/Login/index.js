
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './styles.css';
import api from '../../services/api';

export default () => {
    const [id, setId] = useState('');
    const history = useHistory();

    const handleLogin = (event) => {
        event.preventDefault();
        return api.post('sessions', { id }).then((response) => {
            localStorage.setItem('ong', JSON.stringify({ ...response.data, id }));
            history.push('/profile');
        }, (error) => {
            console.error(error);
            alert('Ocorreu um erro. Tente novamente');
        });
    };

    return (
        <section className="login">
            <div className="login__form-container">
                <p className="login__logo">Be the Hero</p>
                <form onSubmit={ handleLogin } className="login__form">
                    <h1 className="login__title">Login</h1>
                    <label className="login__label">
                        <p className="login__placeholder">Sua ID</p>
                            <input type="text" onChange={ (event) => setId(event.target.value) } className="login__input"/>
                    </label>
                    <button type="submit" className="button login__submit">Entrar</button>
                </form>
                <Link to="/register" className="login__register"><FiLogIn size={ 16 } color="#e02041"/> Não tenho cadastro</Link>
            </div>
        </section>
    )
};
