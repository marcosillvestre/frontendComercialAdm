import { useEffect, useMemo, useState } from 'react';
import { useOrders } from '../../hooks/orders/ordersContext.hook.jsx';
import { useUser } from '../../hooks/userContext.jsx';
import { CloserClick } from '../source.jsx';
import { Box, ButtonContainer, Container, Edit, OptionsContainer } from './styles.jsx';

export function MultiAlterationOrders(data) {
    const { checkData, queryOrder, setQueryOrder, body, setBody, mutationMultiUpdate } = useOrders()
    const { userData } = useUser()


    const arrayQuantityChanges = useMemo(() => [
        {
            label: 'CONFIRMAR CHEGADA',
            type: 'arrived',
            value: true
        },

        {
            label: 'DEFINIR COMO REVISADO',
            type: 'status',
            value: 'REVISADO'
        },
        {
            label: 'DEFINIR COMO DISPONÍVEIS',
            type: 'status',
            value: 'DISPONIVEL',
        },

        {
            label: 'DEFINIR COMO ENTREGUE',
            type: 'delivery',
            value: true

        },
        {
            label: 'CANCELAR PEDIDO',
            type: 'available',
            value: false
        },

        {
            label: 'CONFIRMAR CHEGADA DE REPOSIÇÃO',
            type: 'type',
            value: "REPOSICAO"
        },


        // {
        //     label: 'FAZER REPOSIÇÃO DE MERCADORIAS',
        //     type: 'status',
        //     email: true
        // },
        // {
        //     label: 'FAZER PEDIDO',
        //     type: 'status',
        //     email: true
        // },

    ], [])


    const [manyAlteration, setManyAlteration] = useState(false)
    const [optionGroup, setOptionGroup] = useState([])


    const handleManyAlteration = () => {
        setOptionGroup(arrayQuantityChanges)
        setManyAlteration(!manyAlteration)
    }

    useEffect(() => {
        setOptionGroup(arrayQuantityChanges)
    }, [arrayQuantityChanges])


    const handleOptionGroup = ({ label, type, value, email }) => {

        if (email) return console.log("first")

        setBody({
            responsible: userData.name,
            ids: checkData.map(res => res.id),
            where: type,
            what: value
        })

        optionGroup.length > 1 ?
            setOptionGroup(optionGroup.filter(res => res.label === label)) :
            setOptionGroup(arrayQuantityChanges)

    }

    const close = () => {
        setManyAlteration(!manyAlteration)

    }


    async function handleSenderDataToBeChanged() {

        mutationMultiUpdate.mutateAsync()
            .then((e) => console.log(e))

        close()

        const { order, count } = queryOrder
        const data = []
        const { ids, where, what } = body
        for (let index = 0; index < order.length; index++) {
            const object = order[index];
            console.log(ids)

            const idSearched = ids.find(res => res === object.id)

            idSearched ? data.push({ ...object, [where]: what }) :
                data.push(object)

        }

        setQueryOrder({ order: data, count })

    }


    return (
        <>
            <CloserClick
                open={manyAlteration}
                fn={close}
                opacity={.01}
            />
            <ButtonContainer>

                <Container
                    $open={manyAlteration}
                    able={data.able}
                    onClick={() => data.able ? handleManyAlteration() : ""}
                >
                    <p>{data.label}</p>

                </Container>

                <Box $emmit={manyAlteration}
                    $open={manyAlteration}

                >
                    {
                        optionGroup &&
                        optionGroup.map((res, index) => (
                            <OptionsContainer
                                key={index}
                                $open={manyAlteration}

                            >

                                <Edit
                                    able={data.able}
                                    $open={manyAlteration}
                                    onClick={() => handleOptionGroup(res)}
                                >
                                    {res.label}
                                </Edit>

                            </OptionsContainer>
                        ))
                    }


                    {
                        optionGroup.length === 1 &&
                        <Edit
                            className='flex'
                            able={data.able}
                            onClick={() => handleSenderDataToBeChanged()}
                        >
                            confirmar
                        </Edit>
                    }

                </Box>
            </ButtonContainer>
        </>


    );
}