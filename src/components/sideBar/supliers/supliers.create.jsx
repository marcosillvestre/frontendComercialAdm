

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { maskPhone } from '../../../app/utils/functions/maskNumber.jsx';
import { useSupliers } from '../../../hooks/supliers/supliersContext.hook.jsx';
import { ErrorMessage, Header, Input, Label, Modal, Submit, TextArea } from "../styles.jsx";

export const SupliersSidebar = () => {
    const { editSuplier, setEditSuplier, Suplier, setSuplier,
        createSuplier, updateSuplier, updateCacheData } = useSupliers()


    const [contactModal, setContactModal] = useState(false)
    const [addressModal, setAddressModal] = useState(false)
    const [loading, setLoading] = useState(false)


    const [type, setType] = useState('FISICO')
    const [address, setAddress] = useState({})


    const [sup, setSup] = useState()


    const sender = (key, value) => {

        if (editSuplier === null) return setSup({ ...sup, [key]: value })

        const data = editSuplier

        if (key in data) {
            data[key] = value;
        }

        else if (key in data.contacts) {
            data.contacts[key] = value;
        }

        else if (key in data.address) {
            data.address[key] = value;
        }
    }

    const create = () => {

        if (editSuplier === null) {

            const body = {
                type,
                name: sup.name,
                docment: sup.docment,
                contacts: {
                    descricao: sup.descricao,
                    email: sup.email,
                    telefone: sup.telefone,
                    comercialPhone: sup.comercialPhone,
                    whatsapp: sup.whatsapp,
                    orderEmail: sup.orderEmail,
                },
                address: {
                    numero: sup.numero,
                    cep: sup.cep,
                    Rua: sup.Rua,
                    Bairro: sup.Bairro,
                    Cidade: sup.Cidade,
                    UF: sup.UF,
                    complemento: sup.complemento,
                }
            }


            return createSuplier.mutateAsync(body)
        }


        updateSuplier.mutateAsync(editSuplier)
    }

    const addressAutoData = ["logradouro", "bairro", "estado", "localidade", "erro",]

    const getDataFromCep = async (cep) => {

        setLoading(true)

        await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
            .then(res => {
                const { data } = res
                setAddress(data)

                const d = {
                    cep
                }

                for (const key in data) {

                    const element = data[key];

                    if (key) d[key] = element

                }


                setSup({ ...sup, ...d })
            })
            .finally(() =>
                setLoading(false)
            )

    }


    return (

        <div style={{
            whiteSpace: "normal", display: "grid",
            gap: "1rem"
        }}>
            <Label >
                <p>Nome/Razão Social</p>
                < Input
                    type="text"
                    defaultValue={editSuplier && editSuplier.name}
                    onChange={(e) => {
                        e.target.value !== '' &&
                            sender("name", e.target.value)
                    }}
                />
            </Label>

            <Label >
                <p>CPF/CNPJ</p>
                < Input
                    type="text"
                    defaultValue={editSuplier && editSuplier.docment}
                    minLength={11}
                    maxLength={14}
                    onChange={(e) => {
                        e.target.value.length > 11 ?
                            setType('JURIDICO') :
                            setType('FISICO')

                        e.target.value !== '' &&
                            sender("docment", e.target.value)
                    }}
                />
            </Label>


            <Label >
                <p>Tipo</p>
                < Input
                    type="text"
                    value={type}
                    disabled
                    onChange={(e) => {
                        sender("type", e.target.value)
                    }}
                />
            </Label>


            <Label >

                <Header
                    className='flex'
                    onClick={() => setContactModal(!contactModal)}
                    active={contactModal}
                >
                    <p>Contatos</p>
                    <KeyboardArrowDownIcon />
                </Header>

                <Modal active={contactModal}>

                    <Label >
                        <p>Telefone comercial</p>
                        < Input
                            type="tel"
                            onChange={(e) => {
                                e.target.value !== '' &&
                                    sender("comercialPhone", e.target.value)
                            }}
                            defaultValue={editSuplier && maskPhone(editSuplier.contacts?.comercialPhone)}
                            maxLength={11}

                        />
                    </Label>

                    <Label >
                        <p>Celular</p>

                        < Input
                            type="tel"

                            onChange={(e) => {
                                e.target.value !== '' &&
                                    sender("telefone", e.target.value)
                            }}
                            defaultValue={editSuplier && maskPhone(editSuplier.contacts?.telefone)}
                            maxLength={11}
                        />
                    </Label>
                    <Label >
                        <p>Email</p>

                        < Input
                            type="email"
                            defaultValue={editSuplier && editSuplier.contacts?.email}
                            onChange={(e) => {
                                e.target.value !== '' &&
                                    sender("email", e.target.value)
                            }}
                        />
                    </Label>

                    <Label >
                        <p>Informações para o pedido</p>

                        < TextArea
                            type="text"
                            defaultValue={editSuplier && editSuplier.contacts?.descricao}
                            onChange={(e) => {
                                e.target.value !== '' &&
                                    sender("descricao", e.target.value)
                            }}
                        />
                    </Label>

                    <Label >
                        <p>Whatsapp para o pedido</p>

                        < Input
                            type="tel"
                            onChange={(e) => {
                                e.target.value !== '' &&
                                    sender("whatsapp", e.target.value)
                            }}
                            defaultValue={editSuplier && maskPhone(editSuplier.contacts?.whatsapp)}
                            maxLength={11}
                        />
                    </Label>
                    <Label >
                        <p>Email para o pedido</p>

                        < Input
                            type="email"
                            defaultValue={editSuplier && editSuplier.contacts?.orderEmail}
                            onChange={(e) => {
                                e.target.value !== '' &&
                                    sender("orderEmail", e.target.value)
                            }}
                        />
                    </Label>
                </Modal>
            </Label>


            <Label >

                <Header
                    className='flex'
                    onClick={() => setAddressModal(!addressModal)}
                    active={addressModal}
                >
                    <p>Endereço</p>
                    <KeyboardArrowDownIcon />
                </Header>

                <Modal active={addressModal}>

                    <Label >
                        <p>CEP</p>

                        < Input
                            type="text"
                            defaultValue={editSuplier && editSuplier.address?.cep}
                            minLength={8}
                            maxLength={9}
                            onChange={(e) => {

                                e.target.value.length === 0 &&
                                    setAddress({})

                                e.target.value.length >= 8 &&
                                    getDataFromCep(e.target.value)
                            }}
                        />
                        {
                            address?.erro &&
                            <ErrorMessage >cep inválido</ErrorMessage>
                        }

                    </Label>


                    {
                        editSuplier ?

                            Object.keys(editSuplier.address).map((res, index) => (
                                res !== 'cep' &&
                                <Label key={index}>
                                    <p>{res}</p>

                                    < Input
                                        type="text"
                                        defaultValue={editSuplier.address[res]}
                                        onChange={(e) => {
                                            e.target.value !== '' &&
                                                sender(res, e.target.value)
                                        }}
                                    />
                                </Label>
                            ))

                            :
                            loading ?
                                "carregando..." :
                                address &&
                                Object.keys(address).map((res, index) => (
                                    addressAutoData.find(t => t === res) &&
                                    <Label key={index}>
                                        <p>{res}</p>

                                        < Input
                                            type="text"
                                            defaultValue={address[res]}
                                            onChange={(e) => {
                                                e.target.value !== '' &&
                                                    sender(res, e.target.value)
                                            }}
                                        />
                                    </Label>
                                ))
                    }

                    <Label >
                        <p>Número</p>

                        < Input
                            type="text"
                            defaultValue={editSuplier && editSuplier.address.numero}
                            onChange={(e) => {
                                e.target.value !== '' &&
                                    sender("numero", e.target.value)
                            }}
                        />
                    </Label>

                    <Label >
                        <p>Complemento</p>

                        < Input
                            type="text"
                            defaultValue={editSuplier && editSuplier.address.complemento}
                            onChange={(e) => {
                                e.target.value !== '' &&
                                    sender("complemento", e.target.value)
                            }}
                        />
                    </Label>

                </Modal>
            </Label>







            <hr />
            <Submit
                placeholder="Enviar"
                className='defaultButton'
                // onClick={() => submit()}
                onClick={() => create()}
            >
                Enviar
            </Submit>
        </div>

    )
}


SupliersSidebar.propTypes = {
    location: PropTypes.object
}