import React, { useState } from "react";
import DamageForm from "./DamageForm";
import EventForm from "./EventForm";
import Navigation from "./Navigation";

const ReportEvent = () => {
    const [tab, setTab] = useState("damage");
    const handleClick = e => {
        e.preventDefault();
        if(!e.currentTarget.classList.contains('tab__item--active')){
            let prevItem = document.querySelector('.tab__item--active');
            prevItem.classList.remove('tab__item--active');
            e.currentTarget.classList.add('tab__item--active');
        }
        setTab(e.target.id);

    };
    return (
        <React.Fragment>
            <section className='section'>
                <div className="tab">
                    <div className="tab__item tab__item--active" id='damage' onClick={handleClick}>
                        Zgłoś szkodę
                    </div>
                    <div className="tab__item" id='event' onClick={handleClick}>
                        Zgłoś zdarzenie
                    </div>
                </div>
                {tab === "damage" ? <DamageForm /> : <EventForm />}
            </section>
            <Navigation />
        </React.Fragment>
    );
};

export default ReportEvent;
