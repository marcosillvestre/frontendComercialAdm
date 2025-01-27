/* eslint-disable react/no-unknown-property */
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';



export const Historic = (props) => {

    const { row } = props

    const [Open, setOpen] = useState(false)

    return (

        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => {
                            setOpen(!Open)
                        }}
                    >
                        {Open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>


                </TableCell>

                <TableCell sx={{ width: "100%" }}>
                    7 - Histórico de alterações
                </TableCell>
            </TableRow>

            <Collapse in={Open} timeout="auto" unmountOnExit sx={{ width: "100%" }}>

                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>

                    <Box sx={{ margin: 1, width: "100%" }} >
                        <Table size="small" aria-label="purchases" >
                            <TableHead >
                                <TableRow>
                                    <TableCell align="center" style={{ fontWeight: "bold" }}>Responsável</TableCell>
                                    <TableCell align="center" style={{ fontWeight: "bold" }}>Data</TableCell>
                                    <TableCell align="center" style={{ fontWeight: "bold" }}>Campo alterado</TableCell>
                                    <TableCell align="center" style={{ fontWeight: "bold" }} >Alteração</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    row.historic.map(response => (
                                        <TableRow key={response?.id}>

                                            <TableCell component="th" scope="row" >
                                                {response?.responsible}
                                            </TableCell>
                                            <TableCell align="center" >
                                                {new Date(response?.created_at).toLocaleString()}
                                            </TableCell>
                                            <TableCell align="center">
                                                {response?.information?.field}
                                            </TableCell>
                                            <TableCell align="center">
                                                {response?.information?.text}
                                            </TableCell>

                                        </TableRow>

                                    ))
                                }

                            </TableBody>

                        </Table>
                    </Box>
                </TableRow>

            </Collapse>

        </React.Fragment>
    )
}

Historic.propTypes = {
    row: PropTypes.shape({
        id: PropTypes.string.isRequired,
        observacao: PropTypes.array,
        historic: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                created_at: PropTypes.string.isRequired,
                information: PropTypes.shape({
                    from: PropTypes.string.isRequired,
                    text: PropTypes.string.isRequired,
                    field: PropTypes.string.isRequired,
                }).isRequired,
                registerId: PropTypes.string.isRequired,
                responsible: PropTypes.string.isRequired,
            })
        ),
    }).isRequired,
}