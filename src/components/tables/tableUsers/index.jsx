import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import * as React from 'react';

import { Paper, Table, TableBody, TableHead, TablePagination } from '@mui/material';
import { parseDates } from '../../../app/utils/functions/getDates.jsx';
import { useUsers } from '../../../hooks/users/usersContext.hook.jsx';
import { MultiFilters } from '../../arrayFilters/multiFilters/index.jsx';
import { Loading } from '../../loadingSpin/index.jsx';
import { PopOverUsers } from '../../popovers/popOverUsers/index.jsx';
import { Tag } from '../../Tag/index.jsx';
import { ContainerTable } from '../tableSuplier/styles.jsx';
import { Container, ContainerOrder } from './styles.jsx';


function Row(props) {
    const { row } = props;


    return (
        <TableRow sx={{
            '& > *': {
                borderBottom: 'unset', fontSize: ".7rem",

            }
        }}>

            <TableCell align="center" component="th" scope="row"
            >
                <p>
                    {parseDates(row.created_at)}
                </p>
            </TableCell>
            <TableCell align="center" component="th" scope="row">{row.name} </TableCell>
            <TableCell align="center" component="th" scope="row">{row.email}</TableCell>
            <TableCell align="center" component="th" scope="row">{
                row.unity.map((res, i) => {
                    return i + 1 === row.unity.length ?
                        `${res} ` :
                        `${res}, `
                })
            }</TableCell>
            <TableCell align="center" component="th" scope="row">

                <Tag
                    data={{
                        label: row.role,
                        color: "#dcb381",
                    }}
                />


            </TableCell>
            <TableCell align="center" component="th" scope="row">
                <Tag
                    data={{
                        label: row.admin ? "ADM" : "GERAL",
                        color: "#b8d6f6",
                    }}
                />
            </TableCell>
            <TableCell align="center" component="th" scope="row">
                <PopOverUsers row={row} />
            </TableCell>

        </TableRow>

    );
}

Row.propTypes = {
    row: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        unity: PropTypes.array.isRequired,
        admin: PropTypes.bool.isRequired,

        created_at: PropTypes.string.isRequired,
        updated_at: PropTypes.string.isRequired,

    }).isRequired,
};


export default function UsersTable() {


    const { UsersQuery, orderBy, setOrderBy, orderFor, setOrderFor,
        queryUser, setSkip, setTake, take, removeFilter,
        setTypeFilter, typeFilter } = useUsers();

    const { isPending } = UsersQuery

    const { users, total } = queryUser


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
        <>
            <MultiFilters
                data={{
                    removeFilter: removeFilter,
                    setType: setTypeFilter,
                    types: typeFilter
                }}
            />

            <ContainerTable component={Paper}>
                <div className='table_tag'>
                    <h3>Lista de usuários</h3>
                </div>
                <Paper>

                    {
                        isPending ?
                            <Loading />
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
                                            <TableCell align="center">
                                                <ContainerOrder>
                                                    Email

                                                </ContainerOrder>
                                            </TableCell>
                                            <TableCell align="center">
                                                <ContainerOrder>

                                                    Unidade

                                                </ContainerOrder>
                                            </TableCell>
                                            <TableCell align="center">
                                                <ContainerOrder>
                                                    Cargo

                                                </ContainerOrder>
                                            </TableCell>
                                            <TableCell align="center">
                                                <ContainerOrder>
                                                    Acesso

                                                </ContainerOrder>
                                            </TableCell>
                                            <TableCell />
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            users &&
                                            users.map((row) => (
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
        </>

    );
}