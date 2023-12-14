import { Collapse, TableCell, TableRow } from '@mui/material'
import { BodyTable, HeadTable, Signs, Td } from '../styles'

const ThirdDrop = (row) => {

    const start = row.data.inicioContrato.split("/")
    const end = row.data.fimContrato.split("/")


    var data2 = new Date(`${end[2]}-${end[1]}-${end[0]}`); // Usando o formato "YYYY-MM-DD"
    var data1 = new Date(`${start[2]}-${start[1]}-${start[0]}`);

    var diferenceInMonths = (data2.getFullYear() - data1.getFullYear()) * 12 + (data2.getMonth() - data1.getMonth());


    return (
        <TableCell style={{
            paddingBottom: 0,
            paddingTop: 0,
            width: "66rem",
        }} colSpan={6}>
            <Collapse style={{ background: row.open ? "#f5f5f5" : "" }} in={row.open} timeout="auto" unmountOnExit>
                <HeadTable>
                    <TableRow>
                        <TableCell style={{ fontWeight: "bold" }}>N°. do Contrato</TableCell>
                        <TableCell style={{ fontWeight: "bold" }}>Início do Contrato</TableCell>
                        <TableCell align="center" style={{ fontWeight: "bold" }} >Fim do Contrato</TableCell>
                        <TableCell align="center" style={{ fontWeight: "bold" }}>Tipo de Assinatura</TableCell>
                        <TableCell align="center" style={{ fontWeight: "bold" }}>Data AC.</TableCell>

                    </TableRow>
                </HeadTable>
                <BodyTable>
                    <TableRow key={row?.data.contrato}>

                        <TableCell component="th" scope="row" >
                            {row?.data.contrato}
                        </TableCell>
                        <TableCell >
                            {row?.data.inicioContrato}
                        </TableCell>
                        <TableCell align="center">
                            {row?.data.fimContrato}
                        </TableCell>
                        <TableCell align="center">
                            {row?.data.acFormato}
                        </TableCell>
                        <TableCell align="center" >
                            {
                                row?.data.dataAC?.map(res => (
                                    <Signs key={res}>
                                        {
                                            res.body1?.signed1 ||
                                                res.body2?.signed2 ?
                                                <>
                                                    <Td key={res.body1?.email1}>
                                                        {
                                                            res.body1?.signed1 ?
                                                                <Td>{res.body1?.name1} assinou em {res.body1?.signed1} </Td>
                                                                : ""
                                                        }
                                                    </Td>
                                                    <Td key={res.body2?.email2}>
                                                        {
                                                            res.body2?.signed2 ?
                                                                <Td>{res.body2?.name2} assinou em {res.body2?.signed2}</Td>
                                                                : ""
                                                        }
                                                    </Td>
                                                </> : <Td>Ninguém assinou ainda</Td>
                                        }
                                    </Signs>
                                ))
                            }
                        </TableCell>

                    </TableRow>
                </BodyTable>

                <HeadTable>
                    <TableRow>
                        <TableCell style={{ fontWeight: "bold" }}>Status do Contrato</TableCell>
                        <TableCell style={{ fontWeight: "bold" }}>Carga Horária</TableCell>
                        <TableCell align="center" style={{ fontWeight: "bold" }}>Tempo de Contrato</TableCell>
                    </TableRow>
                </HeadTable>
                <BodyTable>
                    <TableRow key={row?.data.contrato} >

                        <TableCell component="th" scope="row" style={{ display: "grid" }}>

                            {
                                row?.data.dataAC.map(res => (
                                    res.body1?.signed1 ?
                                        <Td key={res}>O Cliente já assinou</Td>
                                        : <Td key={res}>O cliente não assinou ainda</Td>
                                ))
                            }

                        </TableCell>
                        <TableCell align="center">
                            {row?.data.cargaHoraria}
                        </TableCell>
                        <TableCell align="center">
                            {diferenceInMonths} meses
                        </TableCell>

                    </TableRow>
                </BodyTable>
            </Collapse>
        </TableCell>

    )
}

export default ThirdDrop