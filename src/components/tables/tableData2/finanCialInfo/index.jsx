import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import businessRules from '../../../../app/utils/Rules/options.jsx';
import { useCustomFields } from '../../../../hooks/customFields/customFIelds.hook.jsx';
import { useUser } from '../../../../hooks/userContext.jsx';
import { DateSelect } from '../../../selects/DateSelect/index.jsx';
import { UniqueSelect } from '../../../selects/UniqueSelect/index.jsx';
import { RowTableCustomFields, RowTableSection } from '../styles.jsx';

export const FinanCialInfo = (props) => {

    const { row } = props


    const [Open, setOpen] = useState(false)

    const [Tax, setTax] = useState(false)
    const [Payment, setPayment] = useState(false)
    const [Material, setMaterial] = useState(false)

    const { cfSrted } = useCustomFields()
    const { Sender, UpdateCustomFields } = useUser()


    const customFieldsFiltered = cfSrted && cfSrted.filter(res => res.category === "Contrato")
    const { comissionStatusOpt } = businessRules


    const ChangerCustomFields = async (key, value) => {

        UpdateCustomFields("customFields", row.id, key, value, row.customFields)
    }

    const Changer = async (key, value) => {

        Sender(key, row.id, value, key)
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
                    4 - Informações financeiras
                </TableCell>
            </TableRow>

            <Collapse in={Open} timeout="auto" unmountOnExit sx={{ width: "maxContent" }}>

                <TableRow sx={{ '& > *': { borderBottom: 'unset' }, width: "15rem" }}>
                    <RowTableSection >
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => {
                                setTax(!Tax)
                            }}
                        >
                            {Tax ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>

                        Taxa de matrícula
                    </RowTableSection>
                </TableRow>


                <Collapse in={Tax} timeout="auto" unmountOnExit sx={{ width: "100%" }}>

                    <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>

                        <Box sx={{ margin: 1, width: "100%" }} >
                            <Table size="small" aria-label="purchases" >
                                <TableHead >
                                    <TableRow>
                                        <TableCell style={{ fontWeight: "bold" }}>Valor</TableCell>
                                        <TableCell align="center" style={{ fontWeight: "bold" }} >Vencimento</TableCell>
                                        <TableCell align="center" style={{ fontWeight: "bold" }}>Forma de PG.</TableCell>
                                        <TableCell align="center" style={{ fontWeight: "bold" }}>Situação</TableCell>
                                        <TableCell align="center" style={{ fontWeight: "bold" }}>Data Realizada</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow >
                                        <TableCell component="th" scope="row" align="center">
                                            {row["customFields"]["Valor de taxa de matrícula"]}
                                        </TableCell>
                                        <TableCell align="center">
                                            {row["customFields"]["Data de pagamento TM"]}
                                        </TableCell>
                                        <TableCell align="center">
                                            {row["customFields"]["Forma de pagamento TM"]}
                                        </TableCell>
                                        <TableCell align="center">
                                            <UniqueSelect
                                                label={row.taxaMatriculaStatus}
                                                option={comissionStatusOpt}
                                                width="7rem"
                                                field="taxaMatriculaStatus"
                                                where="customField"
                                                // color={setColor[payStatus]}
                                                // border={borderColor[payStatus]}
                                                fn={[Changer]}
                                            />

                                        </TableCell>
                                        <TableCell align="center">
                                            <DateSelect
                                                label={row.dataPagamentoTaxaMatricula}
                                                width="7rem"
                                                field="dataPagamentoTaxaMatricula"
                                                where="customField"
                                                fn={[Changer]}
                                            />
                                        </TableCell>

                                    </TableRow>

                                </TableBody>

                            </Table>
                        </Box>
                    </TableRow>
                </Collapse>

                <TableRow sx={{ '& > *': { borderBottom: 'unset' }, width: "15rem" }}>
                    <RowTableSection >
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => {
                                setPayment(!Payment)
                            }}
                        >
                            {Payment ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>

                        Parcela
                    </RowTableSection>
                </TableRow>


                <Collapse in={Payment} timeout="auto" unmountOnExit sx={{ width: "100%" }}>

                    <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>

                        <Box sx={{ margin: 1, width: "100%" }} >
                            <Table size="small" aria-label="purchases" >
                                <TableHead >
                                    <TableRow>
                                        <TableCell style={{ fontWeight: "bold" }}>Valor</TableCell>
                                        <TableCell style={{ fontWeight: "bold" }}>Desconto</TableCell>
                                        <TableCell align="center" style={{ fontWeight: "bold" }} >Vencimento</TableCell>
                                        <TableCell align="center" style={{ fontWeight: "bold" }}>Forma de PG.</TableCell>
                                        <TableCell align="center" style={{ fontWeight: "bold" }}>Parcelas</TableCell>
                                        <TableCell align="center" style={{ fontWeight: "bold" }}>Situação</TableCell>
                                        <TableCell align="center" style={{ fontWeight: "bold" }}>Data Realizada</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow >
                                        <TableCell component="th" scope="row" align="center">
                                            {row["customFields"]["Valor total da parcela"]}
                                        </TableCell>
                                        <TableCell align="center">
                                            {row["customFields"]["Valor do desconto de pontualidade por parcela"]}
                                        </TableCell>
                                        <TableCell align="center">
                                            {row["customFields"]["Data de vencimento da primeira parcela"]}
                                        </TableCell>
                                        <TableCell align="center">
                                            {row["customFields"]["Forma de pagamento da parcela"]}
                                        </TableCell>
                                        <TableCell align="center">
                                            {row["customFields"]["Número de parcelas"]}
                                        </TableCell>
                                        <TableCell align="center">
                                            <UniqueSelect
                                                label={row.pagamentoPrimeiraParcelaStatus}
                                                option={comissionStatusOpt}
                                                width="7rem"
                                                field="pagamentoPrimeiraParcelaStatus"
                                                where="customField"
                                                // color={setColor[payStatus]}
                                                // border={borderColor[payStatus]}
                                                fn={[Changer]}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <DateSelect
                                                label={row.dataPagamentoPrimeiraParcela}
                                                width="7rem"
                                                field="dataPagamentoPrimeiraParcela"
                                                where="customField"
                                                fn={[Changer]}
                                            />
                                        </TableCell>

                                    </TableRow>

                                </TableBody>

                            </Table>
                        </Box>
                    </TableRow>
                </Collapse>

                <TableRow sx={{ '& > *': { borderBottom: 'unset' }, width: "15rem" }}>
                    <RowTableSection >
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => {
                                setMaterial(!Material)
                            }}
                        >
                            {Material ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>

                        Material didático
                    </RowTableSection>
                </TableRow>


                <Collapse in={Material} timeout="auto" unmountOnExit sx={{ width: "100%" }}>

                    <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>

                        <Box sx={{ margin: 1, width: "100%" }} >
                            <Table size="small" aria-label="purchases" >
                                <TableHead >
                                    <TableRow>
                                        <TableCell style={{ fontWeight: "bold" }}>Valor</TableCell>
                                        <TableCell style={{ fontWeight: "bold" }}>Desconto</TableCell>
                                        <TableCell align="center" style={{ fontWeight: "bold" }} >Vencimento</TableCell>
                                        <TableCell align="center" style={{ fontWeight: "bold" }}>Forma de PG.</TableCell>
                                        <TableCell align="center" style={{ fontWeight: "bold" }}>Situação</TableCell>
                                        <TableCell align="center" style={{ fontWeight: "bold" }}>Data Realizada</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow >
                                        <TableCell component="th" scope="row" align="center">
                                            {row["customFields"]["Valor total do material didático"]}
                                        </TableCell>
                                        <TableCell align="center">
                                            {row["customFields"]["Valor do desconto material didático"]}
                                        </TableCell>
                                        <TableCell align="center">
                                            {row["customFields"]["Data de pagamento MD"]}
                                        </TableCell>
                                        <TableCell align="center">
                                            {row["customFields"]["Forma de pagamento do MD"]}
                                        </TableCell>
                                        <TableCell align="center">
                                            <UniqueSelect
                                                label={row.materialDidaticoStatus}
                                                option={comissionStatusOpt}
                                                width="7rem"
                                                field="materialDidaticoStatus"
                                                where="customField"
                                                // color={setColor[payStatus]}
                                                // border={borderColor[payStatus]}
                                                fn={[Changer]}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <DateSelect
                                                label={row.dataPagamentoMaterialDidatico}
                                                width="7rem"
                                                field="dataPagamentoMaterialDidatico"
                                                where="customField"
                                                fn={[Changer]}
                                            />
                                        </TableCell>
                                    </TableRow>

                                </TableBody>

                            </Table>
                        </Box>
                    </TableRow>
                </Collapse>



                <RowTableCustomFields>

                    <TableCell sx={{
                        width: "100%", fontWeight: "", fontSize: ".9rem"

                    }}>
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
FinanCialInfo.propTypes = {
    row: PropTypes.shape({
        id: PropTypes.string.isRequired,
        taxaMatriculaStatus: PropTypes.string.isRequired,
        dataPagamentoTaxaMatricula: PropTypes.string.isRequired,

        pagamentoPrimeiraParcelaStatus: PropTypes.string.isRequired,
        dataPagamentoPrimeiraParcela: PropTypes.string.isRequired,

        materialDidaticoStatus: PropTypes.string.isRequired,
        dataPagamentoMaterialDidatico: PropTypes.string.isRequired,

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
            "Data de pagamento TM": PropTypes.string.isRequired,
            "Forma de pagamento TM": PropTypes.string.isRequired,
            "Valor total da parcela": PropTypes.string.isRequired,
            "Valor do desconto de pontualidade por parcela": PropTypes.string.isRequired,
            "Data de vencimento da primeira parcela": PropTypes.string.isRequired,
            "Forma de pagamento da parcela": PropTypes.string.isRequired,
            "Número de parcelas": PropTypes.string.isRequired,
            "Valor total do material didático": PropTypes.string.isRequired,
            "Valor do desconto material didático": PropTypes.string.isRequired,
            "Data de pagamento MD": PropTypes.string.isRequired,
            "Forma de pagamento do MD": PropTypes.string.isRequired,
            "Valor de taxa de matrícula": PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
}