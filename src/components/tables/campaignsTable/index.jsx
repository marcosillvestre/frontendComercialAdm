import DoneIcon from '@mui/icons-material/Done';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import LoadingSpin from 'react-loading-spin';
import { useCampaign } from '../../../hooks/campaign/campaignContext.hook';
import { PopOverCampaign } from '../../popovers/popOverCampaign';
import { ContainerTable } from '../tableSuplier/styles';

function Row(props) {

    const { row } = props

    const descountTypes = {
        "Exchange": "Alteração",
        "Value": "Valor Cheio",
        "Percentage": "Porcentagem",
    }
    return (

        <TableRow
            sx={{
                '& > *': {
                    borderBottom: 'unset', fontSize: ".7rem",
                }
            }}
        >
            <TableCell component="th" scope="row">{row.name}</TableCell>
            <TableCell component="th" align="center">{row.description}</TableCell>
            <TableCell component="th" align="center">{row.affectedParcels}</TableCell>
            <TableCell component="th" align="center">{row.value}</TableCell>
            <TableCell component="th" align="center">{row.for}</TableCell>
            <TableCell component="th" align="center">{row.status === true ? <DoneIcon /> : <DoNotDisturbAltIcon />}</TableCell>
            <TableCell component="th" align="center">{descountTypes[row.descountType]}</TableCell>
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
    const { campaignQuery } = useCampaign()

    const { isFetching, data } = campaignQuery

    return (
        <ContainerTable component={Paper}>
            <Paper >

                {
                    isFetching ?
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



                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Nome</TableCell>
                                    <TableCell align="center">Descrição</TableCell>
                                    <TableCell align="center">Parcelas</TableCell>
                                    <TableCell align="center">Valor</TableCell>
                                    <TableCell align="center">Objetivo</TableCell>
                                    <TableCell align="center">Status</TableCell>
                                    <TableCell align="center">Tipo</TableCell>
                                    <TableCell align="center"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    data &&
                                    data.map((row) => (
                                        <Row key={row.id} row={row} />
                                    ))}
                            </TableBody>
                        </Table>
                }
            </Paper>

        </ContainerTable>
    );
}

