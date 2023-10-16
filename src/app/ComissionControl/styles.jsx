import styled from "styled-components";

export const Container = styled.div`


.select{
    padding: 6rem;

}
#category-select label {
font-size: .75rem;
letter-spacing: .0225rem;
}
#selected-value{
    color: #afabb6;
    font-size: .875rem;
}

`


export const ListOpt = styled.ul`
    display:${props => props.open ? "block" : "none"} ;
    margin-top: .25rem ;
    border-radius: .375rem;
    border: 1px solid #252529;
    background: #17171a;
`
export const Options = styled.li`
        transition: .4s;
        transform-origin: top;
        color: #fff;
        padding: .75rem;
        width: 100%;
        border-bottom: 1px solid #252529;
        display: flex;
        align-items: center;
        gap: .75rem;
        &:hover{
        background: #252529;

        }
    
`


export const Checked = styled.i`
color: red;
margin-left: auto;
display: none;
`


export const SelectButton = styled.div`
    color: #fff;
    margin-top: .5rem;
    display: flex;
    padding: .75rem;
    align-items: center;
    justify-content: space-between;

    border-radius: .375rem;
    border: 1px solid #252529;
    background-color: #17171a;

    &:hover{
    outline: 2px solid #a881e6;
    color: #a881e6;

    }
`
export const Icon = styled.div`
display: flex;
align-items: center;
 cursor: pointer;
    .icon-up{
        transform: rotate(180deg);
        display:${props => props.open ? "block" : "none"} ;
        
    }
    
    .icon-down{
        display:${props => props.open ? "none" : "block"} ;
    }
`