import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { TablePagination } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import React from 'react';
import LoadingSpin from 'react-loading-spin';
import { useSupliers } from '../../../hooks/supliers/supliersContext.hook';
import { PopOverSuplier } from '../../popovers/popOverSuplier';
import { Container, ContainerOrder } from './styles';

function Row(props) {
    const { row } = props;
    const { } = useSupliers()



    const tenDaysAhead = `Data de entrega: ${new Date(new Date(row.created_at).setDate(new Date(row.created_at).getDate() + 10)).toLocaleDateString("pt-br")}`
    const created = new Date(row.created_at).setUTCHours(10)

    const bgColor = () => {

        // if (!row.available) return statusTrail["REVISAR"]

        // if (row.signed) return statusTrail["ENVIADO"]
    }


    return (
        <React.Fragment>
            <TableRow sx={{
                '& > *': {
                    borderBottom: 'unset', fontSize: ".7rem",

                    backgroundColor: bgColor()
                }
            }}>
                <TableCell align="center" component="th" scope="row">

                </TableCell>
                <TableCell align="center" component="th" scope="row"
                >
                    <p
                        title={tenDaysAhead}
                    >

                        {new Date(created).toLocaleDateString("pt-BR")}
                    </p>
                </TableCell>
                <TableCell align="center" component="th" scope="row">{row.name} </TableCell>
                <TableCell align="center" component="th" scope="row">{row.docment}</TableCell>
                <TableCell align="center" component="th" scope="row">{row.contacts?.email}</TableCell>
                <TableCell align="center" component="th" scope="row">{row.contacts?.telefone}</TableCell>
                <TableCell align="center" component="th" scope="row">
                    <PopOverSuplier row={row} />
                </TableCell>

            </TableRow>


        </React.Fragment >
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        docment: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        contacts: PropTypes.object.isRequired,
        address: PropTypes.object.isRequired,

        created_at: PropTypes.string.isRequired,
        updated_at: PropTypes.string.isRequired,

    }).isRequired,
};



export default function SupliersTable() {
    const { SupliersQuery, setSkip, take, setTake, orderFor, orderBy,
        setOrderFor, setOrderBy, querySuplier } = useSupliers()

    const { isLoading } = SupliersQuery

    const { total, supliers } = querySuplier

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);


    const handleChangePage = (event, newPage) => {

        setPage(newPage)
        if (newPage === 0) return setSkip(0)

        setSkip(newPage * take)

    };

    const handleChangeRowsPerPage = (event) => {

        setRowsPerPage(parseInt(event.target.value));
        setSkip(0);
        setTake(+event.target.value);
    };

    const style = {
        fontSize: "9px",
        width: "100%",
        boxShadow: "4px 10px 20px -12px rgba(0,0,0,0.62)"
    }




    return (
        <div style={style}>
            {
                isLoading ?
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
                    <Container>

                        <TableContainer component={Paper}>
                            <Paper >
                                <Table aria-label="collapsible table">
                                    <TableHead>
                                        <TableRow sx={{ borderBottom: 'unset', fontSize: ".4rem" }}>
                                            <TableCell align="center">

                                            </TableCell>
                                            <TableCell align="center">
                                                <ContainerOrder>
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
                                                </ContainerOrder>
                                            </TableCell>
                                            <TableCell align="center">
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
                                            </TableCell>
                                            <TableCell align="center">CPF/CNPJ</TableCell>
                                            <TableCell align="center">
                                                <ContainerOrder>
                                                    Email

                                                </ContainerOrder>
                                            </TableCell>
                                            <TableCell align="center">
                                                <ContainerOrder>
                                                    Telefone

                                                </ContainerOrder>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {total > 0 && supliers.map((row) => (
                                            <Row key={row.id} row={row} />
                                        ))}
                                    </TableBody>
                                </Table>
                                <TablePagination

                                    rowsPerPageOptions={[10, 20, 50]}
                                    component="div"
                                    count={total}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </Paper>
                        </TableContainer>
                    </Container>
            }
        </div>
    );
}
