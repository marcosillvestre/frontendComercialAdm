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
import DoneIcon from '@mui/icons-material/Done';

import LoadingSpin from 'react-loading-spin';
import * as Yup from 'yup';
import { senderImpressContract } from '../../../app/utils/functions/makePdfs';





export function SureSendModal(data) {


    const [send, setSend] = useState(data.data === "PDF" ? false : true)
    const { filteredContracts, headers, userData } = useUser()
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


    console.log(filteredContracts["CPF"])
    const client = async (body) => {


        const response = new Promise((resolve, reject) => {
            // axios.post("/cliente", body, { headers })
            URI.post("/cliente", body)
                .then((res) => {
                    resolve(res)
                    toast.success("Cliente cadastrado com sucesso")

                })
                .catch(async err => {
                    toast.error("Erro ao cadastrar o cliente")
                    const error = await err

                    console.log(error.response.data)

                    if ("message" in error.response.data) alert(error.response.data.message)
                    reject(err)
                })


        })


        return await response

    }

    const contract = async (body) => {

        await toast.promise(
            // axios.post("/registro-conta-azul", body, { headers })
            URI.post("/registro-conta-azul", body)
            , {
                pending: 'Enviando o contrato',
                success: 'Enviado com sucesso',
                error: "Erro ao criar o contrato"
            }
        )

    }

    const sales = async (body) => {

        if (filteredContracts.material.total > 0) {

            URI.post("/venda", body)
                .then(() => toast.success("Venda criada com sucesso"))
                .catch(async err => {
                    toast.error("Erro ao enviar o material")
                    const error = await err
                    if ("message" in error.response.data) alert(error.response.data.message)
                })
                .finally(() => {
                    setLoading(false)
                })

        }
    }

    const feeEnroll = async (body) => {

        // if (filteredContracts.tax.total > 0) {
        // axios.post("/taxa", body, { headers })


        URI.post("/taxa", body)
            .then(() => toast.success("Venda criada com sucesso"))
            .catch(async err => {
                toast.error("Erro ao enviar a taxa de matrícula")
                const error = await err
                console.log(error.response)
                if ("message" in error.response.data) alert(error.response.data.message)
            })
            .finally(() => {
                setLoading(false)
            })
        // }
    }




    const sendEverything = async () => {
        client(filteredContracts)
            .then(async () => {
                await Promise.all([
                    contract(filteredContracts),
                    sales(filteredContracts),
                    feeEnroll(filteredContracts),
                ])
            })

    }


    const mutateEverything = useMutation({
        mutationFn: () => sendEverything(),
        // onSuccess: () =>
    })



    async function contaAzulSender() {

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

        await client(filteredContracts)
            .then(async () => {
                promises.map(async res => {
                    await new Promise(() => res(filteredContracts))
                })
            })
            .finally(() => {
                setLoading(false)
            })
    }


    const SendViaAutentique = async body => {

        const data = new FormData()
        data.append('name', filteredContracts["Nome do responsável"])

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
                // axios.post('/uploads',
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


                senderImpressContract(`adesao-${filteredContracts["Nome do responsável"]}+${filteredContracts.id}`, content)
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


    const keys = Object.keys(filteredContracts)
    const freeToGo = keys.filter(key => !filteredContracts[key])

    document.querySelectorAll('.copied').forEach(el => {
        let length = el.textContent.length
        el.textContent = "*".repeat(length);
    });

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
                                                                Links.customer !== undefined ?
                                                                    userData.role === 'direcao' ?
                                                                        <>
                                                                            <p>Link para assinatura </p>
                                                                            <div>
                                                                                <span onClick={() => copy()}>
                                                                                    <p className='copied'>{Links.customer} </p>
                                                                                    <ContentCopyIcon />
                                                                                </span>
                                                                            </div>
                                                                        </>
                                                                        :
                                                                        <div>
                                                                            <span>
                                                                                <p className='copied'>Enviado com sucesso </p>
                                                                                <DoneIcon />
                                                                            </span>
                                                                        </div>
                                                                    :
                                                                    ""
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

                                                {
                                                    filteredContracts['parcel']?.total > 0 &&
                                                    <Boxes >
                                                        <input type="checkbox"
                                                            defaultChecked={sendingList && sendingList.find(r => r === "contract")}
                                                            onClick={(e) => {
                                                                const msgs = {
                                                                    "Data de vencimento da primeira parcela": "A data de vencimento da primeira parcela não foi preenchida.",
                                                                    "Número de parcelas do curso": "O número de parcelas do curso não foi preenchido",
                                                                    "Forma de pagamento da parcela": "A forma de pagamento do curso não foi preenchido",
                                                                }

                                                                const blocks = freeToGo.filter(res => msgs[res])
                                                                if (blocks.length > 0) {
                                                                    if (blocks.length > 0) alert(blocks.map(res => msgs[res]))

                                                                    e.preventDefault()
                                                                }
                                                                handleSendingList("contract")
                                                            }
                                                            }
                                                            className='check' />
                                                        <small>Contrato</small>
                                                    </Boxes>
                                                }
                                                {
                                                    filteredContracts['material']?.total > 0 &&

                                                    <Boxes >
                                                        <input type="checkbox"
                                                            defaultChecked={sendingList && sendingList.find(r => r === "sales")}
                                                            onClick={(e) => {

                                                                const msgs = {
                                                                    "Material didático": "Material didático não foi preenchido.",
                                                                    "Quantidade de parcelas MD": "O número de parcelas do Material não foi preenchido",
                                                                    "Forma de pagamento do MD": "A forma de pagamento do curso não foi preenchido",
                                                                }

                                                                const blocks = freeToGo.filter(res => msgs[res])
                                                                if (blocks.length > 0) {
                                                                    if (blocks.length > 0) alert(blocks.map(res => msgs[res]))

                                                                    e.preventDefault()
                                                                }
                                                                handleSendingList("sales")
                                                            }
                                                            }
                                                            className='check' />
                                                        <small>Material didático</small>
                                                    </Boxes>
                                                }
                                                {
                                                    // filteredContracts['tax']?.total > 0 &&

                                                    <Boxes >
                                                        <input type="checkbox"
                                                            defaultChecked={sendingList && sendingList.find(r => r === "feeEnroll")}
                                                            onClick={(e) => {
                                                                const msgs = {
                                                                    "Material didático": "Material didático não foi preenchido.",
                                                                    "Quantidade de parcelas MD": "O número de parcelas do Material não foi preenchido",
                                                                    "Forma de pagamento do MD": "A forma de pagamento do curso não foi preenchido",
                                                                }

                                                                const blocks = freeToGo.filter(res => msgs[res])
                                                                if (blocks.length > 0) {
                                                                    if (blocks.length > 0) alert(blocks.map(res => msgs[res]))

                                                                    e.preventDefault()
                                                                }

                                                                handleSendingList("feeEnroll")
                                                            }
                                                            }
                                                            className='check' />
                                                        <small>Taxa de matrícula</small>
                                                    </Boxes>
                                                }
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