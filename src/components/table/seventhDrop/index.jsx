import { Collapse, TableCell, TableRow } from '@mui/material'
import { BodyTable, HeadTable } from '../styles'

export const SeventhDrop = (row) => {
    const fields = {
        "tipoMatricula": "Status de comissionamento",
        "tmStatus": "Taxa de matricula",
        "ppStatus": "Primeira parcela",
        "mdStatus": "Material didatico",
        "acStatus": "Assinatura de contrato",
        "paStatus": "Primeira aula",
        "aprovacaoADM": "Aprovação do adm",
        "observacao": "Observação",
        "curso": "Curso",
        "aprovacaoDirecao": "Aprovação do diretor",
        "unidade": "Unidade",
    }


    return (
        <TableCell style={{
            paddingBottom: 0,
            paddingTop: 0,
            width: "66rem",
        }} colSpan={6}>
            <Collapse style={{ background: row.open ? "#f5f5f5" : "" }}
                in={row.open} timeout="auto" unmountOnExit>
                {
                    row.data && row.data.length > 0 ?
                        <>
                            <HeadTable>
                                <TableRow>
                                    <TableCell align="center" style={{ fontWeight: "bold" }}>Responsável</TableCell>
                                    <TableCell align="center" style={{ fontWeight: "bold" }}>Data</TableCell>
                                    <TableCell align="center" style={{ fontWeight: "bold" }}>Campo alterado</TableCell>
                                    <TableCell align="center" style={{ fontWeight: "bold" }} >Alteração</TableCell>
                                </TableRow>
                            </HeadTable>
                            <BodyTable>

                                {
                                    row.data && row.data.map(response => (
                                        <TableRow key={response?.id}>

                                            <TableCell component="th" scope="row" >
                                                {response?.responsible}
                                            </TableCell>
                                            <TableCell align="center" >
                                                {new Date(response?.date).toLocaleString()}
                                            </TableCell>
                                            <TableCell align="center">
                                                {fields[response?.information.field]}
                                            </TableCell>
                                            <TableCell align="center">
                                                {response?.information.to}
                                            </TableCell>

                                        </TableRow>

                                    ))
                                }
                            </BodyTable>
                        </>

                        :
                        <TableRow>
                            <TableCell align="center" style={{ fontWeight: "bold" }}>Nenhuma alteração realizada ainda</TableCell>
                        </TableRow>
                }
            </Collapse>

        </TableCell>
    )
}