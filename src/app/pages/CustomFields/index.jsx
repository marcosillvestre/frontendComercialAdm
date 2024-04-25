
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Paper from '@mui/material/Paper';
import { CustomFieldTable } from '../../../components/source.jsx';
import { useUser } from '../../../hooks/userContext.jsx';
import { Container, MainBox } from './styles.jsx';

// import { CustomFieldsTable } from '../../../components/source.jsx'



export const CustomFields = () => {
    const { customField } = useUser()

    return (
        <Container>
            <header>
                <p>Configurações</p>
                <p>Campos personalizados</p>

            </header>

            <MainBox>


                <table>
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ fontWeight: 'bold' }}> Ordem </TableCell>
                                    <TableCell style={{ fontWeight: 'bold' }}>Nome do campo</TableCell>
                                    <TableCell style={{ fontWeight: 'bold' }} align="center">Tipo</TableCell>
                                    <TableCell style={{ fontWeight: 'bold' }} align="left">Obrigatório</TableCell>
                                    <TableCell style={{ fontWeight: 'bold' }} align="center">Opções</TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody >
                                {
                                    customField && customField.map((row) => (
                                        <CustomFieldTable key={row.id} row={row} />
                                    ))
                                }

                            </TableBody>
                        </Table>
                    </TableContainer>
                </table>

            </MainBox>


        </Container>
    )
}
