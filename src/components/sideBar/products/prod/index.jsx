import PropTypes from 'prop-types';
import { useState } from 'react';
import { useCategorieProducts } from '../../../../hooks/categorieProduct/categorieProd.hook.jsx';
import { useProduct } from '../../../../hooks/products/productsContext.hook.jsx';
import { useUser } from '../../../../hooks/userContext.jsx';
import { SureCloseSave } from '../../../popUps/sureCloseAndSave/index.jsx';
import { Select } from "../../../source.jsx";
import { Input, InputCheckbox, Label, Submit, TextArea } from "../../styles.jsx";
import { ButtonContainer, ButtonDelete } from '../styles.jsx';


export const Prod = () => {
    const { editProduct, setEditProduct, Product, setProduct,
        createProduct, mutateProduct } = useProduct();

    const { queryCategorieProducts: { categorie } } = useCategorieProducts();

    const { setOpenSidebar, setTypeSidebar } = useUser();

    const body = editProduct ?? Product;

    const [edited, setEdited] = useState(false)


    const sender = (key, value) => {
        setEdited(true);

        editProduct !== null ?
            setEditProduct({ ...editProduct, [key]: value }) :
            setProduct({ ...Product, [key]: value })
    }

    const submit = () => {
        editProduct !== null ?
            mutateProduct.mutateAsync(body) :
            createProduct.mutateAsync(body)
    }

    const handleClose = () => {
        setEditProduct(null);
        setProduct(null);
        setOpenSidebar(false);
        setTypeSidebar(0)
    }


    return (

        <div style={{ whiteSpace: "normal", display: "grid", gap: "1rem" }}>
            <Label >
                <p>Nome do produto</p>
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
                <p>Preço de venda</p>
                < Input
                    type="text" pattern="^\d+(\.\d+)?$"
                    defaultValue={body && body.priceSale}
                    onChange={(e) => {
                        e.target.value !== '' &&
                            sender("priceSale", parseFloat(e.target.value))
                    }}
                />
            </Label>

            <Label >
                <p>Preço de custo</p>
                < Input
                    type="text" pattern="^\d+(\.\d+)?$"
                    defaultValue={body && body.priceCost}
                    onChange={(e) => {
                        e.target.value !== '' &&
                            sender("priceCost", parseFloat(e.target.value))
                    }}
                />
            </Label>
            <Label >
                <p>Min. estoque</p>
                < Input
                    type="text" pattern="\d+"
                    defaultValue={body && body.minStock}
                    onChange={(e) => {
                        e.target.value !== '' &&
                            sender("minStock", parseFloat(e.target.value))
                    }}
                />
            </Label>
            <Label >
                <p>Max. estoque</p>
                < Input
                    type="text" pattern="\d+"
                    defaultValue={body && body.maxStock}
                    onChange={(e) => {
                        e.target.value !== '' &&
                            sender("maxStock", parseFloat(e.target.value))
                    }}
                />
            </Label>

            <Label >
                <p>EAN</p>
                < Input
                    type="text"
                    defaultValue={body && body.ean}
                    onChange={(e) => {
                        e.target.value !== '' &&
                            sender("ean", parseFloat(e.target.value))
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
                <p>Categoria</p>
                < Select
                    where="create"
                    label={body && body.categorieName}
                    width="11.5rem"
                    option={categorie}
                    field="categorieName"
                    fn={[sender]}
                />
            </Label>
            <Label >
                <p>Unidade de medida</p>
                < Select
                    where="create"
                    label={body && body.unit}
                    width="11.5rem"
                    option={[
                        { name: "UN" },
                        { name: "KG" },
                        { name: "M" },
                    ]}
                    field="unit"
                    fn={[sender]}
                />
            </Label>
            <Label >
                <fieldset>

                    <legend>Situação</legend>
                    <div>
                        < InputCheckbox
                            type="radio"
                            id='positive'
                            name='active'
                            defaultChecked={editProduct ? editProduct.active === true : true}
                            value={true}
                            onChange={() => sender("active", true)}
                        />
                        <label htmlFor="positive">Ativo</label>

                    </div>

                    <div>
                        < InputCheckbox
                            type="radio"
                            id='negative'
                            name='active'
                            defaultChecked={body && body.active === false}
                            value={false}
                            onChange={() => sender("active", false)}

                        />
                        <label htmlFor="negative">Inativo</label>
                    </div>
                </fieldset>

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


Prod.propTypes = {
    location: PropTypes.object
}