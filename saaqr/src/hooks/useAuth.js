import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import {jwtDecode} from 'jwt-decode';

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isDeveloper = false
    let isAdmin = false
    let isOrganizerI = false
    let isOrganizerO = false
    let status = "Student"

    if (token) {
        const decoded = jwtDecode(token)
        const { username, roles } = decoded.UserInfo

        isDeveloper = roles.includes('Developer')
        isAdmin = roles.includes('Admin')
        isOrganizerI = roles.includes('OrganizerI')
        isOrganizerO = roles.includes('OrganizerO')

        if (isDeveloper) status = "Developer"
        if (isAdmin) status = "Admin"
        if (isOrganizerI) status = "OrganizerI"
        if (isOrganizerO) status = "OrganizerO"

        return { username, roles, status, isDeveloper, isAdmin, isOrganizerI, isOrganizerO }
    }

    return { username: '', roles: [], isDeveloper, isAdmin, isOrganizerI, isOrganizerO, status }
}
export default useAuth