import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import LoadingSpin from 'react-loading-spin';

// import URI from '../../app/utils/utils';
import CloseIcon from '@mui/icons-material/Close';
import { useOrders } from '../../../hooks/orders/ordersContext.hook';
import { useUser } from '../../../hooks/userContext';
import { Boxes, ContainerComment, Filter, Header } from './styles';

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
    // height: 300

};


export function ObservationsOrders(info) {

    const [open, setOpen] = React.useState(false);
    const [load, setLoad] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { userData } = useUser()
    const { updateLink } = useOrders()

    function handleFuncs() {
        handleOpen()
    }
    const { data } = info

    const [comments, setcomments] = React.useState(data.observations);

    const comment = React.useRef()

    const addComment = () => {
        setLoad(true)
        const commentText = comment.current.value

        const value = [
            ...comments,
            {
                id: new Date().setUTCHours(0),
                name: `${userData.name} / ${userData.role}`,
                comment: commentText, date: new Date()
            }
        ]
        setcomments(value)

        updateLink.mutateAsync({
            id: data.id,
            observations: value,
            responsible: userData.name
        })
        setLoad(false)

    }


    return (
        <div>
            <Filter onClick={handleFuncs}> Observações</Filter>
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
                            {
                                load ?
                                    <LoadingSpin
                                        duration="4s"
                                        width="15px"
                                        timingFunction="ease-in-out"
                                        direction="alternate"
                                        size="60px"
                                        primaryColor="#1976d2"
                                        secondaryColor="#333"
                                        numberOfRotationsInAnimation={3}
                                    /> :
                                    <Boxes>
                                        <form action="">

                                            <label htmlFor="">
                                                <p>Observações:</p>
                                                <textarea type="text" ref={comment} />

                                                <button
                                                    type='submit'
                                                    onClick={(e) => {
                                                        comment.current.value !== '' && addComment()
                                                        e.preventDefault()
                                                    }}
                                                    className='defaultButton'>

                                                    enviar
                                                </button>
                                            </label>
                                        </form>

                                        {
                                            comments.length > 0 &&
                                            <div className='container'>
                                                {
                                                    comments.map((tag) => (

                                                        <ContainerComment key={tag.id}>
                                                            <header>
                                                                {tag.name}
                                                            </header>
                                                            <main>
                                                                <p>{tag.comment}</p>
                                                            </main>
                                                            <footer>
                                                                <p>{new Date(tag.date).toLocaleString("pt-BR")}</p>
                                                            </footer>
                                                        </ContainerComment>
                                                    )
                                                    )
                                                }
                                            </div>
                                        }

                                    </Boxes>
                            }
                        </Box>

                    </Fade>
                }
            </Modal>
        </div>
    );
}   