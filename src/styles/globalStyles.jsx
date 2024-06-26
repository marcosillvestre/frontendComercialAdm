
import { createGlobalStyle } from "styled-components"

export default createGlobalStyle`
:root{
    --border-radius: .35rem;

    --fsLowest: .7rem;
    --fsLow: .9rem;
    --fsMid: 1.3rem;
    --fsBig: 1.7rem;
    --fsBigger: 2.3rem;

    --boxHei: 2.4rem;
}


html{
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