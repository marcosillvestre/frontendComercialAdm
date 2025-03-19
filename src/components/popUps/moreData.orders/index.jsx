import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import * as React from 'react';

// import URI from '../../app/utils/utils';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import { Ball, Boxes, ContainerTread, Filter, Header, Stick, Treadmill } from './styles';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 3,
    fontSize: 10,

};


export function MoreData(info) {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function handleFuncs() {
        handleOpen()
    }

    const { data } = info


    const subtitle = {
        'id': "Id",
        'name': "Nome",
        'status': "Status",
        'phone': "Telefone de contato",
        'book': "Material",
        'student': "Aluno",
        'sku': "SKU",
        'unity': "Unidade",
        'value': "Valor",
        'link': "Link",
        'created_at': "Data de criação",

        'withdraw': "Data de retirada",

        'arrived': "Chegou",
        'signed': "Assinado",
        'removedBy': "Retirado por",
    }
    const statusTrail = {
        'REVISAR': 0,
        'REVISADO': 1,
        'ENVIADO': 2,
        'CHEGOU': 3,
        'DISPONIVEL': 4,
        'ENTREGUE': 5,
        'CANCELADO': 6,
    }

    const keys = Object.keys(subtitle)
    const statusTrailKeys = Object.keys(statusTrail)

    return (
        <div>
            <Filter onClick={handleFuncs}> Mais informações</Filter>
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
                {
                    data &&
                    <Fade in={open} style={{ border: "none", borderRadius: ".9rem", width: "40%" }}>
                        <Box sx={style}>
                            <Header >

                                <Typography id="transition-modal-title" variant="h6" component="h2">
                                    {data.name}
                                </Typography>

                                <button onClick={() => handleClose()}>
                                    <CloseIcon />
                                </button>

                                {data.book}
                            </Header>
                            <Boxes>
                                <Treadmill>

                                    {
                                        statusTrailKeys.map((res, index) => (
                                            <ContainerTread
                                                key={index}
                                            >
                                                <div>

                                                    <Ball
                                                        active={statusTrail[data['status']] >= statusTrail[res]}
                                                    />
                                                    {
                                                        index + 1 < statusTrailKeys.length &&
                                                        <Stick
                                                            active={statusTrail[data['status']] >= statusTrail[res]}
                                                        />
                                                    }
                                                </div>
                                                <p>{res}</p>

                                            </ContainerTread>
                                        ))
                                    }

                                </Treadmill>

                                {
                                    keys.map((key, index) => (

                                        subtitle[key] &&
                                            typeof data[key] === 'boolean' ?
                                            <label htmlFor="" key={index}>
                                                <Typography variant="h7" component="h3">
                                                    {subtitle[key]}:
                                                </Typography>
                                                <input type="text"
                                                    disabled
                                                    defaultValue={data[key] ? "SIM" : "NÃO"}
                                                    style={{ backgroundColor: data[key] ? "#e0e0e0" : "#ffcaca" }}
                                                />
                                            </label>
                                            :
                                            <label htmlFor="" key={index}>
                                                <Typography variant="h7" component="h3">
                                                    {subtitle[key]}:
                                                </Typography>
                                                <div
                                                    className='input'
                                                    style={{
                                                        backgroundColor: data[key] !== ''
                                                            ? "#e0e0e0" : "#ffcaca"
                                                    }}
                                                >
                                                    <p>{data[key]}</p>
                                                    <ContentCopyIcon onClick={() => {
                                                        navigator.clipboard.writeText(data[key])
                                                        toast.success(`${subtitle[key]} copiado para área de transferência!`)
                                                    }} />
                                                </div>
                                            </label>
                                    ))
                                }


                                {/* <label htmlFor="">
                                    <Typography variant="h7" component="h3">
                                        SkU
                                    </Typography>
                                    {data.sku}
                                </label>

                                <label htmlFor="">
                                    <Typography variant="h7" component="h3">
                                        Data de pagamento
                                    </Typography>
                                    {data.created_at}
                                </label>

                                <label htmlFor="">
                                    <Typography variant="h7" component="h3">
                                        Link
                                    </Typography>
                                    {
                                        data.link !== "" &&
                                        <a href={data.link}>Link do autentique</a>
                                    }
                                </label>

                                <label htmlFor="">
                                    <Typography variant="h7" component="h3">
                                        Assinado
                                    </Typography>
                                    {data.signed ? "Sim" : "Não"}
                                </label>

                                <label htmlFor="">
                                    <Typography variant="h7" component="h3">
                                        Valor
                                    </Typography>
                                    R$ {data.value}
                                </label>

                                <label htmlFor="">
                                    <Typography variant="h7" component="h3">
                                        Número de telefone
                                    </Typography>
                                    {data.phone}
                                </label> */}



                            </Boxes>
                        </Box>

                    </Fade>
                }
            </Modal>
        </div>
    );
}   