import styled from "styled-components";


export const Container = styled.section`
display: flex;
flex-direction: column;
padding: 0 4rem;
margin-left: 17px;

.buttons-container{
    display: flex;
    width: max-content;
    margin: auto;
}
header{
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    img{
        height: 9rem;
    }
}


.plano{
display: flex; 
gap: 1rem;
    .editable{
border: 1px solid;
padding: .1rem 1rem;
border-radius: 3px;
    }
}

.recibo {
width: 80%;
margin: auto;
padding: 20px;
border: 1px solid #000;

.prods{
margin-bottom: 3rem;

}
.received{
        display: flex;
    justify-content: space-between;
}
}
.recibo table {
width: 100%;
border-collapse: collapse;

}
.recibo table th, .recibo table td {
border: 1px solid #000;
padding: 5px;
text-align: left;
}
.assinaturas {
    margin-top: 20px;
    table{
        height: 50px;
    }
    .names{
        margin: 0 auto;
        width: 80%;
        display: flex;
        justify-content: space-between;
    }
}

.separation{
    margin: 3rem auto;
    border-top: 2.5px dashed;
}


`

export const ButtonContainer = styled.button`
    font-weight: 500;
    font-size: var(--fsLowest);
    line-height: 1.75;
    letter-spacing: 0.02857em;
    text-transform: uppercase;
    user-select: none;
    z-index: 3;
    border: none;
    color: #fff;
    background-color: ${props => props.able ? "#1976d2" : "#222"};
    border-radius: 5px;
    margin:  5px;
    display: flex;
    padding:  .3rem 1rem ;
    font-size:var(--fsLow);
    transition: transform 0.1s, box-shadow 0.1s ;
    display: flex;
    align-items: center;
    &:active{
        opacity: .8;
    }

`