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

export const ListOpt = styled.ul`
display:${props => props.open ? "" : "none"} ;
position: absolute;
margin-top: .25rem ;
background-color:#d0d0d0;
width: 100%;
z-index: 13;
border-radius: var(--br);


`

export const Options = styled.li`
transition: .4s;
transform-origin: top;
color: #222;
border-bottom: 1px solid #fafafa;
display: flex;
align-items: center;
justify-content: center;
gap: .75rem;
cursor: pointer;
padding: .4rem .75rem;
font-size: calc(var(--fsLowest) - 2px);
z-index: 10;
border-radius: var(--br);

    span{
    text-align: center;
    }
    &:hover{
    background: #c4d3e0;
    scale: 1.03;
border-radius: var(--br);

    }
    
`


export const SelectButton = styled.div`
color: #222;
padding: .4rem .75rem;
display: flex;
align-items: center;
border-radius: var(--br);
border: ${props => props.noOptions ? ".5px solid #f74949" : ".5px solid #a9a9a9"};
min-height: calc(var(--boxHei) - 8px);

#selected-value{
    color: #000;
    font-size: var(--fsXLow) ;
}

max-height: var(--boxHei);

`


