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

export const ListOpt = styled.ul`
display:${props => props.open ? "" : "none"} ;
position: absolute;
margin: .25rem 0 ;
border-radius: var(--br);
background-color:#d0d0d0;
width: 100%;
z-index: 13;
max-height: 20rem;
overflow-y: scroll;
&::-webkit-scrollbar{
    display: none;
}

`

export const Options = styled.li`
transition: .4s;
transform-origin: top;
color: #222;
padding: .75rem;
border-bottom: 1px solid #fff;
display: flex;
align-items: center;
justify-content: center;
gap: .75rem;
cursor: pointer;
height: var(--boxHei);
z-index: 10;
border-radius: var(--br);
background: ${props => props.selected ? "#c4d3e0" : ""};
font-size: calc(var(--fsXLow) - 2px);


span{
    text-align: center;
    font-size: calc(var(--fsXLow) - 1px) ;
    position: relative;
    width: 100%;

    
    display: flex;
    align-items: center;
    justify-content: space-between;
    p{
        max-width: 90%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    svg{
        display: ${props => props.selected ? "block" : "none"};
        height: 18px;
        max-width: 10%;
    }
}
&:hover{
    background: #c4d3e0;
    border-radius: var(--br);
    p{
        scale: 1.03;
    }
    }
    
`


export const SelectButton = styled.div`
position: relative;
color: #222;
padding: .4rem ;
display: flex;
justify-content: space-between;
align-items: center;
border-radius: var(--br);
border: ${props => props.noOptions ? ".5px solid #f74949" : ".5px solid #a9a9a9"};

min-height: calc(var(--boxHei) - 8px);
max-height: var(--boxHei);

#selected-value{
    color: #000;
    font-size: var(--fsXLow) ;
}
`
export const Icon = styled.div`
display: flex;
align-items: center;
cursor: pointer;
position: absolute;
right: 10px;
.icon{
    transform: ${props => props.open ? "rotate(180deg)" : "rotate(0deg)"};
    translate: ${props => props.open ? "4px -4px" : ""};
    transition: all.4s;
    }
`
