import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import * as React from 'react';

// import { toast } from 'react-toastify';

import { useUser } from '../../hooks/userContext';

import axios from 'axios';
import { Boxes, ButtonDelete, Fades, Filter } from './styles';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
};


export default function SureSendModal(data) {
    const [send, setSend] = React.useState(true)
    const { filteredContracts, userData } = useUser()
    const date = new Date()

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const webhookGerente = "https://hook.us1.make.com/36kd4bq6u7n66flns4gbzshehem5fw7l"
    const webhookGerenteImpresso = "https://hook.us1.make.com/e3hnjh27wp6in88nxulgqwmda4dr4tol"

    const webhookVendedora1 = "https://hook.us1.make.com/oawrexoyph599vfsb6319q290dnag45d"
    const webhookVendedora1Impresso = "https://hook.us1.make.com/b2yule57cpdg0t8hxuf7ofhj1lrcm6rj"

    const webhookVendedora2 = "https://hook.us1.make.com/zk795dt1no3oaypygq048x84bao0smdr"
    const webhookVendedora2Impresso = "https://hook.us1.make.com/tve9e0v23qlguiqhqfyd894jplvamrq1"

    // const webhookVendedora3 = "https://hook.us1.make.com/2aa3stdmay5vcat5pla5nuy4ubcdv91e"
    // const webhookVendedora4 = "https://hook.us1.make.com/89stu7vdp6dxocgl837ekvw1z9mgafdb"

    const webhookPrincipal = "https://hook.us1.make.com/ghzwtbkkjlkzfhdg3qiysocrfmhr2ucx"
    const webhookPrincipalImpresso = "https://hook.us1.make.com/u5dh3xbxpzbexvnd9bvu1mzfym3nx87r"

    const webhookAdministrativo = "https://hook.us1.make.com/hpqek8mfkdd4nqexrrwp8k6ytojdlodn"
    const webhookAdministrativoImpresso = "https://hook.us1.make.com/7vkxorul0jiegksx2xgoo8bm86l0mqyj"


    async function senderContract() {
        if (filteredContracts?.length > 0) {

            const obj = filteredContracts[0]
            obj["dataEmissao"] = date.toLocaleDateString()
            let desc = obj["descontoPorParcela"].split(',')

            obj["valorParcelaDataCerta"] = parseFloat(obj["valorParcela"]) - parseFloat(`${desc[0]}.${desc[1]}`)
            obj["descontoParcelaDataCorreta"] = obj["valorParcelaDataCerta"].toFixed(2)
            obj["diaVencimento"] = obj["diaVenvimento"].split("/")[0]

            let link

            if (userData.role === 'gerencia') {
                link = webhookGerente
            }

            if (userData.role === 'comercial') {
                if (userData.name.toLowerCase().includes("aracelly")) {
                    link = webhookVendedora1
                }

                if (userData.name.toLowerCase().includes("sophia")) {
                    link = webhookVendedora2
                }

            }
            if (userData.role === 'direcao') {
                link = webhookPrincipal
            }
            if (userData.role === 'administrativo') {
                link = webhookAdministrativo
            }

            await axios.post(link, obj)
                .then(res => {
                    alert(res.data)
                })

            send && contaAzulSender()
        } else {
            alert("Não tem ninguém escolhido para emitir o contrato, você precisa escolher alguém!")
        }
    }

    async function senderImpressContract() {
        if (filteredContracts[0].email === null || filteredContracts[0].email === undefined) {
            alert("O campo de Email do cliente está em branco!")
        }

        if (filteredContracts?.length > 0) {

            const obj = filteredContracts[0]
            obj["dataEmissao"] = date.toLocaleDateString()
            let desc = obj["descontoPorParcela"].split(',')

            obj["valorParcelaDataCerta"] = parseFloat(obj["valorParcela"]) - parseFloat(`${desc[0]}.${desc[1]}`)
            obj["descontoParcelaDataCorreta"] = obj["valorParcelaDataCerta"].toFixed(2)
            obj["diaVencimento"] = obj["diaVenvimento"].split("/")[0]


            let link

            if (userData.role === 'gerencia') {
                link = webhookGerenteImpresso
            }

            if (userData.role === 'comercial') {
                if (userData.name.toLowerCase().includes("aracelly")) {
                    link = webhookVendedora1Impresso
                }
                if (userData.name.toLowerCase().includes("sophia")) {
                    link = webhookVendedora2Impresso
                }
            }
            if (userData.role === 'direcao') {
                link = webhookPrincipalImpresso
            }
            if (userData.role === 'administrativo') {
                link = webhookAdministrativoImpresso
            }

            await axios.post(link, obj)
                .then(res => {
                    alert(res.data)
                })

            send && contaAzulSender()
        } else {
            alert("Não tem ninguém para emitir o contrato, você precisa escolher alguém!")
        }
    }

    async function contaAzulSender() {
        const data = {
            "name": `${filteredContracts[0].name}`
        }
        await axios.post("https://connection-with-conta-azul-rbv6l.ondigitalocean.app/cadastros", data)
            .then((res) => {
                if (res.status === 201) {
                    alert(res.data.data)
                }
            }).catch(() => alert("Erro ao enviar ao Conta Azul, confira os dados"))
    }



    function handleFuncs() {
        handleOpen()
    }

    const handleSender = () => {
        handleOpen()

        if (data.data === 'Conta Azul') {
            contaAzulSender()
            console.log("third")
        }
        if (data.data === 'Google Drive') {
            senderImpressContract()
            console.log("first")
        }
        if (data.data === 'Autentique') {
            senderContract()
            console.log("seccond")
        }

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
                            <ButtonDelete onClick={() => handleSender()}>emitir contrato</ButtonDelete>
                        </Boxes>
                    </Box>

                </Fades>
            </Modal>
        </div>
    );
}   