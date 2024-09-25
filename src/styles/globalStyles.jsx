
import { createGlobalStyle } from "styled-components"

export default createGlobalStyle`
:root{
    --border-radius: .35rem;

    --fsXLow : 10px;

    --fsLowest: 12px;
    --fsLow: 14px;
    --fsMid: 16px;
    --fsBig: 18px;
    --fsBigger: 20px;

    --boxHei: 2.4rem;
}


html{

    .defaultButton{
    line-height: 1.75;
    font-family: "Roboto","Helvetica","Arial",sans-serif;
    font-weight: 500;
    font-size: var(--fsLowest);
    letter-spacing: 0.02857em;
    text-transform: uppercase;
    color: #fff;
    user-select: none;
    z-index: 3;


    border: none;
    border-radius: var(--border-radius);

    background-color: #1976d2;
    cursor: pointer;
    
    height: var(--boxHei);
    
&:hover{
background-color: #1f5fba;
}
    }
    @media (max-width: 1255px){
        font-size: 80%;
        } 

        @media (max-width: 768px){
        font-size: 65%;
        }

    @media (max-width: 375px){
        font-size: 40%;
        } 
}

*{ 
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
    font-family: 'Roboto', sans-serif;
}

body{
    min-height: 100vh;
    min-width: 100vw;
}

a{
    cursor: pointer;
}



`