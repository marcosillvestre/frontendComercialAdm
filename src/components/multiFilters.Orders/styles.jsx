import styled from "styled-components";


export const Container = styled.section`
display: ${({ active }) => (active ? 'flex' : 'none')};
gap: 15px;

`
export const FilterContainer = styled.section`
flex-direction: column;
border: 1px dashed #2E2F8E;
color: #090933;
background-color: #2e308e1e;
width: 10rem;
padding: 5px;
border-radius: var(--border-radius);
div{
    display: flex;
    justify-content: space-between;
    width: 100%;
    cursor: pointer;
    svg{
        width: 12px;
        height: 12px;
    }
}
select{
width: 100%;
background-color: #2e308e21;
}

`

