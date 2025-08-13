import styled from "styled-components"

export const Container = styled.span`
position: relative;
font-size: var(--fsLowest) ;
height: var(--boxHei);

cursor: pointer;
user-select: none;
margin: 0 auto;

#category-select {
font-size: var(--fsLowest) ;
letter-spacing: .0225rem;
}


`


export const SelectButton = styled.label`
color: #222;
display: flex;
align-items: center;
border-radius: var(--br);
border: ${props => props.disabled ? ".5px solid #a9a9a966" : ".5px solid #a9a9a9"};
min-height: calc(var(--boxHei) - 8px);


#selected-value{
    color: #000;
    font-size: var(--fsXLow) ;
    height: 100%;
    width: 100%;
    border: none;
    padding-left: 10px;
    background-color: transparent;

}

max-height: var(--boxHei);

`


