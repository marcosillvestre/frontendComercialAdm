import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import * as React from 'react';

// import URI from '../../app/utils/utils';
import CancelIcon from '@mui/icons-material/Cancel';
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
        'created_at': "Data de criação",
        'name': "Nome do responsável",
        'student': "Aluno",
        'status': "Situação",
        'book': "Produto",
        'sku': "SKU",
        'value': "Valor",
        'phone': "Telefone de contato",
        'arrivingDate': "Data de chegada",
        'withdraw': "Data de retirada",
        'signed': "Assinado",
        'unity': "Unidade",
        'link': "Link",
        'arrived': "Chegou",
        'removedBy': "Retirado por",
        'id': "Id",
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


    console.log(info)
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
                                        data &&
                                        data.logistic.map((res, index) => (
                                            <ContainerTread
                                                key={index}
                                            >
                                                <div>
                                                    {
                                                        res.active ?
                                                            <>
                                                                <Ball
                                                                    active
                                                                />
                                                                {
                                                                    index + 1 < data.logistic.length &&
                                                                    <Stick
                                                                        active={statusTrail[data['status']] >= statusTrail[res.stage]}
                                                                    />
                                                                }
                                                            </> :
                                                            <>
                                                                <CancelIcon active />
                                                            </>
                                                    }

                                                </div>
                                                <p>{res.stage}</p>

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
                                                    {
                                                        subtitle[key].includes("Data") ?
                                                            <p>{new Date(data[key]).toLocaleString()}</p> :
                                                            <p>{data[key]}</p>
                                                    }
                                                    <ContentCopyIcon onClick={() => {
                                                        navigator.clipboard.writeText(data[key])
                                                        toast.success(`${subtitle[key]} copiado para área de transferência!`)
                                                    }} />
                                                </div>
                                            </label>
                                    ))
                                }
                                <hr />
                                <Typography variant="h7" component="h3">
                                    Histórico de alterações:
                                </Typography>
                                {
                                    data.logs.length > 0 &&
                                    data.logs.map((res, index) => (

                                        <label htmlFor="" key={index}>
                                            <div
                                                className='input'
                                                style={{ backgroundColor: "#e0e0e0" }}
                                            >
                                                <span
                                                    title={res.date}
                                                >
                                                    <Typography variant="h7" component="h3">
                                                        {res.responsible}:
                                                    </Typography>

                                                    {res.description}
                                                </span>

                                            </div>
                                        </label>
                                    ))
                                }

                            </Boxes>
                        </Box>

                    </Fade>
                }
            </Modal>
        </div>
    );
}   