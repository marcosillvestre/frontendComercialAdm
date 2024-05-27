import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import * as React from 'react';


import { SureModal } from '../source.jsx';

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
                <TableCell align="center">{row?.email}</TableCell>
                {/* <TableCell align="center">{row?.active}</TableCell> */}
                <TableCell align="center">
                    {
                        <>
                            <td >{row?.unity[0]}</td>
                            <td >{row?.unity[1]}</td>
                        </>

                    }
                </TableCell>
                <TableCell align="center">{row?.role}</TableCell>
                <TableCell align="center">{row?.admin === true ? "Adm" : "Comum"}</TableCell>
                <TableCell align="center">

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
        active: PropTypes.bool.isRequired,

    }).isRequired,


};



