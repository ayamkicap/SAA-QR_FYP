// // EventDetail.js
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { selectEventById } from './eventsApiSlice';
// import QRCode from 'qrcode'; // Ensure correct import

// const EventDetail = async () => {
//   const { eventId } = useParams();
//   const event = useSelector((state) => selectEventById(state, eventId));
//   const [qrCodeUrl, setQrCodeUrl] = useState('');

//   useEffect(() => {
//     const generateQRCode = async () => {
//       try {
//         const url = await QRCode.toDataURL(eventId.toString());
//         setQrCodeUrl(url);
//         console.log(url);
//       } catch (error) {
//         console.error('Error generating QR code:', error);
//       }
//     };

//     if (eventId) {
//       generateQRCode();
//     }
//   }, [eventId]);


  

//   if (!event) {
//     return <div>Event not found</div>;
//   }

//   return (
//     <div>
//       <h2>{event.title}</h2>
//       <p>Date: {event.date_event}</p>
//       <p>Time: {event.time_event}</p>
//       <p>Location: {event.location_event}</p>
//       <p>MyCSD: {event.myCSD}</p>
//       <p>Teras: {event.Teras}</p>
//       <p>Price: {event.price_event}</p>
//       <p>Contact: {event.contact_event}</p>
//       <img src={`http://localhost:3500/${event.img_url_event}`} alt="Event Thumbnail" />
//       <img src={event.QR_code} alt="QR Code" />
//     </div>
//   );
// };

// export default EventDetail;


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectEventById } from './eventsApiSlice';
import QRCode from 'qrcode'; // Ensure correct import

const EventDetail = () => {
  const { eventId } = useParams();
  const event = useSelector((state) => selectEventById(state, eventId));
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const url = await QRCode.toDataURL(eventId.toString());
        setQrCodeUrl(url);
        console.log('url', url);
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };

    if (eventId) {
      generateQRCode();
    }
  }, [eventId]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  if (!event) {
    return <div style={styles.notFound}>Event not found</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{event.title}</h2>
      <div style={styles.details}>
        <p><strong></strong> {event.text}</p>
        <p><strong>Date:</strong> {event.date_event}</p>
        <p><strong>Time:</strong> {event.time_event}</p>
        <p><strong>Location:</strong> {event.location_event}</p>
        <p><strong>MyCSD:</strong> {event.myCSD}</p>
        <p><strong>Teras:</strong> {event.Teras}</p>
        <p><strong>Price:</strong> {event.price_event}</p>
        <p><strong>Contact:</strong> {event.contact_event}</p>
        <div style={styles.qrcode}>
          <img src={event.QR_code} alt="QR Code" />
        </div>
        <div style={styles.imageContainer}>
          <img src={`http://localhost:3500/${event.img_url_event}`} alt="Event Thumbnail" style={styles.thumbnail} />
        </div>
        <button onClick={toggleModal} style={styles.button}>Show QR Code</button>
      </div>

      {isModalOpen && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <span style={styles.closeButton} onClick={toggleModal}>&times;</span>
            {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code" style={styles.qrCode} />}
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    fontSize: '2em',
    marginBottom: '20px',
  },
  details: {
    textAlign: 'left',
    marginBottom: '20px',
  },
  qrcode:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '10px 0',
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '10px 0',
  },
  thumbnail: {
    maxWidth: '300px',
    height: 'auto',
    borderRadius: '8px',
    objectFit: 'contain',
  },
  button: {
    display: 'block',
    width: '100%',
    padding: '10px',
    fontSize: '1em',
    color: '#fff',
    backgroundColor: '#007BFF',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '20px',
  },
  modal: {
    display: 'flex',
    position: 'fixed',
    zIndex: 1,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    overflow: 'auto',
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    border: '1px solid #888',
    width: '80%',
    maxWidth: '500px',
    textAlign: 'center',
    borderRadius: '8px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
  },
  closeButton: {
    color: '#aaa',
    float: 'right',
    fontSize: '28px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  qrCode: {
    width: '100%',
    height: 'auto',
  },
  notFound: {
    textAlign: 'center',
    fontSize: '1.5em',
    marginTop: '50px',
  },
};

export default EventDetail;


