import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import PropTypes from 'prop-types'
import React from 'react'
import colorsRules from '../../../../app/utils/Rules/colors.jsx'
import businessRules from '../../../../app/utils/Rules/options.jsx'
import { useCustomFields } from '../../../../hooks/customFields/customFIelds.hook.jsx'
import { useUser } from '../../../../hooks/userContext'
import { DateSelect } from '../../../selects/DateSelect/index.jsx'
import { UniqueSelect } from '../../../selects/uniqueSelect/index.jsx'
import { RowTableCustomFields } from '../styles.jsx'

export const StatusMatricula = (props) => {
    const { row } = props
    const [Observatios, setObservatios] = React.useState(false)
    const { cfSrted } = useCustomFields()

    const customFieldsFiltered = cfSrted && cfSrted.filter(res => res.category === "StatusMatricula")

    const { comissionStatusOpt, nonEspecificOpt } = businessRules
    const { setColor, borderColor } = colorsRules
    const { userData, Sender, UpdateCustomFields } = useUser()


    const [payStatus, setPayStatus] = React.useState()

    if (!userData.admin) {
        return (
            <React.Fragment>
                <>
                    <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                        <TableCell>
                            <IconButton
                                aria-label="expand row"
                                size="small"
                                onClick={() => setObservatios(!Observatios)}
                            >
                                {Observatios ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>


                        </TableCell>

                        <TableCell sx={{ width: "100%" }}>
                            1 - Status da matrícula
                        </TableCell>
                    </TableRow>
                    <Collapse in={Observatios} timeout="auto" unmountOnExit sx={{ width: "100%" }}>

                        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>

                            <Box sx={{ margin: 1, width: "100%" }} >
                                <Table size="small" aria-label="purchases" >
                                    <TableHead >
                                        <TableRow >
                                            <TableCell sx={{ fontWeight: "bold" }} align="center">AC. Status</TableCell>
                                            <TableCell sx={{ fontWeight: "bold" }} align="center">TM. Status</TableCell>
                                            <TableCell sx={{ fontWeight: "bold" }} align="center">PP.Status</TableCell>
                                            <TableCell sx={{ fontWeight: "bold" }} align="center">MD. Status</TableCell>
                                            <TableCell sx={{ fontWeight: "bold" }} align="center">PA. Status</TableCell>
                                            <TableCell sx={{ fontWeight: "bold" }} align="center">Data da Matrícula</TableCell>
                                            <TableCell sx={{ fontWeight: "bold" }} align="center">Data da Validação</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow >
                                            <TableCell component="th" scope="row" align="center">

                                                {row.assinaturaContratoStatus}

                                            </TableCell>
                                            <TableCell align="center">{row.taxaMatriculaStatus}</TableCell>
                                            <TableCell align="center">{row.pagamentoPrimeiraParcelaStatus}</TableCell>
                                            <TableCell align="center">
                                                {row.materialDidaticoStatus}
                                            </TableCell>
                                            <TableCell align="center">
                                                {row.primeiraAulaStatus}
                                            </TableCell>
                                            <TableCell align="center">
                                                {row["customFields"]["Data de emissão da venda"]}
                                            </TableCell>
                                            <TableCell align="center">
                                                {row.dataValidacao}
                                            </TableCell>
                                        </TableRow>

                                    </TableBody>

                                    <TableHead >
                                        <TableRow >
                                            <TableCell sx={{ fontWeight: "bold" }} align="center">Data de Comissionamento</TableCell>
                                            <TableCell sx={{ fontWeight: "bold" }} align="center">Status do comissionamento</TableCell>
                                            <TableCell sx={{ fontWeight: "bold" }} align="center">ADM. Responsável</TableCell>
                                            <TableCell sx={{ fontWeight: "bold" }} align="center">Status Direção</TableCell>
                                            <TableCell sx={{ fontWeight: "bold" }} align="center">Aprovação ADM.</TableCell>
                                            <TableCell sx={{ fontWeight: "bold" }} align="center">Consultor(a)</TableCell>
                                            <TableCell sx={{ fontWeight: "bold" }} align="center">Emissão da Venda</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow >
                                            <TableCell component="th" scope="row" align="center">
                                                {row.dataComissionamento}
                                            </TableCell>
                                            <TableCell align="center">{row.comissaoStatus}</TableCell>
                                            <TableCell align="center">{row.pagamentoPrimeiraParcelaStatus}</TableCell>
                                            <TableCell align="center">
                                                {row.materialDidaticoStatus}
                                            </TableCell>
                                            <TableCell align="center">
                                                {row.primeiraAulaStatus}
                                            </TableCell>
                                            <TableCell align="center">
                                                {row["customFields"]["Data de emissão da venda"]}
                                            </TableCell>
                                            <TableCell align="center">
                                                {row.dataValidacao}
                                            </TableCell>
                                        </TableRow>

                                    </TableBody>

                                </Table>
                            </Box>
                        </TableRow>
                        <RowTableCustomFields>


                            <TableCell sx={{ width: "100%", fontWeight: "", fontSize: ".9rem" }}>
                                Campos personalizados
                            </TableCell>
                        </RowTableCustomFields>
                        <Box sx={{ margin: 1, width: "100%" }} >
                            <Table size="small" aria-label="purchases" >
                                <div
                                    style={{
                                        display: "flex",
                                    }}
                                >
                                    {
                                        customFieldsFiltered.map(res => (
                                            <span
                                                key={res.id}

                                                style={{
                                                    display: "grid",
                                                    margin: "0 1rem",
                                                    textAlign: "center"

                                                }}
                                            >

                                                <div >
                                                    <div >
                                                        <h4>{res.name}</h4>
                                                        <div >
                                                            {row["customFields"][res.name]}
                                                        </div>

                                                    </div>
                                                </div>

                                            </span>


                                        ))
                                    }
                                </div>
                            </Table>
                        </Box>
                    </Collapse>
                </>
            </React.Fragment >
        )
    }

    const ChangerCustomFields = async (key, value) => {

        UpdateCustomFields("customFields", row.id, key, value, row.customFields)
    }

    const Changer = async (key, value) => {
        key === "comissaoStatus" && setPayStatus(value)

        Sender(key, row.id, value, key)
    }


    return (
        <React.Fragment>
            <>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                    <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setObservatios(!Observatios)}
                        >
                            {Observatios ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>


                    </TableCell>

                    <TableCell sx={{ width: "100%" }}>
                        1 - Status da matrícula
                    </TableCell>
                </TableRow>
                <Collapse in={Observatios} timeout="auto" unmountOnExit sx={{ width: "100%" }}>

                    <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>

                        <Box sx={{ margin: 1, width: "100%" }} >
                            <Table size="small" aria-label="purchases" >
                                <TableHead >
                                    <TableRow >
                                        <TableCell sx={{ fontWeight: "bold" }} align="center">AC. Status</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }} align="center">TM. Status</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }} align="center">PP.Status</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }} align="center">MD. Status</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }} align="center">PA. Status</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }} align="center">Data da Matrícula</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }} align="center">Data da Validação</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow >
                                        <TableCell component="th" scope="row" align="center">

                                            <UniqueSelect
                                                label={row.assinaturaContratoStatus}
                                                option={nonEspecificOpt}
                                                width="7rem"
                                                field="assinaturaContratoStatus"
                                                where="customField"
                                                color={setColor[payStatus]}
                                                border={borderColor[payStatus]}
                                                fn={[Changer]}
                                            />


                                        </TableCell>
                                        <TableCell align="center">

                                            <UniqueSelect
                                                label={row.taxaMatriculaStatus}
                                                option={nonEspecificOpt}
                                                width="7rem"
                                                field="taxaMatriculaStatus"
                                                where="customField"
                                                color={setColor[payStatus]}
                                                border={borderColor[payStatus]}
                                                fn={[Changer]}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <UniqueSelect
                                                label={row.pagamentoPrimeiraParcelaStatus}
                                                option={nonEspecificOpt}
                                                width="7rem"
                                                field="pagamentoPrimeiraParcelaStatus"
                                                where="customField"
                                                color={setColor[payStatus]}
                                                border={borderColor[payStatus]}
                                                fn={[Changer]}
                                            />

                                        </TableCell>
                                        <TableCell align="center">
                                            <UniqueSelect
                                                label={row.materialDidaticoStatus}
                                                option={nonEspecificOpt}
                                                width="7rem"
                                                field="materialDidaticoStatus"
                                                where="customField"
                                                color={setColor[payStatus]}
                                                border={borderColor[payStatus]}
                                                fn={[Changer]}
                                            />

                                        </TableCell>
                                        <TableCell align="center">
                                            <UniqueSelect
                                                label={row.primeiraAulaStatus}
                                                option={nonEspecificOpt}
                                                width="7rem"
                                                field="primeiraAulaStatus"
                                                where="customField"
                                                color={setColor[payStatus]}
                                                border={borderColor[payStatus]}
                                                fn={[Changer]}
                                            />

                                        </TableCell>
                                        <TableCell align="center">{row["customFields"]["Data de emissão da venda"]}</TableCell>
                                        <TableCell align="center">
                                            <DateSelect
                                                label={row.dataValidacao}
                                                width="7rem"
                                                field="dataValidacao"
                                                where="customField"
                                                fn={[Changer]}
                                            />


                                        </TableCell>
                                    </TableRow>

                                </TableBody>

                                <TableHead >
                                    <TableRow >
                                        <TableCell sx={{ fontWeight: "bold" }} align="center">Data de Comissionamento</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }} align="center">Status do comissionamento</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }} align="center">ADM. Responsável</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }} align="center">Status Direção</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }} align="center">Aprovação ADM.</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }} align="center">Consultor(a)</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }} align="center">Emissão da Venda</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow >
                                        <TableCell component="th" scope="row" align="center">

                                            <DateSelect
                                                label={row.dataComissionamento}
                                                width="7rem"
                                                field="dataComissionamento"
                                                where="customField"
                                                fn={[Changer]}
                                            />
                                        </TableCell>
                                        <TableCell align="center">

                                            <UniqueSelect
                                                label={row.comissaoStatus}
                                                option={comissionStatusOpt}
                                                width="7rem"
                                                field="comissaoStatus"
                                                where="customField"
                                                color={setColor[payStatus]}
                                                border={borderColor[payStatus]}
                                                fn={[Changer]}
                                            />


                                        </TableCell>
                                        <TableCell align="center">{row.admResponsavel}</TableCell>
                                        <TableCell align="center">
                                            <UniqueSelect
                                                label={row.aprovacaoDirecao}
                                                option={comissionStatusOpt}
                                                width="7rem"
                                                field="aprovacaoDirecao"
                                                where="customField"
                                                color={setColor[payStatus]}
                                                border={borderColor[payStatus]}
                                                fn={[Changer]}
                                            />

                                        </TableCell>
                                        <TableCell align="center">
                                            <UniqueSelect
                                                label={row.aprovacaoADM}
                                                option={comissionStatusOpt}
                                                width="7rem"
                                                field="aprovacaoADM"
                                                where="customField"
                                                color={setColor[payStatus]}
                                                border={borderColor[payStatus]}
                                                fn={[Changer]}
                                            />

                                        </TableCell>
                                        <TableCell align="center">
                                            {row.owner}
                                        </TableCell>
                                        <TableCell align="center">
                                            {row["customFields"]["Data de emissão da venda"]}
                                        </TableCell>
                                    </TableRow>

                                </TableBody>

                            </Table>
                        </Box>
                    </TableRow>

                    <RowTableCustomFields>

                        <TableCell sx={{
                            width: "100%", fontWeight: "", fontSize: ".9rem"

                        }}>
                            Campos personalizados
                        </TableCell>
                    </RowTableCustomFields>
                    <Box sx={{ margin: 1, width: "100%" }} >
                        <Table size="small" aria-label="purchases" >
                            <div
                                style={{
                                    display: "flex",
                                }}
                            >
                                {
                                    customFieldsFiltered.map(res => (
                                        <span
                                            key={res.id}

                                            style={{
                                                display: "grid",
                                                margin: "0 1rem",
                                                textAlign: "center"

                                            }}
                                        >

                                            <div >
                                                {
                                                    res.type === "option" ?
                                                        <div >
                                                            <h4>{res.name}</h4>
                                                            <UniqueSelect
                                                                label={row["customFields"][res.name]}
                                                                option={res.options.map(r => {
                                                                    return {
                                                                        name: r
                                                                    }
                                                                })}
                                                                width="7rem"
                                                                field={res.name}
                                                                where="customField"
                                                                fn={[ChangerCustomFields]}
                                                            />

                                                        </div>

                                                        :
                                                        <div >
                                                            <h4>{res.name}</h4>
                                                            <div >
                                                                {row["customFields"][res.name]}
                                                            </div>
                                                        </div>

                                                }
                                            </div>

                                        </span>


                                    ))
                                }
                            </div>
                        </Table>
                    </Box>
                </Collapse>
            </>
        </React.Fragment >
    )

}
StatusMatricula.propTypes = {
    row: PropTypes.shape({
        assinaturaContratoStatus: PropTypes.string.isRequired,
        owner: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        taxaMatriculaStatus: PropTypes.string.isRequired,
        pagamentoPrimeiraParcelaStatus: PropTypes.string.isRequired,
        materialDidaticoStatus: PropTypes.string.isRequired,
        admResponsavel: PropTypes.string.isRequired,
        primeiraAulaStatus: PropTypes.string.isRequired,
        aprovacaoDirecao: PropTypes.string.isRequired,
        dataValidacao: PropTypes.string.isRequired,
        comissaoStatus: PropTypes.string.isRequired,
        aprovacaoADM: PropTypes.string.isRequired,
        dataComissionamento: PropTypes.string.isRequired,
        customFields: PropTypes.shape({
            "Data de emissão da venda": PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
}
// historic: PropTypes.arrayOf(PropTypes.shape({