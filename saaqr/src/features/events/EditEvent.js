import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectEventById } from './eventsApiSlice'
import { selectAllUsers } from '../users/usersApiSlice'
import EditEventForm from './EditEventForm'

const EditEvent = () => {
    const { id } = useParams()

    const event = useSelector(state => selectEventById(state, id))
    const users = useSelector(selectAllUsers)

    const content = event && users ? <EditEventForm event={event} users={users} /> : <p>Loading...</p>

    return content
}
export default EditEvent