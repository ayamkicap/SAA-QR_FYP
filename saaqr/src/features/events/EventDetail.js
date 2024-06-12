// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { selectEventById } from './eventsApiSlice';
// import QRCode from 'qrcode'; // Ensure correct import
// import { API_URL } from '../../config/APIconfig';

// const EventDetail = () => {
//   const { eventId } = useParams();
//   const event = useSelector((state) => selectEventById(state, eventId));
//   const [qrCodeUrl, setQrCodeUrl] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [remainingTime, setRemainingTime] = useState(0);
//   const [duration, setDuration] = useState(10); // Default duration is 10 seconds

//   const navigate = useNavigate(); // Initialize the useNavigate hook

//   useEffect(() => {
//     const generateQRCode = async () => {
//       try {
//         const url = await QRCode.toDataURL(eventId.toString());
//         setQrCodeUrl(url);
//         console.log('url', url);
//       } catch (error) {
//         console.error('Error generating QR code:', error);
//       }
//     };

//     if (eventId) {
//       generateQRCode();
//     }
//   }, [eventId]);

//   useEffect(() => {
//     let timer;
//     let countdown;
//     if (isModalOpen) {
//       setRemainingTime(duration); // Set initial countdown time
//       countdown = setInterval(() => {
//         setRemainingTime((prevTime) => prevTime - 1);
//       }, 1000);
//       timer = setTimeout(() => {
//         setIsModalOpen(false);
//       }, duration * 1000); // Close modal after user-specified seconds
//     }

//     return () => {
//       clearTimeout(timer); // Cleanup timer on unmount or modal close
//       clearInterval(countdown); // Cleanup countdown on unmount or modal close
//     };
//   }, [isModalOpen, duration]);

//   const toggleModal = () => {
//     setIsModalOpen(!isModalOpen);
//   };

//   const handleDurationChange = (e) => {
//     setDuration(Number(e.target.value));
//   };

//   const handleNavigate1 = () => {
//     navigate(`/dash/events/${eventId}/StudentList`);
//   };
//   const handleNavigate2 = () => {
//     navigate(`/dash/events/${eventId}/StudentJoin`);
//   };
//   const handleNavigate3 = () => {
//     navigate(`/dash/events/${eventId}/EventFeedback`);
//   };

//   if (!event) {
//     return <div style={styles.notFound}>Event not found</div>;
//   }

//   return (
//     <div style={styles.container}>
//       <div style={styles.content}>
//         <div style={styles.details}>
//           <h2>{event.title}</h2>
//           <p><strong>Date:</strong> {event.date_event}</p>
//           <p><strong>Time:</strong> {event.time_event}</p>
//           <p><strong>Location:</strong> {event.location_event}</p>
//           <p><strong>MyCSD:</strong> {event.myCSD}</p>
//           <p><strong>Teras:</strong> {event.Teras}</p>
//           <p><strong>Price:</strong> {event.price_event}</p>
//           <p><strong>Contact:</strong> {event.contact_event}</p>
//         </div>
//         <div style={styles.qrcodeContainer}>
//           <input
//             type="number"
//             value={duration}
//             onChange={handleDurationChange}
//             style={styles.durationInput}
//             placeholder="Set duration in seconds"
//           />
//           <button onClick={toggleModal} style={styles.qrButton}>
//             Show QR Code
//           </button>
//           {isModalOpen && (
//             <div style={styles.modal}>
//               <div style={styles.modalContent}>
//                 <span style={styles.closeButton} onClick={toggleModal}>
//                   &times;
//                 </span>
//                 {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code" style={styles.qrCode} />}
//                 <p style={styles.timer}>Modal closes in {remainingTime} seconds</p>
//               </div>
//             </div>
//           )}
//         </div>
//         <button onClick={handleNavigate2} style={styles.navigateButton}>
//           Student Join List
//         </button>
//         <button onClick={handleNavigate1} style={styles.navigateButton}>
//           Student Attendance List
//         </button>
//         <button onClick={handleNavigate3} style={styles.navigateButton}>
//           Student Feedback
//         </button>
//       </div>
//       <img 
//         src={event.QR_code}
//         alt="Event Thumbnail"
//         style={styles.thumbnail}
//       />
//       <img
//         src={`${API_URL}/${event.img_url_event}`}
//         alt="Event Thumbnail"
//         style={styles.thumbnail}
//       />
//     </div>
//   );
// };

// const styles = {
//   container: {
//     display: 'flex', // Make container a flexbox
//     padding: '20px',
//     fontFamily: 'Arial, sans-serif',
//   },
//   content: {
//     flex: 1, // Allow content to fill remaining space
//   },
//   details: {
//     marginBottom: '20px',
//   },
//   thumbnail: {
//     width: '200px', // Adjust width as needed
//     height: 'auto',
//     borderRadius: '8px',
//     objectFit: 'contain',
//     marginLeft: '20px', // Add margin from content
//   },
//   qrcodeContainer: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     marginTop: '20px', // Add margin from details
//   },
//   durationInput: {
//     marginBottom: '10px',
//     padding: '10px',
//     fontSize: '1em',
//     borderRadius: '4px',
//     border: '1px solid #ccc',
//   },
//   qrButton: {
//     display: 'block',
//     padding: '10px 20px',
//     fontSize: '1em',
//     color: '#fff',
//     backgroundColor: '#007bff',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//   },
//   modal: {
//     display: 'flex',
//     position: 'fixed',
//     zIndex: 1,
//     left: 0,
//     top: 0,
//     width: '100%',
//     height: '100%',
//     overflow: 'auto',
//     backgroundColor: 'rgba(0,0,0,0.4)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContent: {
//     backgroundColor: '#fff',
//     padding: '20px',
//     border: '1px solid #888',
//     width: '80%',
//     maxWidth: '500px',
//     textAlign: 'center',
//     borderRadius: '8px',
//     boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
//   },
//   closeButton: {
//     color: '#aaa',
//     float: 'right',
//     fontSize: '28px',
//     fontWeight: 'bold',
//     cursor: 'pointer',
//   },
//   qrCode: {
//     width: '100%',
//     height: 'auto',
//   },
//   timer: {
//     marginTop: '10px',
//     fontSize: '1em',
//     color: '#333',
//   },
//   navigateButton: {
//     display: 'block',
//     padding: '10px 20px',
//     fontSize: '1em',
//     color: '#fff',
//     backgroundColor: '#28a745',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//     marginTop: '20px',
//   },
//   notFound: {
//     textAlign: 'center',
//     fontSize: '1.5em',
//     marginTop: '50px',
//   },
// };

