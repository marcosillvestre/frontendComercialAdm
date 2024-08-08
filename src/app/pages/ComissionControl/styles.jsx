import styled from "styled-components";


export const Container = styled.div`
padding: 0 4rem;
margin-left: 17px;
font-size: var(--fsLowest) ;


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
@media(max-width:760px){
margin-left: 34px ;



}

`

export const Header = styled.header`
display: flex;
align-items: center;
justify-content: space-between;
font-size: var(--fsLow) ;
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
font-size: var(--fsLow) ;

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

.subtitle{
    box-shadow: 0.2rem 0.2rem 0rem rgb(39,39,39);
    border: 1.85px solid rgb(39,39,39);;
    border-radius: var(--border-radius); 
    padding: 20px;
    height: max-content;
    display: flex;
    flex-direction: column;
    /* position: fixed; */
.container{
    display: flex;
    flex-direction: column;
    gap: .3rem;
    padding: .2rem 1rem;
    /* margin-bottom: 2rem; */
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


.cell-relatory{
    display: flex;
    text-align: center;
    margin: 1rem 0;
    width: 100%;
    gap: 15px;
    
}
.subtitle{

}

@media(max-width:978px){
    
.cell-relatory{
flex-direction: column;
}
.subtitle{
    order: -1;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 3fr));
    
}
.container{
    width: 100%;
}

}
`

export const NavBar = styled.nav`
text-align: center;
margin: 15px 0;
width: fit-content;

display: flex;
align-items: end;
gap: 35px;
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
        height: var(--boxHei);
        background-color: #1976d2;
        border-radius: .5rem;
        position: absolute;
        left: 0;
        bottom: 1;
        z-index: 1;
    }
}

.generate{
    background-color: #107c42;
    padding: 7px;
    color: #fff;
    height: var(--boxHei);
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
        height: 15px;
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
width: 100%;
justify-content: space-between;
}
`

export const Checked = styled.i`
margin-left: auto;
display: none;
`

export const SelectButton = styled.button`
font-size: var(--fsLow) ;
text-align: center;
border-radius: var(--border-radius);
background-color:${props => props.open ? "#1976d2" : "#dfe6f1"} ;
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
