import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import * as React from 'react';


import SureModal from '../sureModal';

export function Row(props) {
    const { row } = props;




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
                                <td key={r}>{r}</td>
                            )) : <td>Todas</td>
                    }
                </TableCell>
                <TableCell align="right">{row?.role}</TableCell>
                <TableCell align="right">{row?.admin === true ? "Adm" : "Comum"}</TableCell>
                <TableCell align="right">

                    <SureModal data={row?.id} name={row?.name} url="/users" />

                </TableCell >

            </TableRow>

        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        id: PropTypes.number.isRequired,
        email: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        unity: PropTypes.array.isRequired,
        role: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        admin: PropTypes.bool.isRequired,

    }).isRequired,


};



