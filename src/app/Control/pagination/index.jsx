// import React from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { useData } from '../../../hooks/dataContext';
import { useUser } from '../../../hooks/userContext';
import { Container, PagButton } from './styles';
const Pagination = (data) => {
    const { take, skip, setSkip } = useUser()
    const { setCustomizableArray, setTypeFilter } = useData()

    let pag = []

    for (let i = 0; i < Math.ceil(data.data / take); i++) {
        pag.push(res => [...res, { "number": i }])
    }

    const handlePagination = (index) => {
        setSkip(take * index)
        setCustomizableArray([])
        setTypeFilter([])
    }

    return (
        <Container>


            <Splide
                options={{
                    perPage: 5,
                    pagination: false
                }}

            >
                {
                    pag.map((res, index) => (
                        <SplideSlide key={res}>

                            <PagButton
                                onClick={() => handlePagination(index)}
                                key={res}
                                active={skip / take === index}
                            >
                                {index + 1}

                            </PagButton>
                        </SplideSlide>

                    ))
                }
            </Splide>


        </Container>
    )
}

export default Pagination