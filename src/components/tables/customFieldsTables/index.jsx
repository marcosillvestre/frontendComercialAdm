import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import * as React from 'react';

import { Paper, Table, TableBody, TableHead, TablePagination } from '@mui/material';
import LoadingSpin from 'react-loading-spin';
import { treatingDates } from '../../../app/utils/functions/getDates.jsx';
import { useCustomFields } from '../../../hooks/customFields/customFIelds.hook.jsx';
import { PopOverCustomFields } from '../../popovers/popOverCustomField/index.jsx';
import { ContainerTable } from '../tableSuplier/styles.jsx';
import { Container, ContainerOrder, Tag } from './styles.jsx';


function Row(props) {
    const { row } = props;

    const subtitle = {
        text: "Texto",
        date: "Data",
        multiple_choice: "Multipla escolha",
        option: "Seleção única",

        StatusMatricula: "Status da matrícula",
        Contrato: "Contrato",
        Financeiro: "Financeiro",
        InformacoesAlunoEResponsavel: "Dados do aluno e do responsável",
        Pedagogico: "Pedagógico",
        Outros: "Outros",
    }

    return (
        <TableRow sx={{
            '& > *': {
                borderBottom: 'unset', fontSize: ".7rem",

            }
        }}>

            <TableCell align="center" component="th" scope="row"
            >
                <p>
                    {treatingDates(row.created_at)}
                </p>
            </TableCell>
            <TableCell align="center" component="th" scope="row">{row.order + 1}</TableCell>
            <TableCell align="center" component="th" scope="row">{row.name} </TableCell>
            <TableCell align="center" component="th" scope="row">
                <Tag style={{ backgroundColor: "#dcb381" }}>
                    {subtitle[row.type]}
                </Tag>
            </TableCell>
            <TableCell align="center" component="th" scope="row">
                <Tag style={{ backgroundColor: "#d0cecf" }}>
                    {row.options.length} iten(s)
                </Tag>
            </TableCell>

            <TableCell align="center" component="th" scope="row">
                <Tag style={{ backgroundColor: "#b8d6f6" }}>
                    {subtitle[row.category]}
                </Tag>
            </TableCell>
            <TableCell align="center" component="th" scope="row">
                <PopOverCustomFields row={row} />
            </TableCell>

        </TableRow>

    );
}

Row.propTypes = {
    row: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        order: PropTypes.number.isRequired,
        options: PropTypes.array.isRequired,

        type: PropTypes.string.isRequired,
        category: PropTypes.array.isRequired,

        created_at: PropTypes.string.isRequired,
        updated_at: PropTypes.string.isRequired,

    }).isRequired,
};


export default function CustomFieldsTable() {


    const { CustomFieldsQuery, orderBy, setOrderBy, orderFor, setOrderFor,
        queryCustomField, setSkip, setTake, take
    } = useCustomFields()

    const { isPending } = CustomFieldsQuery

    const { customFields, total } = queryCustomField


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
                                                Ordem

                                                {
                                                    orderBy !== "order" &&
                                                    <SwapVertIcon onClick={() => setOrderBy("order")} />
                                                }
                                                {
                                                    orderBy === "order" && orderFor === "asc" &&
                                                    <ArrowDownwardIcon onClick={() => setOrderFor("desc")} />
                                                }
                                                {
                                                    orderBy === "order" && orderFor === "desc" &&
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
                                                Tipo

                                            </ContainerOrder>
                                        </TableCell>
                                        <TableCell align="center">
                                            <ContainerOrder>

                                                Opções

                                            </ContainerOrder>
                                        </TableCell>
                                        <TableCell align="center">
                                            <ContainerOrder>

                                                Categoria

                                            </ContainerOrder>
                                        </TableCell>


                                        <TableCell />
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        customFields &&
                                        customFields.map((row) => (
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

    );
}