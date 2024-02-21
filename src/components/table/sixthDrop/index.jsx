import { Collapse, TableCell, TableRow } from '@mui/material'
import { BodyTable, HeadTable, Td } from '../styles'

export const SixthDrop = (row) => {
    return (
        <TableCell style={{
            paddingBottom: 0,
            paddingTop: 0,
            width: "66rem",
        }} colSpan={6}>
            <Collapse style={{ background: row.open ? "#f5f5f5" : "" }} in={row.open} timeout="auto" unmountOnExit>
                <HeadTable>
                    <TableRow>
                        <TableCell style={{ fontWeight: "bold" }}>PA. Data</TableCell>
                        <TableCell align="center" style={{ fontWeight: "bold" }}>Classe</TableCell>
                        <TableCell align="center" style={{ fontWeight: "bold" }} >SubClasse</TableCell>
                        <TableCell align="center" style={{ fontWeight: "bold" }}>Material Didático</TableCell>
                        <TableCell align="center" style={{ fontWeight: "bold" }}>Nivelamento </TableCell>
                        <TableCell align="center" style={{ fontWeight: "bold" }}>Dia de Aula</TableCell>
                    </TableRow>
                </HeadTable>
                <BodyTable>
                    <TableRow key={row?.data.contrato}>

                        <TableCell >
                            {row?.data.paDATA}
                        </TableCell>
                        <TableCell >
                            {row?.data.classe}
                        </TableCell>
                        <TableCell align="center">
                            {row?.data.subclasse}
                        </TableCell>
                        <TableCell align="center" >
                            {row?.data.materialDidatico.map(res => (<Td key={res}>{res}</Td>))}
                        </TableCell>
                        <TableCell align="center">
                            {row?.data.nivelamento}
                        </TableCell>
                        <TableCell align="center">
                            {row?.data.diaAula.map(res => (<Td key={res}>{res}</Td>))}
                        </TableCell>


                    </TableRow>
                </BodyTable>

                <HeadTable>
                    <TableRow>
                        <TableCell align="center" style={{ fontWeight: "bold" }}>Horário de Início</TableCell>
                        <TableCell align="center" style={{ fontWeight: "bold" }}>Horário de Fim</TableCell>
                        <TableCell style={{ fontWeight: "bold" }}>Professor</TableCell>
                        <TableCell align="center" style={{ fontWeight: "bold" }} >Tipo/Modalidade</TableCell>
                        <TableCell align="center" style={{ fontWeight: "bold" }}>Formato de Aula</TableCell>
                    </TableRow>
                </HeadTable>
                <BodyTable>
                    <TableRow key={row?.data.contrato}>

                        <TableCell align="center">
                            {row?.data.horarioInicio}
                        </TableCell>
                        <TableCell align="center">
                            {row?.data.horarioFim}
                        </TableCell>
                        <TableCell >
                            {row?.data.professor[0]}
                            {row?.data.professor[1]}
                            {row?.data.professor[2]}
                        </TableCell>
                        <TableCell align="center">
                            {row?.data.tipoModalidade}
                        </TableCell>
                        <TableCell align="center">
                            {row?.data.formatoAula}
                        </TableCell>
                        <TableCell align="center">

                        </TableCell>
                    </TableRow>
                </BodyTable>
            </Collapse>
        </TableCell>
    )
}
