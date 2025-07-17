import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { Paper, Table, TablePagination } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import { useState } from 'react';
import noData from '../../../../assets/noData.svg';
import { useCategorieProducts } from '../../../../hooks/categorieProduct/categorieProd.hook.jsx';
import { Loading } from '../../../loadingSpin/index.jsx';
import { PopOverCategorieProduct } from '../../../popovers/popOverCategorieProduct/index.jsx';
import { ContainerOrder } from '../styles.jsx';


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
            <TableCell component="th" scope="row">{row.name}</TableCell>
            <TableCell component="th" align="center" title={row.products.map(r => `${r.name} \n`)}>
                {row.products.length} produtos relacionados
            </TableCell>
            <TableCell component="th" align="center">
                <PopOverCategorieProduct row={row} />

            </TableCell>
        </TableRow>

    );
}


Row.propTypes = {
    row: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        products: PropTypes.array.isRequired,

    }).isRequired,
};
export const Categorie = () => {

    const { take, setTake, setSkip, setOrderBy, orderBy,
        orderFor, setOrderFor, categoryQuery, queryCategorieProducts, } = useCategorieProducts()

    const { isPending } = categoryQuery;

    const { categorie, total } = queryCategorieProducts;



    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);



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
        <Paper>
            {
                isPending ?
                    <Loading />
                    :
                    categorie &&
                        categorie.length === 0 ?
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
                                            Conexões

                                        </TableCell>
                                        <TableCell align="cent
                                            er">

                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        categorie &&
                                        categorie.map((row) => (
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
    )
}
