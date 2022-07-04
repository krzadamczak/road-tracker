import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";

const EventForm = () => {
    const [form, setForm] = useState({ status: "Przyjęte w systemie" });
    const { currentUser } = useAuth();
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            setForm(prevState => ({
                ...prevState,
                place: `${position.coords.latitude}, ${position.coords.longitude}`,
            }));
        });
    }, []);
    const handleSubmit = e => {
        e.preventDefault();
        db.ref("appStats").once("value", snapshot => {
            if (!snapshot.hasChild("allUsersEvents")) {
                db.ref("appStats").update({ allUsersEvents: 1 });
            } else {
                db.ref("appStats").update({
                    allUsersEvents:
                        snapshot.val().allUsersEvents + 1,
                });
            }
        });
        const userRef = db.ref("roadEvents/" + currentUser.uid);
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
        <form onSubmit={handleSubmit} className='form'>
            <div className='form__group'>
                <label className='form__label'>Typ zdarzenia</label>
                <select
                    name='eventType'
                    className='form__input'
                    onChange={handleChange}
                    defaultValue={'default'}
                    required>
                    <option disabled value='default'>
                        Wybierz typ zdarzenia
                    </option>
                    <option value='Kontrola prędkości'>
                        Kontrola prędkości
                    </option>
                    <option value='Niesprawny pojazd'>Niesprawny pojazd</option>
                    <option value='Wypadek'>Wypadek</option>
                    <option value='Korek'>Korek</option>
                    <option value='Zamknięcie pasa'>Zamknięcie pasa</option>
                    <option value='Roboty drogowe'>Roboty drogowe</option>
                </select>
            </div>
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
            <button className='button form__button'>Wyślij</button>
        </form>
    );
};

export default EventForm;
