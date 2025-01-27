import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useCustomFields } from '../../../../hooks/customFields/customFIelds.hook.jsx';
import { useUser } from '../../../../hooks/userContext.jsx';
import { UniqueSelect } from '../../../selects/UniqueSelect/index.jsx';
import { RowTableCustomFields } from '../styles.jsx';

export const ContractInfo = (props) => {

    const { row } = props

    const { UpdateCustomFields } = useUser()

    const [Open, setOpen] = useState(false)
    const { cfSrted } = useCustomFields()

    const customFieldsFiltered = cfSrted && cfSrted.filter(res => res.category === "Contrato")


    const start = row["customFields"]["Data de início do contrato"].split("/")
    const end = row["customFields"]["Data de fim do contrato"].split("/")

    const ChangerCustomFields = async (key, value) => {

        UpdateCustomFields("customFields", row.id, key, value, row.customFields)
    }
    var data2 = new Date(`${end[2]}-${end[1]}-${end[0]}`); // Usando o formato "YYYY-MM-DD"
    var data1 = new Date(`${start[2]}-${start[1]}-${start[0]}`);

    var difenceMonths = (data2.getFullYear() - data1.getFullYear()) * 12 + (data2.getMonth() - data1.getMonth());

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
                    3 - Informações de contrato
                </TableCell>
            </TableRow>

            <Collapse in={Open} timeout="auto" unmountOnExit sx={{ width: "100%" }}>

                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>

                    <Box sx={{ margin: 1, width: "100%" }} >
                        <Table size="small" aria-label="purchases" >
                            <TableHead >
                                <TableRow >
                                    <TableCell style={{ fontWeight: "bold" }}>N°. do Contrato</TableCell>
                                    <TableCell style={{ fontWeight: "bold" }}>Início do Contrato</TableCell>
                                    <TableCell align="center" style={{ fontWeight: "bold" }} >Fim do Contrato</TableCell>
                                    <TableCell align="center" style={{ fontWeight: "bold" }}>Tipo de Assinatura</TableCell>
                                    <TableCell align="center" style={{ fontWeight: "bold" }}>Data AC.</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow >
                                    <TableCell component="th" scope="row" align="center">
                                        {row["customFields"]["Nº do contrato"]}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row["customFields"]["Data de início do contrato"]}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row["customFields"]["Data de fim do contrato"]}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row["customFields"]["Tipo de assinatura"]}
                                    </TableCell>
                                    <TableCell align="center">
                                        {/* {row["customFields"]["Data de fim do contrato"]} */}

                                    </TableCell>
                                </TableRow>

                            </TableBody>

                            <TableHead >
                                <TableRow >
                                    <TableCell align="center" style={{ fontWeight: "bold" }}>Status do Contrato</TableCell>
                                    <TableCell align="center" style={{ fontWeight: "bold" }}>Carga Horária</TableCell>
                                    <TableCell align="center" style={{ fontWeight: "bold" }}>Tempo de Contrato</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow >
                                    <TableCell component="th" scope="row" align="center">
                                        {
                                            row["historic"].map(res => {
                                                if (res.information.field === "AssinaturaContrato") return (
                                                    <p>{res.responsible} assinou o contrato</p>
                                                )
                                            })
                                        }
                                    </TableCell>
                                    <TableCell align="center">{row["customFields"]["Carga horário do curso"]}</TableCell>
                                    <TableCell align="center">{difenceMonths} meses no total</TableCell>

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
                                                res.type === "option" ||
                                                    res.type === "multiple_choice" ?
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

ContractInfo.propTypes = {
    row: PropTypes.shape({
        id: PropTypes.string.isRequired,
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
        customFields: PropTypes.shape({
            "Data de emissão da venda": PropTypes.string.isRequired,
            "Nº do contrato": PropTypes.string.isRequired,
            "Data de início do contrato": PropTypes.string.isRequired,
            "Data de fim do contrato": PropTypes.string.isRequired,
            "Tipo de assinatura": PropTypes.string.isRequired,
            "Carga horário do curso": PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
}