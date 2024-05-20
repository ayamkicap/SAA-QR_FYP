import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewEventMutation } from "./eventsApiSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";

const NewEventForm = ({ users }) => {

    const { isDeveloper, isAdmin, username, id} = useAuth()

    console.log("test")

    console.log(id)

    const [addNewEvent, {
        isLoading,
        isSuccess,
        isError,
        error,
        data
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
    //const [imgUrlEvent, setImgUrlEvent] = useState('');
    const [formData, setFormData] = useState('');
    const [qrCode, setQrCode] = useState('');

    useEffect(() => {
        //console.log('Update state:', update)
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
            //setImgUrlEvent('');
            setFormData('')
            setQrCode('')
            console.log('New event saved:', data)
            navigate('/dash/events');
        }
    }, [isSuccess, navigate,data]);

    const onTitleChanged = e => setTitle(e.target.value);
    const onTextChanged = e => setText(e.target.value);
    const onUserIdChanged = e => setUserId(e.target.value);
    // Additional field handlers
    //const onUpdateChanged = e => setUpdate(e.target.value);
    const onUpdateChanged = e => {
        const newValue = e.target.value;
        setUpdate(newValue);
        console.log('Update changed:', newValue);
    };
    const onCompletedChanged = e => setCompleted(e.target.checked);
    const onDateEventChanged = e => setDateEvent(e.target.value);
    const onTimeEventChanged = e => setTimeEvent(e.target.value);
    const onLocationEventChanged = e => setLocationEvent(e.target.value);

    const onPriceEventChanged = e => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value)) {
            setPriceEvent(value);
        } else {
            // Handle invalid input, such as displaying an error message or resetting the value
            // For example:
            // setPriceEvent(0); // Reset the value to 0
             console.error('Invalid price value'); // Log an error message
        }
    };
    
    const onContactEventChanged = e => setContactEvent(e.target.value);

    //console.log(onPriceEventChanged)

    // const onImageUpload = (e) => {
    //     const file = e.target.files[0];
    //     console.log(e.target.files[0])
    //     if (file) {
    //         // Convert the file to a data URL
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             console.log('-----------------------------xxxxxx')
    //             console.log(reader.result)
    //             setImgUrlEvent(reader.result);
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };

    const onImageUpload = (e) => {
        const file = e.target.files[0];
        console.log(e.target.files[0]);
        if (file) {
            const formData = new FormData();
            formData.append('img_url_event', file); // Append the file to FormData
    
            // Now you can send formData to the server, along with other data if needed
    
            // You might want to update the state with the FormData object if you need it for further processing
            setFormData(formData);
        }
    };
    
    

    // const onImgUrlEventChanged = e => setImgUrlEvent(e.target.value);
    const onQrCodeChanged = e => setQrCode(e.target.value);

    const canSave = [title, text, userId, update, dateEvent, timeEvent, locationEvent, priceEvent, contactEvent, formData, qrCode].every(Boolean) && !isLoading;

    // const onSaveEventClicked = async (e) => {
    //     console.log("Save button clicked");
    //     //console.log("Image URL:", imgUrlEvent);
    //     e.preventDefault();
    //     if (canSave) {
    //         console.log("Saving event...");
    //         console.log("Request Body:", {
    //             user: userId,
    //             title,
    //             text,
    //             update,
    //             completed,
    //             date_event: dateEvent,
    //             time_event: timeEvent,
    //             location_event: locationEvent,
    //             price_event: priceEvent,
    //             contact_event: contactEvent,
    //             img_url_event: imgUrlEvent,
    //             QR_code: qrCode
    //         });
    //         await addNewEvent({ user: userId, title, text, update, completed, date_event: dateEvent, time_event: timeEvent, location_event: locationEvent, price_event: priceEvent, contact_event: contactEvent, img_url_event: imgUrlEvent, QR_code: qrCode });
    //     }
    // };

    const onSaveEventClicked = async (e) => {
        console.log("here");
        e.preventDefault();
        console.log('Form Data:', { title, text, userId, update, dateEvent, timeEvent, locationEvent, priceEvent, contactEvent, formData, qrCode });
        console.log('isLoading:', isLoading);
        console.log('canSave:', canSave);
        if (canSave) {
            console.log("Saving event...");
            const submitFormData = new FormData();
            submitFormData.append('img_url_event', formData.get('img_url_event'));
            submitFormData.append('user', userId);
            submitFormData.append('title', title);
            submitFormData.append('text', text);
            submitFormData.append('update', update);
            submitFormData.append('completed', completed);
            submitFormData.append('date_event', dateEvent);
            submitFormData.append('time_event', timeEvent);
            submitFormData.append('location_event', locationEvent);
            submitFormData.append('price_event', priceEvent);
            submitFormData.append('contact_event', contactEvent);
            submitFormData.append('QR_code', qrCode);

            console.log(submitFormData.get('img_url_event'))
    
            try {
                const response = await fetch('http://localhost:3500/events', {
                    method: 'POST',
                    body: submitFormData
                });
                if (!response.ok) {
                    throw new Error('Failed to add new event');
                }
                console.log('Event added successfully');
                // You can handle the response here if needed
            } catch (error) {
                console.error('Error adding event:', error.message);
                // Handle error appropriately
            }
        } else {
            console.log('takdapat wey')
        }
    };
    
    
    console.log(id)
    

    const options = users.map(user => {
        return (
            <option
                key={user.id}
                value={user.id}
            > {user.username}</option >
        );
    });

    // console.log("usernem:",username)
    // const selectedUser = users.find(user => user.id === userId);

    // console.log("Selected user:", selectedUser);


    // const user = selectedUser ? (
    //     <option
    //         key={selectedUser.id}
    //         value={selectedUser.id}
    //     > {selectedUser.id}</option >
    // ) : null;

    const errClass = isError ? "errmsg" : "offscreen";
    const validTitleClass = !title ? "form__input--incomplete" : '';
    const validTextClass = !text ? "form__input--incomplete" : '';

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>
            <script> alert()</script>

    
            <form className="form" onSubmit={onSaveEventClicked}>
                <div className="form__title-row">
                    <h2>New Event</h2>
                    <div className="form__action-buttons">
                    <button
                        className="icon-button"
                        title="Save"
                        type="submit"
                        onClick={() => console.log("Save button clicked")} // Add this line
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

                {/* <label className="form__label" htmlFor="update">
                    Update:
                </label>
                <input
                    className={`form__input`}
                    id="update"
                    name="update"
                    type="text"
                    autoComplete="off"
                    value="PENDING"
                    onChange={onUpdateChanged}
                    readOnly // Adding the readOnly attribute here
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
    
                {/* <label className="form__label" htmlFor="img_url_event">
                    Image URL Event:</label>
                <input
                    className={`form__input`}
                    id="img_url_event"
                    name="img_url_event"
                    type="text"
                    autoComplete="off"
                    value={imgUrlEvent}
                    onChange={onImgUrlEventChanged}
                /> */}

                <label className="form__label" htmlFor="img_file">
                    Upload Image:
                </label>
                <input
                    className={`form__input`}
                    id="img_file"
                    name="img_file"
                    type="file"
                    onChange={onImageUpload}
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

                {/* <select
                    id="username"
                    name="username"
                    className="form__select visually-hidden" // Add a class for hiding
                    value={userId}
                    onChange={onUserIdChanged}
                >
                    {options}
                </select> */}


    
            </form>
        </>
    );
    

    return content;
};

export default NewEventForm;
