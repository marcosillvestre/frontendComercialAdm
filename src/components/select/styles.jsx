import styled from "styled-components"

export const Container = styled.div`
position: relative;
font-size: var(--fsLowest) ;
z-index: 11;
    height: var(--boxHei);


#category-select {
            font-size: var(--fsLowest) ;
letter-spacing: .0225rem;
}


`

export const ListOpt = styled.ul`
    display:${props => props.open ? "" : "none"} ;
    position: absolute;
    z-index: 13;
    margin-top: .25rem ;
    border-radius: .375rem;
    background-color:#dfe6f1;
    width: 100%;


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

        span{
            /* width: 100%; */
            text-align: center;
        }
        &:hover{
        background: #c4d3e0;

        }
    
`


export const SelectButton = styled.div`
color: #222;
    height: var(--boxHei);

margin-top: .5rem;
display: flex;
padding: .75rem;
align-items: center;
justify-content: space-between;

border-radius: .375rem;
background-color:#dfe6f1;


#selected-value{
    color: #000;
                font-size: var(--fsLowest) ;

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
