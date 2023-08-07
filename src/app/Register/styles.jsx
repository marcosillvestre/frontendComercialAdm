import styled from 'styled-components';


export const Container = styled.main`
display: grid;
align-items: flex-start;
height: 100vh;
width: 100vw;
p{
    margin-bottom: .2rem;
}
header{
display: grid;
grid-template-columns: repeat(3, 1fr);
margin-bottom: 1rem;
width: 100%;
grid-column-gap: 2.2rem;
}
span{
    display: flex;
    align-items: center;
    justify-content: space-around;
}
form{
    width: 100%;
}
.register{
    background-color: #0069ff;
    border-radius: 7%;
    width: 24vw;
    padding: 2rem ;
    align-items: center;
    color: #fff;
    box-shadow: -3px 3px 9px 0px rgba(0,0,0,0.66);
}

.box{

    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
}
.users{
    border-radius: 1rem;
    background-color: #0069ff;
    width: 62vw;
    padding: 2rem ;
    color: #fff;
    box-shadow: -3px 3px 9px 0px rgba(0,0,0,0.66);
    overflow-y: scroll;
    ::-webkit-scrollbar {
        display: none;
        }
    min-height: 60vh;
    max-height: 60vh;
ul{
    width: 100%;
}
    li{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        align-items: center;
        width: 100%;
        margin-bottom: 1rem;
        border-bottom: .1rem solid #fff; 
        button{
            border: none;
            background: none;
            &:hover{
                color: #FFF;
            }
            &:active{
                opacity: 0.7;
            }
        }
    }

}


`
export const Image = styled.img`
width: 20vw;
height: 20vh;
`

export const Box = styled.label`
margin-bottom: 1rem;
div{
    gap:1.2rem;
}
`

export const Input = styled.input`
width: 100% ;
height: 1.7rem;
border-radius: 0.4rem;
border: none;
box-shadow: 0px 0px 1px 1px rgba(0,0,0,0.66);

padding: .5rem;
margin-bottom: .5rem

`
export const Submit = styled.input`
height: 2rem;
border: none;
background-color: #ff0c10;
border-radius: 1rem;
color: #fff;
width: 100%;

&:hover{
    background-color: #983335a1;

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

export const Selected = styled.select`
width: 100% ;
height: 1.7rem;
border-radius: 0.4rem;
border: none;
box-shadow: 0px 0px 1px 1px rgba(0,0,0,0.66);
padding-left: .5rem;
`

export const Selects = styled.select`
width: 100%;
box-shadow: 0px 0px 1px 1px rgba(0,0,0,0.66);
font-size: small;
height: 1.7rem;
border-radius: 0.4rem;
`
export const MultiOption = styled.div`
background-color: #fff;
color: #222;
border-right: .1rem solid #222;
padding: .3rem .2rem;
border-radius: .5rem;
cursor: pointer;
margin: .4rem .1rem;
&::before{
    content:'✖️';
}

`
