import styled from "styled-components"

export const Container = styled.td`
position: relative;
font-size: var(--fsLowest) ;


#category-select {
font-size: var(--fsLowest) ;
letter-spacing: .0225rem;
background-color: #895e26;
width: 100%;
height: 100%;
}
input[type="file"]{
    display: none;
}


`

export const ListOpt = styled.ul`
display:${props => props.open ? "" : "none"} ;
position: absolute;
margin-top: .25rem ;
background-color:#d0d0d0;
width: 100%;
z-index: 13;
border-radius: .3rem;

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
border-radius: 0 .3rem;

    span{
    text-align: center;
    }
    &:hover{
    background: #c4d3e0;
    }
    
`


export const SelectButton = styled.input`
color: #222;
padding: .4rem .75rem;
margin-top: .5rem;
display: flex;
border-radius: .2rem;
border: .5px solid #a9a9a9;
#selected-value{
    color: #000;
    font-size: var(--fsXLow) ;
}

max-height: var(--boxHei);

`


