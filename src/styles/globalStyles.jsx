
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
    .inputSearch{
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
    
    }
    .flexCenterContainer{
        display: flex;
        align-items: center;
        padding: 10px;
    }
    .flex{
        display: flex;
        gap: 5px;
    }

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

    .tooltip{
            &:hover{
        &::after{
            content: attr(tool);
            position: absolute;
            left: 0px;
            top: 20px;
            color: #fff;
            background-color: #222;
            width: max-content;
            z-index: 1;
            padding: .1rem;
            margin: 5px auto;
            font-size: var(--fsLowest);
        }
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