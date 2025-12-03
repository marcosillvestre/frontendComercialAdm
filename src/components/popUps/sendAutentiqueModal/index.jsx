import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useState } from 'react';


import { useUser } from '../../../hooks/userContext';

import { Boxes, ButtonDelete, ChooseArchive, Container, Fades, Filter, Header, UploadIcon } from './styles';

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

import CloseIcon from '@mui/icons-material/Close';

import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import URI from '../../../app/utils/utils';

import { yupResolver } from '@hookform/resolvers/yup';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import * as Yup from 'yup';
import { Loading } from '../../loadingSpin';



export function ModalAutentique() {

    const { filteredContracts } = useUser();

    const fullField = filteredContracts["newTax"] || filteredContracts["newProduct"] || filteredContracts["newService"];


    const [send, setSend] = useState(true)

    const [open, setOpen] = useState(false);
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
        setLoading(false)

    };

    const contract = async (body) => {
        if (!body["newService"]?.total) return null;

        const newContract = URI.post("/registro-conta-azul", body)
            .then(() => "Venda criada com sucesso")
            .catch(async error => {
                if (error?.response?.data?.message) {
                    alert(error.response.data.message)
                }
                throw error.response?.data || error
            })

        toast.promise(
            newContract, {
            pending: "Enviando dados...",
            success: "Contrato criado com sucesso!",
            error: "Erro ao criar a venda",
        }
        )

        return newContract;
    }

    const sales = async (body) => {
        if (!body["newProduct"]?.total) return null;

        const newSale = URI.post("/venda", body)
            .then(() => "Venda criada com sucesso")
            .catch(async error => {
                if (error?.response?.data?.message) {
                    alert(error.response.data.message)
                }
                throw error.response?.data || error
            })


        toast.promise(
            newSale, {
            pending: "Enviando dados...",
            success: "Venda criada com sucesso!",
            error: "Erro ao criar a venda",
        }
        )

        return newSale;
    }

    const feeEnroll = async (body) => {
        if (!body["newTax"]?.total) return null;

        const newFee = URI.post("/taxa", body)
            .then(() => "Venda criada com sucesso")
            .catch(error => {
                if (error?.response?.data?.message) {
                    alert(error.response.data.message)
                }
                throw error.response?.data || error
            })

        toast.promise(
            newFee, {
            pending: "Enviando dados...",
            success: "Taxa criada com sucesso!",
            error: "Erro ao criar a venda",
        })

        return newFee
    }

    const sendEverything = async (data) => {

        const promises = await Promise.allSettled([
            contract(data),
            sales(data),
            feeEnroll(data),
        ])

        return (promises)
    }


    const mutateEverything = useMutation({
        mutationFn: (data) => sendEverything(data),
        onSuccess: (data) => console.log(data)
    })



    async function contaAzulSender() {
        mutateEverything.mutateAsync(filteredContracts)
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



        // return
        await toast.promise(
            // axios.post('/uploads',
            URI.post("/uploads",
                data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
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


    const copy = () => {
        let copy = document.querySelector('.copied')
        navigator.clipboard.writeText(copy.innerText)
        toast.success("Copiado para área de transferência")
    }


    document.querySelectorAll('.copied').forEach(el => {
        let length = el.textContent.length
        el.textContent = "*".repeat(length);
    });

    /////////////////////////////////


    return (
        <Container>
            <Filter
                onClick={() => handleOpen()}
                style={{ color: "#fff", width: "100%" }}>
                Autentique
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
                                <Loading />
                                :
                                <div>
                                    <Header>
                                        <button onClick={() => handleClose()}>
                                            <CloseIcon />
                                        </button>

                                        <Typography id="transition-modal-title" variant="h7" component="h4">
                                            O link do contrato será disponibilizado via whatsapp para o seu cliente.

                                        </Typography>
                                    </Header>



                                    {

                                        fullField ?
                                            <Boxes>
                                                <div className='container'>
                                                    <small>
                                                        Enviar todos os dados disponíveis da venda para o conta azul?
                                                    </small>
                                                    <label>
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

                                                    <label >
                                                        <input
                                                            id="not-send"
                                                            type="radio"
                                                            onClick={() => setSend(false)}
                                                            className='check'
                                                            name="send-choose"
                                                            value={false}
                                                        />
                                                        <small>Não </small>
                                                    </label>
                                                </div>
                                            </Boxes> :
                                            <small >
                                                Nenhum dado disponível para envio ao Conta Azul.
                                            </small>
                                    }

                                    <Boxes radio>
                                        {
                                            filteredContracts['newService']?.total > 0 &&
                                            <label htmlFor="" className='check flex'>
                                                <input type="checkbox"
                                                    defaultChecked={true}
                                                    disabled
                                                    className='check'
                                                />
                                                <small>contrato</small>
                                            </label>
                                        }
                                        {
                                            filteredContracts['newProduct']?.total > 0 &&
                                            <label htmlFor="" className='check flex'>
                                                <input type="checkbox"
                                                    defaultChecked={true}
                                                    disabled
                                                    className='check'
                                                />
                                                <small>material</small>
                                            </label>
                                        }
                                        {
                                            filteredContracts['newTax']?.total > 0 &&
                                            <label htmlFor="" className='check flex'>
                                                <input type="checkbox"
                                                    defaultChecked={true}
                                                    disabled
                                                    className='check' />
                                                <small>taxa</small>
                                            </label>
                                        }
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
                                                    onClick={() => setLinks({})}
                                                >
                                                    <UploadIcon />
                                                </label>

                                                {fileName !== '' && fileName}
                                                <ButtonDelete
                                                    className='defaultButton blueButton'
                                                    type='submit'
                                                    disabled={fileName === ''}

                                                >
                                                    enviar
                                                </ButtonDelete>


                                            </ChooseArchive>

                                            <p style={{ color: 'red' }}>
                                                {errors.file?.message && errors.file?.message}
                                            </p>

                                            {
                                                Links.customer !== undefined &&
                                                <>
                                                    <p>Link para assinatura </p>
                                                    <div>
                                                        <span onClick={() => copy()}>
                                                            <p className='copied'>{Links?.customer} </p>
                                                            <ContentCopyIcon />
                                                        </span>
                                                    </div>
                                                </>
                                            }
                                        </form>

                                    </Boxes>

                                </div>

                        }
                    </Box>

                </Fades>

            </Modal>
        </Container>
    );
}   