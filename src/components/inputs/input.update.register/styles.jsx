import styled from "styled-components"

export const Container = styled.div`
position: relative;
font-size: var(--fsLowest) ;
height: var(--boxHei);
width: 100%;
user-select: none;
cursor: pointer;

#category-select {
font-size: var(--fsLowest) ;
letter-spacing: .0225rem;
}

`


export const SelectButton = styled.div`
position: relative;
color: #222;
display: flex;
justify-content: space-between;
align-items: center;
border-radius: var(--br);
border: ${props => props.disabled ? ".5px solid #a9a9a966" : ".5px solid #a9a9a9"};
min-height: calc(var(--boxHei) - 2px);
max-height: var(--boxHei);

#selected-value{
    color: #000;
    font-size: var(--fsXLow) ;
    padding: .4rem ;
    border: none;
    background-color: transparent;
    width: 100%;
    height: 100%;
}
`


