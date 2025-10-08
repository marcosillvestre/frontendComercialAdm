import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { Collapse, IconButton, TablePagination } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { parseDates } from '../../../app/utils/functions/getDates';
import { useRequests } from '../../../hooks/requests/requestsContext.hook';
import { Loading } from '../../loadingSpin';
import { Tag } from '../../Tag';
import { ContainerOrder, ContainerTable } from './styles';
function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(false)
    return (
        <React.Fragment>
            <TableRow sx={{
                '& > *': {
                    borderBottom: 'unset', fontSize: ".7rem",

                }
            }}>
                <TableCell align="center" component="th" scope="row">
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell align="center" component="th" scope="row"
                >

                    {parseDates(row.created_at)}

                </TableCell>
                <TableCell align="center" component="th" scope="row">{row.codeRequest} </TableCell>
                <TableCell align="center" component="th" scope="row">{row.price.toLocaleString("pt-BR", { style: 'currency', currency: "brl" })}</TableCell>
                <TableCell align="center" component="th" scope="row">

                    <Tag
                        data={{
                            label: row.suplier?.name,
                            color: "#d2d2d2",
                        }}
                    />


                </TableCell>
                <TableCell align="center" component="th" scope="row">{row?.unity?.name} </TableCell>
                <TableCell align="center" component="th" scope="row">

                    <Tag
                        data={{
                            label: row.user,
                            color: "#b8d6f6",
                        }}
                    />

                </TableCell>

            </TableRow>




            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse

                        in={open}
                        timeout="auto"
                        unmountOnExit
                        sx={{ width: "100%" }}

                    >
                        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                            <TableHead >
                                <TableRow >
                                    <TableCell sx={{ fontWeight: "bold" }} align="center">Cliente</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }} align="center">Aluno</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }} align="center">Produto</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }} align="center">SKU</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }} align="center">Situação</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }} align="center">Data de chegada</TableCell>

                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {row.orders.map(res => (
                                    <TableRow
                                        key={res.id}
                                    >
                                        <TableCell
                                            component="th"
                                            scope="row" align="center"
                                        >
                                            {res.name}
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            scope="row" align="center"
                                        >
                                            {res.student}
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            scope="row" align="center"
                                        >
                                            {res.book}
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            scope="row" align="center"
                                        >
                                            {res.sku}
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            scope="row" align="center"
                                        >
                                            {res.status}
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            scope="row" align="center"
                                        >

                                            {
                                                res.arrivingDate &&
                                                new Date(res.arrivingDate).toLocaleString()}
                                        </TableCell>

                                    </TableRow>

                                ))}

                            </TableBody>
                        </TableRow>
                    </Collapse>
                </TableCell>
            </TableRow>

        </React.Fragment >
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        id: PropTypes.string.isRequired,
        created_at: PropTypes.string.isRequired,
        orders: PropTypes.array.isRequired,
        suplier: PropTypes.object.isRequired,
        suplierID: PropTypes.string.isRequired,
        codeRequest: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        unityId: PropTypes.number.isRequired,
        unity: PropTypes.string.isRequired,
        messageSent: PropTypes.string.isRequired,
        user: PropTypes.string.isRequired,
        prevision: PropTypes.number.isRequired,
        updated_at: PropTypes.string.isRequired,


    }).isRequired,
};



export default function TableRequests() {
    const { setOrderBy, setOrderFor,
        setTake, setSkip, take,
        orderBy, orderFor,

        queryRequest,
        RequestsQuery,
    } = useRequests()

    const { isPending } = RequestsQuery
    const { total, request } = queryRequest


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
        < >


            <ContainerTable component={Paper}>
                <div className='table_tag'>

                    <h3>Lista de registro de pedidos</h3>
                </div>
                <Paper >
                    {
                        isPending ?
                            <Loading />
                            :
                            <>
                                <Table aria-label="collapsible table">
                                    <TableHead>
                                        <TableRow sx={{ borderBottom: 'unset' }}>
                                            <TableCell align="center">

                                            </TableCell>
                                            <TableCell align="center">
                                                <ContainerOrder>
                                                    Data do pedido

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
                                                    Número do pedido

                                                </ContainerOrder>
                                            </TableCell>
                                            <TableCell align="center">
                                                <ContainerOrder>
                                                    Valor da venda
                                                    {
                                                        orderBy !== "price" &&
                                                        <SwapVertIcon onClick={() => setOrderBy("price")} />
                                                    }
                                                    {
                                                        orderBy === "price" && orderFor === "asc" &&
                                                        <ArrowDownwardIcon onClick={() => setOrderFor("desc")} />
                                                    }
                                                    {
                                                        orderBy === "price" && orderFor === "desc" &&
                                                        <ArrowUpwardIcon onClick={() => setOrderFor("asc")} />
                                                    }
                                                </ContainerOrder>
                                            </TableCell>
                                            <TableCell align="center">
                                                <ContainerOrder>
                                                    Fornecedor
                                                </ContainerOrder>
                                            </TableCell>
                                            <TableCell align="center">
                                                <ContainerOrder>
                                                    Unidade
                                                </ContainerOrder>
                                            </TableCell>
                                            <TableCell align="center">
                                                <ContainerOrder>
                                                    Usuário
                                                </ContainerOrder>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {total > 0 &&
                                            request.map((row) => (
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
                            </>
                    }
                </Paper>
            </ContainerTable>

        </>
    );
}
