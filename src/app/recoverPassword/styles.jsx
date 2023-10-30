import styled from "styled-components";

export const Box = styled.label`
display: flex;
flex-direction: column;
gap: .3rem;
width: 98%;
margin: 1rem 0;
div{
    display: flex;
    gap: .3rem;
}
`
export const Container = styled.span`
display: flex;
justify-content: space-between;
align-items:center;
max-width: 100vw;
background-color: #6284fe;

span{
    text-align: center;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    div{
        color: #fff;
        z-index: 10;
        h1{
            font-size: 3rem;
            font-family: 'Lobster Two', cursive;
            transform: translate( 0 ,-60% );
            @media(min-width: 1600px){
                font-size: 4em;
                
                
            }
        }
    }
    .pwb{
        position: absolute;
        display: flex;
        gap: .2rem;
        bottom: .5rem;
        font-size: .6rem;
        color: #222;
    }
}
.mainbox{
    background-color: #7594ab;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    height: calc(100vh - 16vh);
    width: 50vw;
    h2{
   font-weight: bolder;
    font-size: 1.4rem;
    color: #222;
    line-height: 42px;
    }

    
}

form{
    background-color: #fff;
    padding:  2rem ;
    gap: 0.1rem;
    color: #031b4e;
    box-shadow: rgba(11, 43, 158, 0.15) 0px 6px 20px -6px;
    border-radius: .7rem;
    font-size: .9rem;
    justify-items: center;

}
`
export const Image = styled.img`
width: 45vw;
`
export const Input = styled.input`
width: 100% ;
height: 1.7rem;
border-radius: 0.4rem;
border: none;
padding:.5rem;
box-shadow: 0px 0px 1px 1px rgba(0,0,0,0.66);
`

export const Submit = styled.input`
height: 2rem;
border: none;
background-color: #005F73;
border-radius: 1rem;
color: #fff;
width: 100%;
margin-top: 3rem ;
&:hover{
    background-color: #094d5b;

}
&:active{
    opacity: 0.7;
}

`
export const ErrorMessage = styled.p`
font-size: small;
color:#ff8c00;
margin-top: .4rem;
`

export const Header = styled.header`
width: 100vw;
height: 12vh;
background-color: #fff;
display: flex;
justify-content: center;
align-items: center;
img{
    width: 16rem;
    height: 10rem;
}
`