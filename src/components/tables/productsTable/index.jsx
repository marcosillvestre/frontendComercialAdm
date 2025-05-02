import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import DoneIcon from '@mui/icons-material/Done';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { TablePagination } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import * as React from 'react';
import LoadingSpin from 'react-loading-spin';
import noData from '../../../assets/noData.svg';
import { useProduct } from '../../../hooks/products/productsContext.hook';
import { PopOverProduct } from '../../popovers/popOverProduct';
import { ContainerOrder, ContainerTable } from './styles';
function Row(props) {

    const { row } = props
    return (

        <TableRow
            sx={{
                '& > *': {
                    borderBottom: 'unset', fontSize: ".7rem",
                    backgroundColor: `${row.color}`

                }
            }}

        >
            <TableCell component="th" scope="row" align="center">
                {row.name}
            </TableCell>
            <TableCell component="th" align="center">{row.sku}</TableCell>
            <TableCell component="th" align="center">R${row.price_selling}</TableCell>
            <TableCell component="th" align="center">R${row.price_ticket}</TableCell>
            <TableCell component="th" align="center">R${row.price_link}</TableCell>
            <TableCell component="th" align="center">R${row.price_card}</TableCell>
            <TableCell component="th" align="center">R${row.price_cash}</TableCell>
            <TableCell component="th" align="center">{row.status === true ? <DoneIcon /> : <DoNotDisturbAltIcon />}</TableCell>
            <TableCell component="th" align="center">
                <PopOverProduct row={row} />

            </TableCell>
        </TableRow>

    );
}



Row.propTypes = {
    row: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        sku: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        status: PropTypes.bool.isRequired,
        price_selling: PropTypes.number.isRequired,
        price_ticket: PropTypes.number.isRequired,
        price_card: PropTypes.number.isRequired,
        price_cash: PropTypes.number.isRequired,
        price_link: PropTypes.number.isRequired,

    }).isRequired,
};

export function ProductsTable() {

    const { take, setTake, setSkip, setOrderBy, orderBy,
        orderFor, setOrderFor, productQuery, queryProducts, } = useProduct();

    const { isPending } = productQuery;

    const { products, total } = queryProducts;

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
            <Paper>
                {
                    isPending ?
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
                                numberOfRotationsInAnimation={3}
                            />
                        </div>
                        :
                        products &&
                            products.length === 0 ?
                            <div style={{
                                width: "100%",
                                display: 'grid',
                                justifyContent: 'center',
                                padding: "5rem 0",
                                textAlign: "center"
                            }}>
                                <img src={noData} alt=""
                                    style={{
                                        width: "300px",
                                    }}
                                />

                            </div>

                            :
                            <>
                                <Table aria-label="collapsible table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left">
                                                <ContainerOrder
                                                    className='flex'
                                                    onClick={() => setOrderBy("name")}
                                                >
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
                                                SKU

                                            </TableCell>
                                            <TableCell align="center">
                                                <ContainerOrder
                                                    className='flex'
                                                    onClick={() => setOrderBy("price_selling")}
                                                >
                                                    Vitríne
                                                    {
                                                        orderBy !== "price_selling" &&
                                                        <SwapVertIcon onClick={() => setOrderBy("price_selling")} />
                                                    }
                                                    {
                                                        orderBy === "price_selling" && orderFor === "asc" &&
                                                        <ArrowDownwardIcon onClick={() => setOrderFor("desc")} />
                                                    }
                                                    {
                                                        orderBy === "price_selling" && orderFor === "desc" &&
                                                        <ArrowUpwardIcon onClick={() => setOrderFor("asc")} />
                                                    }
                                                </ContainerOrder>
                                            </TableCell>
                                            <TableCell align="center">

                                                <ContainerOrder
                                                    className='flex'
                                                >
                                                    Boleto
                                                </ContainerOrder>

                                            </TableCell>
                                            <TableCell align="center">
                                                <ContainerOrder
                                                    className='flex'
                                                >
                                                    Link
                                                </ContainerOrder>

                                            </TableCell>
                                            <TableCell align="center">
                                                <ContainerOrder
                                                    className='flex'
                                                >
                                                    Cartão
                                                </ContainerOrder>

                                            </TableCell>
                                            <TableCell align="center">
                                                <ContainerOrder
                                                    className='flex'
                                                >
                                                    À vista
                                                </ContainerOrder>

                                            </TableCell>

                                            <TableCell align="center">
                                                Status

                                            </TableCell>
                                            <TableCell align="cent
                                            er">

                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            products &&
                                            products.map((row) => (
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
                            </>

                }
            </Paper>
        </ContainerTable>
    );
}

ProductsTable.propTypes = {
    data: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    total: PropTypes.number.isRequired

}