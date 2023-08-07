import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import * as React from 'react';

import { toast } from 'react-toastify';
import { Trash } from './styles';

import URI from '../../app/utils/utils';
import { useUser } from '../../hooks/userContext';

export function Row(props) {
    const { headers, userData, users, setUsers } = useUser()
    const { row } = props;


    async function deleteUser(id) {

        await toast.promise(
            URI.delete(`/users/${id}`, { headers })
                .then(() => {
                    setUsers(users?.filter(res => res.id !== id))
                }),
            {
                pending: 'Conferindo os dados',
                success: 'Deletado com sucesso',
                error: 'Alguma coisa deu errado'
            }
        )
    }
    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} >
                <TableCell>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row?.name}
                </TableCell>
                <TableCell align="right">{row?.email}</TableCell>
                <TableCell align="right">
                    {
                        row?.unity.length >= 1 ?
                            row?.unity.map(r => (
                                <p key={r}>{r}</p>
                            )) : <p>Todas</p>
                    }
                </TableCell>
                <TableCell align="right">{row?.role}</TableCell>
                <TableCell align="right">{row?.admin === true ? "Adm" : "Comum"}</TableCell>
                <TableCell align="right">
                </TableCell>
                {userData?.admin === true ? <TableCell align="right"><Trash onClick={() => deleteUser(row?.id)} /></TableCell> : ""}

            </TableRow>

        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        id: PropTypes.number.isRequired,
        email: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        unity: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        admin: PropTypes.bool.isRequired,

    }).isRequired,


};



