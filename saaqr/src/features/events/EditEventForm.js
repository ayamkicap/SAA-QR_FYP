import { useState, useEffect } from "react";
import { useUpdateEventMutation, useDeleteEventMutation } from "./eventsApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";

const EditEventForm = ({ event, users }) => {

    const { isDeveloper, isAdmin, username, id} = useAuth()

    const [updateEvent, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateEventMutation();

    const [deleteEvent, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteEventMutation();

    const navigate = useNavigate();

    const [title, setTitle] = useState(event.title);
    const [text, setText] = useState(event.text);
    const [update, setUpdate] = useState(event.update);
    const [completed, setCompleted] = useState(event.completed);
    const [userId, setUserId] = useState(event.user);
    const [dateEvent, setDateEvent] = useState(new Date(event.date_event).toISOString().split('T')[0]);
    const [timeEvent, setTimeEvent] = useState(event.time_event);
    const [locationEvent, setLocationEvent] = useState(event.location_event);
    const [priceEvent, setPriceEvent] = useState(event.price_event);
    const [contactEvent, setContactEvent] = useState(event.contact_event);
    const [imgUrlEvent, setImgUrlEvent] = useState(event.img_url_event);
    const [qrCode, setQrCode] = useState(event.QR_code);

    useEffect(() => {

        if (isSuccess || isDelSuccess) {
            setTitle('');
            setText('');
            setUpdate('');
            setUserId('');
            setDateEvent('');
            setTimeEvent('');
            setLocationEvent('');
            setPriceEvent(0);
            setContactEvent('');
            setImgUrlEvent('');
            setQrCode('');
            navigate('/dash/events');
        }

    }, [isSuccess, isDelSuccess, navigate]);

    const onTitleChanged = e => setTitle(e.target.value);
    const onTextChanged = e => setText(e.target.value);
    const onUpdateChanged = e => setUpdate(e.target.value);
    const onCompletedChanged = e => setCompleted(prev => !prev);
    const onUserIdChanged = e => setUserId(e.target.value);
    const onDateEventChanged = e => setDateEvent(e.target.value);
    const onTimeEventChanged = e => setTimeEvent(e.target.value);
    const onLocationEventChanged = e => setLocationEvent(e.target.value);
    const onPriceEventChanged = e => setPriceEvent(parseFloat(e.target.value));
    const onContactEventChanged = e => setContactEvent(e.target.value);
    //const onImgUrlEventChanged = e => setImgUrlEvent(e.target.value);
    const onImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Convert the file to a data URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setImgUrlEvent(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const onQrCodeChanged = e => setQrCode(e.target.value);

    const canSave = [title, text, update, userId, dateEvent, timeEvent, locationEvent, priceEvent, contactEvent, imgUrlEvent, qrCode].every(Boolean) && !isLoading;

    const onSaveEventClicked = async () => {
        if (canSave) {
            await updateEvent({ id: event.id, user: userId, title, text, update, completed, date_event: dateEvent, time_event: timeEvent, location_event: locationEvent, price_event: priceEvent, contact_event: contactEvent, img_url_event: imgUrlEvent, QR_code: qrCode });
        }
    };

    const onDeleteEventClicked = async () => {
        await deleteEvent({ id: event.id });
    };

    const created = new Date(event.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });
    const updated = new Date(event.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });

    const options = users.map(user => {
        return (
            <option
                key={user.id}
                value={user.id}

            > {user.username}</option >
        );
    });

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen";
    const validTitleClass = !title ? "form__input--incomplete" : '';
    const validTextClass = !text ? "form__input--incomplete" : '';

    const errContent = (error?.data?.message || delerror?.data?.message) ?? '';

    let deleteButton = null
    if (isDeveloper || isAdmin) {
        deleteButton = (
            <button
                className="icon-button"
                title="Delete"
                onClick={onDeleteEventClicked}
            >
                <FontAwesomeIcon icon={faTrashCan} />
            </button>
        )
    }

    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Edit Event #{event.ticket}</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveEventClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        {deleteButton}
                    </div>
                </div>
                <label className="form__label" htmlFor="event-title">
                    Title:</label>
                <input
                    className={`form__input ${validTitleClass}`}
                    id="event-title"
                    name="title"
                    type="text"
                    autoComplete="off"
                    value={title}
                    onChange={onTitleChanged}
                />

                <label className="form__label" htmlFor="event-text">
                    Text:</label>
                <textarea
                    className={`form__input form__input--text ${validTextClass}`}
                    id="event-text"
                    name="text"
                    value={text}
                    onChange={onTextChanged}
                />
                <div className="form__row">
                    <div className="form__divider">
                        {/* <label className="form__label" htmlFor="event-update">
                            Update:</label>
                        <input
                            className={`form__input`}
                            id="event-update"
                            name="update"
                            type="text"
                            autoComplete="off"
                            value={update}
                            onChange={onUpdateChanged}
                        /> */}

                        <label className="form__label" htmlFor="update">
                    Update:
                </label>
                <select
                    className={`form__select`}
                    id="update"
                    name="update"
                    value={update}
                    onChange={onUpdateChanged}
                >
                    <option value="PENDING">PENDING</option>
                    <option value="COMPLETE">ACCEPT</option>
                    <option value="REJECT">REJECT</option>
                </select>



                        <label className="form__label form__checkbox-container" htmlFor="event-completed">
                            WORK COMPLETE:
                            <input
                                className="form__checkbox"
                                id="event-completed"
                                name="completed"
                                type="checkbox"
                                checked={completed}
                                onChange={onCompletedChanged}
                            />
                        </label>

                        <label className="form__label" htmlFor="event-date-event">
                            Date Event:</label>
                        <input
                            className={`form__input`}
                            id="event-date-event"
                            name="date_event"
                            type="date"
                            value={dateEvent}
                            onChange={onDateEventChanged}
                        />

                        <label className="form__label" htmlFor="event-time-event">
                            Time Event:</label>
                        <input
                            className={`form__input`}
                            id="                        event-time-event"
                            name="time_event"
                            type="time"
                            value={timeEvent}
                            onChange={onTimeEventChanged}
                        />

                        <label className="form__label" htmlFor="event-location-event">
                            Location Event:</label>
                        <input
                            className={`form__input`}
                            id="event-location-event"
                            name="location_event"
                            type="text"
                            autoComplete="off"
                            value={locationEvent}
                            onChange={onLocationEventChanged}
                        />

                        <label className="form__label" htmlFor="event-price-event">
                            Price Event:</label>
                        <input
                            className={`form__input`}
                            id="event-price-event"
                            name="price_event"
                            type="number"
                            value={priceEvent}
                            onChange={onPriceEventChanged}
                        />

                        <label className="form__label" htmlFor="event-contact-event">
                            Contact Event:</label>
                        <input
                            className={`form__input`}
                            id="event-contact-event"
                            name="contact_event"
                            type="text"
                            autoComplete="off"
                            value={contactEvent}
                            onChange={onContactEventChanged}
                        />

                        {/* <label className="form__label" htmlFor="event-img-url-event">
                            Image URL Event:</label>
                        <input
                            className={`form__input`}
                            id="event-img-url-event"
                            name="img_url_event"
                            type="text"
                            autoComplete="off"
                            value={imgUrlEvent}
                            onChange={onImgUrlEventChanged}
                        /> */}

                        <label className="form__label" htmlFor="img_file">
                            Upload Image:</label>
                        <input
                            className={`form__input`}
                            id="img_file"
                            name="img_file"
                            type="file"
                            onChange={onImageUpload}
                        />

                        {/* <label className="form__label" htmlFor="event-QR-code">
                            QR Code:</label>
                        <input
                            className={`form__input`}
                            id="event-QR-code"
                            name="QR_code"
                            type="text"
                            autoComplete="off"
                            value={qrCode}
                            onChange={onQrCodeChanged}
                        /> */}

                        <label className="form__label form__checkbox-container" htmlFor="username">
                            NAME:
                        </label>
                        <select
                            id="username"
                            name="username"
                            className="form__select visually-hidden" // Add a class for hiding
                            value={id}
                            onChange={onUserIdChanged}
                        >
                            {options}
                        </select>

                    </div>
                    <div className="form__divider">
                        <p className="form__created">Created:<br />{created}</p>
                        <p className="form__updated">Updated:<br />{updated}</p>
                    </div>
                </div>
            </form>
        </>
    );

    return content;
}

export default EditEventForm;

