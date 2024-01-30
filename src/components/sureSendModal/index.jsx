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
export default function SureSendModal(data) {

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
            resolution: Resolution.HIGH,
            page: {

                margin: Margin.MEDIUM,

                format: 'A4',
                // default is 'portrait'
                orientation: 'portrait',
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


    async function contaAzulSender() {
        const data = {
            "name": `${filteredContracts[0].name}`
        }
        await axios.post("https://connection-with-conta-azul-rbv6l.ondigitalocean.app/cadastros", data)
            // await axios.post("http://localhost:3333/cadastros", data)
            .then((res) => {
                if (res.status === 201) {

                    setOpen(!open)
                    alert(res.data.data)
                }
            }).catch(() => alert("Erro ao enviar ao Conta Azul, confira os dados"))

        setLoading(false)

    }


    async function createContract() {

        await URI.post(`/criar-contratos`, filteredContracts[0], { headers })
            .then((res) => {
                if (res) {
                    setOpen(!open)

                    send && contaAzulSender()
                }
            }
            )
            .catch(err => {
                if (err) {
                    console.log(err);
                    alert("Erro ao enviar contrato")
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

        // if (data.data === 'Autentique') {
        //     senderContract()
        // }

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
                                    duration="10s"
                                    width="15px"
                                    timingFunction="ease-in-out"
                                    direction="alternate"
                                    size="60px"
                                    primaryColor="#1976d2"
                                    secondaryColor="#333"
                                    numberOfRotationsInAnimation={3}
                                    margin='0 auto'
                                />
                        }
                    </Box>

                </Fades>

            </Modal>
        </div>
    );
}   