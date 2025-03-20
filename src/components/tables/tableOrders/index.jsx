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
import { useOrders } from '../../../hooks/orders/ordersContext.hook';
import { MultiAlterationOrders } from '../../multiAlteration.Orders';
import { MultiFiltersOrders } from '../../multiFilters.Orders';
import { PopOverOrder } from '../../popovers/popOverOrders';
import { Container, ContainerOrder, Tag } from './styles';

function Row(props) {
    const { row } = props;
    const { checked, setChecked, checkData, setCheckData, } = useOrders()

    const statusTrail = {
        'REVISAR': "#f2d1d1",
        'REVISADO': "#f2eed1",
        'ENVIADO': "#dff2d1",
        'CHEGOU': "#d1f2f0",
        'DISPONIVEL': "#d1d5f2",
        'ENTREGUE': "#edd1f2",
        'CANCELADO': "#f09393",
    }

    const tenDaysAhead = `Data de entrega: ${new Date(new Date(row.created_at).setDate(new Date(row.created_at).getDate() + 10)).toLocaleDateString("pt-br")}`
    const created = new Date(row.created_at).setUTCHours(10)

    const bgColor = () => {

        if (!row.available) return statusTrail["REVISAR"]

        if (row.signed) return statusTrail["ENVIADO"]
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
                    <input
                        type="checkbox"
                        name="" id=""
                        onClick={() => {
                            setChecked(false)
                            setCheckData(checkData.find(c => c.id === row.id) ?
                                [...checkData.filter(c => c.id !== row.id)] :
                                [...checkData, row]
                            )
                        }
                        }
                        value={checked}
                    />
                </TableCell>
                <TableCell align="center" component="th" scope="row"
                >
                    <p
                        title={tenDaysAhead}
                    >

                        {new Date(created).toLocaleDateString("pt-BR")}
                    </p>
                </TableCell>
                <TableCell align="center" component="th" scope="row">{row.withdraw}</TableCell>
                <TableCell align="center" component="th" scope="row">{row.name} </TableCell>
                <TableCell align="center" component="th" scope="row">{row.student ? row.student.split(" ")[0] : ""} </TableCell>
                <TableCell align="center" component="th" scope="row">{row.book} </TableCell>
                <TableCell align="center" component="th" scope="row"><Tag style={{ backgroundColor: statusTrail[row.status] }}>{row.status}</Tag> </TableCell>
                <TableCell align="center" component="th" scope="row">
                    <PopOverOrder row={row} />
                </TableCell>

            </TableRow>


        </React.Fragment >
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        id: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        student: PropTypes.string.isRequired,
        sku: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        arrived: PropTypes.bool.isRequired,
        available: PropTypes.bool.isRequired,
        signed: PropTypes.bool.isRequired,
        status: PropTypes.string.isRequired,
        removedBy: PropTypes.string.isRequired,
        withdraw: PropTypes.string.isRequired,
        book: PropTypes.string.isRequired,
        created_at: PropTypes.string.isRequired,
        updated_at: PropTypes.string.isRequired,

    }).isRequired,
};



export default function TableOrders() {
    const { setOrderBy, setOrderFor, checkData, setCheckData, ordersQuery, queryOrder, setTake, setSkip, take, checked, setChecked, orderBy, orderFor, } = useOrders()
    const { isPending } = ordersQuery


    const { count, order } = queryOrder

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


    const checkAll = (bool) => {
        document.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
            setChecked(bool)
            checkbox.checked = bool;
        });
    };

    return (
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
                    <Container>
                        <nav>
                            <MultiFiltersOrders
                            />

                            <MultiAlterationOrders
                                element={1}
                                able={checkData.length > 0}
                                label={"Alterar em lote"}
                                flex={false}
                            />

                        </nav>
                        <TableContainer component={Paper}>
                            <Paper >
                                <Table aria-label="collapsible table">
                                    <TableHead>
                                        <TableRow sx={{ borderBottom: 'unset', fontSize: ".4rem" }}>
                                            <TableCell align="center">
                                                <input
                                                    type="checkbox"
                                                    name="" id=""
                                                    checked={checked}
                                                    onClick={() => {
                                                        checkAll(!checked)
                                                        setCheckData(!checked ? order : [])
                                                    }} />
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
                                            <TableCell align="center">Data de retirada</TableCell>
                                            <TableCell align="center">
                                                <ContainerOrder>
                                                    Cliente
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
                                                    Aluno
                                                    {
                                                        orderBy !== "student" &&
                                                        <SwapVertIcon onClick={() => setOrderBy("student")} />
                                                    }
                                                    {
                                                        orderBy === "student" && orderFor === "asc" &&
                                                        <ArrowDownwardIcon onClick={() => setOrderFor("desc")} />
                                                    }
                                                    {
                                                        orderBy === "student" && orderFor === "desc" &&
                                                        <ArrowUpwardIcon onClick={() => setOrderFor("asc")} />
                                                    }
                                                </ContainerOrder>
                                            </TableCell>
                                            <TableCell align="center">Livro</TableCell>
                                            <TableCell align="center">Situação</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {count > 0 && order.map((row) => (
                                            <Row key={row.id} row={row} />
                                        ))}
                                    </TableBody>
                                </Table>
                                <TablePagination

                                    rowsPerPageOptions={[10, 20, 50]}
                                    component="div"
                                    count={count}
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
