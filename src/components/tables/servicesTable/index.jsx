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
import * as React from 'react';
import LoadingSpin from 'react-loading-spin';
import { changeCurrency } from '../../../app/utils/functions/parseNumbers';
import noData from '../../../assets/noData.svg';
import { useService } from '../../../hooks/services/servicesContext.hook';
import { PopOverService } from '../../popovers/popOverService';
import { ContainerOrder, ContainerTable, Tag } from './styles';
function Row(props) {

    const { row } = props
    return (

        <TableRow
            sx={{
                '& > *': {
                    borderBottom: 'unset', fontSize: ".7rem",
                }
            }}
        >
            <TableCell component="th" scope="row">
                {row.name}
            </TableCell>
            <TableCell component="th" align="center">{row.code}</TableCell>
            <TableCell component="th">{changeCurrency(row.priceSale)}</TableCell>
            <TableCell component="th">{row.modality}</TableCell>

            <TableCell component="th">
                <Tag style={{ backgroundColor: row.active ? "#a2e67e" : "#e6937e" }}>
                    {row.active ? "ATIVO" : "INATIVO"}
                </Tag>
            </TableCell>

            <TableCell align="center">
                <PopOverService row={row} />

            </TableCell>
        </TableRow>

    );
}



Row.propTypes = {
    row: PropTypes.shape({
        id: PropTypes.string.isRequired,
        priceSale: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        modality: PropTypes.string.isRequired,
        code: PropTypes.string.isRequired,
        active: PropTypes.bool.isRequired,

    }).isRequired,
};

export function ServicesTable() {

    const { take, setTake, setSkip, setOrderBy, queryService, serviceQuery, orderBy, orderFor, setOrderFor, } = useService()
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);


    const { isPending } = serviceQuery;

    const { total, services } = queryService;

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

            <div className='table_tag'>
                <h3>Lista de serviços</h3>
            </div>

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
                        services &&
                            services.length === 0 ?
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
                                            <TableCell >
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
                                                Código(SKU)

                                            </TableCell>
                                            <TableCell align="center">

                                                <ContainerOrder
                                                    className='flex'
                                                    onClick={() => setOrderBy("priceSale")}
                                                >
                                                    Valor (R$)
                                                    {
                                                        orderBy !== "priceSale" &&
                                                        <SwapVertIcon onClick={() => setOrderBy("priceSale")} />
                                                    }
                                                    {
                                                        orderBy === "priceSale" && orderFor === "asc" &&
                                                        <ArrowDownwardIcon onClick={() => setOrderFor("desc")} />
                                                    }
                                                    {
                                                        orderBy === "priceSale" && orderFor === "desc" &&
                                                        <ArrowUpwardIcon onClick={() => setOrderFor("asc")} />
                                                    }
                                                </ContainerOrder>
                                            </TableCell>
                                            <TableCell >

                                                <ContainerOrder
                                                    className='flex'
                                                >
                                                    Modalidade

                                                </ContainerOrder>

                                            </TableCell>
                                            <TableCell >

                                                <ContainerOrder
                                                    className='flex'
                                                >
                                                    Situação

                                                </ContainerOrder>

                                            </TableCell>


                                            <TableCell align="center" />
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            services &&
                                            services.map((row) => (
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

    );
}