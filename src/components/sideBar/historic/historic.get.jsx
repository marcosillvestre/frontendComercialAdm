import LoadingSpin from "react-loading-spin";
import { useUser } from "../../../hooks/userContext";
import { Card, HistoricCard, Submit } from "../styles";

import businessRules from '../../../app/utils/Rules/options.jsx';

import PropTypes from 'prop-types';


export const Historic = () => {

    const {

        historic, isPendingHistoric, historicSuccess,
        setHistoricTake, historicTake, setQueryParam

    } = useUser()

    const { fields } = businessRules

    return (

        <div style={{ whiteSpace: "normal", }}>

            {
                isPendingHistoric ?
                    <LoadingSpin
                        duration="4s"
                        width="15px"
                        timingFunction="ease-in-out"
                        direction="alternate"
                        size="60px"
                        primaryColor="#1976d2"
                        secondaryColor="#333"
                        numberOfRotationsInAnimation={3}
                    />
                    :

                    historicSuccess &&
                    <>
                        {
                            historic.map(res => (
                                <HistoricCard key={res.id}>
                                    {
                                        fields[res.information.field] ?

                                            res.information.from ?
                                                <Card
                                                    to={`/controle-comercial`}
                                                    onClick={() => {
                                                        setQueryParam({ param: "contrato", value: res.information.from })
                                                    }}
                                                >
                                                    <div >
                                                        o campo {fields[res.information.field]} do contrato
                                                        <u>
                                                            {res.information.from}
                                                        </u>
                                                        foi alterado para {res.information.to}
                                                    </div>

                                                    <div>
                                                        <p>feito por {res.responsible}</p>
                                                        <p>às {new Date(res.date).toLocaleString()}</p>
                                                    </div>
                                                </Card>
                                                :
                                                `Assinatura de contrato : ${res.responsible}`
                                            :
                                            <Card
                                                to={`/pedidos`}
                                                onClick={() => {
                                                    setQueryParam({ param: "id", value: res.information.from })
                                                }}
                                            >
                                                <div >
                                                    o {res.information.field === "arrived" ? "Campo Recebido" : res.information.field} do código
                                                    <u>
                                                        {res.information.from}
                                                    </u>
                                                    foi alterado para {res.information.to === true || res.information.to === false ?
                                                        res.information.to ? "Sim" : "Não" : res.information.to}
                                                </div>

                                                <div>
                                                    <p>feito por {res.responsible}</p>
                                                    <p>às {new Date(res.date).toLocaleString()}</p>
                                                </div>

                                            </Card>

                                    }


                                </HistoricCard>
                            ))

                        }
                        <Submit
                            className="defaultButton"
                            onClick={() => setHistoricTake(historicTake + 10)}>
                            +10
                        </Submit>

                    </>
            }


        </div>

    )
}


Historic.propTypes = {
    location: PropTypes.object
}