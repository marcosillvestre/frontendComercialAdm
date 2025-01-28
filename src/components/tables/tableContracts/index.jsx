import { TablePagination } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import LoadingSpin from 'react-loading-spin';
import { useSignContracts } from '../../../hooks/signContracts/sign.hook.jsx';
import { useUser } from '../../../hooks/userContext.jsx';
import { RowTable } from './styles.jsx';


function Row(props) {

    const { row } = props;
    const { setFilteredContracts } = useUser()

    return (
        <React.Fragment>
            <RowTable
                sx={{ '& > *': { borderBottom: 'unset' } }}
                onClick={() => setFilteredContracts(row)}
            >

                <TableCell align="center" component="th" scope="row" >{row["Nome do responsável"]}</TableCell>
                <TableCell align="center" component="th" scope="row" >{row["Nome do aluno"]}</TableCell>
                <TableCell align="center" component="th" scope="row">{row["Data de emissão da venda"]}</TableCell>
                <TableCell align="center" component="th" scope="row">{row["Nº do contrato"]}</TableCell>


                <TableCell align="center" component="th" scope="row">{row.CelularResponsavel} </TableCell>
                <TableCell align="center" component="th" scope="row">{row["Subclasse"]}</TableCell>

            </RowTable>

        </React.Fragment >
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        CelularResponsavel: PropTypes.string.isRequired,
        "Data de emissão da venda": PropTypes.string.isRequired,
        "Subclasse": PropTypes.string.isRequired,
        "Nº do contrato": PropTypes.string.isRequired,
        "Nome do aluno": PropTypes.string.isRequired,
        "Nome do responsável": PropTypes.string.isRequired,
    }).isRequired,
};



export default function TableContracts() {

    const { contractsForSign, contractOptions, setTake, setSkip } = useSignContracts()
    const [rowsPerPage, setRowsPerPage] = React.useState(20);

    const { isPending, data } = contractsForSign
    const style = {
        fontSize: "9px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "12rem",
        boxShadow: "4px 10px 20px -12px rgba(0,0,0,0.62)"
    }

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
        <>
            <div style={style}>
                {
                    isPending ?
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
                        :
                        <TableContainer component={Paper}>
                            <Table aria-label="collapsible table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center"><Typography>Nome</Typography></TableCell>
                                        <TableCell align="center"><Typography>Aluno</Typography></TableCell>
                                        <TableCell align="center"><Typography>Data de matrícula</Typography></TableCell>
                                        <TableCell align="center"><Typography>Número de contrato</Typography></TableCell>
                                        <TableCell align="center"><Typography>Celular</Typography></TableCell>
                                        <TableCell align="center"><Typography>Subclasse</Typography></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {

                                        contractOptions
                                        && contractOptions.map((row, index) => (
                                            <Row key={index} row={row} />
                                        ))

                                    }
                                </TableBody>
                            </Table>
                            <TablePagination
                                rowsPerPageOptions={[20, 40, 100]}
                                component="div"
                                count={data && data.total}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableContainer>
                }
            </div>
        </>

    );
}
