import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useState } from 'react';


import { useUser } from '../../hooks/userContext';

import axios from 'axios';
import { Boxes, ButtonDelete, Container, Fades, Filter } from './styles';

const style = {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 490,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
};


import LoadingSpin from 'react-loading-spin';
import generatePDF, { Margin, Resolution } from 'react-to-pdf';
import URI from '../../app/utils/utils';
import { useData } from '../../hooks/dataContext';


export function SureSendModal(data) {

    const [send, setSend] = useState(true)
    const { filteredContracts, headers } = useUser()
    const { content, setView } = useData()

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false)
    const [sendingList, setSendingList] = useState([])

    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        setOpen(false)
        setLoading(false)
        setSendingList([])
    };

    const senderImpressContract = async () => {

        const options = {
            filename: `adesão_${filteredContracts[0].name}`,
            method: 'save',
            resolution: Resolution.NORMAL,

            page: {
                margin: Margin.MEDIUM,
                format: 'A4',
                orientation: 'portrait'
            }
        };

        await generatePDF(content, options)
            .then(res => {
                if (res) {
                    setOpen(!open)
                    send && contaAzulSender()

                }
            })
            .catch(err => {
                if (err) {
                    alert("Erro ao emitir o contrato impresso, tente novemente mais tarde!")
                }
            })

        setLoading(false)

    }


    const client = async (body) => {
        return await new Promise((resolve, reject) => {
            // axios.post("http://localhost:7070/cliente", body, { headers })
            URI.post("/cliente", body, { headers })
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    alert(err.response.data.message)
                    reject(err)
                })
        })
    }

    const contract = async (body) => {
        return await new Promise((resolve, reject) => {
            URI.post("/registro-conta-azul", body, { headers })
                // axios.post("http://localhost:7070/registro-conta-azul", data, { headers })
                .then(res => {
                    resolve(res)
                    alert(res.data.message)

                })
                .catch(err => {
                    console.log(err)
                    alert(err.response.data.message)
                    reject(err)
                })

        })
    }

    const sales = async (body) => {
        if (parseFloat(filteredContracts[0].mdValor) > 0) {
            return await new Promise((resolve, reject) => {
                URI.post("/venda", body, { headers })
                    // axios.post("http://localhost:7070/venda", data, { headers })
                    .then(res => {
                        resolve(res)
                        alert(res.data.message)

                    })
                    .catch(err => {
                        alert(err.response.data.message)
                        reject(err)

                    })
            })
        }
    }

    const feeEnroll = async (body) => {
        if (parseFloat(filteredContracts[0].tmValor) > 0) {
            return await new Promise((resolve, reject) => {
                URI.post("/taxa", body, { headers })
                    // axios.post("http://localhost:7070/taxa", data, { headers })
                    .then(res => {
                        resolve(res)

                        alert(res.data.message)
                    })
                    .catch(err => {
                        // console.log(err.response)
                        alert(err.response.data.message)
                        reject(err)

                    })
            })
        }
    }

    const {
        vendedor, contrato,
        unidade, name, rg,
        cpf, DatadeNascdoResp, CelularResponsavel, EnderecoResponsavel,
        NumeroEnderecoResponsavel, complemento, bairro, cidade,
        estado, cep, profissao,
        email, nomeAluno, cargaHoraria, numeroParcelas, dataUltimaParcelaMensalidade,
        descontoTotal, descontoPorParcela, curso, ppFormaPg, ppVencimento,
        dataUltimaP, materialDidatico, mdValor, mdFormaPg,
        mdVencimento, tmValor, tmFormaPg, tmVencimento, valorCurso, service,
        observacaoRd, mdDesconto, parcelasAfetadas, descontoPrimeirasParcelas, demaisParcelas, descontoDemaisParcelas, promocao
    } = filteredContracts === undefined || filteredContracts[0] === undefined ? {} : filteredContracts[0]

    const body = {
        contrato, vendedor, parcelasAfetadas, descontoPrimeirasParcelas,
        demaisParcelas, descontoDemaisParcelas, promocao,
        unidade, name, rg, cpf,
        DatadeNascdoResp, CelularResponsavel, EnderecoResponsavel,
        NumeroEnderecoResponsavel, complemento,
        bairro, profissao, email, nomeAluno, cargaHoraria,
        numeroParcelas, descontoTotal, descontoPorParcela, curso,
        valorCurso, ppFormaPg, ppVencimento, dataUltimaP,
        materialDidatico, mdValor, mdFormaPg, mdVencimento,
        tmValor, tmFormaPg, tmVencimento, cep, estado, cidade,
        dataUltimaParcelaMensalidade, service,
        observacaoRd, mdDesconto
    }
    async function contaAzulSender() {
        setLoading(true)

        if (body.email === undefined || body.cpf === undefined ||
            body.name === undefined || body.CelularResponsavel === undefined ||
            body.DatadeNascdoResp === undefined ||
            body.cep === undefined ||
            body.estado === undefined ||
            body.cidade === undefined ||
            body.NumeroEnderecoResponsavel === undefined ||
            body.EnderecoResponsavel === undefined ||
            isNaN(parseInt(mdDesconto)) === true) {

            return alert("Contrato não enviado ao Conta Azul, confira os dados do responsável financeiro")
        }

        return await client(body).then(async () => {
            const response = await Promise.allSettled([contract(body), sales(body), feeEnroll(body)])
            for (const r of response) {
                if (r.status === "rejected") {
                    return alert(r.reason.response.data.message)
                }
                alert(r.value)
            }
            setLoading(false)

        })
            .catch((err) => {
                alert(err.response.data.message)
                setLoading(false)
            })

    }

    const handleSendingList = (fn) => {
        const bool = sendingList.some(item => item === fn)
        bool ? setSendingList(sendingList.filter(res => res !== fn)) : setSendingList([...sendingList, fn])

    }


    async function separated() {
        setLoading(true)
        if (sendingList.length === 0) {
            return alert("Você precisa definir pelo menos um tipo de envio para o conta azul")
        }
        if (filteredContracts === undefined || filteredContracts[0] === undefined) {
            return alert("Você precisa definir um contrato primeiro")
        }


        let funcs = {
            "contract": contract,
            "sales": sales,
            "feeEnroll": feeEnroll,
        }

        let promises = []
        for (let i = 0; i < sendingList.length; i++) {
            promises[i] = funcs[sendingList[i]]
        }


        await client(body)
            .then(async () => {
                promises.map(async res => {
                    await new Promise(() => res(body))
                })

            }).catch(() => {
                alert("Erro ao cadastrar o cliente")

            })
        setLoading(false)
    }


    let idioma = import.meta.env.VITE_IDIOMA
    let particulares = import.meta.env.VITE_PARTICULARES
    let standard = import.meta.env.VITE_STANDARD
    let office = import.meta.env.VITE_OFFICE
    let excel = import.meta.env.VITE_EXCEL

    let idiomaPromo = import.meta.env.VITE_IDIOMA_PROMO
    let particularesPromo = import.meta.env.VITE_PARTICULARES_PROMO
    let standardPromo = import.meta.env.VITE_STANDARD_PROMO
    let officePromo = import.meta.env.VITE_OFFICE_PROMO
    let excelPromo = import.meta.env.VITE_EXCEL_PROMO

    async function createContract() {
        const archives = {
            "Kids": filteredContracts[0].promocao === "Não" ? idioma : idiomaPromo,
            "Teens": filteredContracts[0].promocao === "Não" ? idioma : idiomaPromo,
            "Adults and YA": filteredContracts[0].promocao === "Não" ? idioma : idiomaPromo,
            "Little Ones": filteredContracts[0].promocao === "Não" ? idioma : idiomaPromo,
            "Español - En grupo": filteredContracts[0].promocao === "Não" ? idioma : idiomaPromo,
            "Standard One": filteredContracts[0].promocao === "Não" ? standard : standardPromo,
            "Fluency Way One -X": filteredContracts[0].promocao === "Não" ? particulares : particularesPromo,
            "Fluency Way Double - X": filteredContracts[0].promocao === "Não" ? particulares : particularesPromo,
            "Fluency Way Triple - X": filteredContracts[0].promocao === "Não" ? particulares : particularesPromo,
            "Español - X1": filteredContracts[0].promocao === "Não" ? particulares : particularesPromo,
            "Español - X2": filteredContracts[0].promocao === "Não" ? particulares : particularesPromo,
            "Español - X3": filteredContracts[0].promocao === "Não" ? particulares : particularesPromo,
            "Pacote Office Essentials": filteredContracts[0].promocao === "Não" ? office : officePromo,
            "Excel Avaçado": filteredContracts[0].promocao === "Não" ? excel : excelPromo
        }
        setLoading(true)

        filteredContracts[0].vencimento = filteredContracts[0].diaVenvimento.split("/")[0]
        filteredContracts[0].emissao = new Date().toLocaleDateString()
        const rawPhone = filteredContracts[0].CelularResponsavel

        filteredContracts[0].number = rawPhone.includes("+") ? rawPhone : `+55${rawPhone}`

        filteredContracts[0].number = filteredContracts[0].number.includes(" ") ?
            filteredContracts[0].number.replace(" ", "") :
            filteredContracts[0].number

        filteredContracts[0].number = filteredContracts[0].number.includes("-") ?
            filteredContracts[0].number.replace("-", "") :
            filteredContracts[0].number

        const sender = async () => {
            await axios.post(archives[filteredContracts[0].subclasse],
                filteredContracts[0], { headers })
                .then(async () => {
                    setOpen(!open)
                    send && await contaAzulSender()
                }
                )
                .catch(() => {
                    alert("Erro ao enviar ao autentique")
                })
            setLoading(false)
        }


        filteredContracts[0].number.length !== 14 && setLoading(false)

        filteredContracts[0].number.length === 14 ?
            sender() :
            alert("A quantidade de caracteres no telefone de contato desse cliente está errada! O contato precisa ter exatos 14.") && setLoading(false)

    }


    const handleSender = () => {

        if (filteredContracts === undefined) {
            return alert("Nenhum contrato definido")
        }

        if (data.data === 'Conta Azul') {
            contaAzulSender()
        }
        if (data.data === 'Autentique') {
            createContract()
        }
        if (data.data === 'PDF') {
            setView('template')

            setTimeout(() => {
                senderImpressContract()
            }, 1000);
        }
    }



    return (
        <Container>
            <Filter
                onClick={() => handleOpen()}
                style={{ color: "#fff", width: "100%" }}>
                {data.data}
            </Filter>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fades in={open}>
                    <Box sx={style}>
                        {
                            loading === false ?
                                <div>

                                    <Typography id="transition-modal-title" variant="h6" component="h2">
                                        {data.text}
                                    </Typography>

                                    {
                                        data.data !== 'Conta Azul' ?
                                            <>
                                                <Boxes>
                                                    <input type="checkbox" onClick={() => setSend(!send)} className='check' />
                                                    <small>Não enviar este contrato ao Conta Azul</small>
                                                </Boxes>

                                                <Boxes radio>
                                                    <ButtonDelete onClick={() => handleSender()}>Emitir contrato</ButtonDelete>
                                                </Boxes>
                                            </>
                                            :
                                            < >
                                                <Boxes >
                                                    <input type="checkbox"
                                                        onClick={() => handleSendingList("contract")}
                                                        className='check' />
                                                    <small>Contrato</small>
                                                </Boxes>
                                                <Boxes >
                                                    <input type="checkbox"
                                                        onClick={() => handleSendingList("sales")}
                                                        className='check' />
                                                    <small>Material didático</small>
                                                </Boxes>

                                                <Boxes >
                                                    <input type="checkbox"
                                                        onClick={() => handleSendingList("feeEnroll")}
                                                        className='check' />
                                                    <small>Taxa de matrícula</small>
                                                </Boxes>

                                                <Boxes radio>
                                                    <ButtonDelete onClick={() => separated()}>Emitir contrato</ButtonDelete>
                                                </Boxes>
                                            </>
                                    }

                                </div>

                                : <LoadingSpin
                                    duration="30s"
                                    width="15px"
                                    timingFunction="ease-in-out"
                                    direction="alternate"
                                    size="60px"
                                    primaryColor="#1976d2"
                                    secondaryColor="#333"
                                    numberOfRotationsInAnimation={4}
                                    margin='0 auto'
                                />
                        }
                    </Box>

                </Fades>

            </Modal>
        </Container>
    );
}   