import PropTypes from 'prop-types';
import { useState } from 'react';
import { useService } from '../../../hooks/services/servicesContext.hook.jsx';
import { useUser } from '../../../hooks/userContext.jsx';
import { SureCloseSave } from '../../popUps/sureCloseAndSave/index.jsx';
import { Select } from "../../source.jsx";
import { ButtonContainer, ButtonDelete } from '../products/styles.jsx';
import { Input, InputCheckbox, Label, Submit, TextArea } from "../styles.jsx";


export const ServicesSidebar = () => {
    const { editService, setEditService, Service, setService,
        createService, mutateService } = useService();

    const { setOpenSidebar, setTypeSidebar } = useUser();

    const body = editService ?? Service;

    const [edited, setEdited] = useState(false);

    const sender = (key, value) => {
        setEdited(true);

        editService !== null ?
            setEditService({ ...editService, [key]: value }) :
            setService({ ...Service, [key]: value })
    }

    const submit = () => {

        editService !== null ?
            mutateService.mutateAsync(body) :
            createService.mutateAsync(body)
    }



    const handleClose = () => {
        setEditService(null);
        setService(null);

        setOpenSidebar(false);
        setTypeSidebar(0)
    }

    return (

        <div style={{ whiteSpace: "normal", display: "grid", gap: "1rem" }}>
            <Label >
                <p>Nome do serviço</p>
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
                <p>Carga horária(em horas)</p>
                < Input
                    type="text" pattern="\d+"
                    defaultValue={body && body.workLoad}
                    onChange={(e) => {
                        e.target.value !== '' &&
                            sender("workLoad", e.target.value)
                    }}
                />
            </Label>
            <Label >
                <p>Duração(em meses)</p>
                < Input
                    type="text" pattern="\d+"
                    defaultValue={body && body.duration}
                    onChange={(e) => {
                        e.target.value !== '' &&
                            sender("duration", e.target.value)
                    }}
                />
            </Label>

            <Label >
                <p>Modalidade</p>
                < Select
                    where="create"
                    label={body && body.modality}
                    width="11.5rem"
                    option={[
                        { name: "Em grupo" },
                        { name: "Em dupla" },
                        { name: "Trio" },
                        { name: "Individual" },
                    ]}
                    field="modality"
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
                            name='active'
                            defaultChecked={editService ? editService.active === true : true}
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


ServicesSidebar.propTypes = {
    location: PropTypes.object
}