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
width: 100%;
z-index: 13;
background-color:#fff;
box-shadow:
    0 2px 5px rgba(0, 0, 0, 0.08),  
    0 8px 20px rgba(0, 0, 0, 0.12); 
padding: 7px;
&::-webkit-scrollbar{
    display: none;
}

.mid-container{
max-height: 12rem;
overflow-y: scroll;
}
`

export const Options = styled.li`
transition: .4s;
transform-origin: top;
color: #222;
padding: .75rem;
border: 1px solid #f1f1f1;
margin-bottom: 2px;
display: flex;
align-items: center;
justify-content: center;
gap: .75rem;
cursor: pointer;
height: var(--boxHei);
z-index: 10;
border-radius: var(--br);
background: ${props => props.selected ? "#f1f1f1" : ""};
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
    background: #f1f1f1;
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

min-height: calc(var(--boxHei) - 2px);
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
export const SearchNav = styled.nav`
padding: 4px 10px;
display: flex;
align-items: center;
border: .2px solid #d1d1d1;
background-color: #f1f1f1;
border-radius: var(--br);
margin: 5px auto;
svg{
    width: 20px;
}
input{
    flex: 1;
    padding-left: 5px;
    border: none;
    background-color: transparent;
    height: 100%;
}
`