import { Collapse, TableCell, TableRow } from '@mui/material'
import React from 'react'
import businnessRules from '../../../../app/utils/Rules/options.jsx'
import { useUser } from '../../../../hooks/userContext'
import { BodyTable, HeadTable, Input, Select, Td } from '../styles'
export const FourthDrop = (row) => {
    const { nonEspecificOpt } = businnessRules
    const { userData, SenderDirector, Sender } = useUser()

    const [value, setValue] = React.useState('')

    const Changer = async (area, e, id) => {
        setValue(e)

        if (userData.role !== 'direcao') {
            area !== 'observacao' && Sender(area, e, id, value)
        }
        if (userData.role === 'direcao') {
            area !== 'observacao' && SenderDirector(area, e, id, value)
        }
    }



    return (
        <TableCell style={{
            paddingBottom: 0,
            paddingTop: 0,
            // width: "69rem",
        }} colSpan={6}>
            <Collapse
                style={{ background: row.open ? "#f5f5f5" : "", width: "150%" }}
                in={row.open}
                timeout="auto"
                unmountOnExit>
                <HeadTable
                    style={{
                        display: "flex", alignItems: "center",
                        paddingLeft: "1rem", fontSize: "1.2rem"
                    }}>
                    <TableRow>
                        Taxa de Matrícula :
                    </TableRow>
                </HeadTable>

                <HeadTable>
                    <TableRow>
                        <TableCell style={{ fontWeight: "bold" }}>Valor</TableCell>
                        <TableCell style={{ fontWeight: "bold" }}>Desconto</TableCell>
                        <TableCell align="center" style={{ fontWeight: "bold" }} >Vencimento</TableCell>
                        <TableCell align="center" style={{ fontWeight: "bold" }}>Forma de PG.</TableCell>
                        <TableCell align="center" style={{ fontWeight: "bold" }}>Parcelas</TableCell>
                        <TableCell align="center" style={{ fontWeight: "bold" }}>Situação</TableCell>
                        <TableCell align="center" style={{ fontWeight: "bold" }}>Data Realizada</TableCell>
                    </TableRow>
                </HeadTable>
                <BodyTable>
                    <TableRow key={row?.data.contrato}>

                        <TableCell >
                            {row?.data.tmValor}
                        </TableCell>
                        <TableCell >
                            {row?.data.tmDesconto}
                        </TableCell>
                        <TableCell align="center">
                            {row?.data.tmVencimento}
                        </TableCell>
                        <TableCell align="center">
                            {row?.data.tmFormaPg}
                        </TableCell>
                        <TableCell align="center">
                            {row?.data.tmParcelas}
                        </TableCell>
                        <TableCell align="center">
                            {
                                userData.admin === false ?

                                    <>
                                        {row?.data.tmStatus}
                                    </>
                                    :
                                    <Td >
                                        <Select
                                            defaultValue={row?.data.tmStatus}
                                            onChange={(e) =>
                                                Changer("tmStatus", e.target.value, row?.data.contrato)}>
                                            {
                                                nonEspecificOpt.map(res => (
                                                    <option value={res} key={res}>{res}</option>
                                                ))
                                            }
                                        </Select>

                                    </Td>
                            }

                        </TableCell>
                        <TableCell align="center">
                            {
                                userData.admin === false ?

                                    <> {row?.data.tmData}</>
                                    :
                                    <>
                                        <Td style={{ display: "flex", margin: ".5rem 0 " }}>
                                            <Input
                                                defaultValue={row?.data.tmData.split("T")[0]}
                                                type="date"
                                                onChange={(e) =>
                                                    Changer("tmData", e.target.value, row?.data.contrato)} />

                                        </Td>

                                    </>
                            }
                        </TableCell>
                    </TableRow>
                </BodyTable>

                <HeadTable
                    style={{
                        display: "flex", alignItems: "center",
                        paddingLeft: "1rem", fontSize: "1.2rem"
                    }}>
                    <TableRow>
                        Parcela :
                    </TableRow>
                </HeadTable>

                <HeadTable>
                    <TableRow>
                        <TableCell style={{ fontWeight: "bold" }}>Valor</TableCell>
                        <TableCell style={{ fontWeight: "bold" }}>Desconto</TableCell>
                        <TableCell align="center" style={{ fontWeight: "bold" }} >Vencimento</TableCell>
                        <TableCell align="center" style={{ fontWeight: "bold" }}>Forma de PG.</TableCell>
                        <TableCell align="center" style={{ fontWeight: "bold" }}>Parcelas</TableCell>
                        <TableCell align="center" style={{ fontWeight: "bold" }}>Situação</TableCell>
                        <TableCell align="center" style={{ fontWeight: "bold" }}>Data Realizada</TableCell>
                    </TableRow>
                </HeadTable>
                <BodyTable>
                    <TableRow key={row?.data.contrato}>

                        <TableCell component="th" scope="row" >
                            {row?.data.ppValor}
                        </TableCell>
                        <TableCell >
                            {row?.data.ppDesconto}
                        </TableCell>
                        <TableCell align="center">
                            {row?.data.ppVencimento}
                        </TableCell>
                        <TableCell align="center">
                            {row?.data.ppFormaPg}
                        </TableCell>
                        <TableCell align="center">
                            {row?.data.ppParcelas}
                        </TableCell>
                        <TableCell align="center">
                            {
                                userData.admin === false ?

                                    <Td>{row?.data.ppStatus}</Td>
                                    :
                                    <Td >
                                        <Select
                                            defaultValue={row?.data.ppStatus}
                                            onChange={(e) =>
                                                Changer("ppStatus", e.target.value, row?.data.contrato)}>
                                            {
                                                nonEspecificOpt.map(res => (
                                                    <option value={res} key={res}>{res}</option>
                                                ))
                                            }
                                        </Select>

                                    </Td>
                            }
                        </TableCell>
                        <TableCell align="center">
                            {
                                userData.admin === false ?

                                    <Td> {row?.data.ppData}</Td>
                                    :
                                    <>
                                        <Td style={{ display: "flex", margin: ".5rem 0 " }}>
                                            <Input
                                                defaultValue={row?.data.ppData.split("T")[0]}
                                                type="date"
                                                onChange={(e) =>
                                                    Changer("ppData", e.target.value, row?.data.contrato)} />

                                        </Td>

                                    </>
                            }
                        </TableCell>

                    </TableRow>
                </BodyTable>

                <HeadTable style={{
                    display: "flex", alignItems: "center",
                    paddingLeft: "1rem", fontSize: "1.2rem"
                }}>
                    <TableRow>
                        Material Didático :
                    </TableRow>
                </HeadTable>
                <HeadTable>
                    <TableRow>
                        <TableCell style={{ fontWeight: "bold" }}>Valor</TableCell>
                        <TableCell style={{ fontWeight: "bold" }}>Desconto</TableCell>
                        <TableCell align="center" style={{ fontWeight: "bold" }} >Vencimento</TableCell>
                        <TableCell align="center" style={{ fontWeight: "bold" }}>Forma de PG.</TableCell>
                        <TableCell align="center" style={{ fontWeight: "bold" }}>Parcelas</TableCell>
                        <TableCell align="center" style={{ fontWeight: "bold" }}>Situação</TableCell>
                        <TableCell align="center" style={{ fontWeight: "bold" }}>Data Realizada</TableCell>
                    </TableRow>
                </HeadTable>
                <BodyTable>
                    <TableRow key={row?.data.contrato}>

                        <TableCell component="th" scope="row" >
                            {row?.data.mdValor}
                        </TableCell>
                        <TableCell >
                            {row?.data.mdDesconto}
                        </TableCell>
                        <TableCell align="center">
                            {row?.data.mdVencimento}
                        </TableCell>
                        <TableCell align="center">
                            {row?.data.mdFormaPg}
                        </TableCell>
                        <TableCell align="center">
                            {row?.data.mdParcelas}
                        </TableCell>
                        <TableCell align="center">
                            {
                                userData.admin === false ?

                                    <>{row?.data.mdStatus}</>
                                    :
                                    <Td >
                                        <Select
                                            defaultValue={row?.data.mdStatus}
                                            onChange={(e) =>
                                                Changer("mdStatus", e.target.value, row?.data.contrato)}>
                                            {
                                                nonEspecificOpt.map(res => (
                                                    <option value={res} key={res}>{res}</option>
                                                ))
                                            }
                                        </Select>

                                    </Td>
                            }
                        </TableCell>
                        <TableCell align="center">
                            {
                                userData.admin === false ?

                                    <> {row?.data.mdData}</>
                                    :
                                    <>
                                        <Td style={{ display: "flex", margin: ".5rem 0 " }}>
                                            <Input
                                                type="date"
                                                defaultValue={row?.data.mdData.split("T")[0]}
                                                onChange={(e) =>
                                                    Changer("mdData", e.target.value, row?.data.contrato)}
                                            />

                                        </Td>
                                        {row?.data.mdData ?
                                            <Td> {row?.data.mdData}</Td> : ""}
                                    </>
                            }
                        </TableCell>

                    </TableRow>
                </BodyTable>
            </Collapse>
        </TableCell>


    )
}
