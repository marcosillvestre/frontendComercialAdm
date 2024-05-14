import styled from "styled-components"

export const Container = styled.div`

#category-select label {
font-size: .75rem;
letter-spacing: .0225rem;
}


`

export const ListOpt = styled.ul`
    display:${props => props.open ? "block" : "none"} ;
    position: relative;
    z-index: 10;
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
        width: 100%;
        border-bottom: 1px solid #fafafa;
        height: 2.78rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: .75rem;
        cursor: pointer;
        span{
            width: 100%;
            text-align: center;
        }
        &:hover{
        background: #c4d3e0;

        }
    
`


export const Checked = styled.i`
margin-left: auto;
display: none;
`


export const SelectButton = styled.div`
color: #222;
width: 100%;
height: 2.5rem;

margin-top: .5rem;
display: flex;
padding: .75rem;
align-items: center;
justify-content: space-between;

border-radius: .375rem;
background-color:#dfe6f1;

    #selected-value{
    color: #000;
    font-size: .67rem;
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
