import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Welcome = () => {

    const { username, isDeveloper, isAdmin } = useAuth()

    console.log("User Information:", { username, isDeveloper, isAdmin });

    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const content = (
        <section className="sidebar">
            <div className="welcome">
                <p>{today}</p>
                <p>Welcome, {username}!</p>
                {isDeveloper && <p>You login as a developer.</p>}
                {isAdmin && <p>You login as an admin.</p>}
            </div>
            <div className="links">
                <p><Link to="/dash/events">View Events</Link></p>
                <p><Link to="/dash/events/new">Add New Event</Link></p>
                {(isDeveloper || isAdmin) && <p><Link to="/dash/users">View User Settings</Link></p>}
                {(isDeveloper || isAdmin) && <p><Link to="/dash/users/new">Add New User</Link></p>}
            </div>
        </section>

    )

    return content
}
export default Welcome