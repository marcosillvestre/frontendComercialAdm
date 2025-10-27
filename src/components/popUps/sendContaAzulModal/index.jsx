import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { toast } from 'react-toastify';
import URI from '../../../app/utils/utils';
import { useUser } from '../../../hooks/userContext';
import { EmptyData } from '../../emptyData';
import { Loading } from '../../loadingSpin';
import { Boxes, ButtonDelete, Container, ErrorDiv, Fades, Filter } from './styles';


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

export function ContaAzulModal() {

    const { filteredContracts } = useUser();

    const fullField = "total" in filteredContracts["newTax"] ||
        "total" in filteredContracts["newProduct"] ||
        "total" in filteredContracts["newService"]

    const [open, setOpen] = useState(false);
    const [sendingList, setSendingList] = useState([])

    const [loading, setLoading] = useState(false)

    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        setOpen(false)
        setSendingList([])
        setLoading(false)

    };

    const contract = async (body) => {
        const newContract = new Promise((res, rej) => {
            URI.post("/registro-conta-azul", body)
                .then(() => res("Contrato criado com sucesso"))
                .catch(async error => {
                    if ("message" in error.response.data) alert(error.response.data.message)
                    rej(error.response.data)
                })
        })

        toast.promise(
            newContract,
            {
                pending: "Enviando dados...",
                success: "Contrato criado com sucesso!",
                error: "Erro ao criar a venda",
            }
        )
    }


    const sales = async (body) => {
        const newSale = new Promise((res, rej) => {
            URI.post("/venda", body)
                .then(() => res("Venda criada com sucesso"))
                .catch(async error => {
                    if ("message" in error.response.data) alert(error.response.data.message)
                    rej(error.response.data)
                })
        })

        toast.promise(
            newSale,
            {
                pending: "Enviando dados...",
                success: "Venda criada com sucesso!",
                error: "Erro ao criar a venda",
            }
        )

    }

    const feeEnroll = async (body) => {
        const newFee = new Promise((res, rej) => {
            URI.post("/taxa", body)
                .then(() => res("Venda criada com sucesso"))
                .catch(async error => {
                    if ("message" in error.response.data) alert(error.response.data.message)
                    rej(error.response.data)
                })
        })

        toast.promise(
            newFee,
            {
                pending: "Enviando dados...",
                success: "Taxa criada com sucesso!",
                error: "Erro ao criar a venda",
            }
        )

        return newFee;
    }

    const handleSendingList = (fn) => {
        const bool = sendingList.some(item => item === fn)
        bool ? setSendingList(sendingList.filter(res => res !== fn)) : setSendingList([...sendingList, fn])

    }


    async function separated() {

        if (!filteredContracts === undefined) return alert("Você precisa definir um contrato primeiro");

        let funcs = {
            "contract": contract,
            "sales": sales,
            "feeEnroll": feeEnroll,
        }

        let promises = []
        for (let i = 0; i < sendingList.length; i++) {
            promises[i] = funcs[sendingList[i]]
        }

        setLoading(true)

        promises.map(async res => {
            await new Promise(() => res(filteredContracts))
        })

        setLoading(false);

    }


    document.querySelectorAll('.copied').forEach(el => {
        let length = el.textContent.length
        el.textContent = "*".repeat(length);
    });


    return (
        <Container>
            <Filter
                onClick={() => handleOpen()}
                style={{ color: "#fff", width: "100%" }}>
                Conta azul
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

                                    <Typography id="transition-modal-title" variant="h6" component="h2">
                                        {
                                            fullField ?
                                                "Ao enviar um plano financeiro ao Conta Azul ele somente estará disponível lá." :
                                                <ErrorDiv>
                                                    <p>Você precisa criar um plano de venda para poder enviar para o conta azul.</p>
                                                    <EmptyData width='15rem' />
                                                </ErrorDiv>
                                        }
                                    </Typography>

                                    {
                                        filteredContracts['newService']?.total > 0 &&
                                        <Boxes >
                                            <input type="checkbox"
                                                defaultChecked={sendingList && sendingList.find(r => r === "contract")}
                                                onClick={() => { handleSendingList("contract") }}
                                                className='check' />
                                            <small>Contrato</small    >
                                        </Boxes>
                                    }
                                    {
                                        filteredContracts['newProduct']?.total > 0 &&

                                        <Boxes >
                                            <input type="checkbox"
                                                defaultChecked={sendingList && sendingList.find(r => r === "sales")}
                                                onClick={() => handleSendingList("sales")}

                                                className='check' />
                                            <small>Material didático</small>
                                        </Boxes>
                                    }
                                    {
                                        filteredContracts['newTax']?.total > 0 &&

                                        <Boxes >
                                            <input type="checkbox"
                                                defaultChecked={sendingList && sendingList.find(r => r === "feeEnroll")}
                                                onClick={() => handleSendingList("feeEnroll")}

                                                className='check' />
                                            <small>Taxa de matrícula</small>
                                        </Boxes>
                                    }

                                    <Boxes radio>
                                        <ButtonDelete
                                            disabled={sendingList.length === 0}
                                            className='defaultButton blueButton'
                                            onClick={() => separated()}
                                        >
                                            Emitir contrato

                                        </ButtonDelete>
                                    </Boxes>

                                </div>

                        }
                    </Box>

                </Fades>

            </Modal>
        </Container>
    );
}   