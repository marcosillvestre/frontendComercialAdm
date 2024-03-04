import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import * as React from 'react';


import { useUser } from '../../hooks/userContext';

import axios from 'axios';
import { Boxes, ButtonDelete, Fades, Filter } from './styles';

const style = {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
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

    const [send, setSend] = React.useState(true)
    const { filteredContracts, headers } = useUser()
    const { content, setView } = useData()

    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false)

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


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

    console.log(filteredContracts)

    async function contaAzulSender() {
        // const {
        //     name, contrato, unidade,
        //     rg, cpf, DatadeNascdoResp,
        //     CelularResponsavel, EnderecoResponsavel, NumeroEnderecoResponsavel,
        //     complemento, bairro, profissao,
        //     email, nameResponsible,
        //     cargaHoraria, numeroParcelas, descontoTotal, descontoPorParcela,
        //     curso, valorCurso, ppFormaPg,
        //     ppVencimento, dataUltimaP, materialDidatico,
        //     mdValor, mdFormaPg, mdVencimento,
        //     tmValor, tmFormaPg, tmVencimento, } = filteredContracts[0]

        const {
            vendedor, contrato,
            unidade, name, rg,
            cpf, DatadeNascdoResp, CelularResponsavel, EnderecoResponsavel,
            NumeroEnderecoResponsavel, complemento, bairro, cidade,
            estado, cep, profissao,
            email, nomeAluno, cargaHoraria, numeroParcelas, dataUltimaParcelaMensalidade,
            descontoTotal, descontoPorParcela, curso, ppFormaPg, ppVencimento,
            dataUltimaP, materialDidatico, mdValor, mdFormaPg,
            mdVencimento, tmValor, tmFormaPg, tmVencimento, valorCurso, service

        } = filteredContracts[0]


        const data = {
            contrato, vendedor,
            unidade, name, rg, cpf,
            DatadeNascdoResp, CelularResponsavel, EnderecoResponsavel,
            NumeroEnderecoResponsavel, complemento,
            bairro, profissao, email, nomeAluno, cargaHoraria,
            numeroParcelas, descontoTotal, descontoPorParcela, curso,
            valorCurso, ppFormaPg, ppVencimento, dataUltimaP,
            materialDidatico, mdValor, mdFormaPg, mdVencimento,
            tmValor, tmFormaPg, tmVencimento, cep, estado, cidade,
            dataUltimaParcelaMensalidade, service
        }

        // await axios.post("https://connection-with-conta-azul-rbv6l.ondigitalocean.app/cadastros", data)
        if (data.email === undefined || data.cpf === undefined ||
            data.name === undefined || data.CelularResponsavel === undefined ||
            data.DatadeNascdoResp === undefined ||
            data.cep === undefined ||
            data.estado === undefined ||
            data.cidade === undefined ||
            data.NumeroEnderecoResponsavel === undefined ||
            data.EnderecoResponsavel === undefined) {

            return alert("Contrato não enviado ao Conta Azul, confira os dados do responsável financeiro")
        }


        const client = async () => {
            return new Promise((resolve, reject) => {
                // axios.post("http://localhost:7070/cliente", data, { headers })
                URI.post("/cliente", data, { headers })
                    .then(res => {
                        resolve(res)

                    })
                    .catch(err => {
                        alert("Erro ao cadastrar o cliente no conta azul")
                        reject(err)
                    })
            })
        }
        const contract = async () => {
            return new Promise((resolve, reject) => {
                // axios.post("http://localhost:7070/registro-conta-azul", data, { headers })
                URI.post("/registro-conta-azul", data, { headers })
                    .then(res => {
                        console.log(res)
                        resolve(res)

                    })
                    .catch(err => {
                        alert("Erro ao enviar o contrato de venda")
                        reject(err)
                    })


            })
        }
        const sales = async () => {
            return new Promise((resolve, reject) => {
                // axios.post("http://localhost:7070/venda", data, { headers })
                URI.post("/venda", data, { headers })
                    .then(res => {
                        resolve(res)

                    })
                    .catch(err => {
                        alert("Erro ao enviar as vendas avulsas")
                        reject(err)
                    })

            })
        }

        return Promise.all([
            client(),
            contract(),
            sales()
        ]).then(() => {
            alert("Enviado com sucesso")
            setLoading(false)

        })
            .catch(err => {
                console.log(err)
                setLoading(false)

            })

    }

    let idioma = "https://hook.us1.make.com/aubg255odycgwpc5355lgaa4n58637xa"
    let particulares = "https://hook.us1.make.com/jqp2s2z42pw2civtmnjtste1ug4oelfo"
    let standard = "https://hook.us1.make.com/2aratjfs2vvj7xueiiqpkkuv687bmib1"
    let office = "https://hook.us1.make.com/52vy6g17uh62ti6ahyb1hjt1mj3m9oyv"
    let excel = "https://hook.us1.make.com/0xknnw9e3pt1knf15qs94fi1czss7m3k"

    const archives = {
        "Kids": idioma,
        "Teens": idioma,
        "Adults and YA": idioma,
        "Little Ones": idioma,
        "Español - En grupo": idioma,
        "Standard One": standard,
        "Fluency Way One -X": particulares,
        "Fluency Way Double - X": particulares,
        "Fluency Way Triple - X": particulares,
        "Español - X1": particulares,
        "Español - X2": particulares,
        "Español - X3": particulares,
        "Pacote Office Essentials": office,
        "Excel Avaçado": excel
    }


    async function createContract() {

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


        await axios.post(archives[filteredContracts[0].subclasse],
            filteredContracts[0], { headers })
            .then((res) => {
                if (res) {
                    setOpen(!open)
                    send && contaAzulSender()
                }
            }
            )
            .catch(err => {
                if (err) {
                    console.log(err)
                }
            })
        setLoading(false)

    }


    function handleFuncs() {
        handleOpen()
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
        setLoading(true)

    }

    return (
        <div>
            <Filter onClick={handleFuncs} style={{ color: "#fff" }}>{data.data}</Filter>
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

                                    {data.data !== 'Conta Azul' &&
                                        <Boxes>
                                            <input type="checkbox" onClick={() => setSend(!send)} className='check' />
                                            <small>Não enviar este contrato ao Conta Azul</small>
                                        </Boxes>
                                    }
                                    <Boxes radio>
                                        <ButtonDelete onClick={() => handleSender()}>Emitir contrato</ButtonDelete>
                                    </Boxes>
                                </div>

                                : <LoadingSpin
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
                        }
                    </Box>

                </Fades>

            </Modal>
        </div>
    );
}   