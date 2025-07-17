

import PropTypes from 'prop-types';
import { useState } from 'react';
import { useCategorieProducts } from '../../../../hooks/categorieProduct/categorieProd.hook.jsx';
import { useProduct } from '../../../../hooks/products/productsContext.hook.jsx';
import { useUser } from '../../../../hooks/userContext.jsx';
import { SureCloseSave } from '../../../popUps/sureCloseAndSave/index.jsx';
import { MultiSelect } from '../../../selects/MultiSelect/index.jsx';
import { Input, Label, Submit } from "../../styles.jsx";
import { ButtonContainer, ButtonDelete } from '../styles.jsx';


export const Category = () => {
    const { editCategorieProducts, setEditCategorieProducts, CategorieProducts, setCategorieProducts,
        createCategorieProducts, mutateCategorieProducts,
    } = useCategorieProducts();

    const { productsTotalsQuery: { data: { products } } } = useProduct()

    const { setOpenSidebar, setTypeSidebar } = useUser();

    const body = editCategorieProducts ?? CategorieProducts;
    const [edited, setEdited] = useState(false);

    const handleClose = () => {
        setEditCategorieProducts(null);
        setCategorieProducts(null);
        setOpenSidebar(false);
        setTypeSidebar(0)
    }


    const sender = (key, value) => {
        setEdited(true);

        editCategorieProducts !== null ?
            setEditCategorieProducts({ ...editCategorieProducts, [key]: value }) :
            setCategorieProducts({ ...CategorieProducts, [key]: value })
    }


    const submit = () => {
        editCategorieProducts !== null ?
            mutateCategorieProducts.mutateAsync(body) :
            createCategorieProducts.mutateAsync(body)
    }

    return (

        <div style={{ whiteSpace: "normal", display: "grid", gap: "1rem" }}>
            <Label >
                <p>Nome da categoria</p>
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
                <p>Produtos relacionados</p>
                <MultiSelect
                    field="products"
                    related={body ? body.products : []}
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


Category.propTypes = {
    location: PropTypes.object
}