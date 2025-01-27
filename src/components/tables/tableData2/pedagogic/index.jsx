/* eslint-disable react/no-unknown-property */
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useCustomFields } from '../../../../hooks/customFields/customFIelds.hook';
import { useUser } from '../../../../hooks/userContext';
import { UniqueSelect } from '../../../selects/uniqueSelect';
import { RowTableCustomFields } from '../styles';



export const Pedagogic = (props) => {

    const { row } = props

    const { cfSrted } = useCustomFields()

    const customFieldsFiltered = cfSrted && cfSrted.filter(res => res.category === "Pedagogico")



    const { UpdateCustomFields } = useUser()

    const [Open, setOpen] = useState(false)

    const ChangerCustomFields = async (key, value) => {

        UpdateCustomFields("customFields", row.id, key, value, row.customFields)
    }



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
                    6 - Informações pedagógicos
                </TableCell>
            </TableRow>

            <Collapse in={Open} timeout="auto" unmountOnExit sx={{ width: "100%" }}>

                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>

                    <Box sx={{ margin: 1, width: "100%" }} >
                        <Table size="small" aria-label="purchases" >
                            <TableHead >
                                <TableRow>
                                    <TableCell style={{ fontWeight: "bold" }}>PA. Data</TableCell>
                                    <TableCell align="center" style={{ fontWeight: "bold" }}>Classe</TableCell>
                                    <TableCell align="center" style={{ fontWeight: "bold" }} >SubClasse</TableCell>
                                    <TableCell align="center" style={{ fontWeight: "bold" }}>Material Didático</TableCell>
                                    <TableCell align="center" style={{ fontWeight: "bold" }}>Nivelamento </TableCell>
                                    <TableCell align="center" style={{ fontWeight: "bold" }}>Dia de Aula</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow >
                                    <TableCell component="th" scope="row" align="center">
                                        {row["customFields"]["Data da primeira aula"]}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row["customFields"]["Classe"]}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row["customFields"]["Subclasse"]}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row["customFields"]["Material didático"].map((res, idx) => (
                                            <p key={idx}><q >{res}</q></p>
                                        ))}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row["customFields"]["Precisa de nivelamento?"]}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row["customFields"]["Dia de aula"].map((res, idx) => (
                                            <p key={idx}>{res},</p>
                                        ))}
                                    </TableCell>
                                </TableRow>

                            </TableBody>

                        </Table>
                    </Box>
                </TableRow>
                <RowTableCustomFields>


                    <TableCell sx={{ width: "100%", fontWeight: "", fontSize: ".9rem" }}>
                        Campos personalizados
                    </TableCell>
                </RowTableCustomFields>
                <Box sx={{ margin: 1, width: "100%" }} >
                    <Table size="small" aria-label="purchases" >
                        <div
                            style={{
                                display: "flex",
                            }}
                        >
                            {
                                customFieldsFiltered.map(res => (
                                    <span
                                        key={res.id}

                                        style={{
                                            display: "grid",
                                            margin: "0 1rem",
                                            textAlign: "center"

                                        }}
                                    >

                                        <div >
                                            {
                                                res.type === "option" ?
                                                    <div >
                                                        <h4>{res.name}</h4>
                                                        <UniqueSelect
                                                            label={row["customFields"][res.name]}
                                                            option={res.options.map(r => {
                                                                return {
                                                                    name: r
                                                                }
                                                            })}
                                                            width="7rem"
                                                            field={res.name}
                                                            where="customField"
                                                            fn={[ChangerCustomFields]}
                                                        />

                                                    </div>

                                                    :
                                                    <div >
                                                        <h4>{res.name}</h4>
                                                        <div >
                                                            {row["customFields"][res.name]}
                                                        </div>
                                                    </div>

                                            }
                                        </div>

                                    </span>


                                ))
                            }
                        </div>
                    </Table>
                </Box>
            </Collapse>

        </React.Fragment>
    )
}

Pedagogic.propTypes = {
    row: PropTypes.shape({
        id: PropTypes.string.isRequired,
        observacao: PropTypes.array,
        customFields: PropTypes.shape({
            "Data da primeira aula": PropTypes.string.isRequired,
            "Classe": PropTypes.string.isRequired,
            "Subclasse": PropTypes.string.isRequired,
            "Material didático": PropTypes.string.isRequired,
            "Precisa de nivelamento?": PropTypes.string.isRequired,
            "Dia de aula": PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
}