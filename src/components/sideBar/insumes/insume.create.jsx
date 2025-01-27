

import PropTypes from 'prop-types';
import { useInsume } from '../../../hooks/insumes/insumesContext.hook.jsx';
import { Select } from "../../source.jsx";
import { Input, Label, Submit } from "../styles.jsx";


export const Insume = () => {

    const { editInsume, setEditInsume, Insume, setInsume,
        createInsume, mutateInsume } = useInsume()
    const sender = (key, value) => {

        editInsume !== null ?
            setEditInsume({ ...editInsume, [key]: value }) :
            setInsume({ ...Insume, [key]: value })
    }


    console.log(editInsume)
    const submit = () => {

        editInsume !== null ?
            mutateInsume.mutateAsync() :
            createInsume.mutateAsync()
    }

    return (

        <div style={{ whiteSpace: "normal", display: "grid", gap: "1rem" }}>
            <Label >
                <p>Nome do insumo</p>
                < Input
                    type="text"
                    defaultValue={editInsume && editInsume.name}
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
                    defaultValue={editInsume && editInsume.sku}
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
                    defaultValue={editInsume && editInsume.price_selling}
                    onChange={(e) => {
                        e.target.value !== '' &&
                            sender("price_selling", parseInt(e.target.value))
                    }}
                />
            </Label>
            <Label >
                <p>Categoria</p>
                < Select
                    where="create"
                    label={editInsume && editInsume.category}
                    width="11.5rem"
                    option={[
                        { name: "Produto", value: "Product" },
                        { name: "Serviço", value: "Service" },
                    ]}
                    field="category"
                    fn={[sender]}
                />
            </Label>
            <Label >
                <p>Cor</p>
                < Input
                    type="color"
                    defaultValue={editInsume && editInsume.color}
                    onChange={(e) => {
                        e.target.value !== '' &&
                            sender("color", e.target.value)
                    }}
                />
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


Insume.propTypes = {
    location: PropTypes.object
}