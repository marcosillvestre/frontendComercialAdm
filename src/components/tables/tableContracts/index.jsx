import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { TablePagination } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import React from 'react';
import LoadingSpin from 'react-loading-spin';
import { useSignContracts } from '../../../hooks/signContracts/sign.hook.jsx';
import { ContainerOrder, ContainerTable, RowTable } from './styles.jsx';

function Row(props) {

    const { row } = props;

    const { setContract } = useSignContracts()
    return (
        <React.Fragment>
            <RowTable
                sx={{ '& > *': { borderBottom: 'unset' } }}
                onClick={() => {
                    if (!row.subclass) return alert("Nenhum produto/serviço cadastrado no RD!")

                    const regex = /^\d+$/;
                    if (!regex.test(row.phone)) return alert("Número de telefone em um formato impróprio, use apenas números")

                    if (row.phone.length !== 11) return alert(`Este número de celular possui ${row.phone.length} dígitos, o correto é 11. Como por exemplo: 31900000000`)

                    setContract(row.id)
                }}
            >
                <TableCell align="center" component="th" scope="row">{new Date(row.created_at).toLocaleDateString("pt-BR")}</TableCell>
                <TableCell align="center" component="th" scope="row">{row.name}</TableCell>
                <TableCell align="center" component="th" scope="row">{row.student !== !row.student ? row.student : row.name}</TableCell>
                <TableCell align="center" component="th" scope="row" title={row?.convenio?.map(r => `${r}\n`)}>
                    {row?.convenio?.length}
                </TableCell>
                <TableCell align="center" component="th" scope="row">{row.seller}</TableCell>
                <TableCell align="center" component="th" scope="row">{row.phone}</TableCell>
                <TableCell align="center" component="th" scope="row">{row.subclass}</TableCell>

            </RowTable>

        </React.Fragment >
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        created_at: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        student: PropTypes.string.isRequired,
        seller: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        subclass: PropTypes.string.isRequired,
        convenio: PropTypes.array.isRequired,

    }).isRequired,
};



export default function TableContracts() {

    const {
        contractsForSign, contractOptions,
        setTake, setSkip, queryContract, orderFor, setOrderFor, orderBy, setOrderBy
    } = useSignContracts();




    const { isPending } = contractsForSign;
    const { isFetching } = queryContract;
    const { contracts } = contractOptions;

    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [page, setPage] = React.useState(0);


    const handleChangePage = (event, newPage) => {
        setPage(newPage)
        if (newPage === 0) return setSkip(1)

        setSkip(newPage + 1)

    };

    const handleChangeRowsPerPage = (event) => {

        setRowsPerPage(parseInt(event.target.value));
        setSkip(1);
        setTake(+event.target.value);
    };


    return (

        <ContainerTable component={Paper}>
            <Paper sx={{ width: '100%' }}>


                {
                    isPending || isFetching ?
                        <div style={{
                            width: "100%",
                            display: 'flex',
                            justifyContent: 'center',
                            padding: "5rem 0"
                        }}>

                            <LoadingSpin
                                duration="4s"
                                width="15px"
                                timingFunction="ease-in-out"
                                direction="alternate"
                                size="60px"
                                primaryColor="#1976d2"
                                secondaryColor="#333"
                                numberOfRotationsInAnimation={2}
                            />
                        </div>
                        :
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center"><ContainerOrder>
                                        Data de criação

                                        {
                                            orderBy !== "created_at" &&
                                            <SwapVertIcon onClick={() => setOrderBy("created_at")} />
                                        }
                                        {
                                            orderBy === "created_at" && orderFor === "asc" &&
                                            <ArrowDownwardIcon onClick={() => setOrderFor("desc")} />
                                        }
                                        {
                                            orderBy === "created_at" && orderFor === "desc" &&
                                            <ArrowUpwardIcon onClick={() => setOrderFor("asc")} />
                                        }
                                    </ContainerOrder></TableCell>
                                    <TableCell align="center"><ContainerOrder>
                                        Nome
                                        {
                                            orderBy !== "name" &&
                                            <SwapVertIcon onClick={() => setOrderBy("name")} />
                                        }
                                        {
                                            orderBy === "name" && orderFor === "asc" &&
                                            <ArrowDownwardIcon onClick={() => setOrderFor("desc")} />
                                        }
                                        {
                                            orderBy === "name" && orderFor === "desc" &&
                                            <ArrowUpwardIcon onClick={() => setOrderFor("asc")} />
                                        }
                                    </ContainerOrder></TableCell>
                                    <TableCell align="center"><ContainerOrder>Aluno</ContainerOrder></TableCell>
                                    <TableCell align="center"><ContainerOrder>Campanhas</ContainerOrder></TableCell>
                                    <TableCell align="center"><ContainerOrder>Vendedor</ContainerOrder></TableCell>
                                    <TableCell align="center"><ContainerOrder>Celular</ContainerOrder></TableCell>
                                    <TableCell align="center"><ContainerOrder>Subclasse</ContainerOrder></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {

                                    contracts.length > 0 &&
                                    contracts.map((row) => (
                                        <Row
                                            key={row.id}
                                            row={row}
                                        />
                                    ))

                                }
                            </TableBody>
                        </Table>
                }
                <TablePagination
                    rowsPerPageOptions={[10, 20, 40]}
                    component="div"
                    count={contractOptions && contractOptions.total}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />

            </Paper>
        </ContainerTable>

    );
}
