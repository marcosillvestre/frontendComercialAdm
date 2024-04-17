import { Collapse, TableCell, TableRow } from '@mui/material'
import { BodyTable, HeadTable } from '../styles'

export const FifthDrop = (row) => {
    return (
        <TableCell style={{
            padding: 0,
            width: "66rem",
        }} colSpan={6}>
            <Collapse style={{ background: row.open ? "#f5f5f5" : "", width: "130%" }} in={row.open} timeout="auto" unmountOnExit>
                <HeadTable>
                    <TableRow>
                        <TableCell align="center" style={{ fontWeight: "bold" }}>Aluno</TableCell>
                        <TableCell align="center" style={{ fontWeight: "bold" }}>Data de Nascimento</TableCell>
                        <TableCell align="center" style={{ fontWeight: "bold" }} >Idade do Aluno</TableCell>
                        <TableCell align="center" style={{ fontWeight: "bold" }}>Telefone</TableCell>
                        <TableCell align="center" style={{ fontWeight: "bold" }}>Email</TableCell>
                    </TableRow>
                </HeadTable>
                <BodyTable>
                    <TableRow key={row?.data.contrato}>

                        <TableCell component="th" scope="row" >
                            {row?.data.aluno}
                        </TableCell>
                        <TableCell align="center" >
                            {row?.data.alunoNascimento}
                        </TableCell>
                        <TableCell align="center">
                            {row?.data.idadeAluno} anos
                        </TableCell>
                        <TableCell align="center">
                            {row?.data.tel}
                        </TableCell>
                        <TableCell align="center">
                            {row?.data.email}
                        </TableCell>

                    </TableRow>
                </BodyTable>

            </Collapse>
        </TableCell>
    )
}