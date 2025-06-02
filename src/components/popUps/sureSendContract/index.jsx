import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useState } from 'react';


import { useUser } from '../../../hooks/userContext';

import { Boxes, ChooseArchive, Container, Fades, Filter, UploadIcon } from './styles';

const style = {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 490,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 6,
};


import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import URI from '../../../app/utils/utils';

import { yupResolver } from '@hookform/resolvers/yup';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import * as Yup from 'yup';
import { maskPhone } from '../../../app/utils/functions/maskNumber';
import { useOrders } from '../../../hooks/orders/ordersContext.hook';





export function SureSendContract(data) {


    const { userData } = useUser()

    const [open, setOpen] = useState(false);
    const [fileName, setFileName] = useState('')
    const [file, setFile] = useState('')
    const [Links, setLinks] = useState({})

    const { orders, mutationMultiUpdate } = useOrders()

    const [phoneNumber, setPhoneNumber] = useState(orders[0]?.phone)

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
    };



    const SendViaAutentique = async body => {

        if (phoneNumber.length !== 11) return alert("Número de telefone inválido")

        const data = new FormData()
        data.append('name', orders[0].name)


        data.append('number', phoneNumber)

        if (body.file && body.file[0]) {
            data.append('file', file);
        } else {
            alert('Arquivo não encontrado');
        }

        await toast.promise(
            URI.post("/uploads-recibos",
                data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(async res => {
                    const data = res.data.message
                    data.customer && setLinks(data)

                    await mutationMultiUpdate.mutateAsync({
                        ids: orders.map(res => res.id),
                        responsible: userData.name,
                        where: 'link',
                        what: data.customer
                    })
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

                            <span style={{ width: "100%" }}>

                                <Typography
                                    id="transition-modal-title"
                                    variant="h6" component="h2"
                                >
                                    {data.text}
                                </Typography>

                                <Boxes radio>

                                    <form
                                        onSubmit={handleSubmit(SendViaAutentique)}
                                    >
                                        <label htmlFor="phone">
                                            <p>Número para recebimento do recibo:</p>
                                            <input
                                                type="text"
                                                id="phone"
                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                                value={phoneNumber && maskPhone(phoneNumber)}
                                                maxLength={11}
                                            />

                                        </label>
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


                                            <input type="submit"
                                                className='submit'
                                            />

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


                            </span>

                        }
                    </Box>

                </Fades>

            </Modal>
        </Container>
    );
}   