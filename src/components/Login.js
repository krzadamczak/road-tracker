import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function Login() {

    const { login } = useAuth();
    const history = useHistory();
    const [formData, setFormData] = useState({});

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        login(formData.email, formData.password);
        history.push("/");
    };

    return (
        <section className='section'>
            <h2 className='h2 section__h2'>Logowanie</h2>
            <form className='form' onSubmit={handleSubmit}>
                <div className='form__group' id='email'>
                    <label className='form__label text' htmlFor='email-input'>
                        Email
                    </label>
                    <input
                        className='form__input text'
                        id='email-input'
                        type='email'
                        name='email'
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='form__group' id='password'>
                    <label
                        className='form__label text'
                        htmlFor='password-input'>
                        Hasło
                    </label>
                    <input
                        className='form__input text'
                        id='password-input'
                        type='password'
                        name='password'
                        onChange={handleChange}
                        required
                    />
                </div>
                <button
                    className='button section__button'
                    type='submit'>
                    Zaloguj się
                </button>
            </form>
            <div className='text section__text'>
                Nie masz konta? <Link to='/rejestracja'>Zarejestruj się</Link>
            </div>
        </section>
    );
}
