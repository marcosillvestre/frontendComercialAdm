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
// import email from '../../../assets/envelope.svg';
// import wpp from '../../../assets/whatsapp.svg';
import DoneIcon from '@mui/icons-material/Done';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import { useBilling } from '../../../hooks/billingRules/billingRulesContext.hook';
import { PopOverBilling } from '../../popovers/popOverBilling';
import { Container, ContainerOrder, ContainerTable } from './styles';

function Row(props) {
    const { row } = props;

    const translate = {
        "Product": "produtos",
        "Service": "serviços",
    }


    return (
        <React.Fragment>
            <TableRow sx={{
                '& > *': {
                    borderBottom: 'unset', fontSize: ".7rem",

                }
            }}>

                <TableCell align="center" component="th" scope="row"
                >
                    {treatingDates(row.created_at)}
                </TableCell>
                <TableCell align="center" component="th" scope="row">{row.name} </TableCell>
                <TableCell align="center" component="th" scope="row">{row.description}</TableCell>
                <TableCell align="center" component="th" scope="row">{translate[row.category]}</TableCell>
                <TableCell align="center" component="th" scope="row">{row.daysToAction}</TableCell>
                <TableCell align="center" component="th" scope="row">
                    <ContainerOrder>
                        {
                            row.reminderMethod.email &&
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                            </svg>
                        }
                        {
                            row.reminderMethod.whatsapp &&
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
                                <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                            </svg>
                        }
                    </ContainerOrder>
                </TableCell>
                <TableCell align="center">{row.status === true ? <DoneIcon /> : <DoNotDisturbAltIcon />}</TableCell>

                <TableCell align="center" component="th" scope="row">
                    <PopOverBilling row={row} />
                </TableCell>

            </TableRow>


        </React.Fragment >
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        description: PropTypes.string.isRequired,

        reminderMethod: PropTypes.object.isRequired,
        daysToAction: PropTypes.number.isRequired,
        message: PropTypes.string.isRequired,
        typeTrigger: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        status: PropTypes.bool.isRequired,

        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,

        created_at: PropTypes.string.isRequired,
        updated_at: PropTypes.string.isRequired,

    }).isRequired,
};



export default function BillingTable() {
    const { setSkip, take, setTake, orderFor, orderBy,
        setOrderFor, setOrderBy, BillingQuery, queryBilling } = useBilling()

    const { isPending } = BillingQuery

    const { total, billing } = queryBilling

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

                                            </ContainerOrder>
                                        </TableCell>
                                        <TableCell align="center">
                                            <ContainerOrder>
                                                Descrição
                                            </ContainerOrder>

                                        </TableCell>
                                        <TableCell align="center">
                                            <ContainerOrder>
                                                Categoria
                                            </ContainerOrder>

                                        </TableCell>
                                        <TableCell align="center">
                                            <ContainerOrder>
                                                Dias para ação
                                                {
                                                    orderBy !== "daysToAction" &&
                                                    <SwapVertIcon onClick={() => setOrderBy("daysToAction")} />
                                                }
                                                {
                                                    orderBy === "daysToAction" && orderFor === "asc" &&
                                                    <ArrowDownwardIcon onClick={() => setOrderFor("desc")} />
                                                }
                                                {
                                                    orderBy === "daysToAction" && orderFor === "desc" &&
                                                    <ArrowUpwardIcon onClick={() => setOrderFor("asc")} />
                                                }
                                            </ContainerOrder>
                                        </TableCell>
                                        <TableCell align="center">
                                            Meios de cobrança
                                        </TableCell>
                                        <TableCell align="center">
                                            Status
                                        </TableCell>
                                        <TableCell align="center" />
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        billing &&
                                        billing.map((row) => (
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

                        </Container>
                }
            </Paper>
        </ContainerTable >

    );
}
