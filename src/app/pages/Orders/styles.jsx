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
nav{
    width:100%;
    /* justify-content: space-between; */
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    /* margin: 0 3rem; */
    gap: 1rem;
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

    &:focus{
    border: 1px solid;
    }
`