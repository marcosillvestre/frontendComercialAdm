import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useState } from 'react';


import { useUser } from '../../../hooks/userContext';

import { Boxes, ButtonDelete, ChooseArchive, Container, Fades, Filter, UploadIcon } from './styles';

const style = {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 490,
    bgcolor: 'background.paper',
    // border: '1px solid #000',
    boxShadow: 24,
    p: 6,
};


import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import URI from '../../../app/utils/utils';
import { useData } from '../../../hooks/dataContext';

import { yupResolver } from '@hookform/resolvers/yup';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LoadingSpin from 'react-loading-spin';
import * as Yup from 'yup';
import { senderImpressContract } from '../../../app/utils/functions/makePdfs';





export function SureSendModal(data) {


    const [send, setSend] = useState(data.data === "PDF" ? false : true)
    const { filteredContracts, headers } = useUser()
    const { content, setView } = useData()

    const [open, setOpen] = useState(false);
    const [sendingList, setSendingList] = useState([])
    const [fileName, setFileName] = useState('')
    const [file, setFile] = useState('')
    const [Links, setLinks] = useState({})

    const [loading, setLoading] = useState(false)

    const schema = Yup.object({
        file:
            Yup.mixed()
                .test('required', 'Você precisa enviar um arquivo', value => {
                    return value && value?.length > 0
                })
    })


    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });




    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        setOpen(false)
        setSendingList([])
        setLoading(false)

    };




    const client = async (body) => {

        // await toast.promise(
        //     // axios.post("http://localhost:7070/cliente", body, { headers })
        //     URI.post("/cliente", body)
        //     , {
        //         pending: 'Criando o cadastro no CA',
        //         success: 'Criado com sucesso',
        //         error: "Erro ao criar cadastro"
        //     }
        // )


        const response = new Promise((resolve, reject) => {
            // axios.post("http://localhost:7070/cliente", body, { headers })
            URI.post("/cliente", body)
                .then((res) => {
                    resolve(res)
                    toast.success("Cliente cadastrado com sucesso")

                })
                .catch(async err => {
                    toast.error("Erro ao cadastrar o cliente")
                    const error = await err
                    if ("message" in error.response.data) alert(error.response.data.message)
                    reject(err)
                })


        })


        return await response

    }

    const contract = async (body) => {

        await toast.promise(
            // axios.post("http://localhost:7070/registro-conta-azul", body, { headers })
            URI.post("/registro-conta-azul", body)
            , {
                pending: 'Enviando o contrato',
                success: 'Enviado com sucesso',
                error: "Erro ao criar o contrato"
            }
        )
        // new Promise((resolve, reject) => {

        //     axios.post("http://localhost:7070/registro-conta-azul", body, { headers })
        //         // URI.post("/registro-conta-azul", body)
        //         .then((res) => {
        //             resolve(res)
        //             toast.success("Contrato criado com sucesso")

        //         })
        //         .catch(async err => {

        //             toast.error("Erro ao criar o contrato")
        //             const error = await err
        //             if ("message" in error.response.data) alert(error.response.data.message)
        //             reject(err)
        //         })
        //         .finally(() => {
        //             setLoading(false)
        //         })
        //     })
    }

    const sales = async (body) => {

        if (parseFloat(filteredContracts.mdValor) > 0) {
            // await toast.promise(
            //     // axios.post("http://localhost:7070/venda", body, { headers })
            //     URI.post("/venda", body)
            //     , {
            //         pending: 'Enviando o contrato',
            //         success: 'Enviado com sucesso',
            //         error: "Erro ao criar o contrato"
            //     }
            // )
            // await axios.post("http://localhost:7070/venda", body, { headers })
            URI.post("/venda", body)
                .then(() => toast.success("Venda criada com sucesso"))
                .catch(async err => {
                    toast.error("Erro ao criar a venda")
                    const error = await err
                    if ("message" in error.response.data) alert(error.response.data.message)
                })
                .finally(() => {
                    setLoading(false)
                })

        }
    }

    const feeEnroll = async (body) => {

        if (parseFloat(filteredContracts.tmValor) > 0) {

            await toast.promise(
                // axios.post("http://localhost:7070/taxa", body, { headers })
                URI.post("/taxa", body)
                , {
                    pending: 'Enviando o material didático',
                    success: 'Enviado com sucesso',
                    error: "Erro ao enviar o material didático"
                }
            )
            // axios.post("http://localhost:7070/taxa", body, { headers })
            //     // URI.post("/taxa", body)
            //     .then(() => toast.success("Taxa de matrícula criada com sucesso"))
            //     .catch(async err => {
            //         toast.error("Erro ao cadastrar a taxa de matrícula")
            //         const error = await err
            //         if ("message" in error.response.data) alert(error.response.data.message)
            //     })
            //     .finally(() => {
            //         setLoading(false)
            //     })

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
        observacaoRd, mdDesconto, parcelasAfetadas, descontoPrimeirasParcelas, demaisParcelas, descontoDemaisParcelas, promocao,
        obsFinanceiro
    } = filteredContracts === undefined || filteredContracts === undefined ? {} : filteredContracts

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
        observacaoRd, mdDesconto,
        obsFinanceiro
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






    const handleSendingList = (fn) => {
        const bool = sendingList.some(item => item === fn)
        bool ? setSendingList(sendingList.filter(res => res !== fn)) : setSendingList([...sendingList, fn])

    }


    async function separated() {
        if (sendingList.length === 0) {
            return alert("Você precisa definir pelo menos um tipo de envio para o conta azul")
        }
        if (filteredContracts === undefined || filteredContracts === undefined) {
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

        setLoading(true)

        await client(body)
            .then(async () => {
                promises.map(async res => {
                    await new Promise(() => res(body))
                })
            })
            .finally(() => {
                setLoading(false)
            })
    }


    const SendViaAutentique = async body => {

        const data = new FormData()
        data.append('name', filteredContracts.name)

        const rawPhone = filteredContracts.CelularResponsavel
        filteredContracts.number = rawPhone.includes("+") ? rawPhone : `+55${rawPhone}`

        filteredContracts.number = filteredContracts.number.includes(" ") ?
            filteredContracts.number.replace(" ", "") :
            filteredContracts.number

        filteredContracts.number = filteredContracts.number.includes("-") ?
            filteredContracts.number.replace("-", "") :
            filteredContracts.number



        data.append('number', filteredContracts.number)

        if (body.file && body.file[0]) {
            data.append('file', file);
        } else {
            alert('Arquivo não encontrado');
        }
        headers['Content-Type'] = 'multipart/form-data',


            // return
            await toast.promise(
                // axios.post('http://localhost:7070/uploads',
                URI.post("/uploads",
                    data, { headers: headers })
                    .then(res => {
                        const data = res.data.message
                        data.customer && setLinks(data)
                        send && contaAzulSender()
                    })
                , {
                    pending: 'Enviando para o autentique',
                    success: 'Enviado com sucesso',
                    error: "Erro ao enviar, confira seus dados"
                }
            )
    }


    const handleSender = () => {

        if (filteredContracts === undefined) {
            return alert("Nenhum contrato definido")
        }

        if (data.data === 'Conta Azul') {
            contaAzulSender()
        }

        if (data.data === 'PDF') {
            setView('template')


            setTimeout(() => {
                senderImpressContract(`adesao-${filteredContracts.name}+${filteredContracts.contrato}`, content)
                    .then(res => {
                        if (res) {
                            setOpen(!open)
                            send && contaAzulSender()

                        }
                    })
                    .catch(res => console.log(res))
            }, 500);
        }
    }


    const copy = () => {
        let copy = document.querySelector('.copied')
        navigator.clipboard.writeText(copy.innerText)
        toast.success("Copiado para área de transferência")
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
                            loading ?
                                <div style={{ display: "grid", gap: "1rem", alignItems: "center" }}>
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
                                <div>

                                    <Typography id="transition-modal-title" variant="h6" component="h2">
                                        {data.text}
                                    </Typography>

                                    {
                                        data.data !== 'Conta Azul' ?
                                            data.data === 'Autentique' ?
                                                <>
                                                    <Boxes>
                                                        <div className='container'>
                                                            <small>Enviar esse contrato para o conta azul ?</small>
                                                            <label>

                                                                <input
                                                                    id="not-send"
                                                                    type="radio"
                                                                    onClick={() => setSend(false)}
                                                                    className='check'
                                                                    name="send-choose"
                                                                    value={false}
                                                                />
                                                                <small>Não </small>
                                                                <input
                                                                    defaultChecked={true}
                                                                    id="send"
                                                                    className='check'
                                                                    type="radio"
                                                                    onClick={() => setSend(true)}
                                                                    value={true}
                                                                    name="send-choose"

                                                                />
                                                                <small>Sim </small>
                                                            </label>
                                                        </div>
                                                    </Boxes>

                                                    <Boxes radio>

                                                        <form
                                                            onSubmit={handleSubmit(SendViaAutentique)}
                                                        >
                                                            <input
                                                                type="file"
                                                                id="fileUpload"
                                                                accept=".pdf"
                                                                {...register("file")}
                                                                onChange={(e) => {
                                                                    setFile(e.target.files[0]);
                                                                    setFileName(e.target.files[0].name)
                                                                }}
                                                            />
                                                            <ChooseArchive >
                                                                <label
                                                                    htmlFor="fileUpload"
                                                                    onClick={
                                                                        () => setLinks({})
                                                                    }
                                                                >
                                                                    <UploadIcon />
                                                                </label>

                                                                {fileName !== '' &&
                                                                    fileName
                                                                }
                                                                <input type="submit" />
                                                            </ChooseArchive>
                                                            <p style={{ color: 'red' }}>
                                                                {errors.file?.message &&
                                                                    errors.file?.message}
                                                            </p>

                                                            {
                                                                Links.customer !== undefined &&
                                                                <>
                                                                    <p>Link para assinatura </p>
                                                                    <div>
                                                                        <span onClick={() => copy()}>
                                                                            <p className='copied'>{Links.customer} </p>
                                                                            <ContentCopyIcon />
                                                                        </span>
                                                                    </div>
                                                                </>

                                                            }
                                                        </form>



                                                    </Boxes>
                                                </> :

                                                <>
                                                    {
                                                        //conta azul
                                                        <Boxes>
                                                            <div className='container'>
                                                                <small>Enviar esse contrato para o conta azul ?</small>
                                                                <label>

                                                                    <input
                                                                        id="not-send"
                                                                        name="send-choose"
                                                                        type="radio"
                                                                        onClick={() => setSend(false)}
                                                                        className='check'
                                                                        value={false}
                                                                        defaultChecked={true}

                                                                    />
                                                                    <small>Não </small>
                                                                    <input
                                                                        name="send-choose"
                                                                        id="send"
                                                                        className='check'
                                                                        type="radio"
                                                                        onClick={() => setSend(true)}
                                                                        value={true}

                                                                    />
                                                                    <small>Sim </small>
                                                                </label>
                                                            </div>
                                                        </Boxes>
                                                    }
                                                    <Boxes radio>
                                                        <ButtonDelete
                                                            onClick={() => handleSender()}>Emitir contrato</ButtonDelete>
                                                    </Boxes>
                                                </>
                                            :
                                            < >
                                                <Boxes >
                                                    <input type="checkbox"
                                                        defaultChecked={sendingList && sendingList.find(r => r === "contract")}
                                                        onClick={() => handleSendingList("contract")}
                                                        className='check' />
                                                    <small>Contrato</small>
                                                </Boxes>
                                                <Boxes >
                                                    <input type="checkbox"
                                                        defaultChecked={sendingList && sendingList.find(r => r === "sales")}
                                                        onClick={() => handleSendingList("sales")}
                                                        className='check' />
                                                    <small>Material didático</small>
                                                </Boxes>

                                                <Boxes >
                                                    <input type="checkbox"
                                                        defaultChecked={sendingList && sendingList.find(r => r === "feeEnroll")}
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