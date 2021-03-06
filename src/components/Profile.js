import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import Navigation from "./Navigation";
import UpdateProfile from "./UpdateProfile";

function Profile() {
    const { currentUser } = useAuth();
    const [profileData, setProfileData] = useState({
        allUsersDamageEvents: 0,
        allUsersEvents: 0,
        userEvents: 0,
        userDamageEvents: 0,
        city: "",
        firstName: "",
        lastName: "",
    });
    const [isUpdateProfileVisible, setIsUpdateProfileVisible] = useState(false);

    useEffect(() => {
        db.ref("appStats").once("value", snapshot => {
            if (snapshot.val() !== null) {
                setProfileData(prevState => ({
                    ...prevState,
                    allUsersDamageEvents: snapshot.val().allUsersDamageEvents,
                    allUsersEvents: snapshot.val().allUsersEvents
                }));
            }
        });
        db.ref("profileData/" + currentUser.uid).once("value", snapshot => {
            if (snapshot.val() !== null) {
                setProfileData(prevState => ({
                    ...prevState,
                    city: snapshot.val().city,
                    firstName: snapshot.val().firstName,
                    lastName: snapshot.val().lastName,
                }));
            }
        });
        db.ref("events/" + currentUser.uid).once("value", snapshot => {
            if (snapshot.val() !== null) {
                setProfileData(prevState => ({
                    ...prevState,
                    userDamageEvents: Object.keys(snapshot.val()).length,
                }));
            }
        });
        db.ref("roadEvents/" + currentUser.uid).once("value", snapshot => {
            if (snapshot.val() !== null) {
                setProfileData(prevState => ({
                    ...prevState,
                    userEvents: Object.keys(snapshot.val()).length,
                }));
            }
        });
    }, [currentUser.uid]);

    const handleClick = e => {
        e.preventDefault();
        setIsUpdateProfileVisible(true);
    };
    const handleCancel = () => {
        setIsUpdateProfileVisible(false);
    };

    return (
        <React.Fragment>
            <section className='section'>
                <div className='profile'>
                    <p className='profile__text'>
                        Imi??: {profileData.firstName}
                    </p>
                    <p className='profile__text'>
                        Nazwisko: {profileData.lastName}
                    </p>
                    <p className='profile__text'>
                        Ilo???? szk??d zg??oszona przez Ciebie:{" "}
                        {profileData.userDamageEvents}
                    </p>
                    <p className='profile__text'>
                        Ilo???? zdarze?? na drodze zg??oszona przez Ciebie:{" "}
                        {profileData.userEvents}
                    </p>
                    <p className='profile__text'>
                        Ca??kowita ilo???? zg??oszonych szk??d przez wszystkich
                        kierowc??w: {profileData.allUsersDamageEvents}
                    </p>
                    <p className='profile__text'>
                        Ca??kowita ilo???? zg??oszonych zdarze?? na drodze przez wszystkich
                        kierowc??w: {profileData.allUsersEvents}
                    </p>
                    <p className='profile__text'>
                        Prognoza pogody dla miasta: {profileData.city}
                    </p>
                    <button className='button' onClick={handleClick}>
                        Zaktualizuj dane
                    </button>
                    {isUpdateProfileVisible && (
                        <button className='button' onClick={handleCancel}>
                            Anuluj
                        </button>
                    )}
                    {isUpdateProfileVisible && <UpdateProfile />}
                </div>
            </section>
            <Navigation />
        </React.Fragment>
    );
}

export default Profile;
