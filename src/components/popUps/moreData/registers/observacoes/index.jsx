import React from 'react';
import { useRegister } from '../../../../../hooks/registers/registersContext.hook';
import { useUser } from '../../../../../hooks/userContext';
import { EmptyData } from '../../../../emptyData';
import { ContainerComment, ContainerPopUpData, ObservationContainer } from '../styles';

export const Observations = () => {
    const comment = React.useRef();

    const { userData } = useUser();
    const { register, mutateRegister } = useRegister();
    const { id, observacao } = register

    const [comments, setcomments] = React.useState(observacao);


    const addComment = () => {
        const commentText = comment.current.value

        const value = [
            ...comments,
            {
                id: new Date().setUTCHours(0),
                name: `${userData.name} / ${userData.role}`,
                obs: commentText,
                when: new Date()
            }
        ]
        setcomments(value)
        const { files: _, ...rest } = register;

        mutateRegister.mutateAsync({
            id: id,
            registerUpdate: {
                ...rest,
                observacao: value
            },
            updates: {
                observacao: commentText
            }
        })
    }

    return (
        <ContainerPopUpData>

            <div
                className='observation-box'
            >
                <ObservationContainer action="">
                    <label htmlFor="">
                        <p>Observações:</p>
                        <textarea type="text" ref={comment} />

                        <button
                            type='submit'
                            onClick={(e) => {
                                comment.current.value !== '' && addComment()
                                e.preventDefault()
                            }}
                            className='defaultButton'>

                            enviar
                        </button>
                    </label>
                </ObservationContainer>

                <div className='container'>
                    {
                        comments.length === 0 ?
                            <EmptyData />
                            :
                            comments.map((tag) => (

                                <ContainerComment key={tag.id}>
                                    <header>
                                        {tag.name}
                                    </header>
                                    <main>
                                        <p>{tag.obs}</p>
                                    </main>
                                    <footer>
                                        <p>{new Date(tag.when).toLocaleString("pt-BR")}</p>
                                    </footer>
                                </ContainerComment>
                            )
                            )
                    }
                </div>

            </div>

        </ContainerPopUpData>
    )
}
