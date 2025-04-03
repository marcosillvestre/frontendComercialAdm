

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { maskPhone } from '../../../app/utils/functions/maskNumber.jsx';
import { useSupliers } from '../../../hooks/supliers/supliersContext.hook.jsx';
import { ErrorMessage, Header, Input, Label, Modal, Submit, TextArea } from "../styles.jsx";

export const SupliersSidebar = () => {
    const { editSuplier, createSuplier, updateSuplier, setEditSuplier } = useSupliers()

    const [contactModal, setContactModal] = useState(false)
    const [addressModal, setAddressModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [edit, setEdit] = useState(false)

    const cep = useRef()
    const name = useRef()
    const docment = useRef()
    const descricao = useRef()
    const email = useRef()
    const telefone = useRef()
    const comercialPhone = useRef()
    const whatsapp = useRef()
    const orderEmail = useRef()
    const numero = useRef()
    const rua = useRef()
    const bairro = useRef()
    const cidade = useRef()
    const uf = useRef()
    const complemento = useRef()



    const [type, setType] = useState(editSuplier ? editSuplier.type : 'FISICO')
    const [address, setAddress] = useState({})

    const translate = {
        'PESSOA FISÍCA': 'FISICO',
        'PESSOA JURIDICA': 'JURIDICO',
        'FISICO': 'PESSOA FISÍCA',
        'JURIDICO': 'PESSOA JURIDICA',
    }


    const create = () => {


        if (!name || !docment) {
            return alert("Preencha os dados corretamente")
        }

        const body = {
            type,
            name: name.current.value,
            docment: docment.current.value,
            contacts: {
                descricao: descricao.current.value,
                email: email.current.value,
                telefone: telefone.current.value,
                comercialPhone: comercialPhone.current.value,
                whatsapp: whatsapp.current.value,
                orderEmail: orderEmail.current.value,
            },
            address: {
                numero: numero.current.value,
                cep: cep.current.value,
                rua: rua.current.value,
                bairro: bairro.current.value,
                cidade: cidade.current.value,
                uf: uf.current.value,
                complemento: complemento.current.value,
            }
        }
        return editSuplier ?
            updateSuplier.mutateAsync(body) :
            createSuplier.mutateAsync(body)

    }

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

            })
            .catch(() => setAddress({ erro: true }))
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
                    ref={name}
                />
            </Label>

            <Label >
                <p>CPF/CNPJ</p>
                < Input
                    type="text"
                    defaultValue={editSuplier && editSuplier.docment}
                    minLength={11}
                    maxLength={14}
                    onChange={() => docment.current.value.length > 11 ? setType("JURIDICO") : setType('FISICO')}
                    ref={docment}
                />
            </Label>


            <Label >
                <p>Tipo</p>
                < Input
                    type="text"
                    value={translate[type]}
                    disabled

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

                            defaultValue={editSuplier && maskPhone(editSuplier.contacts?.comercialPhone)}
                            maxLength={11}
                            ref={comercialPhone}
                        />
                    </Label>

                    <Label >
                        <p>Celular</p>

                        < Input
                            type="tel"


                            defaultValue={editSuplier && maskPhone(editSuplier.contacts?.telefone)}
                            maxLength={11}
                            ref={telefone}
                        />
                    </Label>
                    <Label >
                        <p>Email</p>

                        < Input
                            type="email"
                            defaultValue={editSuplier && editSuplier.contacts?.email}
                            ref={email}
                        />
                    </Label>

                    <Label >
                        <p>Informações para o pedido</p>

                        < TextArea
                            type="text"
                            defaultValue={editSuplier && editSuplier.contacts?.descricao}
                            ref={descricao}
                        />
                    </Label>

                    <Label >
                        <p>Whatsapp para o pedido</p>

                        < Input
                            type="tel"

                            defaultValue={editSuplier && maskPhone(editSuplier.contacts?.whatsapp)}
                            maxLength={11}
                            ref={whatsapp}
                        />
                    </Label>
                    <Label >
                        <p>Email para o pedido</p>

                        < Input
                            type="email"
                            defaultValue={editSuplier && editSuplier.contacts?.orderEmail}
                            ref={orderEmail}
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

                {
                    editSuplier ?
                        <Modal active={addressModal}>

                            <Label >
                                <p>CEP</p>

                                <span className='flex'>

                                    < Input
                                        type="text"
                                        minLength={8}
                                        maxLength={9}
                                        ref={cep}
                                        defaultValue={editSuplier && editSuplier.address.cep}

                                        onChange={(e) => {
                                            e.target.value.length === 0 &&
                                                setAddress({})
                                        }}
                                    />

                                    <button
                                        onClick={() => {
                                            cep.length >= 8 ?
                                                setAddress({ erro: true }) :
                                                getDataFromCep(cep.current.value)
                                        }}
                                    >
                                        <SearchIcon />
                                    </button>
                                </span>
                                {
                                    address?.erro &&
                                    <ErrorMessage >cep inválido</ErrorMessage>
                                }

                            </Label>


                            <Label >
                                <p>Estado</p>

                                < Input
                                    type="text"
                                    defaultValue={editSuplier.address.uf ? editSuplier.address.uf : address.uf}
                                    ref={uf}
                                />
                            </Label>
                            <Label >
                                <p>Cidade</p>

                                < Input
                                    type="text"
                                    defaultValue={editSuplier.address.cidade ? editSuplier.address.cidade : address.localidade}
                                    ref={cidade}
                                />
                            </Label>
                            <Label >
                                <p>Bairro</p>

                                < Input
                                    type="text"
                                    defaultValue={editSuplier.address.bairro ? editSuplier.address.bairro : address.bairro}
                                    ref={bairro}
                                />
                            </Label>
                            <Label >
                                <p>Rua</p>

                                < Input
                                    type="text"
                                    defaultValue={editSuplier.address.rua ? editSuplier.address.rua : address.logradouro}
                                    ref={rua}
                                />
                            </Label>
                            <Label >
                                <p>Número</p>

                                < Input
                                    type="text"
                                    defaultValue={editSuplier.address.numero && editSuplier.address.numero}
                                    ref={numero}
                                />
                            </Label>

                            <Label >
                                <p>Complemento</p>

                                < Input
                                    type="text"
                                    defaultValue={editSuplier.address.complemento && editSuplier.address.complemento}
                                    ref={complemento}
                                />
                            </Label>

                        </Modal>
                        :
                        <Modal active={addressModal}>

                            <Label >
                                <p>CEP</p>

                                <span className='flex'>

                                    < Input
                                        type="text"
                                        minLength={8}
                                        maxLength={9}
                                        ref={cep}
                                        onChange={(e) => {
                                            e.target.value.length === 0 &&
                                                setAddress({})
                                        }}
                                    />

                                    <button
                                        onClick={() => {
                                            cep.length >= 8 ?
                                                setAddress({ erro: true }) :
                                                getDataFromCep(cep.current.value)
                                        }}
                                    >
                                        <SearchIcon />
                                    </button>
                                </span>
                                {
                                    address?.erro &&
                                    <ErrorMessage >cep inválido</ErrorMessage>
                                }

                            </Label>
                            <Label >
                                <p>Estado</p>

                                < Input
                                    type="text"
                                    defaultValue={address && address.uf}
                                    ref={uf}
                                />
                            </Label>

                            <Label >
                                <p>Cidade</p>

                                < Input
                                    type="text"
                                    defaultValue={address && address.localidade}
                                    ref={cidade}
                                />
                            </Label>
                            <Label >
                                <p>Bairro</p>

                                < Input
                                    type="text"
                                    defaultValue={address && address.bairro}
                                    ref={bairro}
                                />
                            </Label>
                            <Label >
                                <p>Rua</p>

                                < Input
                                    type="text"
                                    defaultValue={address && address.logradouro}
                                    ref={rua}
                                />
                            </Label>
                            <Label >
                                <p>Número</p>

                                < Input
                                    type="text"
                                    defaultValue={address && address.numero}
                                    ref={numero}
                                />
                            </Label>

                            <Label >
                                <p>Complemento</p>

                                < Input
                                    type="text"
                                    defaultValue={address && address.complemento}
                                    ref={complemento}
                                />
                            </Label>

                        </Modal>
                }



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