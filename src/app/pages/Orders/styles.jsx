import styled from "styled-components";

export const Container = styled.section`
display: flex;
flex-direction: column;
padding: 0 4rem;
margin-left: 17px;
`
export const Header = styled.header`
display: flex;
align-items: center;
justify-content: space-between;
font-size: var(--fsLow) ;
border: 2px solid #dfe6f1;
border-radius: var(--border-radius);
padding: 1rem 3rem;
margin-bottom: 1.5rem;
font-size: var(--fsLowest);
nav{
    width:100%;
    flex-wrap: wrap;
    gap: 1rem;
    align-items: flex-end;
    form{
        align-items: flex-end;
        
    }
}

    .sender{

        all: unset;
        cursor: pointer;
        background-color:#dfe6f1;
        width: fit-content;
        height: var(--boxHei);
        padding: 0 .8rem;
        border-radius: 5px;
    &:hover{
    background-color:#d9d9d9;
    }
    }


`

export const InputSearch = styled.input`
    border: none;
    background-color:#dfe6f1;
    border-radius: .35rem;
    padding: .7rem .5rem;
    transition: all.7s;
    margin-top: .5rem;
    text-overflow: ellipsis;
    height: var(--boxHei);
    font-size: var(--fsLowest);
    width:100%;

    &:focus{
    border: 1px solid;
    }
`