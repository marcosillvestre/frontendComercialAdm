import DoneIcon from '@mui/icons-material/Done';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { TablePagination, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import * as React from 'react';
import LoadingSpin from 'react-loading-spin';
import noData from '../../../assets/noData.svg';
import { useService } from '../../../hooks/services/servicesContext.hook';
import { PopOverService } from '../../popovers/popOverService';
import { HeaderTable } from './styles';

function Row(props) {

    const { row } = props
    return (

        <TableRow
            sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                backgroundColor: `${row.color}`
            }}
        >
            <TableCell component="th" scope="row"></TableCell>
            <TableCell component="th" scope="row">
                {row.name}
            </TableCell>
            <TableCell align="center">{row.sku}</TableCell>
            <TableCell align="center">R${row.price_selling}</TableCell>
            <TableCell align="center">R${row.price_ticket}</TableCell>
            <TableCell align="center">R${row.price_link}</TableCell>

            <TableCell align="center">R${row.price_card}</TableCell>
            <TableCell align="center">R${row.price_cash}</TableCell>
            <TableCell align="center">{row.status === true ? <DoneIcon /> : <DoNotDisturbAltIcon />}</TableCell>

            <TableCell align="center">
                <PopOverService row={row} />

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

export function ServicesTable(props) {
    const { data, loading, total } = props
    const { take, setTake, setSkip, setOrderBy } = useService()
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const style = {
        fontSize: "9px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        boxShadow: "4px 10px 20px -12px rgba(0,0,0,0.62)"
    }

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
        <div style={style}>
            {
                loading ?
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
                    data && data.length === 0 ?
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
                        <TableContainer component={Paper}>
                            <Paper>
                                <Table aria-label="collapsible table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center"></TableCell>
                                            <TableCell align="left">
                                                <HeaderTable
                                                    className='flex'
                                                    onClick={() => setOrderBy("name")}
                                                >
                                                    Nome
                                                    <SwapVertIcon />

                                                </HeaderTable>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography>SKU</Typography>

                                            </TableCell>
                                            <TableCell align="center">

                                                <HeaderTable
                                                    className='flex'
                                                    onClick={() => setOrderBy("price_selling")}

                                                > Vitrine <SwapVertIcon /></HeaderTable>

                                            </TableCell>
                                            <TableCell align="center">

                                                <HeaderTable
                                                    className='flex'
                                                >
                                                    Boleto
                                                </HeaderTable>

                                            </TableCell>
                                            <TableCell align="center">
                                                <HeaderTable
                                                    className='flex'
                                                >
                                                    Link
                                                </HeaderTable>

                                            </TableCell>
                                            <TableCell align="center">
                                                <HeaderTable
                                                    className='flex'
                                                >
                                                    Cartão
                                                </HeaderTable>

                                            </TableCell>
                                            <TableCell align="center">
                                                <HeaderTable
                                                    className='flex'
                                                >
                                                    À vista
                                                </HeaderTable>

                                            </TableCell>

                                            <TableCell align="center">
                                                <Typography>Status</Typography>

                                            </TableCell>
                                            <TableCell align="cent
                                            er">

                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data && data.map((row) => (
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
            }
        </div>
    );
}

ServicesTable.propTypes = {
    data: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    total: PropTypes.number.isRequired

}