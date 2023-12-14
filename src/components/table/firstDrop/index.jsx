import { Collapse, TableCell, TableRow } from '@mui/material'
import React from 'react'
import { toast } from 'react-toastify'
import colorsRules from '../../../app/utils/Rules/colors.jsx'
import businessRules from '../../../app/utils/Rules/options.jsx'
import URI from '../../../app/utils/utils'
import { useUser } from '../../../hooks/userContext'
import { BodyTable, DataTable, HeadTable, Input, Select, Td } from '../styles'

const FirstDrop = (row) => {
    const { comissionStatusOpt, nonEspecificOpt } = businessRules
    const { setColor } = colorsRules
    const { userData, headers } = useUser()

    const [value, setValue] = React.useState('')

    const [payStatus, setPayStatus] = React.useState(row.data.tipoMatricula)

    const Changer = async (area, e, id) => {
        setValue(e)
        area === "tipoMatricula" && setPayStatus(e)

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
        console.log(value)
        console.log(e)
        console.log(area)

        const directorValidationBody = {
            "area": area,
            "value": area !== 'observacao' ? e : value,
            "day": e !== "Ok" ? "" : currentDay,
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
            maxWidth: "50rem"
        }} colSpan={7}>
            <Collapse style={{ background: row.open ? "#f5f5f5" : "", width: "73.7rem" }} in={row.open} timeout="auto" unmountOnExit  >
                <HeadTable  >
                    <TableRow>
                        <TableCell
                            align="center"
                            style={{ fontWeight: "bold", fontSize: "small" }}>
                            AC. Status
                        </TableCell>
                        <TableCell
                            align="center"
                            style={{ fontWeight: "bold", fontSize: "small" }}
                        >TM. Status
                        </TableCell>
                        <TableCell
                            align="center"
                            style={{ fontWeight: "bold", fontSize: "small" }}
                        >PP. Status
                        </TableCell>
                        <TableCell
                            align="center"
                            style={{ fontWeight: "bold", fontSize: "small" }}>
                            MD. Status
                        </TableCell>
                        <TableCell
                            align="center"
                            style={{ fontWeight: "bold", fontSize: "small" }}>
                            PA. Status
                        </TableCell>
                        <TableCell
                            align="center"
                            style={{ fontWeight: "bold", fontSize: "small" }}>
                            Data da Matrícula
                        </TableCell>
                        <TableCell
                            align="center"
                            style={{ fontWeight: "bold", fontSize: "small" }}>
                            Data da Validação
                        </TableCell>

                    </TableRow>
                </HeadTable>

                <BodyTable >
                    <TableRow key={row?.data.contrato}>

                        <TableCell >
                            {
                                userData.role === 'comercial' ?
                                    <Td>{row?.data.acStatus}</Td>
                                    :
                                    <Td >
                                        <Select
                                            defaultValue={row?.data.acStatus}
                                            onChange={(e) =>
                                                Changer("acStatus", e.target.value, row?.data.contrato)}>
                                            {
                                                nonEspecificOpt.map(res => (
                                                    <option value={res} key={res}>{res}</option>
                                                ))
                                            }
                                        </Select>

                                    </Td>
                            }
                        </TableCell>

                        <TableCell >
                            {userData.role === 'comercial' ?
                                <Td>{row?.data.tmStatus}</Td>
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
                                userData.role === 'comercial' ?
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
                                userData.role === 'comercial' ?
                                    <Td>{row?.data.mdStatus}</Td>
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
                        <TableCell  >
                            {
                                userData.role === 'comercial' ?
                                    <Td>{row?.data.paStatus}</Td>
                                    :
                                    <Td >
                                        <Select
                                            defaultValue={row?.data.paStatus}
                                            onChange={(e) =>
                                                Changer("paStatus", e.target.value, row?.data.contrato)}>
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
                            {row?.data.dataMatricula}
                        </TableCell>
                        <TableCell align="center">
                            {row?.data.dataValidacao}
                        </TableCell>

                    </TableRow>
                </BodyTable>

                <HeadTable >
                    <TableRow>
                        <TableCell align="center" style={{ fontWeight: "bold", fontSize: "small" }}>Data de Comissionamento </TableCell>
                        <TableCell align="center" style={{ fontWeight: "bold", fontSize: "small" }}>Status do comissionamento </TableCell>
                        <TableCell align="center" style={{ fontWeight: "bold", fontSize: "small" }} >ADM. Responsável</TableCell>
                        <TableCell align="center" style={{ fontWeight: "bold", fontSize: "small" }}>Status Direção</TableCell>
                        <TableCell align="center" style={{ fontWeight: "bold", fontSize: "small" }}>Aprovação ADM.</TableCell>
                        <TableCell align="center" style={{ fontWeight: "bold", fontSize: "small" }}>Consultor(a)</TableCell>
                        <TableCell align="center" style={{ fontWeight: "bold", fontSize: "small" }}>Emissão da Venda</TableCell>
                    </TableRow>
                </HeadTable>

                <BodyTable >
                    <DataTable key={row?.data.contrato}>

                        <TableCell component="th" scope="row"  >
                            {userData.role !== 'comercial' ?

                                <Td >
                                    <Input
                                        defaultValue={row?.data.dataComissionamento}
                                        type="date"
                                        onChange={(e) =>
                                            Changer("dataComissionamento", e.target.value, row?.data.contrato)} />

                                </Td>
                                :
                                <Td >
                                    {row?.data.dataComissionamento}
                                </Td>
                            }


                        </TableCell>
                        <TableCell align="center">
                            {
                                userData.role !== 'comercial' ?

                                    <Td >
                                        <Select
                                            style={{
                                                backgroundColor: payStatus !== row?.data.tipoMatricula
                                                    ? setColor[payStatus] : setColor[row?.data.tipoMatricula]
                                            }}
                                            defaultValue={row?.data.tipoMatricula}
                                            onChange={(e) =>
                                                Changer("tipoMatricula", e.target.value, row?.data.contrato)}>
                                            {
                                                comissionStatusOpt.map(res => (
                                                    <option value={res} key={res}>{res}</option>
                                                ))
                                            }
                                        </Select>
                                    </Td>
                                    :
                                    <Td style={{
                                        color: setColor[row?.data.tipoMatricula]
                                    }}>
                                        {row?.data.tipoMatricula}
                                    </Td>

                            }

                        </TableCell>


                        <TableCell align="center"> {row?.data.responsavelADM}</TableCell>
                        <TableCell align="center">
                            {
                                userData.role === 'direcao' ?
                                    <Select
                                        defaultValue={row?.data.aprovacaoDirecao}
                                        onChange={(e) => Changer("aprovacaoDirecao", e.target.value, row?.data.contrato)}>
                                        {
                                            nonEspecificOpt.map(res => (
                                                <option value={res} key={res}>{res}</option>
                                            ))
                                        }
                                    </Select>

                                    : <Td>{row?.data.aprovacaoDirecao}</Td>
                            }
                        </TableCell>

                        <TableCell align="center">
                            {
                                userData.role === 'comercial' ?
                                    <Td>{row?.data.aprovacaoADM}</Td>
                                    :
                                    <Td >
                                        <Select defaultValue={row?.data.aprovacaoADM} onChange={(e) => Changer("aprovacaoADM", e.target.value, row?.data.contrato)}>
                                            {
                                                nonEspecificOpt.map(res => (
                                                    <option value={res} key={res}>{res}</option>
                                                ))
                                            }
                                        </Select>

                                    </Td>}
                        </TableCell>
                        <TableCell align="center"> {row?.data.owner}</TableCell>
                        <TableCell align="center">{row?.data.dataMatricula}</TableCell>



                    </DataTable>
                </BodyTable>

            </Collapse>
        </TableCell>



    )
}

export default FirstDrop