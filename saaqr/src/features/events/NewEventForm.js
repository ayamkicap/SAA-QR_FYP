import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewEventMutation } from "./eventsApiSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from "@fortawesome/free-solid-svg-icons";

const NewEventForm = ({ users }) => {

    const [addNewEvent, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewEventMutation();

    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [userId, setUserId] = useState(users[0].id);

    // Additional fields from the schema
    const [update, setUpdate] = useState('');
    const [completed, setCompleted] = useState(false);
    const [dateEvent, setDateEvent] = useState('');
    const [timeEvent, setTimeEvent] = useState('');
    const [locationEvent, setLocationEvent] = useState('');
    const [priceEvent, setPriceEvent] = useState(0);
    const [contactEvent, setContactEvent] = useState('');
    const [imgUrlEvent, setImgUrlEvent] = useState('');
    const [qrCode, setQrCode] = useState('');

    useEffect(() => {
        if (isSuccess) {
            setTitle('');
            setText('');
            setUserId('');
            setUpdate('');
            setCompleted(false);
            setDateEvent('');
            setTimeEvent('');
            setLocationEvent('');
            setPriceEvent(0);
            setContactEvent('');
            setImgUrlEvent('');
            setQrCode('');
            navigate('/dash/events');
        }
    }, [isSuccess, navigate]);

    const onTitleChanged = e => setTitle(e.target.value);
    const onTextChanged = e => setText(e.target.value);
    const onUserIdChanged = e => setUserId(e.target.value);
    // Additional field handlers
    const onUpdateChanged = e => setUpdate(e.target.value);
    const onCompletedChanged = e => setCompleted(e.target.checked);
    const onDateEventChanged = e => setDateEvent(e.target.value);
    const onTimeEventChanged = e => setTimeEvent(e.target.value);
    const onLocationEventChanged = e => setLocationEvent(e.target.value);
    const onPriceEventChanged = e => setPriceEvent(parseFloat(e.target.value));
    const onContactEventChanged = e => setContactEvent(e.target.value);
    const onImgUrlEventChanged = e => setImgUrlEvent(e.target.value);
    const onQrCodeChanged = e => setQrCode(e.target.value);

    const canSave = [title, text, userId, update, dateEvent, timeEvent, locationEvent, priceEvent, contactEvent, imgUrlEvent, qrCode].every(Boolean) && !isLoading;

    const onSaveEventClicked = async (e) => {
        e.preventDefault();
        if (canSave) {
            await addNewEvent({ user: userId, title, text, update, completed, date_event: dateEvent, time_event: timeEvent, location_event: locationEvent, price_event: priceEvent, contact_event: contactEvent, img_url_event: imgUrlEvent, QR_code: qrCode });
        }
    };

    const options = users.map(user => {
        return (
            <option
                key={user.id}
                value={user.id}
            > {user.username}</option >
        );
    });

    const errClass = isError ? "errmsg" : "offscreen";
    const validTitleClass = !title ? "form__input--incomplete" : '';
    const validTextClass = !text ? "form__input--incomplete" : '';

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>
    
            <form className="form" onSubmit={onSaveEventClicked}>
                <div className="form__title-row">
                    <h2>New Event</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="title">
                    Title:</label>
                <input
                    className={`form__input ${validTitleClass}`}
                    id="title"
                    name="title"
                    type="text"
                    autoComplete="off"
                    value={title}
                    onChange={onTitleChanged}
                />
    
                <label className="form__label" htmlFor="text">
                    Text:</label>
                <textarea
                    className={`form__input form__input--text ${validTextClass}`}
                    id="text"
                    name="text"
                    value={text}
                    onChange={onTextChanged}
                />

                <label className="form__label" htmlFor="update">
                    Update:</label>
                <input
                    className={`form__input`}
                    id="update"
                    name="update"
                    type="text"
                    autoComplete="off"
                    value={update}
                    onChange={onUpdateChanged}
                />

                <label className="form__label" htmlFor="completed">
                    Completed:</label>
                <input
                    className={`form__input`}
                    id="completed"
                    name="completed"
                    type="text"
                    autoComplete="off"
                    value={completed}
                    onChange={onCompletedChanged}
                />
    
                <label className="form__label" htmlFor="date_event">
                    Date Event:</label>
                <input
                    className={`form__input`}
                    id="date_event"
                    name="date_event"
                    type="date"
                    value={dateEvent}
                    onChange={onDateEventChanged}
                />
    
                <label className="form__label" htmlFor="time_event">
                    Time Event:</label>
                <input
                    className={`form__input`}
                    id="time_event"
                    name="time_event"
                    type="time"
                    value={timeEvent}
                    onChange={onTimeEventChanged}
                />
    
                <label className="form__label" htmlFor="location_event">
                    Location Event:</label>
                <input
                    className={`form__input`}
                    id="location_event"
                    name="location_event"
                    type="text"
                    autoComplete="off"
                    value={locationEvent}
                    onChange={onLocationEventChanged}
                />
    
                <label className="form__label" htmlFor="price_event">
                    Price Event:</label>
                <input
                    className={`form__input`}
                    id="price_event"
                    name="price_event"
                    type="number"
                    value={priceEvent}
                    onChange={onPriceEventChanged}
                />
    
                <label className="form__label" htmlFor="contact_event">
                    Contact Event:</label>
                <input
                    className={`form__input`}
                    id="contact_event"
                    name="contact_event"
                    type="text"
                    autoComplete="off"
                    value={contactEvent}
                    onChange={onContactEventChanged}
                />
    
                <label className="form__label" htmlFor="img_url_event">
                    Image URL Event:</label>
                <input
                    className={`form__input`}
                    id="img_url_event"
                    name="img_url_event"
                    type="text"
                    autoComplete="off"
                    value={imgUrlEvent}
                    onChange={onImgUrlEventChanged}
                />
    
                <label className="form__label" htmlFor="QR_code">
                    QR Code:</label>
                <input
                    className={`form__input`}
                    id="QR_code"
                    name="QR_code"
                    type="text"
                    autoComplete="off"
                    value={qrCode}
                    onChange={onQrCodeChanged}
                />
    
                <label className="form__label form__checkbox-container" htmlFor="username">
                    ASSIGNED TO:</label>
                <select
                    id="username"
                    name="username"
                    className="form__select"
                    value={userId}
                    onChange={onUserIdChanged}
                >
                    {options}
                </select>
    
            </form>
        </>
    );
    

    return content;
};

export default NewEventForm;
