import styled from "styled-components";

export const Container = styled.div`
display: flex;
flex-direction: column;
gap: 2rem;
nav{
    display: flex;
}
header{
width: 100vw;
border-bottom: 1px solid #dededf;
display: flex;
justify-content: space-between;
align-items: center;
font-size: small;
padding: 2rem 5rem;
.filters{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    div{
        display: flex;
        gap: 5px;
        justify-content: center;
    }
    span{
    border: 1px dashed;
    border-radius: 10px;
    padding: 7px;
    cursor: pointer;
    display: grid;
    .header{
        font-size:.6rem;
    }
    .body{

        &::after{
            content:' ✖️';
        }
    }
    }
}
div, label{
    align-items: center;
    gap: .5rem;
}
label{
    flex-direction: column;
}
}

table, thead, tr, tbody, td {
    border: 1px solid;
    text-align: center;
    padding: 5px 20px;

}

`


export const Tax = styled.div`
display: flex;
padding: calc((4em - (1em * 1.5) - (0.125em * 2) - 0.375em) / 2) calc(1em * 1.5);
border: 0.125em solid #1976d2; ;
box-shadow: 0 0.375em 0 #1976d2;
align-items: center;
justify-content: center;
width: 3rem;
height: 2rem;
border-radius: .5rem;
background-color: #fff;
font-size:.8rem;

`