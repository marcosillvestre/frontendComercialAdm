

import PropTypes from 'prop-types';
import { useService } from '../../../hooks/services/servicesContext.hook.jsx';
import { Input, Label, Submit } from "../styles.jsx";


export const ServicesSidebar = () => {
    const { editService, setEditService, Service, setService,
        createService, mutateService } = useService()


    const sender = (key, value) => {
        editService !== null ?
            setEditService({ ...editService, [key]: value }) :
            setService({ ...Service, [key]: value })
    }

    const submit = () => {

        editService !== null ?
            mutateService.mutateAsync() :
            createService.mutateAsync()
    }



    return (

        <div style={{ whiteSpace: "normal", display: "grid", gap: "1rem" }}>
            <Label >
                <p>Nome do serviço</p>
                < Input
                    type="text"
                    defaultValue={editService && editService.name}
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
                    defaultValue={editService && editService.sku}
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
                    defaultValue={editService && editService.price_selling}
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
                    defaultValue={editService && editService.color}
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


ServicesSidebar.propTypes = {
    location: PropTypes.object
}