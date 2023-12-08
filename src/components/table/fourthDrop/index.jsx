import { Collapse, TableCell, TableRow } from '@mui/material'
import React from 'react'
import { toast } from 'react-toastify'
import businnessRules from '../../../app/utils/Rules/options.jsx'
import URI from '../../../app/utils/utils'
import { useUser } from '../../../hooks/userContext'
import { BodyTable, HeadTable, Input, Select, Td } from '../styles'
const FourthDrop = (row) => {
    const { nonEspecificOpt } = businnessRules
    const { userData, headers } = useUser()

    const [value, setValue] = React.useState('')

    const Changer = async (area, e, id) => {
        setValue(e)

        if (userData.role !== 'direcao') {
            area !== 'observacao' && Sender(area, e, id)
        }
        if (userData.role === 'direcao') {
            area !== 'observacao' && SenderDirector(area, e, id)
        }
    }


    const day = new Date()
    const currentDay = day.toLocaleDateString()


    async function SenderDirector(area, e, id) {

        const directorValidationBody = {
            "area": area,
            "value": area !== 'observacao' ? e : value,
            "day": e !== "ok" ? "" : currentDay,
        }
        const directorBody = {
            "area": area,
            "value": area !== 'observacao' ? e : value,
        }
        await toast.promise(
            URI.put(`/controle/${id}`,
                area !== 'aprovacaoDirecao' ? directorBody : directorValidationBody
                , { headers }),
            {
                pending: 'Conferindo os dados',
                success: 'Atualizado com sucesso',
                error: 'Alguma coisa deu errado'
            }
        )
    }

    async function Sender(area, e, id) {
        await toast.promise(
            URI.put(`/controle/${id}`,
                {
                    "area": area,
                    "value": area !== 'observacao' ? e : value,
                    "responsible": userData.name
                }, { headers }),
            {
                pending: 'Conferindo os dados',
                success: 'Atualizado com sucesso',
                error: 'Alguma coisa deu errado'
            }
        )
    }


    return (
        <TableCell style={{
            paddingBottom: 0,
            paddingTop: 0,
            width: "69rem",
        }} colSpan={6}>
            <Collapse style={{ background: row.open ? "#f5f5f5" : "" }} in={row.open} timeout="auto" unmountOnExit>
                <HeadTable style={{ display: "flex", alignItems: "center", paddingLeft: "1rem", fontSize: "1.2rem" }}>
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
                                userData.role === 'comercial' ?
                                    <>
                                        {row?.data.tmStatus}
                                    </>
                                    :
                                    <Td >
                                        <Select defaultValue={row?.data.tmStatus} onChange={(e) => Changer("tmStatus", e.target.value, row?.data.contrato)}>
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
                                userData.role === 'comercial' ?
                                    <>Atualmente {row?.data.tmData}</>
                                    :
                                    <>
                                        <Td style={{ display: "flex", margin: ".5rem 0 " }}>
                                            <Input defaultValue={row?.data.tmData} type="date" onChange={(e) => Changer("tmData", e.target.value, row?.data.contrato)} />

                                        </Td>

                                    </>
                            }
                        </TableCell>
                    </TableRow>
                </BodyTable>

                <HeadTable style={{ display: "flex", alignItems: "center", paddingLeft: "1rem", fontSize: "1.2rem" }}>
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
                                userData.role === 'comercial' ?
                                    <Td>{row?.data.ppStatus}</Td>
                                    :
                                    <Td >
                                        <Select defaultValue={row?.data.ppStatus} onChange={(e) => Changer("ppStatus", e.target.value, row?.data.contrato)}>
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
                                userData.role === 'comercial' ?
                                    <Td>Atualmente {row?.data.ppData}</Td>
                                    :
                                    <>
                                        <Td style={{ display: "flex", margin: ".5rem 0 " }}>
                                            <Input defaultValue={row?.data.ppData} type="date" onChange={(e) => Changer("ppData", e.target.value, row?.data.contrato)} />

                                        </Td>

                                    </>
                            }
                        </TableCell>

                    </TableRow>
                </BodyTable>

                <HeadTable style={{ display: "flex", alignItems: "center", paddingLeft: "1rem", fontSize: "1.2rem" }}>
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
                                userData.role === 'comercial' ?
                                    <>{row?.data.mdStatus}</>
                                    :
                                    <Td >
                                        <Select defaultValue={row?.data.mdStatus} onChange={(e) => Changer("mdStatus", e.target.value, row?.data.contrato)}>
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
                                userData.role === 'comercial' ?
                                    <>Atualmente {row?.data.mdData}</>
                                    :
                                    <>
                                        <Td style={{ display: "flex", margin: ".5rem 0 " }}>
                                            <Input defaultValue={row?.data.mdData} type="date" onChange={(e) => Changer("mdData", e.target.value, row?.data.contrato)} />

                                        </Td>
                                        {row?.data.mdData ?
                                            <Td>Atualmente {row?.data.mdData}</Td> : ""}
                                    </>
                            }
                        </TableCell>

                    </TableRow>
                </BodyTable>
            </Collapse>
        </TableCell>


    )
}

export default FourthDrop