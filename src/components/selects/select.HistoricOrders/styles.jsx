import styled from "styled-components"

export const Container = styled.div`
position: relative;
font-size: var(--fsLowest) ;
    height: var(--boxHei);


#category-select {
font-size: var(--fsLowest) ;
letter-spacing: .0225rem;
}


`

export const ListOpt = styled.ul`
display:${props => props.open ? "" : "none"} ;
position: absolute;
margin-top: .25rem ;
background-color: #ffffff;
width: 100%;
z-index: 13;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
border-radius: .375rem;
`

export const Options = styled.li`
transition: .4s;
transform-origin: top;
color: #222;
padding: .75rem;
border-bottom: 1px solid #fafafa;
display: flex;
align-items: center;
justify-content: center;
gap: .75rem;
cursor: pointer;
height: var(--boxHei);
font-size: var(--fsLowest);
z-index: 10;
border-radius: .375rem;

    span{
    text-align: center;
    }
    &:hover{
    background-color: var(--lightPrimaryColor);

    }
   
`


export const SelectButton = styled.div`
color: #222;
height: var(--boxHei);  
z-index: 11;
display: flex;
padding: .75rem;
align-items: center;
justify-content: space-between;
border-radius: .375rem;
background-color: var(--lightPrimaryColor);

#selected-value{
    color: #000;
    font-size: var(--fsXLow) ;
    margin-right: 2rem;
}
`
export const Icon = styled.div`
display: flex;
align-items: center;
cursor: pointer;
translate:  -2px -2px ;

.icon{
    transform: ${props => props.open ? "rotate(180deg)" : "rotate(0deg)"};
    transition: all.4s;
    }
`
