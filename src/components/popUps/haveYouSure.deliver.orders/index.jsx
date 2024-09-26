import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import * as React from 'react';

// import URI from '../../app/utils/utils';
import CloseIcon from '@mui/icons-material/Close';
import { useOrders } from '../../../hooks/orders/ordersContext.hook';
import { useUser } from '../../../hooks/userContext';
import { Boxes, ButtonDelete, Filter } from './styles';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    // height: 360,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    fontSize: 15,
    // textAlign: 'center'

};


export function DeliverySure(info) {

    const [open, setOpen] = React.useState(false);
    const [send, setSend] = React.useState(true);

    const { userData } = useUser()
    const { updateLink } = useOrders()


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function handleFuncs() {
        handleOpen()
    }

    const { data } = info

    async function Send() {
        Promise.all([
            updateLink.mutateAsync({
                value: new Date().toLocaleString(),
                where: 'dataRetirada',
                id: data.id,
                order: [data.order.id]
            }),

            updateLink.mutateAsync({
                value: userData.name,
                where: 'retiradoPor',
                id: data.id,
                order: [data.order.id]
            })
        ])
    }

    return (
        <div>
            <Filter onClick={handleFuncs}> Marcar como entregue</Filter>
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
                    <Fade in={open}
                        style={{
                            border: "none",
                            borderRadius: ".9rem",
                            width: "40%"
                        }}
                    >
                        <Box sx={style}>
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between"
                            }}>

                                <Typography
                                    id="transition-modal-title"
                                    variant="h6"
                                    component="h2"
                                >
                                    Marcar como entregue
                                </Typography>


                                <div onClick={() => handleClose()}>
                                    <CloseIcon />
                                </div>
                            </div>

                            <Boxes>

                                <Typography variant="h7" component="h3">
                                    Aviso:
                                </Typography>
                                O documento ainda não foi assinado
                            </Boxes>
                            <Boxes>
                                <div className='container'>
                                    <small>Quer entregar mesmo assim ?</small>
                                    <label className='container'>

                                        <input
                                            id="not-send"
                                            type="radio"
                                            defaultChecked={true}
                                            onClick={() => setSend(true)}
                                            className='check'
                                            name="send-choose"
                                            value={false}
                                        />
                                        <small>Não </small>
                                        <input
                                            id="send"
                                            className='check'
                                            type="radio"
                                            onClick={() => setSend(false)}
                                            value={true}
                                            name="send-choose"

                                        />
                                        <small>Sim </small>
                                    </label>
                                </div>
                            </Boxes>

                            <ButtonDelete
                                disabled={send}
                                onClick={() => Send()}
                            >
                                Enviar
                            </ButtonDelete>
                        </Box>

                    </Fade>
                }
            </Modal>
        </div>
    );
}   