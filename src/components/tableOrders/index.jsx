import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import * as React from 'react';
import LoadingSpin from 'react-loading-spin';
import { useOrders } from '../../hooks/orders/ordersContext.hook';

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const { updateOrders } = useOrders()

    const sele = {
        border: "none",
        padding: ".4rem",
        borderRadius: ".6rem",
        boxShadow: "-2px 2px 9px 0px rgba(0,0,0,0.66)",
        textOverflow: "ellipsis",
        fontSize: "12px",

    }


    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>

                <TableCell align="center" component="th" scope="row" >
                    {new Date(row.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                    {row.code}
                </TableCell>

                <TableCell align="center">

                    <select style={sele} className='sele' name="" id="" defaultValue={row.arrived}
                        onChange={(e) => {
                            updateOrders.mutateAsync({ id: row.id, value: e.target.value === 'true' ? true : false, where: "arrived" })

                        }}
                    >
                        <option value={true}>Sim</option>
                        <option value={false}>Não</option>
                    </select>
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                    R$ {
                        row.orders.length > 0 &&
                        row.orders.reduce((acc, curr) => acc + curr.valor, 0)

                    }
                </TableCell>

            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Descrição do pedido
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center"><Typography>Data do pedido</Typography></TableCell>
                                        <TableCell align="center"><Typography>Código SKU</Typography></TableCell>
                                        <TableCell align="center"><Typography>Cliente</Typography></TableCell>
                                        <TableCell align="center"><Typography>Valor</Typography></TableCell>
                                        <TableCell align="center"><Typography>Livro</Typography></TableCell>
                                        <TableCell align="center"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.orders.map((order, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{order.data}</TableCell>
                                            <TableCell component="th" scope="row" align="center">
                                                {order.sku}
                                            </TableCell>
                                            <TableCell align="center">{order.nome}</TableCell>
                                            <TableCell align="center">{order.valor}</TableCell>
                                            <TableCell align="center">{order.materialDidatico}</TableCell>
                                            <TableCell align="center">
                                                <div onClick={() => {
                                                    updateOrders.mutateAsync({ id: row.id, value: order.sku, where: "sku" })

                                                }}>
                                                    <CloseIcon />
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment >
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        id: PropTypes.string.isRequired,
        code: PropTypes.string.isRequired,
        created_at: PropTypes.string.isRequired,
        arrived: PropTypes.bool.isRequired,
        orders: PropTypes.arrayOf(
            PropTypes.shape({
                valor: PropTypes.number.isRequired,
                data: PropTypes.string.isRequired,
                nome: PropTypes.string.isRequired,
                materialDidatico: PropTypes.string.isRequired,
            }),
        ).isRequired,

    }).isRequired,
};



export default function TableOrders() {
    const { ordersQuery } = useOrders()


    const { data, isLoading } = ordersQuery

    const style = {
        fontSize: "9px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
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
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell />
                                    <TableCell align="center">
                                        <Typography>Data do pedido</Typography>
                                    </TableCell>

                                    <TableCell align="center"><Typography>Código do pedido</Typography></TableCell>
                                    <TableCell align="center"><Typography>Recebido</Typography></TableCell>
                                    <TableCell align="center"><Typography>Valor total do pedido</Typography></TableCell>
                                    <TableCell align="center"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data && data.map((row) => (
                                    <Row key={row.id} row={row} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
            }
        </div>
    );
}
