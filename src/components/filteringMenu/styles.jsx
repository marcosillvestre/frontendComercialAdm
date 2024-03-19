import styled from "styled-components";

export const Container = styled.div`
width: 100rem;
height: 100%;
`

export const RangeDate = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
padding: 1rem;
text-align: center;
gap:2rem;
width: 35rem ;
height: 27rem;
background-color: #f2f2f2;

input{
    height: 2rem;
    padding-left: .5rem ;
    border-radius: 5px;
    border: none;
    background-color: #f2f2f2;
    transition: all.3s;
    width: 100%;
}
.label{
    display: flex;
    justify-content: space-between;
    align-items: center;
    h3{
        translate: -1.7rem 0;
    }
    button{
        border: none;
        background: none;
        color: #2e2f8e;
        padding: .5rem 1rem;
        border-radius: 10px;
        transition: all.3s;
        &:hover{
        background-color: #fff;
    }
}
}
.span-container{
    display: flex;
    gap: 1rem;
    padding: .5rem;
    align-items: center;
    max-width: 100%;
    height: 20%;
    justify-content: center;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 0.375em 0 #222;

}
.button-filter{
    height: 2.5rem;
    background-color: #2e2f8e;
    color: #fff;
    border: none;
    border-radius: 10px;
    cursor: pointer;

        &:hover{
        background-color: #202164;
    }
}
`
export const Label = styled.label`
font-size:.6rem;

display: grid;
gap:.2rem;
margin:.3rem 1rem 0 .3rem;
width: 100%;
height: 100%;
`
export const Select = styled.select`
border: none;
border-bottom: 1px solid;
padding: .4rem;
width: 90%;
`
