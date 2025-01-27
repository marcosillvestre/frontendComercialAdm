

import PropTypes from 'prop-types';
import { useCampaign } from "../../../hooks/campaign/campaignContext.hook.jsx";
import { Select } from "../../source.jsx";
import { Input, Label, Submit, TextArea } from "../styles.jsx";


export const Campaign = () => {

    const { editCampaign, setEditCampaign, campaign, setCampaign, createCampaign, mutateCampaign } = useCampaign()
    const sender = (key, value) => {

        editCampaign !== null ?
            setEditCampaign({ ...editCampaign, [key]: value }) :
            setCampaign({ ...campaign, [key]: value })
    }


    const submit = () => {

        editCampaign !== null ?
            mutateCampaign.mutateAsync() :
            createCampaign.mutateAsync()
    }

    return (

        <div style={{ whiteSpace: "normal", display: "grid", gap: "1rem" }}>
            <Label >
                <p>Nome da campanha</p>
                < Input
                    type="text"
                    defaultValue={editCampaign && editCampaign.name}
                    onChange={(e) => {
                        e.target.value !== '' &&
                            sender("name", e.target.value)
                    }}
                />
            </Label>
            <Label >
                <p>Descrição</p>
                <TextArea name="" id=""
                    defaultValue={editCampaign && editCampaign.description}
                    onChange={(e) => {
                        e.target.value !== '' &&
                            sender("description", e.target.value)
                    }}
                />
            </Label>
            <Label >
                <p>Parcelas afetadas</p>
                < Input
                    type="number"
                    defaultValue={editCampaign && editCampaign.affectedParcels}
                    onChange={(e) => {
                        e.target.value !== '' &&
                            sender("affectedParcels", parseInt(e.target.value))
                    }}
                />
            </Label>
            <Label >
                <p>Tipo de desconto</p>
                < Select
                    where="create"
                    label={editCampaign && editCampaign.descountType}
                    width="11.5rem"
                    option={[
                        { name: "Porcentagem", value: "Percentage" },
                        { name: "Valor cheio", value: "Value" },
                    ]}
                    field="descountType"
                    fn={[sender]}
                />
            </Label>
            <Label >
                <p>Valor</p>
                < Input
                    type="number"
                    defaultValue={editCampaign && editCampaign.value}
                    onChange={(e) => {
                        e.target.value !== '' &&
                            sender("value", parseInt(e.target.value))
                    }}
                />
            </Label>
            <Label >
                <p>Alvo</p>
                < Select
                    where="create"
                    label={editCampaign && editCampaign.for}
                    width="11.5rem"
                    option={[
                        { name: "Parcela", value: "Parcel" },
                        { name: "Material", value: "Material" },
                        { name: "Taxa de matricula", value: "Tax" },
                    ]}
                    field="destiny"
                    fn={[sender]}
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


Campaign.propTypes = {
    location: PropTypes.object
}