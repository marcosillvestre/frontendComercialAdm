import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import * as React from 'react';

import { Collapse } from '@mui/material';
import { RowTable, Select, Td } from './styles';


import { useData } from '../../../hooks/dataContext';
import { useUser } from '../../../hooks/userContext';

import { FifthDrop, FirstDrop, FourthDrop, SeccDrop, SixthDrop, ThirdDrop } from './source.jsx';

import { PopOverControl } from '../../popovers/popOverControl/index.jsx';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import LoadingSpin from 'react-loading-spin';
import colorsRules from '../../../app/utils/Rules/colors.jsx';
import businessRules from '../../../app/utils/Rules/options.jsx';
import URI from '../../../app/utils/utils.jsx';
import { useUnities } from '../../../hooks/unities/unitiesContext.hook.jsx';
import { SeventhDrop } from './seventhDrop/index.jsx';


export function FirstRow(props) {
    const queryCache = useQueryClient();

    const { comissionStatusOpt, coursesOpt, backgroundOpt } = businessRules
    const { setColor, setClearColor } = colorsRules

    const { Sender, SenderDirector, userData, headers } = useUser()
    const { handleCustomizableData, customizableArray } = useData()
    const { unityQuery } = useUnities()

    const { row, index } = props;


    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    const [open4, setOpen4] = React.useState(false);
    const [open5, setOpen5] = React.useState(false);
    const [open6, setOpen6] = React.useState(false);
    const [open7, setOpen7] = React.useState(false);

    const [contract, setContract] = React.useState(row.contrato);

    const [value, setValue] = React.useState('')
    const [payStatus, setPayStatus] = React.useState(row.tipoMatricula)

    const Changer = async (area, e, id) => {
        setValue(e)
        area === "tipoMatricula" && setPayStatus(e)

        if (userData.role !== 'direcao') {
            area !== 'observacao' && Sender(area, e, id, value)
        }
        if (userData.role === 'direcao') {
            area !== 'observacao' && SenderDirector(area, e, id, value)
        }
    }

    const { data, isPending, refetch, } = useQuery({
        queryFn: () => {
            if (headers.Authorization.includes("undefined") === false && contract !== "") {
                // return axios.get(`http://localhost:7070/pessoal?contract=${contract}`, { headers }).then(res => res.data)
                return URI.get(`/pessoal?contract=${contract}`).then(res => res.data)
            }
        },
        queryKey: [contract],
        onError: (err) => console.log(err)
    })

    const { data: file, isPending: filePending, refetch: fileRefetch } = useQuery({
        queryFn: () => {
            return URI.get(`/files?contract=${contract}`).then(res => res.data)
        },
        queryKey: ["file" + contract],
        onError: (err) => console.log(err)
    })

    async function GetFiles(ctr) {
        setContract(ctr)

        if (open2 === false && ctr !== contract) {
            queryCache.invalidateQueries(["file" + contract])
            fileRefetch()
        }
        if (open2 === false && ctr === contract) {
            fileRefetch()
        }
    }


    async function GetHistoric(ctr) {
        setContract(ctr)
        setOpen7(!open7)

        if (open7 === false && ctr !== contract) {
            queryCache.invalidateQueries([contract])
            refetch()
        }
        if (open7 === false && ctr === contract) {
            refetch()
        }


    }

    return (
        <React.Fragment>
            <RowTable
                validated={row.dataValidacao === '' && true}
                openned={open && true}
                style={{
                    backgroundColor: payStatus !== row?.tipoMatricula
                        ? setClearColor[payStatus] : setClearColor[row?.tipoMatricula]
                }}
            >

                <TableCell align='center'>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                {
                    userData.admin &&
                    <TableCell
                        align="center"
                    >
                        <input
                            style={{ width: '1rem', height: '1rem' }}
                            type="checkbox"
                            name={row?.contrato}
                            onChange={handleCustomizableData}
                            value={index}
                            checked={customizableArray[index]?.isChecked === true || false}
                        />
                    </TableCell>
                }

                <TableCell align="center">{row?.dataMatricula} </TableCell>
                <TableCell align="center">{row?.aluno}</TableCell>
                <TableCell align="center">{row?.name}</TableCell>
                <TableCell align='center'>

                    {
                        userData.admin === false ?
                            <Td >{row?.curso}</Td>
                            :
                            <Td >
                                <Select
                                    defaultValue={row?.curso}
                                    onChange={(e) => Changer("curso", e.target.value, row?.contrato)}>
                                    {
                                        coursesOpt.map(res => (
                                            <option value={res} key={res}>{res}</option>
                                        ))
                                    }

                                </Select>
                            </Td>
                    }

                </TableCell>
                <TableCell align='center'>

                    {
                        userData.admin === false ?
                            <Td >{row?.unidade}</Td>
                            :
                            <Td >
                                <Select defaultValue={row?.unidade} onChange={(e) => Changer("unidade", e.target.value, row?.contrato)}>
                                    {
                                        unityQuery.data && unityQuery.data.map(res => (
                                            <option key={res.id} value={res.name}>{res.name}</option>
                                        ))
                                    }

                                </Select>
                            </Td>
                    }

                </TableCell>
                <TableCell align='center'>

                    {
                        userData.admin === false ?
                            <Td >{row?.background}</Td>
                            :
                            <Td >
                                <Select defaultValue={row?.background} onChange={(e) => Changer("background", e.target.value, row?.contrato)}>
                                    {
                                        backgroundOpt.map(res => (
                                            <option value={res.name} key={res.name}>{res.name}</option>
                                        ))
                                    }
                                </Select>
                            </Td>
                    }

                </TableCell>

                <TableCell
                    align="center"
                >
                    {
                        userData.admin === false ?
                            <Td style={{
                                backgroundColor: setColor[row?.tipoMatricula],
                                borderRadius: "5px",
                                padding: "5px",
                                userSelect: "none"
                            }} >
                                {row?.tipoMatricula}
                            </Td>
                            :
                            <Td >
                                <Select
                                    style={{
                                        backgroundColor: payStatus !== row?.tipoMatricula
                                            ? setColor[payStatus] : setColor[row?.tipoMatricula]
                                    }}
                                    defaultValue={row?.tipoMatricula}
                                    onChange={(e) =>
                                        Changer("tipoMatricula", e.target.value, row?.contrato)}>
                                    {
                                        comissionStatusOpt.map((res, i) => (
                                            <option value={res.name} key={i}>{res.name}</option>
                                        ))}
                                </Select>

                            </Td>
                    }
                </TableCell>


                <TableCell align="center">

                    <PopOverControl row={row} />

                </TableCell>

            </RowTable>

            <TableRow>
                <TableCell style={{ paddingBottom: 3, paddingTop: 0 }} colSpan={7}>
                    <Collapse in={open} timeout="auto" unmountOnExit>

                        <TableRow style={{ width: "100%", }}>
                            <TableCell>
                                <IconButton
                                    aria-label="expand row"
                                    size="small"
                                    onClick={() => setOpen1(!open1)}
                                >
                                    {open1 ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                </IconButton>
                            </TableCell>
                            <TableCell style={{ width: "100%" }}>1 - Status da Matrícula</TableCell>
                        </TableRow>

                        <FirstDrop data={row} open={open1} />





                        <TableRow style={{ width: "100%", }}>
                            <TableCell>
                                <IconButton
                                    aria-label="expand row"
                                    size="small"
                                    onClick={() => {
                                        setOpen6(!open6)
                                        GetFiles(row?.contrato)

                                    }}
                                >
                                    {open6 ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                </IconButton>
                            </TableCell>
                            <TableCell style={{ width: "100%" }}>2 - Observaçôes e anexos</TableCell>
                        </TableRow>
                        {
                            filePending
                                ?
                                <LoadingSpin
                                    duration="20s"
                                    width="15px"
                                    timingFunction="ease-in-out"
                                    direction="alternate"
                                    size="60px"
                                    primaryColor="#1976d2"
                                    secondaryColor="#333"
                                    numberOfRotationsInAnimation={10}
                                    margin='0 auto'
                                />
                                :
                                <SeccDrop data={row} open={open6} files={file} />
                        }









                        <TableRow >
                            <TableCell>
                                <IconButton
                                    aria-label="expand row"
                                    size="small"
                                    onClick={() => setOpen2(!open2)}
                                >
                                    {open2 ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                </IconButton>
                            </TableCell>
                            <TableCell >3 - Informações do Contrato </TableCell>
                        </TableRow>

                        <ThirdDrop data={row} open={open2} />









                        <TableRow >
                            <TableCell>
                                <IconButton
                                    aria-label="expand row"
                                    size="small"
                                    onClick={() => setOpen3(!open3)}
                                >
                                    {open3 ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                </IconButton>
                            </TableCell>
                            <TableCell>4 - Informações financeiras </TableCell>
                        </TableRow>

                        <FourthDrop data={row} open={open3} />








                        <TableRow >
                            <TableCell>
                                <IconButton
                                    aria-label="expand row"
                                    size="small"
                                    onClick={() => setOpen4(!open4)}
                                >
                                    {open4 ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                </IconButton>
                            </TableCell>
                            <TableCell> 5 - Informações do Aluno e Responsável </TableCell>
                        </TableRow>

                        <FifthDrop data={row} open={open4} />








                        <TableRow >
                            <TableCell>
                                <IconButton
                                    aria-label="expand row"
                                    size="small"
                                    onClick={() => setOpen5(!open5)}
                                >
                                    {open5 ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                </IconButton>
                            </TableCell>
                            <TableCell >6 - Informações Pedagógicas</TableCell>
                        </TableRow>

                        <SixthDrop data={row} open={open5} />








                        <TableRow >
                            <TableCell>
                                <IconButton
                                    aria-label="expand row"
                                    size="small"
                                    onClick={() => GetHistoric(row?.contrato)}
                                >
                                    {open7 ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                </IconButton>
                            </TableCell>
                            <TableCell >7 - Histórico de alterações</TableCell>
                        </TableRow>
                        {
                            isPending ?
                                <LoadingSpin
                                    duration="20s"
                                    width="15px"
                                    timingFunction="ease-in-out"
                                    direction="alternate"
                                    size="60px"
                                    primaryColor="#1976d2"
                                    secondaryColor="#333"
                                    numberOfRotationsInAnimation={10}
                                    margin='0 auto'
                                />
                                :
                                <SeventhDrop data={data} open={open7} />
                        }


                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment >
    );
}

FirstRow.propTypes = {
    index: PropTypes.shape({
        index: PropTypes.number
    }),
    row: PropTypes.shape({
        observacao: PropTypes.array.isRequired,
        curso: PropTypes.string.isRequired,
        contrato: PropTypes.string.isRequired,
        aprovacaoDirecao: PropTypes.string.isRequired,
        paStatus: PropTypes.string.isRequired,
        mdStatus: PropTypes.string.isRequired,
        responsavelADM: PropTypes.string.isRequired,
        tmStatus: PropTypes.string.isRequired,
        acStatus: PropTypes.string.isRequired,
        ppStatus: PropTypes.string.isRequired,
        inicioContrato: PropTypes.string.isRequired,
        fimContrato: PropTypes.string.isRequired,
        paDATA: PropTypes.string.isRequired,
        diretorResponsavel: PropTypes.string.isRequired,
        aprovacaoADM: PropTypes.string.isRequired,
        comissaoValor: PropTypes.string.isRequired,
        tipoComissao: PropTypes.string.isRequired,
        tipoMatricula: PropTypes.string.isRequired,
        Valor: PropTypes.number.isRequired,
        id: PropTypes.number.isRequired,
        email: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        tel: PropTypes.string.isRequired,
        aluno: PropTypes.string.isRequired,
        background: PropTypes.string.isRequired,
        classe: PropTypes.string.isRequired,
        subclasse: PropTypes.string.isRequired,
        tmVencimento: PropTypes.string.isRequired,
        acFormato: PropTypes.string.isRequired,
        unidade: PropTypes.string.isRequired,
        ppVencimento: PropTypes.string.isRequired,
        tmValor: PropTypes.string.isRequired,
        dataMatricula: PropTypes.string.isRequired,
        dataValidacao: PropTypes.string.isRequired,
        dataComissionamento: PropTypes.string.isRequired,
        contratoStatus: PropTypes.string.isRequired,
        cargaHoraria: PropTypes.string.isRequired,
        tmFormaPg: PropTypes.string.isRequired,
        tmDesconto: PropTypes.string.isRequired,
        tmParcelas: PropTypes.string.isRequired,
        ppValor: PropTypes.string.isRequired,
        ppDesconto: PropTypes.string.isRequired,
        ppFormaPg: PropTypes.string.isRequired,
        ppParcelas: PropTypes.string.isRequired,
        mdValor: PropTypes.string.isRequired,
        mdDesconto: PropTypes.string.isRequired,
        mdVencimento: PropTypes.string.isRequired,
        mdFormaPg: PropTypes.string.isRequired,
        mdParcelas: PropTypes.string.isRequired,
        alunoNascimento: PropTypes.string.isRequired,
        idadeAluno: PropTypes.string.isRequired,
        nivelamento: PropTypes.string.isRequired,
        horarioInicio: PropTypes.string.isRequired,
        horarioFim: PropTypes.string.isRequired,
        tipoModalidade: PropTypes.string.isRequired,
        formatoAula: PropTypes.string.isRequired,
        materialDidatico: PropTypes.array.isRequired,
        dataAC: PropTypes.array.isRequired,
        diaAula: PropTypes.array.isRequired,
        professor: PropTypes.array.isRequired,
        tmData: PropTypes.string.isRequired,
        ppData: PropTypes.string.isRequired,
        mdData: PropTypes.string.isRequired,
        owner: PropTypes.string.isRequired,

    }).isRequired,


};



