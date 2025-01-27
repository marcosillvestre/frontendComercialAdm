import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import * as React from 'react';
import LoadingSpin from 'react-loading-spin';
import colorsRules from '../../../app/utils/Rules/colors.jsx';
import businessRules from '../../../app/utils/Rules/options.jsx';
import { useUnities } from '../../../hooks/unities/unitiesContext.hook.jsx';
import { useUser } from '../../../hooks/userContext';
import { UniqueSelect } from '../../selects/UniqueSelect/index.jsx';
import { PopOverControl } from '../../source';
import { ContractInfo } from './contractInfo';
import { FinanCialInfo } from './financialInfo/index.jsx';
import { Historic } from './historic/index.jsx';
import { Observations } from './observations';
import { Pedagogic } from './pedagogic/index.jsx';
import { StatusMatricula } from './statusMatricula';
import { StudentInfo } from './studentInfo/index.jsx';
import { RowTable } from './styles';


function TableMainData(props) {
    const { row } = props;
    const { userData, Sender, UpdateCustomFields } = useUser()
    const { unityQuery } = useUnities()

    const { setColor, setClearColor, borderColor } = colorsRules
    const { comissionStatusOpt, courseOpt, backgroundOpt } = businessRules
    const [payStatus, setPayStatus] = React.useState(row.comissaoStatus)

    const [Registration, setRegistration] = React.useState(false)


    if (!userData.admin) {
        return (
            <React.Fragment>

                <RowTable style={{

                    '& > *': { borderBottom: 'unset' },
                    backgroundColor: payStatus !== row.comissaoStatus
                        ? setClearColor[payStatus] : setClearColor[row.comissaoStatus]
                }}>
                    <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setRegistration(!Registration)}
                        >
                            {Registration ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {new Date(row.created_at).toLocaleDateString("pt-Br")}
                    </TableCell>
                    <TableCell align="center">{row["customFields"]["Nome do aluno"]}</TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row["customFields"]["Curso"]}</TableCell>
                    <TableCell align="center">{row["customFields"]["Unidade"]}</TableCell>
                    <TableCell align="center">{row["customFields"]["Background do Aluno"]}</TableCell>
                    <TableCell align="center">{row.comissaoStatus}</TableCell>
                    <TableCell align="center">
                    </TableCell>
                </RowTable>

                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
                        <Collapse in={Registration} timeout="auto" unmountOnExit sx={{ width: "100%" }}>
                            <StatusMatricula row={row} />
                        </Collapse>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={Registration} timeout="auto" unmountOnExit sx={{ width: "100%" }}>
                            <Observations row={row} />
                        </Collapse>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={Registration} timeout="auto" unmountOnExit sx={{ width: "100%" }}>
                            <ContractInfo row={row} />
                        </Collapse>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={Registration} timeout="auto" unmountOnExit sx={{ width: "100%" }}>
                            <ContractInfo row={row} />
                        </Collapse>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={Registration} timeout="auto" unmountOnExit sx={{ width: "100%" }}>
                            <ContractInfo row={row} />
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>

        );

    }

    const ChangerCustomFields = async (key, value) => {
        key === "comissaoStatus" && setPayStatus(value)

        UpdateCustomFields("customFields", row.id, key, value, row.customFields)
    }
    const Changer = async (key, value) => {
        key === "comissaoStatus" && setPayStatus(value)

        Sender(key, row.id, value, key)
    }

    return (
        <React.Fragment>

            <RowTable style={{
                '& > *': { borderBottom: 'unset' },
                backgroundColor: payStatus !== row.comissaoStatus
                    ? setClearColor[payStatus] : setClearColor[row.comissaoStatus]
            }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setRegistration(!Registration)}
                    >
                        {Registration ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {new Date(row.created_at).toLocaleDateString("pt-Br")}
                </TableCell>
                <TableCell align="center">{row["customFields"]["Nome do aluno"]}</TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">

                    <UniqueSelect
                        label={row["customFields"]["Curso"]}
                        option={courseOpt}
                        width="6rem"
                        field="Curso"
                        where="customField"
                        fn={[ChangerCustomFields]}
                    />
                </TableCell>
                <TableCell align="center">
                    <UniqueSelect
                        label={row["customFields"]["Unidade"]}
                        option={unityQuery.data}
                        width="6rem"
                        field="Unidade"
                        where="customField"
                        fn={[ChangerCustomFields]}
                    />

                </TableCell>
                <TableCell align="center">

                    <UniqueSelect
                        label={row["customFields"]["Background do Aluno"]}
                        option={backgroundOpt}
                        width="6rem"
                        field="Background do Aluno"
                        where="customField"
                        fn={[ChangerCustomFields]}
                    />
                </TableCell>
                <TableCell align="center">

                    <UniqueSelect
                        label={row.comissaoStatus}
                        option={comissionStatusOpt}
                        width="6rem"
                        field="comissaoStatus"
                        where="customField"
                        color={setColor[payStatus]}
                        border={borderColor[payStatus]}
                        fn={[Changer]}
                    />
                </TableCell>
                <TableCell align="center">
                    <PopOverControl row={row} />
                </TableCell>
            </RowTable>

            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={Registration} timeout="auto" unmountOnExit sx={{ width: "100%" }}>
                        <StatusMatricula row={row} />
                    </Collapse>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={Registration} timeout="auto" unmountOnExit sx={{ width: "100%" }}>
                        <Observations row={row} />
                    </Collapse>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={Registration} timeout="auto" unmountOnExit sx={{ width: "100%" }}>
                        <ContractInfo row={row} />
                    </Collapse>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={Registration} timeout="auto" unmountOnExit sx={{ width: "100%" }}>
                        <FinanCialInfo row={row} />
                    </Collapse>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={Registration} timeout="auto" unmountOnExit sx={{ width: "100%" }}>
                        <StudentInfo row={row} />
                    </Collapse>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={Registration} timeout="auto" unmountOnExit sx={{ width: "100%" }}>
                        <Pedagogic row={row} />
                    </Collapse>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={Registration} timeout="auto" unmountOnExit sx={{ width: "100%" }}>
                        <Historic row={row} />
                    </Collapse>
                </TableCell>
            </TableRow>

        </React.Fragment>

    );




}

