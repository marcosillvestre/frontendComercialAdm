
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Paper from '@mui/material/Paper';
import LoadingSpin from 'react-loading-spin';
import { CustomFieldTable } from '../../../components/source.jsx';
import { useCustomFields } from '../../../hooks/customFields/customFIelds.hook.jsx';
import { useUser } from '../../../hooks/userContext.jsx';
import { Container, Header, MainBox } from './styles.jsx';



export const CustomFields = () => {
    const {
        openSidebar, setOpenSidebar, setTypeSidebar,
        userData
    } = useUser()

    const { cfSrted, customFieldsQuery } = useCustomFields()

    if (userData.name === "Marcos") {
        return (
            <Container>
                <Header>
                    <nav>
                        <div>
                            <h1>Configurações</h1>
                            <h3>Campos personalizados</h3>
                        </div>



                        <button
                            className='defaultButton'
                            onClick={() => {
                                setTypeSidebar(1)
                                setOpenSidebar(!openSidebar)
                            }
                            }>
                            Criar campo
                        </button>
                    </nav>
                </Header>

                <MainBox>
                    {
                        customFieldsQuery.isPending ?
                            <LoadingSpin
                                duration="4s"
                                width="15px"
                                timingFunction="ease-in-out"
                                direction="alternate"
                                size="60px"
                                primaryColor="#1976d2"
                                secondaryColor="#333"
                                numberOfRotationsInAnimation={3} />
                            :
                            <table className='tableContainer'>
                                <div style={{ textAlign: 'right' }}>
                                    {
                                        customFieldsQuery.data &&
                                        customFieldsQuery.data.length
                                    } registros

                                </div>
                                <TableContainer component={Paper}>
                                    <Table aria-label="collapsible table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell style={{ fontWeight: 'bold' }} align='center'> Ordem </TableCell>
                                                <TableCell style={{ fontWeight: 'bold' }} align='center'>Nome do campo</TableCell>
                                                <TableCell style={{ fontWeight: 'bold' }} align="center">Tipo</TableCell>
                                                <TableCell style={{ fontWeight: 'bold' }} align="center">Obrigatório</TableCell>
                                                <TableCell style={{ fontWeight: 'bold' }} align="center">Categoria</TableCell>
                                                <TableCell style={{ fontWeight: 'bold' }} align="center">Opções</TableCell>
                                                <TableCell align="right">  </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody >
                                            {
                                                cfSrted && cfSrted.map((row, index) => (
                                                    <CustomFieldTable
                                                        key={row.id}
                                                        row={row}
                                                        index={index} />
                                                ))
                                            }

                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </table>
                    }
                </MainBox>


            </Container>
        )
    } else {
        return (
            <div style={{ width: "100vw", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <p>
                    Em breve..
                </p>

                <LoadingSpin
                    duration="4s"
                    width="15px"
                    timingFunction="ease-in-out"
                    direction="alternate"
                    size="60px"
                    primaryColor="#1976d2"
                    secondaryColor="#333"
                    numberOfRotationsInAnimation={3}
                />
            </div>
        )

    }
}
