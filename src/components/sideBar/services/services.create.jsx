

import PropTypes from 'prop-types';
import { useService } from '../../../hooks/services/servicesContext.hook.jsx';
import { Select } from "../../source.jsx";
import { Input, InputCheckbox, Label, Submit } from "../styles.jsx";


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
                <p>Preço de vitríne(parcela)</p>
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
            <Label >
                <p>Carga horária(em horas)</p>
                < Input
                    type="number"
                    defaultValue={editService && editService.workLoad}
                    onChange={(e) => {
                        e.target.value !== '' &&
                            sender("workLoad", e.target.value)
                    }}
                />
            </Label>
            <Label >
                <p>Duração(em meses)</p>
                < Input
                    type="number"
                    defaultValue={editService && editService.duration}
                    onChange={(e) => {
                        e.target.value !== '' &&
                            sender("color", e.target.value)
                    }}
                />
            </Label>

            <Label >
                <p>Curso</p>
                < Select
                    where="create"
                    label={editService && editService.course}
                    width="11.5rem"
                    option={[
                        { name: "Inglês" },
                        { name: "Tecnologia" },
                        { name: "Espanhol" },
                    ]}
                    field="destiny"
                    fn={[sender]}
                />
            </Label>

            <Label >
                <p>Modalidade</p>
                < Select
                    where="create"
                    label={editService && editService.modality}
                    width="11.5rem"
                    option={[
                        { name: "Em grupo" },
                        { name: "Em dupla" },
                        { name: "Trio" },
                        { name: "Individual" },
                    ]}
                    field="destiny"
                    fn={[sender]}
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
                            defaultChecked={editService ? editService.status === true : true}
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
                            defaultChecked={editService && editService.status === false}
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


ServicesSidebar.propTypes = {
    location: PropTypes.object
}