TableMainData.propTypes = {
    row: PropTypes.shape({
        created_at: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        comissaoStatus: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        customFields: PropTypes.shape({
            "Nome do aluno": PropTypes.string.isRequired,
            "Curso": PropTypes.string.isRequired,
            "Unidade": PropTypes.string.isRequired,
            "Background do Aluno": PropTypes.string.isRequired,
        }).isRequired,


    }).isRequired,
};

export default function CollapsibleTable(props) {

    const { total, deals } = props.data
    const { setSkip, take, setTake, mutationControlData } = useUser()

    const { isPending } = mutationControlData


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

        <TableContainer component={Paper}>
            <Paper sx={{ width: '100%' }}>

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
                                numberOfRotationsInAnimation={2}
                            />
                        </div>
                        :
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell />
                                    <TableCell align="center">Data</TableCell>
                                    <TableCell align="center">Aluno</TableCell>
                                    <TableCell align="center">Responsável</TableCell>
                                    <TableCell align="center">Curso</TableCell>
                                    <TableCell align="center">Unidade</TableCell>
                                    <TableCell align="center">Background</TableCell>
                                    <TableCell align="center">Comissionamento</TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    deals &&
                                    deals.map((row) => (
                                        <TableMainData
                                            key={row.id}
                                            row={row}
                                        />
                                    ))

                                }
                            </TableBody>
                        </Table>
                }

                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={total}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </TableContainer>
    );
}

CollapsibleTable.propTypes = {
    data: PropTypes.shape({

        total: PropTypes.number.isRequired,
        deals: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                customFields: PropTypes.shape({
                    "Nome do aluno": PropTypes.string.isRequired,
                }).isRequired,
            }),
        ).isRequired,

    }).isRequired,
};