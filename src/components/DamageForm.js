import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";

const DamageForm = () => {
    const [form, setForm] = useState({ status: "Przyjęte w systemie" });
    const { currentUser } = useAuth();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            setForm(prevState => ({
                ...prevState,
                place: `${position.coords.latitude}, ${position.coords.longitude}`
            }));
        });
    }, []);

    const onSubmitHandler = e => {
        e.preventDefault();
        const appStatsRef = db.ref("appStats");
        appStatsRef.once("value", snapshot => {
            if (!snapshot.hasChild("allUsersDamageEvents")) {
                appStatsRef.update({ allUsersDamageEvents: 1 });
            } else {
                appStatsRef.update({
                    allUsersDamageEvents:
                        snapshot.val().allUsersDamageEvents + 1,
                });
            }
        });
        const userRef = db.ref("events/" + currentUser.uid);
        const newUserRef = userRef.push();
        newUserRef.set(form);
        setForm({ status: "Przyjęte w systemie" });
    };
    const handleChange = e => {
        const { name, value } = e.target;
        setForm(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };
    return (
        <form onSubmit={onSubmitHandler} className='form'>
            <div className='form__group'>
                <label className='form__label'>Miejsce zdarzenia</label>
                <input
                    name='place'
                    className='form__input'
                    type='text'
                    value={form.place ?? ""}
                    onChange={handleChange}
                />
            </div>
            <div className='form__group'>
                <label className='form__label'>
                    Numer rejestracyjny uszkodzonego pojazdu
                </label>
                <input
                    name='plateNumber'
                    className='form__input'
                    type='text'
                    value={form.plateNumber ?? ""}
                    onChange={handleChange}
                />
            </div>
            <div className='form__group'>
                <label className='form__label'>Co zostało uszkodzone?</label>
                <input
                    name='damageDescription'
                    className='form__input'
                    type='text'
                    value={form.damageDescription ?? ""}
                    onChange={handleChange}
                />
            </div>
            <div className='form__group'>
                <label className='form__label'>
                    Jaki jest priorytet usterki?
                </label>
                <div className='form__radio-inner'>
                    <label htmlFor='high' className='form__radio'>
                        Wysoki
                    </label>
                    <input
                        name='prioritaire'
                        id='high'
                        onChange={handleChange}
                        className='form__radio'
                        type='radio'
                        value='Wysoki'
                    />
                </div>
                <div className='form__radio-inner'>
                    <label htmlFor='low' className='form__radio'>
                        Niski
                    </label>
                    <input
                        name='prioritaire'
                        id='low'
                        onChange={handleChange}
                        className='form__radio'
                        type='radio'
                        value='Niski'
                    />
                </div>
            </div>
            <button className='button form__button'>Wyślij</button>
        </form>
    );
};

export default DamageForm;
