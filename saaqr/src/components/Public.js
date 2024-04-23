import { Link } from 'react-router-dom'

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1>Welcome to <span className="nowrap">UNIVERSITI SAINS MALAYSIA</span></h1>
            </header>
            <header>
                <Link to="/login" style={{ position: 'absolute', top: 0, right: 0 }}>
                    Login
                </Link>
            </header>
            <main className="public__main">
                <p>Nurturing Empowering Future Talents</p>
                
                <br />
            </main>
            {/* <footer>
                <Link to="/dash/users/new">Register</Link>
            </footer> */}
        </section>

    )
    return content
}
export default Public