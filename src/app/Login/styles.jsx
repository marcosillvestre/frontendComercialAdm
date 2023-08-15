import styled from "styled-components";

export const Box = styled.label`
display: flex;
flex-direction: column;
gap: .4rem;
`
export const Container = styled.span`
display: flex;
justify-content: space-between;
align-items:center;
max-width: 100vw;
background-color: #0069ff;

span{
    text-align: center;
    width: 100%;
    display: flex;
    justify-content: center;
    &::before{
            content:'';
            border: 4rem solid #fff;
            background-color: #222;
            border-radius: 80% 5% 0 0;
            position: absolute;
            bottom:0;
            right: 0;
            width: 59.7%;
            height: 45%;
            @media(min-width: 1600px){
                
            width: 63.7%;
            height: 46%;
            }
        }
        &::after{
            content:'';
            background-color: #ff0c10;
            border-radius: 90% 5% 60% 30%;
            position: absolute;
            top: 30%;
            right:auto;
            width: 30.7%;
            height: 50%;
        }
        
    p{
        color: #fff;
        width: 15rem;
        font-family: 'Anton', sans-serif;
        z-index: 10;
    }
    div{
        position: absolute;
        display: flex;
        gap: .2rem;
        bottom: .5rem;
        font-size: .6rem;
    }
}
.mainbox{
    background-color: #8cd5ae;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    height: calc(100vh - 16vh);
    width: 50vw;
    h2{
    font-weight: bolder;
    font-size: 2rem;
    color: #fff;
    line-height: 42px;
    display: -webkit-bo
    }

    
}

form{
    background-color: #fff;
    height: 20rem;
    padding:  2rem;
    display: grid;
    gap: 0.1rem;
    color: #031b4e;
    box-shadow: rgba(11, 43, 158, 0.15) 0px 6px 20px -6px;
    border-radius: 24px;
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
background-color: #0093E9;
border-radius: 1rem;
color: #fff;
width: 100%;

&:hover{
    background-color: #147ebb;

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