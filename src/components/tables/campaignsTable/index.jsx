import DoneIcon from '@mui/icons-material/Done';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import LoadingSpin from 'react-loading-spin';
import { useCampaign } from '../../../hooks/campaign/campaignContext.hook';
import { PopOverCampaign } from '../../popovers/popOverCampaign';

function Row(props) {

    const { row } = props

    const descountTypes = {
        "Exchange": "Alteração",
        "Value": "Valor Cheio",
        "Percentage": "Porcentagem",
    }
    return (

        <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row"></TableCell>
            <TableCell component="th" scope="row">
                {row.name}
            </TableCell>
            <TableCell align="center">{row.description}</TableCell>
            <TableCell align="center">{row.affectedParcels}</TableCell>
            <TableCell align="center">{row.value}</TableCell>
            <TableCell align="center">{row.for}</TableCell>
            <TableCell align="center">{row.status === true ? <DoneIcon /> : <DoNotDisturbAltIcon />}</TableCell>
            <TableCell align="center">{descountTypes[row.descountType]}</TableCell>
            <TableCell align="center">
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
    const { campaignQuery } = useCampaign()

    const { isFetching, data } = campaignQuery



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
                                    <TableCell align="left"><Typography>Nome</Typography></TableCell>
                                    <TableCell align="center"><Typography>Descrição</Typography></TableCell>
                                    <TableCell align="center"><Typography>Parcelas afetadas</Typography></TableCell>
                                    <TableCell align="center"><Typography>Valor</Typography></TableCell>
                                    <TableCell align="center"><Typography>Objetivo</Typography></TableCell>
                                    <TableCell align="center"><Typography>Status</Typography></TableCell>
                                    <TableCell align="center"><Typography>Tipo</Typography></TableCell>
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

