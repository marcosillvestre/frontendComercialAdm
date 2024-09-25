import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import * as React from 'react';

// import URI from '../../app/utils/utils';
import CloseIcon from '@mui/icons-material/Close';
import { Boxes, Filter } from './styles';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 360,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    fontSize: 15,
    // textAlign: 'center'

};


export function MoreData(info) {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function handleFuncs() {
        handleOpen()
    }

    const { data } = info

    console.log(data)

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
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between"
                            }}>

                                <Typography id="transition-modal-title" variant="h6" component="h2">
                                    {data.order.nome}
                                </Typography>


                                <div onClick={() => handleClose()}>
                                    <CloseIcon />
                                </div>
                            </div>

                            <Boxes>
                                <label htmlFor="">
                                    <Typography variant="h7" component="h3">
                                        SkU
                                    </Typography>
                                    {data.sku}
                                </label>

                                <label htmlFor="">
                                    <Typography variant="h7" component="h3">
                                        Data de pagamento
                                    </Typography>
                                    {data.order.data}
                                </label>

                                <label htmlFor="">
                                    <Typography variant="h7" component="h3">
                                        Link
                                    </Typography>
                                    {
                                        data.order.link !== "" &&
                                        <a href={data.order.link}>Link do autentique</a>
                                    }
                                </label>

                                <label htmlFor="">
                                    <Typography variant="h7" component="h3">
                                        Assinado
                                    </Typography>
                                    {data.order.assinado ? "Sim" : "Não"}
                                </label>

                                <label htmlFor="">
                                    <Typography variant="h7" component="h3">
                                        Valor
                                    </Typography>
                                    R$ {data.order.valor}
                                </label>

                                <label htmlFor="">
                                    <Typography variant="h7" component="h3">
                                        Número de telefone
                                    </Typography>
                                    {data.order.tel}
                                </label>

                                {
                                    data.order.dataRetirada !== "" &&
                                    <>
                                        <label htmlFor="">
                                            <Typography variant="h7" component="h3">
                                                Retirado por
                                            </Typography>

                                            {data.order.retiradoPor}
                                        </label>

                                        <label htmlFor="">
                                            <Typography variant="h7" component="h3">
                                                Data de retirada
                                            </Typography>
                                            {data.order.dataRetirada}
                                        </label>
                                    </>
                                }



                            </Boxes>
                        </Box>

                    </Fade>
                }
            </Modal>
        </div>
    );
}   