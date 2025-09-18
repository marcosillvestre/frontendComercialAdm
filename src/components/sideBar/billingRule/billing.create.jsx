

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useBilling } from "../../../hooks/billingRules/billingRulesContext.hook.jsx";
import { useProduct } from '../../../hooks/products/productsContext.hook.jsx';
import { useService } from '../../../hooks/services/servicesContext.hook.jsx';
import { MultiSelect } from '../../selects/MultiSelect/index.jsx';
import { Select } from "../../source.jsx";
import { Header, Input, InputCheckbox, Label, Modal, Submit, TextArea } from "../styles.jsx";


export const Billing = () => {

    const { editBilling, setEditBilling, Billing, setBilling,
        createBilling, mutateBilling } = useBilling();

    const { productsTotalsQuery: { data: { products } } } = useProduct();
    const { serviceTotalsQuery: { data: { services } } } = useService();



    const [productOrService, setProductOrService] = useState(editBilling ? editBilling.category : '');
    const [modal, setModal] = useState(false);
    const [wpp, setWpp] = useState(true);
    const [email, setEmail] = useState(true);

    const sender = (key, value) => {
        if (key === 'category') setProductOrService(value)

        editBilling !== null ?
            setEditBilling({ ...editBilling, [key]: value }) :
            setBilling({ ...Billing, [key]: value })
    }


    const submit = () => {

        const body = {
            reminderMethod: {
                whatsapp: wpp,
                email
            }
        }


        !editBilling?.isItFor && createBilling.mutateAsync({ ...body, ...Billing });
        editBilling.isItFor === 'edit' && mutateBilling.mutateAsync({ ...body, ...editBilling });
        editBilling.isItFor === 'copy' && createBilling.mutateAsync({ ...editBilling, ...body });
    }


    const possibilities = [
        "nome-cliente",
        "data-vencimento",
        "link-pagamento",
        "produto-servico-relacionado",
        "valor-cheio",
        "quebra-linha",
        "pula-linha",
    ];

    const typesTriggers = {
        "BEFORE": "Antes",
        "AT": "No dia",
        "AFTER": "Depois",
    }

    return (

        <div style={{ whiteSpace: "normal", display: "grid", gap: "1rem" }}>
            <Label >
                <p>Nome da régua</p>
                < Input
                    type="text"
                    defaultValue={editBilling && editBilling.name}
                    onChange={(e) => {
                        e.target.value !== '' &&
                            sender("name", e.target.value)
                    }}
                />
            </Label>

            <Label >
                <p>Descrição da régua</p>
                <TextArea name="" id=""
                    defaultValue={editBilling && editBilling.description}
                    onChange={(e) => {
                        e.target.value !== '' &&
                            sender("description", e.target.value)
                    }}
                />
            </Label>

            <Label >
                <Header
                    className='flex'
                    onClick={() => setModal(!modal)}
                    active={modal}
                >
                    <p>Variáveis</p>

                    <KeyboardArrowDownIcon />
                </Header>

                <Modal active={modal}>
                    <Label >
                        {possibilities.map((res, ind) => (
                            <span
                                key={ind}
                                className='possibilities'
                                onClick={() => {
                                    let copy = res
                                    navigator.clipboard.writeText(`{{${copy}}}`)
                                    toast.success("Copiado para área de transferências")

                                }}
                            >
                                <p>{res}</p>
                                <ContentCopyIcon />
                            </span>
                        ))}
                    </Label>
                </Modal>
            </Label>

            <Label >
                <p>Mensagem</p>
                <TextArea name="" id=""
                    defaultValue={editBilling && editBilling.message}
                    onChange={(e) => {
                        e.target.value !== '' &&
                            sender("message", e.target.value)
                    }}
                />
            </Label>

            <Label >
                <p>Dias para ação</p>
                < Input
                    type="number"
                    defaultValue={editBilling && editBilling.daysToAction}
                    onChange={(e) => {
                        e.target.value !== '' &&
                            sender("daysToAction", parseInt(e.target.value))
                    }}
                />
            </Label>

            <Label >
                <p>O gatilho deve ser acionado</p>
                < Select
                    where="create"
                    label={editBilling && typesTriggers[editBilling.typeTrigger]}
                    width="11.5rem"
                    option={[
                        { name: "Antes", value: "BEFORE" },
                        { name: "No dia", value: "AT" },
                        { name: "Depois", value: "AFTER" },
                    ]}
                    field="typeTrigger"
                    fn={[sender]}
                />
            </Label>

            <Label >
                <fieldset>

                    <legend>Método de cobrança</legend>
                    <label>
                        < InputCheckbox
                            type="checkbox"
                            id='positive'
                            name='reminderMethod'
                            defaultChecked={editBilling ? editBilling.reminderMethod?.whatsapp : wpp}
                            onChange={() => setWpp(!wpp)}
                        />
                        <label htmlFor="positive">Whatsapp</label>

                    </label>

                    <label>
                        < InputCheckbox
                            type="checkbox"
                            id='negative'
                            name='reminderMethod'
                            defaultChecked={editBilling ? editBilling.reminderMethod?.email : email}
                            onChange={() => setEmail(!email)}

                        />
                        <label htmlFor="negative">Email</label>
                    </label>
                </fieldset>

            </Label>

            <Label >
                <p>Categoria</p>
                < Select
                    where="create"
                    label={editBilling && editBilling.category}
                    width="11.5rem"
                    option={[
                        { name: "Produtos", value: "Product" },
                        { name: "Serviços", value: "Service" },
                    ]}
                    field="category"
                    fn={[sender]}
                />
            </Label>

            {
                productOrService === "Product" &&
                <Label>
                    <p>Produtos relacionados</p>
                    <MultiSelect
                        field="related"
                        related={editBilling ? editBilling.related : []}
                        fn={sender}
                        option={products}
                        width="100%"

                    />

                </Label>
            }
            {
                productOrService === "Service" &&
                <Label>
                    <p>Serviços relacionados</p>

                    <MultiSelect
                        field="related"
                        related={editBilling ? editBilling?.related : []}
                        fn={sender}
                        option={services}
                        width="100%"

                    />
                </Label>
            }


            {
                editBilling &&
                <Label >
                    <fieldset>

                        <legend>Status</legend>
                        <div>
                            < InputCheckbox
                                type="radio"
                                id='positive'
                                name='status'
                                defaultChecked={editBilling ? editBilling.status === true : true}
                                value={true}
                                onChange={() => sender("status", true)}
                            />
                            <label htmlFor="positive">Ativo</label>

                        </div>

                        <div>
                            < InputCheckbox
                                type="radio"
                                id='negative'
                                name='status'
                                defaultChecked={editBilling && editBilling.status === false}
                                value={false}
                                onChange={() => sender("status", false)}

                            />
                            <label htmlFor="negative">Inativo</label>
                        </div>
                    </fieldset>

                </Label>
            }


            <hr />
            <Submit
                placeholder="Enviar"
                className='defaultButton blueButton'
                onClick={() => submit()}
            >
                Enviar
            </Submit>
        </div>

    )
}


Billing.propTypes = {
    location: PropTypes.object
}