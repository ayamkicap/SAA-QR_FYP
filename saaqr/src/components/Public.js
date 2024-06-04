// import { Link } from 'react-router-dom'

// const Public = () => {
//     const content = (
//         <section className="public">
//             <header>
//                 <h1>Welcome to <span className="nowrap">UNIVERSITI SAINS MALAYSIA</span></h1>
//             </header>
//             <header>
//                 <Link to="/login" style={{ position: 'absolute', top: 0, right: 0 }}>
//                     Login
//                 </Link>
//             </header>
//             <main className="public__main">
//                 <p>Nurturing Empowering Future Talents</p>
                
//                 <br />
//             </main>
//             {/* <footer>
//                 <Link to="/dash/users/new">Register</Link>
//             </footer> */}
//         </section>

//     )
//     return content
// }
// export default Public

import { Link } from 'react-router-dom'
import usmImg from '../img/usm.jpg'
import usmLogo from '../img/USMlogo.png'


const Public = () => {
  return (
    <section className="public">
      <header className="public__hero">
        {/* Background image or video */}
        <img src={usmLogo} alt="Universiti Sains Malaysia" className="public__hero-img" />

        {/* Hero content */}
        <div className="public__hero-content">
          <h1 className="public__hero-title">Welcome to <span className="nowrap">UNIVERSITI SAINS MALAYSIA</span></h1>
          <p className="public__hero-text">Nurturing Empowering Future Talents</p>
        </div>

        {/* Login button positioned absolutely */}
        <Link to="/login" className="public__login-btn absolute top-right">
          Login
        </Link>
      </header>

      <main className="public__main">

        {/* Additional content section with images (replace with your content) */}
        <section className="public__content">
          <h2>Why Choose USM?</h2>
          <p>USM offers a variety of academic programs, a vibrant campus life, and a supportive learning environment.</p>
          <img src={usmImg} alt="USM campus life" className="public__content-img" />
        </section>
      </main>
    </section>
  )
  
}



export default Public

