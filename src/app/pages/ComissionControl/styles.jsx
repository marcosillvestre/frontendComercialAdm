import styled from "styled-components";


export const Container = styled.div`
padding: 0 4rem;

table{
    border-radius: var(--border-radius); 
    padding: 20px;
    box-shadow: 0.2rem 0.2rem 0rem rgb(39,39,39);
    border: 1.85px solid rgb(39,39,39);
    
}

thead, tr, tbody, td {
    text-align: center;
    border: 1px solid;
    padding: 5px 20px;

}


`

export const Header = styled.header`
display: flex;
align-items: center;
justify-content: space-between;
width: 100%;
font-size: small ;
border: 2px solid #dfe6f1;
border-radius: var(--border-radius);
padding: 1rem 3rem;
margin-bottom: 1.5rem;
nav{
    width:100%;
    /* justify-content: space-between; */
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    /* margin: 0 3rem; */
    gap: 1rem;
}
`




export const Tax = styled.div`
display: flex;
padding: 12px;
border: 0.125em solid #1976d2; ;
box-shadow: 0 0.375em 0 #1976d2;
align-items: center;
justify-content: center;
width: 3rem;
height: 2rem;
border-radius: var(--border-radius);
background-color: #fff;
font-size:.8rem;
`

export const ChartsContainer = styled.div`
display: flex;
flex-wrap: wrap;
width: 100%;
background-color: #e9e9e9;

`
export const ListOpt = styled.ul`
    display:${props => props.open ? "block" : "none"} ;
    position: absolute;
    z-index: 10;
    margin-top: .3rem ;
    border-radius: var(--border-radius);
    background-color:#dfe6f1;
    max-width: 15rem;


`
export const Options = styled.li`
        transition: .4s;
        transform-origin: top;
        color: #222;
        width: 15rem;
        border-bottom: 1px solid #fafafa;
        height: 2.78rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: .75rem;
        cursor: pointer;
        span{
            display: flex;
            width: 100%;
            height: 100%;
            align-items: center;
            justify-content: center;
        }
        &:hover{
        background: #c4d3e0;

        }
    
`


export const ContainerTable = styled.div`
display: flex;
justify-content: ${props => props.load ? "center" : "space-around"};
align-items: ${props => props.load ? "center" : ""};
width: 100%;
gap: 2rem;
min-height: 60vh;

.cell-relatory{
    display: flex;
    text-align: center;
    font-size: smaller;
    margin: 1rem 0;
    height: 65vh;
    width: 100%;
}


.subtitle{
    margin: 0 1rem;
    box-shadow: 0.2rem 0.2rem 0rem rgb(39,39,39);
    border: 1.85px solid rgb(39,39,39);;
    border-radius: var(--border-radius); 
    padding: 20px;
    height: max-content;
    display: flex;
    flex-direction: column;

.container{
    display: flex;
    flex-direction: column;
    gap: .4rem;
    padding: .2rem 1rem;
    margin-bottom: 2rem;
    p{
        font-weight: bold;
    }
    .wrapper-container{
        width: 100%;

        .paragraph{
        width: 100%;
        padding: 5px ;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-align: left;
    }
    }
    }
}


`

export const NavBar = styled.nav`
text-align: center;
display: flex;
align-items: end;
gap: 35px;
padding-bottom: 5px;

.buttons{
    display: flex;
    gap: 6px;
    align-items: center;
    user-select: none;
    .button-link{
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: .7rem 0 ;
        width: 5rem ;
        font-size: 12px;
        border: none;
        border-radius: var(--border-radius);
        cursor: pointer;
        background-color: transparent;
        position: relative;
        p{
        z-index: 2;
        }
    }
    .ac{
        color: #fff;
    }
    .active{
        width: 100%;
        height: 40px;
        border-radius: var(--border-radius);
        background-color: #3458f5;
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 1;
    }
}

.generate{
    background-color: #107c42;
    padding: 7px;
    color: #fff;
    font-size: 12px;
    height: 40px;
    border-radius: var(--border-radius);
    transition: transform 0.2s ease;
    &::after,
    &::before{
        content: "";
        height: 5px;
        width: 5px;
        background-color: #fff;
        border-radius: 50%;
    }
    
    &::after{
        animation: ${props => props.animate ? "spinButtonRight " : ""}3s forwards alternate;
    }
    &::before{
        animation: ${props => props.animate ? "spinButtonLeft " : ""}3s forwards alternate;
    }
    &:active{
        transform: scale(0.96);
    }
    &:hover{
        background-color: #107c42e6;
    }
    img{
        height: 25px;
    }

    @keyframes spinButtonLeft{
        
    30%{
        background-color: #107c42;
        translate: -20px 0;
    }
    40%{

        translate: -20px -30px;
    }
    60%{
        translate: 150px -30px;
    }
    90%{
        translate: 150px 0px;
        background-color: #79bb97;

    }
    100%{
        translate: 124px 0;
    }
    }
    @keyframes spinButtonRight{
        
    30%{
        background-color: #107c42;
        translate: 20px 0;
    }
    40%{

        translate: 20px 30px;
    }
    60%{
        translate: -150px 30px;
    }
    90%{
        translate: -150px 0px;
        background-color: #79bb97;

    }
    100%{
        translate: -124px 0px;

    }

    }

}

@media(max-width:1090px){
    justify-content: center;
}
`

export const Checked = styled.i`
margin-left: auto;
display: none;
`


export const SelectButton = styled.button`
font-size: 12px;
text-align: center;
border-radius: var(--border-radius);
background-color:${props => props.open ? "#1c5bd0" : "#dfe6f1"} ;
color:${props => props.open ? "#fff" : "#222"} ;
cursor: pointer;
border: none;

`

export const Icon = styled.div`
display: flex;
align-items: center;
cursor: pointer;

.icon{
    transform: ${props => props.open ? "rotate(180deg)" : "rotate(0deg)"};
    transition: all.4s;
    }
    
`
