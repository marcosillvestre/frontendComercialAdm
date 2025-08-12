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
import { useState } from 'react';
import { changeCurrency } from '../../../app/utils/functions/parseNumbers';
import businnesRules from '../../../app/utils/Rules/options.jsx';
import { useCampaign } from '../../../hooks/campaign/campaignContext.hook';
import { MultiFilters } from '../../arrayFilters/multiFilters/index.jsx';
import { Loading } from '../../loadingSpin/index.jsx';
import { PopOverCampaign } from '../../popovers/popOverCampaign';
import { Tag } from '../../Tag';
import { ContainerTable } from '../tableSuplier/styles';
import { ContainerOrder } from './styles';
function Row(props) {

    const { row } = props
    const { descountTypes, goalTypes } = businnesRules;

    return (

        <TableRow
            sx={{
                '& > *': {
                    borderBottom: 'unset', fontSize: ".7rem",
                }
            }}
        >
            <TableCell component="th" scope="row">{row.name}</TableCell>
            <TableCell component="th" align="center">
                <Tag
                    data={{
                        label: `${row.description.slice(0, 60)}...`,
                        title: row.description
                    }}
                />

            </TableCell>
            <TableCell component="th" align="center">{row.affectedParcels}</TableCell>
            <TableCell component="th" align="center">{changeCurrency(row.value)}</TableCell>
            <TableCell component="th" align="center">
                {goalTypes[row.for]}
            </TableCell>
            <TableCell component="th" align="center">
                <Tag
                    data={{
                        label: row.status ? "ATIVO" : "INATIVO",
                        color: row.status ? "#a2e67e" : "#e6937e",
                    }}
                />
            </TableCell>
            <TableCell component="th" align="center">
                <Tag
                    data={{
                        label: descountTypes[row.descountType],
                        color: '#9ac8e3',
                    }}
                />
            </TableCell>
            <TableCell component="th" align="center">
                <PopOverCampaign row={row} />

            </TableCell>
        </TableRow>

    );
}



Row.propTypes = {
    row: PropTypes.shape({
        id: PropTypes.string.isRequired,
        descountType: PropTypes.string.isRequired,
        for: PropTypes.string.isRequired,
        status: PropTypes.bool.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        affectedParcels: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,

    }).isRequired,
};

export function CampaignTable() {
    const { campaignQuery, setSkip, setTake, take, campaignQueries,
        setOrderBy, orderBy, orderFor, setOrderFor, removeFilter,
        typeFilter, setTypeFilter } = useCampaign();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);


    const { isPending } = campaignQuery;
    const { campaigns, total } = campaignQueries;


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
        <>
            <MultiFilters
                data={{
                    removeFilter: removeFilter,
                    setType: setTypeFilter,
                    types: typeFilter
                }}
            />

            <ContainerTable component={Paper}>
                <div className='table_tag'>
                    <h3>Lista de campanhas </h3>
                </div>
                <Paper >

                    {
                        isPending ?
                            <Loading />
                            :


                            <>
                                <Table aria-label="collapsible table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left">Nome</TableCell>
                                            <TableCell align="center">Descrição</TableCell>
                                            <TableCell align="center">
                                                <ContainerOrder
                                                    className='flex'
                                                    onClick={() => setOrderBy("affectedParcels")}
                                                >
                                                    Parcelas
                                                    {
                                                        orderBy !== "affectedParcels" &&
                                                        <SwapVertIcon onClick={() => setOrderBy("affectedParcels")} />
                                                    }
                                                    {
                                                        orderBy === "affectedParcels" && orderFor === "asc" &&
                                                        <ArrowDownwardIcon onClick={() => setOrderFor("desc")} />
                                                    }
                                                    {
                                                        orderBy === "affectedParcels" && orderFor === "desc" &&
                                                        <ArrowUpwardIcon onClick={() => setOrderFor("asc")} />
                                                    }
                                                </ContainerOrder>
                                            </TableCell>
                                            <TableCell align="center">
                                                <ContainerOrder
                                                    className='flex'
                                                    onClick={() => setOrderBy("value")}
                                                >
                                                    Valor (R$)
                                                    {
                                                        orderBy !== "value" &&
                                                        <SwapVertIcon onClick={() => setOrderBy("value")} />
                                                    }
                                                    {
                                                        orderBy === "value" && orderFor === "asc" &&
                                                        <ArrowDownwardIcon onClick={() => setOrderFor("desc")} />
                                                    }
                                                    {
                                                        orderBy === "value" && orderFor === "desc" &&
                                                        <ArrowUpwardIcon onClick={() => setOrderFor("asc")} />
                                                    }
                                                </ContainerOrder>
                                            </TableCell>
                                            <TableCell align="center">Objetivo</TableCell>
                                            <TableCell align="center">Status</TableCell>
                                            <TableCell align="center">Tipo</TableCell>
                                            <TableCell align="center"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            campaigns.map((row) => (
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

