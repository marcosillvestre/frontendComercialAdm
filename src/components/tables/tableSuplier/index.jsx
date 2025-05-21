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
import { treatingDates } from '../../../app/utils/functions/getDates';
import { useSupliers } from '../../../hooks/supliers/supliersContext.hook';
import { PopOverSuplier } from '../../popovers/popOverSuplier';
import { Container, ContainerOrder, ContainerTable } from './styles';

function Row(props) {
    const { row } = props;


    return (
        <React.Fragment>
            <TableRow sx={{
                '& > *': {
                    borderBottom: 'unset', fontSize: ".7rem",

                }
            }}>

                <TableCell align="center" component="th" scope="row"
                >
                    <p>
                        {treatingDates(row.created_at)}
                    </p>
                </TableCell>
                <TableCell align="center" component="th" scope="row">{row.name} </TableCell>
                <TableCell align="center" component="th" scope="row">{row.docment}</TableCell>
                <TableCell align="center" component="th" scope="row">{row.contacts?.orderEmail}</TableCell>
                <TableCell align="center" component="th" scope="row">{row.contacts?.whatsapp}</TableCell>
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

    const { isPending } = SupliersQuery

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



    return (
        <ContainerTable component={Paper}>
            <Paper >

                {
                    isPending ?
                        <div
                            style={{
                                width: "100%",
                                display: 'flex',
                                justifyContent: 'center',
                                padding: "5rem 0"
                            }}
                        >
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
                        :
                        <Container>


                            <Table aria-label="collapsible table">
                                <TableHead>
                                    <TableRow sx={{ borderBottom: 'unset' }}>

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
                                            <ContainerOrder>
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
                                            </ContainerOrder>
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
                                    {
                                        supliers &&
                                        supliers.map((row) => (
                                            <Row key={row.id} row={row} />
                                        ))}
                                </TableBody>
                            </Table>
                            <TablePagination

                                rowsPerPageOptions={[10, 20, 50, 100]}
                                component="div"
                                count={total}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />

                        </Container>
                }
            </Paper>
        </ContainerTable>

    );
}
