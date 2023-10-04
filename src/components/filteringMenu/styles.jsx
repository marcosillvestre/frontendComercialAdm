import styled from "styled-components";

export const Container = styled.main`

`
export const Label = styled.label`
font-size:.6rem;

display: grid;
gap:.2rem;
margin:.3rem 1rem 0 .3rem;
width: 100%;
height: 100%;
`
export const Select = styled.select`
border: none;
border-bottom: 1px solid;
padding: .4rem;
width: 90%;
`
export const LabelDate = styled.label`
display: flex;
justify-content: center;
margin: 1rem 1rem 1rem 1rem;
/* padding: 1rem 5rem .1rem 5rem; */ 

span{
    display: flex;
    align-items: center;
    gap:.7rem;
    height: 100%;
    width: 100%;
}
`
export const Input = styled.input`
border: none;
border-bottom: 1px solid;
padding-left: .5rem;
width: 7rem;
`
