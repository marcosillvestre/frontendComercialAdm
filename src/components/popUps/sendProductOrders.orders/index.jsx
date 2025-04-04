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
import { useRequests } from '../../../hooks/requests/requestsContext.hook';
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
    const { data } = info
    const [suplier, setSuplier] = React.useState();
    const [setUpMessage, setSetUpMessage] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        setOpen(false)
        setSuplier(null)
        setSetUpMessage('')
    };
    function handleFuncs() {
        handleOpen()
    }


    const { userData } = useUser()
    const { checkData, setCheckData, setChecked } = useOrders()
    const { createRequest } = useRequests()
    const { allSupliers } = useSupliers()
    const { data: sups, isPending } = allSupliers


    const [wppPermission, setWppPermission] = React.useState(true);
    const [emailPermission, setEmailPermission] = React.useState(true);

    const message = React.useRef()
    const prevision = React.useRef()


    const checkAll = (bool) => {
        document.querySelectorAll("input[type='checkbox']")
            .forEach((checkbox) => {
                setChecked(bool)
                checkbox.checked = bool;
            });
    };

    const calculateCheckData = () => {
        const itemCount = checkData.reduce((acc, item) => {
            acc[item.book] = (acc[item.book] || 0) + 1;
            return acc;
        }, {});

        return Object.entries(itemCount)
            .map(([name, count]) => ({ name, count }));
    }

    const filterSuplier = React.useCallback((name) => {

        const choosenSuplier = sups?.supliers?.find(res => res.name === name)
        setSuplier(choosenSuplier);

        const result = calculateCheckData()

        setSetUpMessage(`Assunto: Solicitação de Pedido

Prezado(a) ${choosenSuplier && choosenSuplier.name},

Gostaríamos de solicitar o seguinte pedido:

${result &&
            result.map(res => `${res.name},   quantidade: ${res.count}\n`)}

Solicitamos, por gentileza, que nos confirme a disponibilidade e o prazo estimado para entrega. Caso necessário, estamos à disposição para qualquer esclarecimento adicional.

Agradecemos desde já pela atenção e aguardamos seu retorno.

Atenciosamente,

${userData.name},
${checkData[0].unity === 'PTB' ?
                `American Way - 18.953.641/0001-26,
+55 31 8713-7018` :
                `American Way - 42.387487/0001-57,
+55 31 8284-0590`
            }
`)
    }, [sups, JSON.stringify(checkData)]);




    const sendRequests = async () => {

        if (!suplier) return alert("Você precisa definir o fornecedor antes de enviar o pedido!")
        if (checkData.find(res => res.unity !== checkData[0].unity)) return alert("Você só pode realizar pediddos relacionados a somente uma unidade")

        if (checkData.every(res => res.status !== "REVISADO" && res.status !== "ENTREGUE"))
            return alert("Apenas produtos REVISADOS ou ENTREGUES podem ser realizado pedidos.")

        createRequest.mutateAsync({
            orders: checkData,
            responsible: userData.name,
            message: message.current.value,
            prevision: prevision.current.value,
            suplier,
            wppPermission,
            emailPermission
        })

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
                                    Pedidos de produtos
                                </Typography>

                                <button onClick={() => handleClose()}>
                                    <CloseIcon />
                                </button>


                            </Header>
                            {
                                isPending ?
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
                                                    if (e.target.value === '') {
                                                        setSetUpMessage('')
                                                        setSuplier(null)
                                                    }

                                                    e.target.value.length >= 3 &&
                                                        filterSuplier(e.target.value)
                                                }}
                                            />
                                            <datalist
                                                id='supliers'>
                                                {sups &&
                                                    sups.supliers.map(res => (

                                                        <option
                                                            key={res.id}
                                                            value={res.name}

                                                        >
                                                            {res.name}
                                                        </option>
                                                    ))
                                                }
                                            </datalist>
                                        </label>
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
                                        <PrevisionContainer>
                                            <div className='flex'>

                                                <label htmlFor="">
                                                    <p>whatsapp</p>
                                                    <input type="checkbox"
                                                        disabled={suplier?.contacts?.whatsapp === undefined}
                                                        defaultChecked={wppPermission}
                                                        onChange={() => setWppPermission(prev => !prev)}
                                                        name="whatsapp" id="" />
                                                </label>

                                                <label htmlFor="">
                                                    <p>email</p>
                                                    <input type="checkbox"
                                                        disabled={suplier?.contacts?.orderEmail === undefined}
                                                        defaultChecked={emailPermission}
                                                        onChange={() => setEmailPermission(prev => !prev)}
                                                        name="email" id="" />
                                                </label>
                                            </div>

                                            <label htmlFor="">
                                                <p>Tempo previsto de entrega (em dias)</p>
                                                <input
                                                    className='input-suplier'
                                                    defaultValue={10}
                                                    ref={prevision}
                                                    type="number" name="" id="" />
                                            </label>
                                        </PrevisionContainer>
                                        <form action="">

                                            <label htmlFor="">
                                                <p>Pré-visualização do pedido:</p>
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