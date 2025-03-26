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
import { useSupliers } from '../../../hooks/supliers/supliersContext.hook';
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


export function MakeOrders(info) {

    const [open, setOpen] = React.useState(false);
    const [load, setLoad] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { userData } = useUser()
    const { checkData, setCheckData, setChecked } = useOrders()

    const { allSupliers } = useSupliers()

    const { data: sups, isPeding } = allSupliers


    function handleFuncs() {
        handleOpen()
    }
    const { data } = info

    const [suplier, setSuplier] = React.useState();
    const [wppSend, setSendWpp] = React.useState(true);
    const [emailSend, setSendEmail] = React.useState(true);

    const comment = React.useRef()

    // const addComment = () => {
    //     setLoad(true)
    //     const commentText = comment.current.value

    //     const value = [
    //         ...comments,
    //         {
    //             id: new Date().setUTCHours(0),
    //             name: `${userData.name} / ${userData.role}`,
    //             comment: commentText, date: new Date()
    //         }
    //     ]
    //     setcomments(value)

    //     updateLink.mutateAsync({
    //         id: data.id,
    //         observations: value,
    //         responsible: userData.name
    //     })
    //     setLoad(false)

    // }

    const checkAll = (bool) => {
        document.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
            setChecked(bool)
            checkbox.checked = bool;
        });
    };

    const filterSuplier = (doc) => {
        setSuplier(sups.supliers.find(res => res.docment === doc))
    }



    const itemCount = checkData.reduce((acc, item) => {
        // const cleanedItem = item.trim(); // Remove espaços extras e quebras de linha

        acc[item.book] = (acc[item.book] || 0) + 1; // Conta ocorrências
        return acc;
    }, {});

    // Convertendo para array, se precisar
    const result = Object.entries(itemCount).map(([name, count]) => ({ name, count }));

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
                                    Pedidos de produtos
                                </Typography>

                                <button onClick={() => handleClose()}>
                                    <CloseIcon />
                                </button>


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
                                        <label htmlFor="">
                                            <p>Fornecedor</p>
                                            <input
                                                className='input-suplier'
                                                list='supliers' name="" id=""
                                                onChange={(e) => {
                                                    e.target.value.length >= 11 &&
                                                        filterSuplier(e.target.value)
                                                }}
                                            />
                                        </label>
                                        <datalist id='supliers'>
                                            {sups &&
                                                sups.supliers.map(res => (

                                                    <option key={res.id} value={res.docment}>
                                                        {res.name}
                                                    </option>
                                                ))
                                            }
                                        </datalist>
                                        <TableProducts>
                                            <thead>
                                                <tr>
                                                    <th>Cliente</th>
                                                    <th>Produto</th>
                                                    <th>Status</th>
                                                    <th> Valor</th>
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
                                                            <th>
                                                                {res.value.toLocaleString('pt-BR',
                                                                    { style: 'currency', currency: 'brl' })}
                                                            </th>
                                                            <td onClick={() => {
                                                                alert("Apagado com sucesso")
                                                                setCheckData(checkData.filter(t => t.id !== res.id))
                                                                if (checkData.length === 1) {
                                                                    handleClose()
                                                                    checkAll(false)

                                                                }
                                                            }}>
                                                                <CloseIcon />
                                                            </td>

                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <th>Valor Total</th>

                                                    <th>{
                                                        checkData.reduce((acc, curr) => curr.value + acc, 0)
                                                            .toLocaleString('pt-BR', { style: 'currency', currency: 'brl' })
                                                    }</th>
                                                </tr>
                                            </tfoot>
                                        </TableProducts>
                                        {
                                            suplier &&
                                            <>
                                                <PrevisionContainer>
                                                    <div className='flex'>

                                                        <label htmlFor="">
                                                            <p>whatsapp</p>
                                                            <input type="checkbox"
                                                                disabled={suplier.contacts?.whatsapp === undefined}
                                                                defaultChecked={true}
                                                                name="whatsapp" id="" />
                                                        </label>

                                                        <label htmlFor="">
                                                            <p>email</p>
                                                            <input type="checkbox"
                                                                disabled={suplier.contacts?.orderEmail === undefined}
                                                                defaultChecked={true}
                                                                name="email" id="" />
                                                        </label>
                                                    </div>

                                                    <label htmlFor="">
                                                        <p>Tempo previsto de entrega (em dias)</p>
                                                        <input
                                                            className='input-suplier'
                                                            // ref={}
                                                            type="number" name="" id="" />
                                                    </label>
                                                </PrevisionContainer>
                                                <form action="">

                                                    <label htmlFor="">
                                                        <p>Pré-visualização do pedido:</p>
                                                        <textarea
                                                            defaultValue={
                                                                `Olá, gostaria de fazer um pedido desses produtos: 

${result.map(res => `${res.name}, quantidade: ${res.count}\n`)}

observações: 

${suplier.contacts.descricao}
`
                                                            }
                                                            type="text" ref={comment} />

                                                        <button
                                                            type='submit'
                                                            onClick={(e) => {

                                                                if (checkData.every(res =>
                                                                    res.status !== "REVISADO" || res.status !== "ENTREGUE")) {
                                                                    alert("Apenas produtos REVISADOS ou ENTREGUES podem ser realizado pedidos.")
                                                                }
                                                                // comment.current.value !== '' && addComment()
                                                                e.preventDefault()
                                                            }}
                                                            className='defaultButton'>

                                                            enviar
                                                        </button>
                                                    </label>
                                                </form>
                                            </>
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