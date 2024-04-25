import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import * as React from 'react';


// import { SureModal } from '../source.jsx';

export function CustomFieldTable(props) {
    const { row } = props;
    const [editionMode, setEditionMode] = React.useState(false)

    const types = {
        String: "Texto",
        "Texto": "String",
        Number: "Número",
        "Número": "Number",
        Date: "Data",
        "Data": "Date",
        Select: "Seleção única",
        "Seleção única": "Select",
        MultiSelect: "Multi-Select",
        "Multi-Select": "MultiSelect",
    }

    const arr = [
        "Texto",
        "Número",
        "Data",
        "Seleção única",
        "Multi-Select"
    ]

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} >
                <TableCell>
                    <input type="number" defaultValue={row?.order} />
                    <button> Salvar </button>

                </TableCell>
                <TableCell component="th" scope="row">
                    <input type="text" defaultValue={row?.label} />
                    {row?.label}
                </TableCell>
                <TableCell align="center">
                    {types[row?.type]}
                    <select name="" id="">
                        {
                            arr.map(res => (
                                <option value={res} key={res}>
                                    {res}
                                </option>
                            ))
                        }
                    </select>

                </TableCell>
                <TableCell align="center">
                    {row?.required ? "Sim" : "Não"}

                </TableCell>
                <TableCell align="center">
                </TableCell>
                <TableCell align="center">
                    {
                        row?.options.map(res => (
                            res
                        ))}
                </TableCell>
                <TableCell align="center">

                    {/* <SureModal data={row?.id} name={row?.name} url="/users" /> */}

                </TableCell >

            </TableRow>

        </React.Fragment>
    );
}

CustomFieldTable.propTypes = {
    row: PropTypes.shape({
        order: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        required: PropTypes.bool.isRequired,
        options: PropTypes.array.isRequired,

    }).isRequired,


};



