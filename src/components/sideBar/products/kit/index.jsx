

import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { useKits } from '../../../../hooks/kits/kitsContext.hook.jsx';
import { useProduct } from '../../../../hooks/products/productsContext.hook.jsx';
import { useUser } from '../../../../hooks/userContext.jsx';
import { SureCloseSave } from '../../../popUps/sureCloseAndSave/index.jsx';
import { MultiSelect } from '../../../selects/MultiSelect/index.jsx';
import { Input, Label, Submit, TextArea } from "../../styles.jsx";
import { ButtonContainer, ButtonDelete } from '../styles.jsx';


export const Kits = () => {
    const { productsTotalsQuery: { data: { products } } } = useProduct();
    const { editKits, setEditKits, Kits, setKits,
        createKits, mutateKits, } = useKits();

    const { setOpenSidebar, setTypeSidebar } = useUser();

    const body = editKits ?? Kits;

    const [edited, setEdited] = useState(false);

    const inputRef = useRef();

    const handleClose = () => {
        setEditKits(null);
        setKits(null);
        setOpenSidebar(false);
        setTypeSidebar(0)
    }


    const sender = (key, value) => {
        setEdited(true);

        if (key === 'relatedProducts') {
            const sum = value.reduce((acc, curr) => acc + parseFloat(curr.priceSale), 0)
            inputRef.current.value = sum


            editKits !== null ?
                editKits['priceSale'] = sum :
                Kits["priceSale"] = sum
        }


        editKits !== null ?
            setEditKits({ ...editKits, [key]: value }) :
            setKits({ ...Kits, [key]: value })
    }


    const submit = () => {
        editKits !== null ?
            mutateKits.mutateAsync(body) :
            createKits.mutateAsync(body)
    }

    return (

        <div style={{ whiteSpace: "normal", display: "grid", gap: "1rem" }}>
            <Label >
                <p>Nome do kit</p>
                < Input
                    type="text"
                    defaultValue={body && body.name}
                    onChange={(e) => {
                        e.target.value !== '' &&
                            sender("name", e.target.value)
                    }}
                />
            </Label>
            <Label >
                <p>Código(SKU)</p>
                < Input
                    type="text"
                    defaultValue={body && body.code}
                    onChange={(e) => {
                        e.target.value !== '' &&
                            sender("code", e.target.value)
                    }}
                />
            </Label>
            <Label >
                <p>Descrição</p>
                <TextArea name="" id=""
                    defaultValue={body && body.description}
                    onChange={(e) => {
                        e.target.value !== '' &&
                            sender("description", e.target.value)
                    }}
                />
            </Label>
            <Label >
                <p>Preço de venda(R$) </p>
                < Input
                    type="text" pattern="^\d+(\.\d+)?$"
                    ref={inputRef}
                    defaultValue={body && body.priceSale}
                    id='priceSale'
                    onChange={(e) => {
                        e.target.value !== '' &&
                            sender("priceSale", parseFloat(e.target.value))
                    }}
                />
            </Label>

            <Label >
                <p>Produtos relacionados</p>
                <MultiSelect
                    field="relatedProducts"
                    related={body ? body.relatedProducts : []}
                    fn={sender}
                    width="11.5rem"
                    option={products}

                />
            </Label>


            <hr />
            <ButtonContainer>
                <ButtonDelete>
                    <SureCloseSave
                        fn={handleClose}
                        edition={edited}
                    />
                </ButtonDelete>

                <Submit
                    placeholder="Enviar"
                    className='defaultButton blueButton'
                    onClick={() => submit()}
                >
                    ENVIAR
                </Submit>
            </ButtonContainer>
        </div>

    )
}


Kits.propTypes = {
    location: PropTypes.object
}