// export default EventDetail;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectEventById } from './eventsApiSlice';
import QRCode from 'qrcode'; // Ensure correct import
import { API_URL } from '../../config/APIconfig';

const EventDetail = () => {
  const { eventId } = useParams();
  const event = useSelector((state) => selectEventById(state, eventId));
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [duration, setDuration] = useState(10); // Default duration is 10 seconds

  const navigate = useNavigate(); // Initialize the useNavigate hook

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

  useEffect(() => {
    let timer;
    let countdown;
    if (isModalOpen) {
      setRemainingTime(duration); // Set initial countdown time
      countdown = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
      timer = setTimeout(() => {
        setIsModalOpen(false);
      }, duration * 1000); // Close modal after user-specified seconds
    }

    return () => {
      clearTimeout(timer); // Cleanup timer on unmount or modal close
      clearInterval(countdown); // Cleanup countdown on unmount or modal close
    };
  }, [isModalOpen, duration]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleDurationChange = (e) => {
    setDuration(Number(e.target.value));
  };

  const handleNavigate1 = () => {
    navigate(`/dash/events/${eventId}/StudentList`);
  };
  const handleNavigate2 = () => {
    navigate(`/dash/events/${eventId}/StudentJoin`);
  };
  const handleNavigate3 = () => {
    navigate(`/dash/events/${eventId}/EventFeedback`);
  };

  if (!event) {
    return <div style={styles.notFound}>Event not found</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.details}>
          <h2>{event.title}</h2>
          <p><strong>Date:</strong> {event.date_event}</p>
          <p><strong>Time:</strong> {event.time_event}</p>
          <p><strong>Location:</strong> {event.location_event}</p>
          <p><strong>MyCSD:</strong> {event.myCSD}</p>
          <p><strong>Teras:</strong> {event.Teras}</p>
          <p><strong>Price:</strong> {event.price_event}</p>
          <p><strong>Contact:</strong> {event.contact_event}</p>
        </div>
        <div style={styles.qrcodeContainer}>
          <input
            type="number"
            value={duration}
            onChange={handleDurationChange}
            style={styles.durationInput}
            placeholder="Set duration in seconds"
          />
          <button onClick={toggleModal} style={styles.qrButton}>
            Show QR Code
          </button>
          {isModalOpen && (
            <div style={styles.modal}>
              <div style={styles.modalContent}>
                <span style={styles.closeButton} onClick={toggleModal}>
                  &times;
                </span>
                {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code" style={styles.qrCode} />}
                <p style={styles.timer}>Modal closes in {remainingTime} seconds</p>
              </div>
            </div>
          )}
        </div>
        <button onClick={handleNavigate2} style={styles.navigateButton}>
          Student Join List
        </button>
        <button onClick={handleNavigate1} style={styles.navigateButton}>
          Student Attendance List
        </button>
        <button onClick={handleNavigate3} style={styles.navigateButton}>
          Student Feedback
        </button>
      </div>
      <a href={event.QR_code} download="QRCode.png" style={styles.a}>
        <img 
          src={event.QR_code}
          alt="Event Thumbnail"
          style={styles.thumbnail}
        />
      </a>
      <img
        src={`${API_URL}/${event.img_url_event}`}
        alt="Event Thumbnail"
        style={styles.thumbnail}
      />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex', // Make container a flexbox
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  content: {
    flex: 1, // Allow content to fill remaining space
  },
  details: {
    marginBottom: '20px',
  },
  thumbnail: {
    width: '200px', // Adjust width as needed
    height: 'auto',
    borderRadius: '8px',
    objectFit: 'contain',
    marginLeft: '20px', // Add margin from content
  },
  qrcodeContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px', // Add margin from details
  },
  durationInput: {
    marginBottom: '10px',
    padding: '10px',
    fontSize: '1em',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  qrButton: {
    display: 'block',
    padding: '10px 20px',
    fontSize: '1em',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
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
  timer: {
    marginTop: '10px',
    fontSize: '1em',
    color: '#333',
  },
  navigateButton: {
    display: 'block',
    padding: '10px 20px',
    fontSize: '1em',
    color: '#fff',
    backgroundColor: '#28a745',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '20px',
  },
  notFound: {
    textAlign: 'center',
    fontSize: '1.5em',
    marginTop: '50px',
  },
  a: {
    width: '200px',
    height: 'auto',
    borderRadius: '8px',
    objectFit: 'contain',
    marginLeft: '20px',
  },
};

export default EventDetail;
