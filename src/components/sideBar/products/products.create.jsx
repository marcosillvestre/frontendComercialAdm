

import PropTypes from 'prop-types';
import { useProduct } from '../../../hooks/products/productsContext.hook.jsx';
import { Input, InputCheckbox, Label, Submit } from "../styles.jsx";


export const ProductsSidebar = () => {
    const { editProduct, setEditProduct, Product, setProduct,
        createProduct, mutateProduct } = useProduct()

    const sender = (key, value) => {

        editProduct !== null ?
            setEditProduct({ ...editProduct, [key]: value }) :
            setProduct({ ...Product, [key]: value })
    }


    const submit = () => {
        editProduct !== null ?
            mutateProduct.mutateAsync() :
            createProduct.mutateAsync()
    }

    return (

        <div style={{ whiteSpace: "normal", display: "grid", gap: "1rem" }}>
            <Label >
                <p>Nome do produto</p>
                < Input
                    type="text"
                    defaultValue={editProduct && editProduct.name}
                    onChange={(e) => {
                        e.target.value !== '' &&
                            sender("name", e.target.value)
                    }}
                />
            </Label>
            <Label >
                <p>Sku</p>
                < Input
                    type="text"
                    defaultValue={editProduct && editProduct.sku}
                    onChange={(e) => {
                        e.target.value !== '' &&
                            sender("sku", e.target.value)
                    }}
                />
            </Label>
            <Label >
                <p>Preço de vitríne</p>
                < Input
                    type="number"
                    defaultValue={editProduct && editProduct.price_selling}
                    onChange={(e) => {
                        e.target.value !== '' &&
                            sender("price_selling", parseInt(e.target.value))
                    }}
                />
            </Label>
            <Label >
                <p>Cor</p>
                < Input
                    type="color"
                    defaultValue={editProduct && editProduct.color}
                    onChange={(e) => {
                        e.target.value !== '' &&
                            sender("color", e.target.value)
                    }}
                />
            </Label>
            <Label >
                <fieldset>

                    <legend>Status</legend>
                    <div>
                        < InputCheckbox
                            type="radio"
                            id='positive'
                            name='status'
                            defaultChecked={editProduct ? editProduct.status === true : true}
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
                            defaultChecked={editProduct && editProduct.status === false}
                            value={false}
                            onChange={() => sender("status", false)}

                        />
                        <label htmlFor="negative">Inativo</label>
                    </div>
                </fieldset>

            </Label>


            <hr />
            <Submit
                placeholder="Enviar"
                className='defaultButton'
                onClick={() => submit()}
            >
                Enviar
            </Submit>
        </div>

    )
}


ProductsSidebar.propTypes = {
    location: PropTypes.object
}