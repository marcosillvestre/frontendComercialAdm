import styled from "styled-components";

export const Container = styled.main`
white-space: normal;
display: grid;
gap: 1rem;
font-size: var(--fsLowest);
span{
    max-width: 100%;
    overflow-x: scroll;
    &::-webkit-scrollbar{
        display: none;
    }
}
`


export const ButtonDelete = styled.button`
width: 49%;
height: var(--boxHei);
border-radius: var(--br);
border: .5px solid #c1c1c1;
cursor: pointer;
`
export const ButtonContainer = styled.span`
display: flex;
justify-content: space-between;
`