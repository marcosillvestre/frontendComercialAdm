import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import * as React from 'react';

// import URI from '../../app/utils/utils';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import URI from '../../../app/utils/utils';
import { useOrders } from '../../../hooks/orders/ordersContext.hook';
import { useUser } from '../../../hooks/userContext';
import { Boxes, Filter, Header, PrevisionContainer, TableProducts } from './styles';

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


export function WarnAvailableOrders(info) {
    const { data } = info
    const [open, setOpen] = React.useState(false);
    const [user, setUser] = React.useState({
        name: null,
        phone: null,
        unity: null

    });
    const { userData } = useUser()
    const { checkData, setCheckData, setChecked, mutationMultiUpdate } = useOrders()


    React.useEffect(() => {
        if (checkData.length > 0) {

            const { name, book, unity, phone } = checkData[0]

            setUser({ name, book, unity, phone })

        }

    }, [checkData])


    const message = React.useRef()
    const phone = React.useRef()

    const handleOpen = () => setOpen(true);

    const checkAll = (bool) => {
        document.querySelectorAll("input[type='checkbox']")
            .forEach((checkbox) => {
                setChecked(bool)
                checkbox.checked = bool;
            });
    };

    function handleFuncs() {
        handleOpen()
    }

    const handleClose = () => {
        setOpen(false)
        checkAll(false)
        setCheckData([])
    };


    const setUpMessage = checkData?.length > 0 && `Assunto: Aviso de Disponibilidade de Produtos/Materiais didáticos

Olá, ${user.name}.

Informamos que os produtos adquiridos estão disponíveis para retirada. Segue abaixo a lista com a descrição dos itens:

${checkData &&
        checkData.map((item, index) => `Produto ${index + 1}: ${item.book.split(" / ")[0]}\n`)}

Caso tenha alguma dúvida ou precise de mais informações, estamos à disposição.

Atenciosamente,
${userData.name} / American Way 🗽
${user.unity === 'PTB' ?
            `+55 31 8713-7018` :
            `+55 31 8284-0590`}
`

    const sendRequests = async () => {

        const response = new Promise((resolve, reject) => {
            URI.post('/mensagem', {
                name: user.name,
                phone: phone.current.value,
                message: message.current.value
            })
                .then((res) => resolve(res))
                .catch((err) => {
                    alert(err.response.data.message)
                    reject(err)
                })

        })
        await Promise.all([
            toast.promise(
                response,
                {
                    pending: "Enviando dados...",
                    success: "Pedido enviado com sucesso!",
                    error: `Erro ao enviar dados`,
                }
            ),
            mutationMultiUpdate.mutateAsync({
                responsible: userData.name,
                ids: checkData?.map(res => res.id),
                where: 'status',
                what: 'DISPONIVEL',
                label: 'DEFINIR COMO DISPONÍVEIS',
                logistic: [
                    {
                        stage: 'DISPONIVEL',
                        active: true,
                        date: new Date(),
                        user: userData.name
                    }
                ]
            })
        ])

    }

    return (
        <div>
            <Filter onClick={handleFuncs}> {data.label}</Filter>
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
                                    Aviso de pedido
                                </Typography>

                                <button onClick={() => handleClose()}>
                                    <CloseIcon />
                                </button>


                            </Header>
                            {

                                <Boxes>
                                    <TableProducts>
                                        <thead>
                                            <tr>
                                                <th>Cliente</th>
                                                <th>Produto</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {

                                                checkData &&
                                                checkData.map(res => (
                                                    <tr key={res.id}>
                                                        <th>
                                                            {res.name}
                                                        </th>
                                                        <th>
                                                            {res.book}
                                                        </th>
                                                        <th>
                                                            {res.status}
                                                        </th>

                                                    </tr>
                                                ))
                                            }
                                        </tbody>

                                    </TableProducts>
                                    <PrevisionContainer>
                                        <label htmlFor="">
                                            <p>Telefone de contato</p>
                                            <input
                                                className='input-suplier'
                                                defaultValue={user?.phone}
                                                ref={phone}
                                                type="number" name="" id="" />
                                        </label>

                                    </PrevisionContainer>
                                    <form action="">

                                        <label htmlFor="">
                                            <p>Pré-visualização do aviso:</p>
                                            <textarea
                                                defaultValue={setUpMessage}
                                                type="text" ref={message} />

                                            <button
                                                type='submit'
                                                onClick={(e) => {
                                                    sendRequests()
                                                    e.preventDefault()
                                                }}
                                                className='defaultButton'>

                                                enviar
                                            </button>
                                        </label>
                                    </form>



                                </Boxes>
                            }
                        </Box>

                    </Fade>
                }
            </Modal>
        </div>
    );
}   