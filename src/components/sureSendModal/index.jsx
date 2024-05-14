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


import { useMutation } from '@tanstack/react-query';
import generatePDF, { Margin, Resolution } from 'react-to-pdf';
import { toast } from 'react-toastify';
import URI from '../../app/utils/utils';
import { useData } from '../../hooks/dataContext';


export function SureSendModal(data) {

    const [send, setSend] = useState(true)
    const { filteredContracts, headers } = useUser()
    const { content, setView } = useData()

    const [open, setOpen] = useState(false);
    const [sendingList, setSendingList] = useState([])

    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        setOpen(false)
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

        await toast.promise(
            generatePDF(content, options)
                .then(res => {
                    if (res) {
                        setOpen(!open)
                        send && contaAzulSender()

                    }
                })
            , {
                pending: 'Criando o documento',
                success: 'Baixado com sucesso',
                error: 'Alguma coisa deu errado'
            }
        )
    }


    const client = async (body) => {
        await toast.promise(
            // axios.post("http://localhost:7070/cliente", body, { headers })
            URI.post("/cliente", body, { headers })

            , {
                pending: 'Criando o cadastro no CA',
                success: 'Criado com sucesso',
                error: "Erro ao criar cadastro"
            }
        )
            .catch(res => alert(res.response.data.message))

    }

    const contract = async (body) => {
        await toast.promise(
            // axios.post("http://localhost:7070/registro-conta-azul", body, { headers })
            URI.post("/registro-conta-azul", body, { headers })
            , {
                pending: 'Enviando o contrato',
                success: 'Enviado com sucesso',
                error: "Erro ao criar o contrato"
            }
                .catch(res => alert(res.response.data.message))
        )

    }

    const sales = async (body) => {
        if (parseFloat(filteredContracts[0].mdValor) > 0) {

            await toast.promise(
                // axios.post("http://localhost:7070/venda", body, { headers })
                URI.post("/venda", body, { headers })
                , {
                    pending: 'Enviando o material didático',
                    success: 'Enviado com sucesso',
                    error: "Erro ao enviar o material didático"
                }
            )
                .catch(res => alert(res.response.data.message))
        }
    }

    const feeEnroll = async (body) => {
        if (parseFloat(filteredContracts[0].tmValor) > 0) {
            await toast.promise(
                // axios.post("http://localhost:7070/taxa", body, { headers })
                URI.post("/taxa", body, { headers })
                , {
                    pending: 'Enviando a taxa de matrícula',
                    success: 'Enviado com sucesso',
                    error: "Erro ao enviar a taxa de matrícula"
                }
            )
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


        mutateEverything.mutateAsync()
    }



    const sendEverything = async () => {
        client(body)
            .then(async () => {
                await Promise.all([
                    contract(body),
                    sales(body),
                    feeEnroll(body),
                ])

            })
    }


    const mutateEverything = useMutation({
        mutationFn: () => sendEverything(),
        // onSuccess: () =>
    })



    const handleSendingList = (fn) => {
        const bool = sendingList.some(item => item === fn)
        bool ? setSendingList(sendingList.filter(res => res !== fn)) : setSendingList([...sendingList, fn])

    }


    async function separated() {
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
        }


        filteredContracts[0].number.length === 14 ?
            sender() :
            alert("A quantidade de caracteres no telefone de contato desse cliente está errada! O contato precisa ter exatos 14.")

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
            }, 500);
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

                        }
                    </Box>

                </Fades>

            </Modal>
        </Container>
    );
}   