import { useGetUsersQuery } from "./usersApiSlice";
import User from "./User";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const UsersList = () => {
  const { data: users, isLoading, isSuccess, isError, error } =
    useGetUsersQuery();

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids } = users

    const tableContent = ids?.length
    ? ids.map(userId => <User key={userId} userId={userId} />)
    : null

    content = (
        // <table className="table table--users">
        //   <thead className="table__thead">
        //   </thead>
        //     <tbody>
        //     <tr>
        //       <th scope="col" className="table__th user__username">
        //         Username
        //       </th>
        //       <th scope="col" className="table__th user__email">
        //         Email
        //       </th>
        //       <th scope="col" className="table__th user__card_number">
        //         Card Number
        //       </th>
        //       <th scope="col" className="table__th user__roles">
        //         Roles
        //       </th>
        //       <th scope="col" className="table__th user__year_study">
        //         Year of Study
        //       </th>
        //       <th scope="col" className="table__th user__active">
        //         Active
        //       </th>
        //     </tr>
        //     </tbody>
        //   {/* <tbody>{tableContent}</tbody> */}
        // </table>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell >Username</TableCell>
              <TableCell >Email</TableCell>
              <TableCell >Card Number</TableCell>
              <TableCell >Roles</TableCell>
              <TableCell >Year of Study</TableCell>
              <TableCell >Active</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableContent}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  return content;
};

export default UsersList;
