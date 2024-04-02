import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'


import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'

const User = ({ userId }) => {
    const user = useSelector(state => selectUserById(state, userId))

    const navigate = useNavigate()

    if (user) {
        const handleEdit = () => navigate(`/dash/users/${userId}`)

        const userRolesString = user.roles.toString().replaceAll(',', ', ')

        const cellStatus = user.active ? '' : 'table__cell--inactive'

        return (
            <TableRow className={`table__row user ${cellStatus}`} key={user._id}>
                <TableCell className="table__cell">{user.username}</TableCell>
                <TableCell className="table__cell">{user.email}</TableCell>
                <TableCell className="table__cell">{user.card_number}</TableCell>
                <TableCell className="table__cell">{userRolesString}</TableCell>
                <TableCell className="table__cell">{user.year_study}</TableCell>
                <TableCell className="table__cell">{user.active ? 'Yes' : 'No'}</TableCell>
                <TableCell className="table__cell">
                    <Button
                        variant="outlined"
                        onClick={handleEdit}
                        endIcon={<FontAwesomeIcon icon={faPenToSquare} />}
                    >
                        Edit
                    </Button>
                </TableCell>
            </TableRow>
        );

    } else return null
}
export default User