import { Collapse, TableCell, TableRow } from '@mui/material'
import React from 'react'
import { toast } from 'react-toastify'
import URI from '../../../app/utils/utils'
import { useUser } from '../../../hooks/userContext'
import { BodyTable, Button, HeadTable, Text } from '../styles'


const SeccDrop = (row) => {

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
            width: "66rem",
        }} colSpan={6}>

            <Collapse style={{ width: "100%", background: row.open ? "#f5f5f5" : "" }} in={row.open} timeout="auto" unmountOnExit  >

                <HeadTable>
                    <TableRow>

                        <TableCell align="center" style={{ fontWeight: "bold" }}>OBS. Matrícula</TableCell>

                    </TableRow>
                </HeadTable>
                <BodyTable>
                    <TableRow key={row?.data.contrato}>
                        <TableCell align="center" >
                            <Button onClick={() => userData.role !== 'direcao' ? Sender("observacao", value, row?.data.contrato) : SenderDirector("observacao", value, row?.data.contrato)}> ✔️</Button>

                            <Text cols='3' placeholder={row?.data.observacao} onChange={(e) => Changer("observacao", e.target.value, row?.data.contrato)}></Text>
                        </TableCell>

                    </TableRow>
                </BodyTable>
            </Collapse>
        </TableCell>

    )
}

export default SeccDrop