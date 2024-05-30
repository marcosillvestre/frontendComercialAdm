
import { createGlobalStyle } from "styled-components"

export default createGlobalStyle`
:root{
    --border-radius: .35rem;
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