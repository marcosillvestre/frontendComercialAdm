import { Collapse, TableCell, TableRow } from '@mui/material';
import { useState } from 'react';
import { useUser } from '../../../hooks/userContext';
import { BodyTable, Button, HeadTable, ObservationField, Text, Trash } from '../styles';


export const SeccDrop = (row) => {

    const { userData, SenderDirector, Sender } = useUser()

    const [value, setValue] = useState('')
    const [observation, setObservation] = useState(row.data.observacao)

    const Changer = async (area, e, id) => {
        area !== 'observacao' ? setValue(e) : setValue({ "name": userData.name, "obs": e, "when": new Date().toLocaleString() })

        if (userData.role !== 'direcao') {
            area !== 'observacao' && Sender(area, e, id, value)
        }
        if (userData.role === 'direcao') {
            area !== 'observacao' && SenderDirector(area, e, id, value)
        }
    }


    const handler = (field, values, contrato, valueSetted) => {
        let data = observation.filter(res => res.obs !== "")
        setObservation(data.concat(value))

        userData.role !== 'direcao' ?
            Sender(field, values, contrato, valueSetted) :
            SenderDirector(field, values, contrato, valueSetted)
    }

    const deleteObservation = async (res, contrato) => {
        let data = observation.filter(data => data.obs !== res && data.obs !== "")
        setObservation(data)

        userData.role !== 'direcao' ?
            Sender("observacao", res, contrato, { "delete": true, "deleted": res }) :
            SenderDirector("observacao", res, contrato, { "delete": true, "deleted": res })
    }

    return (
        <TableCell style={{
            paddingBottom: 0,
            paddingTop: 0,
            width: "66rem",
        }} colSpan={6}>

            <Collapse
                style={{
                    width: "100%", background: row.open ?
                        "#f5f5f5" :
                        ""
                }}
                in={row.open}
                timeout="auto"
                unmountOnExit  >

                <HeadTable>
                    <TableRow>

                        <TableCell
                            align="center"
                            style={{ fontWeight: "bold" }}>
                            OBS. Matrícula
                        </TableCell>

                    </TableRow>
                    <TableRow>

                        <TableCell
                            align="center"
                            style={{ fontWeight: "bold" }}>
                            {
                                <ObservationField >
                                    {
                                        observation[0].obs === '' || observation[0].obs === undefined ?
                                            <div className='none'>Nenhuma observação ainda</div> :
                                            observation?.map(res => (
                                                <span key={res.obs}>
                                                    <div className="item">
                                                        <h5>{res.obs}</h5>
                                                        <p>por : {res.name} </p>
                                                    </div>
                                                    {
                                                        res.name === userData.name &&
                                                        <Trash onClick={() =>
                                                            deleteObservation(
                                                                res.obs, row?.data.contrato
                                                            )} />
                                                    }
                                                    {res.when && <small>{res.when}</small>}
                                                </span>
                                            ))

                                    }

                                </ObservationField>
                            }

                        </TableCell>

                    </TableRow>
                </HeadTable>
                <BodyTable>
                    <TableRow key={row?.data.contrato}>
                        <TableCell align="center" >

                            <Text cols='3'
                                placeholder={"Escreva um comentário "}
                                onChange={(e) =>
                                    Changer("observacao", e.target.value,
                                        row?.data.contrato)
                                }
                            >
                            </Text>
                            <Button
                                onClick={
                                    () => handler("observacao", value,
                                        row?.data.contrato, value)
                                }
                            >
                                ✔️</Button>

                        </TableCell>

                    </TableRow>
                </BodyTable>
            </Collapse>
        </TableCell>

    )
}
