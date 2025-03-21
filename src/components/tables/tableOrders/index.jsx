import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
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
import React, { useState } from 'react';
import LoadingSpin from 'react-loading-spin';
import { Link } from 'react-router-dom';
import { useOrders } from '../../../hooks/orders/ordersContext.hook';
import { PopOverOrder } from '../../popovers/popOverOrders/index.jsx';
import { ButtonContainer } from './styles.jsx';
function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(false);
    const { updateLink, setOrders } = useOrders()



    const sele = {
        border: "none",
        padding: ".4rem",
        borderRadius: ".6rem",
        boxShadow: "-2px 2px 9px 0px rgba(0,0,0,0.66)",
        textOverflow: "ellipsis",
        fontSize: "12px",

    }

    const [fiscal, setFiscal] = useState([])




    const splited1 = row.code.slice(0, 2)
    const splited2 = row.code.slice(2, 4)
    const splited3 = row.code.slice(4, 8)

    const startPeriod = new Date(`${splited3}-${splited2}-${splited1}`)
    startPeriod.setDate(startPeriod.getDate() + 1)


    const endPeriod = new Date(`${splited3}-${splited2}-${splited1}`)
    endPeriod.setDate(endPeriod.getDate() + 7)

    const orderDay = new Date(`${splited3}-${splited2}-${splited1}`)
    orderDay.setDate(orderDay.getDate() + 8);


    let totalPrice = row.orders.length > 0 &&
        row.orders.reduce((acc, curr) => acc + curr.valor, 0).toFixed(2)

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
                <TableCell align="center" component="th" scope="row" >{orderDay.toLocaleDateString()} </TableCell>
                <TableCell align="center" component="th" scope="row" >{startPeriod.toLocaleDateString()} á {endPeriod.toLocaleDateString()}</TableCell>
                <TableCell align="center" component="th" scope="row">{row.code}</TableCell>


                <TableCell align="center" component="th" scope="row">{row.unity} </TableCell>
                <TableCell align="center" component="th" scope="row">R$ {totalPrice}</TableCell>

            </TableRow>

            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <div style={{ display: 'flex', justifyContent: "space-between" }}>

                                <Typography variant="h6" gutterBottom component="div">
                                    Descrição do pedido
                                </Typography>

                                <div style={{ display: 'flex', gap: "1rem" }}>
                                    <ButtonContainer
                                        onClick={() => setOrders({
                                            "id": row.id,
                                            "unity": row.unity,
                                            "code": row.code,
                                            "orders": fiscal
                                        })}
                                        to={fiscal.length > 0 && `invoice`}
                                        able={fiscal.length > 0}

                                    >
                                        Recibo

                                    </ButtonContainer>
                                </div>


                            </div>

                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center"></TableCell>
                                        <TableCell align="center"><Typography>Data do pagamento</Typography></TableCell>
                                        <TableCell align="center"><Typography>Data de retirada</Typography></TableCell>
                                        <TableCell align="center"><Typography>Cliente</Typography></TableCell>
                                        <TableCell align="center"><Typography>Livro</Typography></TableCell>
                                        <TableCell align="center"><Typography>Link</Typography></TableCell>
                                        <TableCell align="center"><Typography>Recebido</Typography></TableCell>
                                        <TableCell align="center"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.orders.map((order, index) => (
                                        <TableRow key={index} sx={{ backgroundColor: order.assinado === true ? "#eefff2" : "#fff8f8" }}>
                                            <TableCell align="center" >
                                                <label style={{ display: "flex" }} htmlFor='note'>

                                                    <input type="checkbox"
                                                        name="note"
                                                        id='note'
                                                        value={JSON.stringify(order)}
                                                        onClick={(e) => {
                                                            const { value, checked } = e.target
                                                            const { sku, nome, materialDidatico } = JSON.parse(value)


                                                            let filtering = fiscal.filter(res =>
                                                                res.sku === sku &&
                                                                res.nome === nome &&
                                                                res.materialDidatico === materialDidatico
                                                            )

                                                            let filtered = fiscal.filter(res => res !== filtering[0])
                                                            if (checked && !fiscal.every(res => res.nome === nome)) {
                                                                alert("Você só pode emitir um recibo para o mesmo dono")
                                                                e.preventDefault()
                                                                return
                                                            }

                                                            checked ? setFiscal([...fiscal, JSON.parse(value)]) : setFiscal(filtered)
                                                            // }
                                                        }}
                                                    />
                                                    {order.type !== "manual" &&
                                                        <ElectricBoltIcon />
                                                    }
                                                </label>

                                            </TableCell>
                                            <TableCell align="center">{order.data}</TableCell>
                                            <TableCell align="center">{order.dataRetirada}</TableCell>
                                            <TableCell align="center">{order.nome}</TableCell>
                                            <TableCell align="center">{order.materialDidatico}</TableCell>

                                            <TableCell align="center">
                                                {
                                                    order.link !== "" ?
                                                        <Link
                                                            to={order.link}
                                                            target='blank'
                                                        >
                                                            Autentique
                                                        </Link>
                                                        :
                                                        "Não emitido"
                                                }
                                            </TableCell>

                                            <TableCell align="center">
                                                <select style={sele} className='sele' name="" id=""

                                                    defaultValue={order.chegada ? order.chegada : false}
                                                    onChange={async (e) => {

                                                        let target = e.target.value
                                                        await updateLink.mutateAsync({
                                                            value: target === "true" ? true : false,
                                                            where: 'chegada',
                                                            id: row.id,
                                                            order: [order.id]
                                                        })

                                                    }}
                                                >
                                                    <option value={true}>Sim</option>
                                                    <option value={false}>Não</option>
                                                </select>
                                            </TableCell>

                                            <TableCell align="center">

                                                <PopOverOrder row={{
                                                    id: row.id,
                                                    sku: order.sku,
                                                    order: order

                                                }} />

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
        orders: PropTypes.arrayOf(
            PropTypes.shape({
                valor: PropTypes.number.isRequired,
                data: PropTypes.string.isRequired,
                sku: PropTypes.string.isRequired,
                nome: PropTypes.string.isRequired,
                link: PropTypes.string.isRequired,
                materialDidatico: PropTypes.string.isRequired,
            }),
        ).isRequired,
        created_at: PropTypes.string.isRequired,
        unity: PropTypes.string.isRequired,
        arrived: PropTypes.bool.isRequired,

    }).isRequired,
};



export default function TableOrders() {
    const { ordersQuery, queryOrder } = useOrders()
    const { isFetching } = ordersQuery



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
                isFetching ?
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
                                    <TableCell align="center"></TableCell>
                                    <TableCell align="center"><Typography>Data do pedido</Typography></TableCell>
                                    <TableCell align="center"><Typography>Período do pedido</Typography></TableCell>
                                    <TableCell align="center"><Typography>Código</Typography></TableCell>
                                    <TableCell align="center"><Typography>Unidade</Typography></TableCell>
                                    <TableCell align="center"><Typography>Valor total do pedido</Typography></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {queryOrder.length > 0 && queryOrder.map((row) => (
                                    <Row key={row.id} row={row} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
            }
        </div>
    );
}
