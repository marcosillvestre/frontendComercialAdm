import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import * as React from 'react';

import { Collapse, TableBody, TableHead } from '@mui/material';
import { toast } from 'react-toastify';
import { Button, Input, Select, Signs, Text, Trash } from './styles';


import URI from '../../app/utils/utils';
import { useUser } from '../../hooks/userContext';

export function Row(props) {
    const { fetchData, setFetchData, headers, userData } = useUser()
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    const [open4, setOpen4] = React.useState(false);
    const [open5, setOpen5] = React.useState(false);

    const [area, setArea] = React.useState('')
    const [value, setValue] = React.useState('')
    const [id, setId] = React.useState('')

    async function DeleteData(id) {

        await toast.promise(
            URI.delete(`/controle/${id}`, { headers }),
            {
                pending: 'Conferindo os dados',
                success: 'Deletado com sucesso',
                error: 'Alguma coisa deu errado'
            }
        ).then(() => {
            const filtered = fetchData?.filter(res => res.id !== id)
            setFetchData(filtered)
        })
    }

    async function Changer(area, e, id) {
        setArea(area)
        setValue(e)
        setId(id)
    }

    const day = new Date()
    const currentDay = day.toLocaleString()

    async function SenderDirector() {


        await toast.promise(
            URI.put(`/controle/${id}`,
                {
                    "area": area,
                    "value": value,
                    "day": currentDay,
                }, { headers }),
            {
                pending: 'Conferindo os dados',
                success: 'Atualizado com sucesso',
                error: 'Alguma coisa deu errado'
            }
        )
    }

    async function Sender() {
        await toast.promise(
            URI.put(`/controle/${id}`,
                {
                    "area": area,
                    "value": value,
                    "responsible": userData.role !== 'direcao' || userData.role !== 'comercial' ? userData.name : ""
                }, { headers }),
            {
                pending: 'Conferindo os dados',
                success: 'Atualizado com sucesso',
                error: 'Alguma coisa deu errado'
            }
        )
    }


    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} style={{ background: open ? "#eaeaea" : "" }}>

                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>

                <TableCell component="th" scope="row">{row?.aluno}</TableCell>
                <TableCell align="right">{row?.name}</TableCell>
                <TableCell align="right">{row?.unidade}</TableCell>
                <TableCell align="right">{row?.background}</TableCell>
                <TableCell align="right">{row?.tipoMatricula}</TableCell>
                {userData?.admin === true ?
                    <TableCell align="right">
                        <Trash onClick={() => DeleteData(row?.contrato)} />
                    </TableCell> : ""}

            </TableRow>




            <TableRow>

                <TableCell style={{ paddingBottom: 3, paddingTop: 0, width: "66rem" }} colSpan={7}>
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
                            <TableCell style={{ width: "100%" }}>Status da Matrícula</TableCell>
                        </TableRow>

                        <TableCell style={{
                            paddingBottom: 0,
                            paddingTop: 0,
                            width: "66rem",
                        }} colSpan={6}>
                            <Collapse style={{ width: "100%", background: open1 ? "#eaeaea" : "" }} in={open1} timeout="auto" unmountOnExit  >
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left" style={{ fontWeight: "bold" }}>AC Status</TableCell>
                                        <TableCell style={{ fontWeight: "bold" }}>TM Status</TableCell>
                                        <TableCell align="left" style={{ fontWeight: "bold" }} >PP Status</TableCell>
                                        <TableCell align="left" style={{ fontWeight: "bold" }}>MD Status</TableCell>
                                        <TableCell align="left" style={{ fontWeight: "bold" }}>PA Status</TableCell>
                                        <TableCell align="left" style={{ fontWeight: "bold" }}>Data da Matrícula</TableCell>
                                        <TableCell align="right" style={{ fontWeight: "bold" }}>Data da Validação</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key={row?.contrato}>

                                        <TableCell >
                                            {
                                                userData.role === 'comercial' ?
                                                    <p>{row?.acStatus}</p>
                                                    :
                                                    <div style={{ display: "flex" }}>
                                                        <Select onChange={(e) => Changer("acStatus", e.target.value, row?.contrato)}>
                                                            <option value="">{row?.acStatus} </option>
                                                            <option value="pendente">Pendente</option>
                                                            <option value="ok">Ok</option>
                                                            <option value="nao">Não</option>
                                                        </Select>
                                                        <Button onClick={() => userData.role !== 'direcao' ? Sender() : SenderDirector()}> ✔️</Button>
                                                    </div>
                                            }
                                        </TableCell>

                                        <TableCell >
                                            {userData.role === 'comercial' ?
                                                <p>{row?.tmStatus}</p>
                                                :
                                                <div style={{ display: "flex" }}>
                                                    <Select onChange={(e) => Changer("tmStatus", e.target.value, row?.contrato)}>
                                                        <option value="">{row?.tmStatus} </option>
                                                        <option value="pendente">Pendente</option>
                                                        <option value="ok">Ok</option>
                                                        <option value="nao">Não</option>
                                                    </Select>
                                                    <Button onClick={() => userData.role !== 'direcao' ? Sender() : SenderDirector()}> ✔️</Button>
                                                </div>
                                            }
                                        </TableCell>

                                        <TableCell align="left">
                                            {
                                                userData.role === 'comercial' ?
                                                    <p>{row?.ppStatus}</p>
                                                    :
                                                    <div style={{ display: "flex" }}>
                                                        <Select onChange={(e) => Changer("ppStatus", e.target.value, row?.contrato)}>
                                                            <option value="">{row?.ppStatus} </option>
                                                            <option value="pendente">Pendente</option>
                                                            <option value="ok">Ok</option>
                                                            <option value="nao">Não</option>
                                                        </Select>
                                                        <Button onClick={() => userData.role !== 'direcao' ? Sender() : SenderDirector()}> ✔️</Button>
                                                    </div>
                                            }
                                        </TableCell>

                                        <TableCell align="right">
                                            {
                                                userData.role === 'comercial' ?
                                                    <p>{row?.mdStatus}</p>
                                                    :
                                                    <div style={{ display: "flex" }}>
                                                        <Select onChange={(e) => Changer("mdStatus", e.target.value, row?.contrato)}>
                                                            <option value="">{row?.mdStatus} </option>
                                                            <option value="pendente">Pendente</option>
                                                            <option value="ok">Ok</option>
                                                            <option value="nao">Não</option>
                                                        </Select>
                                                        <Button onClick={() => userData.role !== 'direcao' ? Sender() : SenderDirector()}> ✔️</Button>
                                                    </div>
                                            }
                                        </TableCell>
                                        <TableCell  >
                                            {
                                                userData.role === 'comercial' ?
                                                    <p>{row?.paStatus}</p>
                                                    :
                                                    <div style={{ display: "flex" }}>
                                                        <Select onChange={(e) => Changer("paStatus", e.target.value, row?.contrato)}>
                                                            <option value="">{row?.paStatus} </option>
                                                            <option value="pendente">Pendente</option>
                                                            <option value="ok">Ok</option>
                                                            <option value="nao">Não</option>
                                                        </Select>
                                                        <Button onClick={() => userData.role !== 'direcao' ? Sender() : SenderDirector()}> ✔️</Button>
                                                    </div>
                                            }
                                        </TableCell>
                                        <TableCell align="center">
                                            {row?.dataMatricula}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row?.dataValidacao}
                                        </TableCell>

                                    </TableRow>
                                </TableBody>

                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ fontWeight: "bold" }}>Data de Comissionamento </TableCell>
                                        <TableCell style={{ fontWeight: "bold" }}>Emissão da Venda</TableCell>
                                        <TableCell align="left" style={{ fontWeight: "bold" }} > Adm Responsável</TableCell>
                                        <TableCell align="left" style={{ fontWeight: "bold" }}>Status Direção</TableCell>
                                        <TableCell align="left" style={{ fontWeight: "bold" }}>Obs. Matrícula</TableCell>
                                        <TableCell align="left" style={{ fontWeight: "bold" }}>Aprovação Adm</TableCell>
                                        <TableCell align="left" style={{ fontWeight: "bold" }}>Vendedor</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key={row?.contrato}>

                                        <TableCell component="th" scope="row"  >
                                            {userData.role === 'comercial' ? "" :

                                                <div style={{ display: "flex", margin: ".5rem 0 " }}>
                                                    <Input type="date" onChange={(e) => Changer("dataComissionamento", e.target.value, row?.contrato)} />
                                                    <Button onClick={() => userData.role !== 'direcao' ? Sender() : SenderDirector()}> ✔️</Button>
                                                </div>}

                                            <p>Atualmente {row?.dataComissionamento}</p>

                                        </TableCell>
                                        <TableCell align="center">
                                            {row?.dataMatricula}
                                        </TableCell>
                                        <TableCell align="center"> {row?.responsavelADM}</TableCell>
                                        <TableCell align="right">
                                            {
                                                userData.role === 'direcao' ?
                                                    <div style={{ display: "flex" }}>
                                                        <Select onChange={(e) => Changer("aprovacaoDirecao", e.target.value, row?.contrato)}>
                                                            <option value="">{row?.aprovacaoDirecao} </option>
                                                            <option value="pendente">Pendente</option>
                                                            <option value="ok">Ok</option>
                                                            <option value="nao">Não</option>
                                                        </Select>
                                                        <Button onClick={() => userData.role !== 'direcao' ? Sender() : SenderDirector()}> ✔️</Button>
                                                    </div>
                                                    : <p>{row?.aprovacaoDirecao}</p>
                                            }
                                        </TableCell>
                                        <TableCell align="right" style={{ display: "flex" }}>
                                            <Button onClick={() => userData.role !== 'direcao' ? Sender() : SenderDirector()}> ✔️</Button>
                                            <Text cols='3' placeholder={row?.observacao} onChange={(e) => Changer("observacao", e.target.value, row?.contrato)}></Text>
                                        </TableCell>
                                        <TableCell align="center">
                                            {
                                                userData.role === 'comercial' ?
                                                    <p>{row?.aprovacaoADM}</p>
                                                    :
                                                    <div style={{ display: "flex" }}>
                                                        <Select onChange={(e) => Changer("aprovacaoADM", e.target.value, row?.contrato)}>
                                                            <option value="">{row?.aprovacaoADM} </option>
                                                            <option value="pendente">Pendente</option>
                                                            <option value="ok">Ok</option>
                                                            <option value="nao">Não</option>
                                                        </Select>
                                                        <Button onClick={() => userData.role !== 'direcao' ? Sender() : SenderDirector()}> ✔️</Button>
                                                    </div>}
                                        </TableCell>
                                        <TableCell align="left"> {row?.owner}</TableCell>


                                    </TableRow>
                                </TableBody>
                            </Collapse>
                        </TableCell>













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
                            <TableCell >Informações do Contrato </TableCell>
                        </TableRow>
                        <TableCell style={{
                            paddingBottom: 0,
                            paddingTop: 0,
                            width: "66rem",
                        }} colSpan={6}>
                            <Collapse style={{ background: open2 ? "#eaeaea" : "" }} in={open2} timeout="auto" unmountOnExit>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ fontWeight: "bold" }}>N° do Contrato</TableCell>
                                        <TableCell style={{ fontWeight: "bold" }}>Início do Contrato</TableCell>
                                        <TableCell align="right" style={{ fontWeight: "bold" }} >Fim do Contrato</TableCell>
                                        <TableCell align="right" style={{ fontWeight: "bold" }}>Tipo de Assinatura</TableCell>
                                        <TableCell align="center" style={{ fontWeight: "bold" }}>Data AC</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key={row?.contrato}>

                                        <TableCell component="th" scope="row" >
                                            {row?.contrato}
                                        </TableCell>
                                        <TableCell >
                                            {row?.inicioContrato}
                                        </TableCell>
                                        <TableCell align="right"> {row?.fimContrato}</TableCell>
                                        <TableCell align="right">
                                            {row?.acFormato}
                                        </TableCell>
                                        <TableCell align="right" >
                                            {
                                                row?.dataAC?.map(res => (
                                                    <Signs key={res}>
                                                        {
                                                            res.body1?.signed1 ||
                                                                res.body2?.signed2 ||
                                                                res.body3?.signed3 ||
                                                                res.body4?.signed4 ?
                                                                <>
                                                                    <div key={res.body1?.email1}>
                                                                        {
                                                                            res.body1?.signed1 ?
                                                                                <p>{res.body1?.name1} assinou {res.body1?.signed1} </p>
                                                                                : ""
                                                                        }
                                                                    </div>
                                                                    <div key={res.body2?.email2}>
                                                                        {
                                                                            res.body2?.signed2 ?
                                                                                <p>{res.body2?.name2} assinou {res.body2?.signed2}</p>
                                                                                : ""
                                                                        }
                                                                    </div>
                                                                    <div key={res.body3?.email3}>
                                                                        {
                                                                            res.body3?.signed3 ?
                                                                                <p>{res.body3?.name3} assinou {res.body3?.signed3}</p>
                                                                                : <p>{res.body3?.name3} ainda não assinou</p>
                                                                        }
                                                                    </div>
                                                                    <div key={res.body4?.email4}>
                                                                        {
                                                                            res.body4?.signed4 ?
                                                                                <p>{res.body4?.name4} assinou {res.body4?.signed4}</p>
                                                                                : <p>{res.body4?.name4} ainda não assinou</p>
                                                                        }
                                                                    </div>
                                                                </> : <p>Ninguém assinou ainda</p>
                                                        }
                                                    </Signs>
                                                ))
                                            }
                                        </TableCell>

                                    </TableRow>
                                </TableBody>

                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ fontWeight: "bold" }}>Status do Contrato</TableCell>
                                        <TableCell style={{ fontWeight: "bold" }}>Carga Horária</TableCell>
                                        <TableCell align="center" style={{ fontWeight: "bold" }}>Tempo de Contrato</TableCell>
                                        <TableCell align="right" style={{ fontWeight: "bold" }}>Mês/Ano</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key={row?.contrato}>

                                        <TableCell component="th" scope="row" style={{ display: "grid" }}>

                                            {

                                                row?.dataAC.map(res => (
                                                    res.body1?.signed1 ||
                                                        res.body2?.signed2 ||
                                                        res.body3?.signed3 ||
                                                        res.body4?.signed4 ?
                                                        <p key={res}>{res.body1?.name1}, {res.body2?.name2},
                                                            {res.body3?.name3}, {res.body4?.name4} assinaram</p>
                                                        : <p key={res}>Ningúem assinou ainda</p>
                                                ))
                                            }

                                        </TableCell>
                                        <TableCell align="center">
                                            {row?.cargaHoraria}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row?.dataMatricula}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row?.dataValidacao.split("/")[1]}
                                        </TableCell>

                                    </TableRow>
                                </TableBody>
                            </Collapse>
                        </TableCell>











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
                            <TableCell>Informações financeiras </TableCell>
                        </TableRow>
                        <TableCell style={{
                            paddingBottom: 0,
                            paddingTop: 0,
                            width: "69rem",
                        }} colSpan={6}>
                            <Collapse style={{ background: open3 ? "#eaeaea" : "" }} in={open3} timeout="auto" unmountOnExit>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ fontWeight: "bold" }}>TM Valor</TableCell>
                                        <TableCell style={{ fontWeight: "bold" }}>TM Desconto</TableCell>
                                        <TableCell align="right" style={{ fontWeight: "bold" }} >TM Vencimento</TableCell>
                                        <TableCell align="right" style={{ fontWeight: "bold" }}>TM Forma de Pg.</TableCell>
                                        <TableCell align="right" style={{ fontWeight: "bold" }}>TM Parcelas</TableCell>
                                        <TableCell align="center" style={{ fontWeight: "bold" }}>Situação TM</TableCell>
                                        <TableCell align="center" style={{ fontWeight: "bold" }}>Data Realizada</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key={row?.contrato}>

                                        <TableCell component="th" scope="row" style={{ display: "grid" }}>
                                            {row?.tmValor}
                                        </TableCell>
                                        <TableCell >
                                            {row?.tmDesconto}
                                        </TableCell>
                                        <TableCell align="center">
                                            {row?.tmVencimento}
                                        </TableCell>
                                        <TableCell align="center">
                                            {row?.tmFormaPg}
                                        </TableCell>
                                        <TableCell align="center">
                                            {row?.tmParcelas}
                                        </TableCell>
                                        <TableCell align="center">
                                            {
                                                userData.role === 'comercial' ?
                                                    <p>{row?.tmStatus}</p>
                                                    :
                                                    <div style={{ display: "flex" }}>
                                                        <Select onChange={(e) => Changer("tmStatus", e.target.value, row?.contrato)}>
                                                            <option value="">{row?.tmStatus} </option>
                                                            <option value="pendente">Pendente</option>
                                                            <option value="ok">Ok</option>
                                                            <option value="nao">Não</option>
                                                        </Select>
                                                        <Button onClick={() => userData.role !== 'direcao' ? Sender() : SenderDirector()}> ✔️</Button>
                                                    </div>
                                            }

                                        </TableCell>
                                        <TableCell align="center">
                                            {
                                                userData.role === 'comercial' ?
                                                    <p>Atualmente {row?.tmData}</p>
                                                    :
                                                    <>
                                                        <div style={{ display: "flex", margin: ".5rem 0 " }}>
                                                            <Input type="date" onChange={(e) => Changer("tmData", e.target.value, row?.contrato)} />
                                                            <Button onClick={() => userData.role !== 'direcao' ? Sender() : SenderDirector()}> ✔️</Button>
                                                        </div>
                                                        {row?.tmData ?
                                                            <p>Atualmente {row?.tmData}</p> : ""}
                                                    </>
                                            }
                                        </TableCell>
                                    </TableRow>
                                </TableBody>

                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ fontWeight: "bold" }}>Parcela Valor</TableCell>
                                        <TableCell style={{ fontWeight: "bold" }}>Parcela Desconto</TableCell>
                                        <TableCell align="right" style={{ fontWeight: "bold" }} >PP Vencimento</TableCell>
                                        <TableCell align="right" style={{ fontWeight: "bold" }}>PP Forma de Pg.</TableCell>
                                        <TableCell align="right" style={{ fontWeight: "bold" }}>Número de parcelas</TableCell>
                                        <TableCell align="center" style={{ fontWeight: "bold" }}>Situação PP</TableCell>
                                        <TableCell align="center" style={{ fontWeight: "bold" }}>Data Realizada</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key={row?.contrato}>

                                        <TableCell component="th" scope="row" >
                                            {row?.ppValor}
                                        </TableCell>
                                        <TableCell >
                                            {row?.ppDesconto}
                                        </TableCell>
                                        <TableCell align="center">
                                            {row?.ppVencimento}
                                        </TableCell>
                                        <TableCell align="center">
                                            {row?.ppFormaPg}
                                        </TableCell>
                                        <TableCell align="center">
                                            {row?.ppParcelas}
                                        </TableCell>
                                        <TableCell align="center">
                                            {
                                                userData.role === 'comercial' ?
                                                    <p>{row?.ppStatus}</p>
                                                    :
                                                    <div style={{ display: "flex" }}>
                                                        <Select onChange={(e) => Changer("ppStatus", e.target.value, row?.contrato)}>
                                                            <option value="">{row?.ppStatus} </option>
                                                            <option value="pendente">Pendente</option>
                                                            <option value="ok">Ok</option>
                                                            <option value="nao">Não</option>
                                                        </Select>
                                                        <Button onClick={() => userData.role !== 'direcao' ? Sender() : SenderDirector()}> ✔️</Button>
                                                    </div>
                                            }
                                        </TableCell>
                                        <TableCell align="right">
                                            {
                                                userData.role === 'comercial' ?
                                                    <p>Atualmente {row?.ppData}</p>
                                                    :
                                                    <>
                                                        <div style={{ display: "flex", margin: ".5rem 0 " }}>
                                                            <Input type="date" onChange={(e) => Changer("ppData", e.target.value, row?.contrato)} />
                                                            <Button onClick={() => userData.role !== 'direcao' ? Sender() : SenderDirector()}> ✔️</Button>
                                                        </div>
                                                        {row?.ppData ?
                                                            <p>Atualmente {row?.ppData}</p> : ""}
                                                    </>
                                            }
                                        </TableCell>

                                    </TableRow>
                                </TableBody>

                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ fontWeight: "bold" }}>MD Valor</TableCell>
                                        <TableCell style={{ fontWeight: "bold" }}>MD Desconto</TableCell>
                                        <TableCell align="right" style={{ fontWeight: "bold" }} >MD Vencimento</TableCell>
                                        <TableCell align="right" style={{ fontWeight: "bold" }}>MD Forma de Pg.</TableCell>
                                        <TableCell align="right" style={{ fontWeight: "bold" }}>MD Parcelas</TableCell>
                                        <TableCell align="center" style={{ fontWeight: "bold" }}>Situação MD</TableCell>
                                        <TableCell align="center" style={{ fontWeight: "bold" }}>Data Realizada</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key={row?.contrato}>

                                        <TableCell component="th" scope="row" >
                                            <div>
                                                {row?.mdValor}
                                            </div>
                                        </TableCell>
                                        <TableCell >
                                            {row?.mdDesconto}
                                        </TableCell>
                                        <TableCell align="center">
                                            {row?.mdVencimento}
                                        </TableCell>
                                        <TableCell align="center">
                                            {row?.mdFormaPg}
                                        </TableCell>
                                        <TableCell align="center">
                                            {row?.mdParcelas}
                                        </TableCell>
                                        <TableCell align="center">
                                            {
                                                userData.role === 'comercial' ?
                                                    <p>{row?.mdStatus}</p>
                                                    :
                                                    <div style={{ display: "flex" }}>
                                                        <Select onChange={(e) => Changer("mdStatus", e.target.value, row?.contrato)}>
                                                            <option value="">{row?.mdStatus} </option>
                                                            <option value="pendente">Pendente</option>
                                                            <option value="ok">Ok</option>
                                                            <option value="nao">Não</option>
                                                        </Select>
                                                        <Button onClick={() => userData.role !== 'direcao' ? Sender() : SenderDirector()}> ✔️</Button>
                                                    </div>
                                            }
                                        </TableCell>
                                        <TableCell align="center">
                                            {
                                                userData.role === 'comercial' ?
                                                    <p>Atualmente {row?.mdData}</p>
                                                    :
                                                    <>
                                                        <div style={{ display: "flex", margin: ".5rem 0 " }}>
                                                            <Input type="date" onChange={(e) => Changer("mdData", e.target.value, row?.contrato)} />
                                                            <Button onClick={() => userData.role !== 'direcao' ? Sender() : SenderDirector()}> ✔️</Button>
                                                        </div>
                                                        {row?.mdData ?
                                                            <p>Atualmente {row?.mdData}</p> : ""}
                                                    </>
                                            }
                                        </TableCell>

                                    </TableRow>
                                </TableBody>
                            </Collapse>
                        </TableCell>










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
                            <TableCell> Informações do Aluno e Responsável </TableCell>
                        </TableRow>
                        <TableCell style={{
                            paddingBottom: 0,
                            paddingTop: 0,
                            width: "66rem",
                        }} colSpan={6}>
                            <Collapse style={{ background: open4 ? "#eaeaea" : "" }} in={open4} timeout="auto" unmountOnExit>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ fontWeight: "bold" }}>Aluno</TableCell>
                                        <TableCell style={{ fontWeight: "bold" }}>Data de Nascimento</TableCell>
                                        <TableCell align="right" style={{ fontWeight: "bold" }} >Idade do Aluno</TableCell>
                                        <TableCell align="center" style={{ fontWeight: "bold" }}>Telefone</TableCell>
                                        <TableCell align="center" style={{ fontWeight: "bold" }}>Email</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key={row?.contrato}>

                                        <TableCell component="th" scope="row" style={{ display: "grid" }}>
                                            {row?.name}
                                        </TableCell>
                                        <TableCell align="center">
                                            {row?.alunoNascimento}
                                        </TableCell>
                                        <TableCell align="center">
                                            {row?.idadeAluno} anos
                                        </TableCell>
                                        <TableCell align="right">
                                            {row?.tel}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row?.email}
                                        </TableCell>

                                    </TableRow>
                                </TableBody>

                            </Collapse>
                        </TableCell>










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
                            <TableCell >Informações Pedagógicas</TableCell>
                        </TableRow>
                        <TableCell style={{
                            paddingBottom: 0,
                            paddingTop: 0,
                            width: "66rem",
                        }} colSpan={6}>
                            <Collapse style={{ background: open5 ? "#eaeaea" : "" }} in={open5} timeout="auto" unmountOnExit>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ fontWeight: "bold" }}>Pa Data</TableCell>
                                        <TableCell style={{ fontWeight: "bold" }}>Classe</TableCell>
                                        <TableCell align="right" style={{ fontWeight: "bold" }} >SubClasse</TableCell>
                                        <TableCell align="center" style={{ fontWeight: "bold" }}>Material Didático</TableCell>
                                        <TableCell align="right" style={{ fontWeight: "bold" }}>Nivelamento </TableCell>
                                        <TableCell align="right" style={{ fontWeight: "bold" }}>Dia de Aula</TableCell>
                                        <TableCell align="right" style={{ fontWeight: "bold" }}>Horário Início</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key={row?.contrato}>

                                        <TableCell component="th" scope="row" style={{ display: "grid" }}>
                                            {row?.paDATA}
                                        </TableCell>
                                        <TableCell >
                                            {row?.classe}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row?.subclasse}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row?.materialDidatico.map(res => (<p key={res}>{res}</p>))}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row?.nivelamento}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row?.diaAula.map(res => (<p key={res}>{res}</p>))}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row?.horarioInicio}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>

                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ fontWeight: "bold" }}>Horário Fim</TableCell>
                                        <TableCell style={{ fontWeight: "bold" }}>Professor</TableCell>
                                        <TableCell align="right" style={{ fontWeight: "bold" }} >Tipo/Modalidade</TableCell>
                                        <TableCell align="right" style={{ fontWeight: "bold" }}>Formato de Aula</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key={row?.contrato}>

                                        <TableCell component="th" scope="row">
                                            {row?.horarioFim}
                                        </TableCell>
                                        <TableCell >
                                            {row?.professor.map(res => (<p key={res}>{res}</p>))}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row?.tipoModalidade}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row?.formatoAula}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Collapse>
                        </TableCell>


                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment >
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        observacao: PropTypes.string.isRequired,
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



