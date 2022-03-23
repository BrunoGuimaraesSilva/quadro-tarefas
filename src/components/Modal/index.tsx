import { FormEvent, useContext, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { FaWindowClose } from 'react-icons/fa';
import { FormContainer } from './styles';
import { TarefaContext } from '../../contexts/tarefaContext';

interface NovoModalProps {
    visibleNovoModal: boolean;
    fecharModal: () => void;
}

export function NovoModal(props: NovoModalProps) {

    const {
        criarTarefas,
        editarTarefa,
        valoresPadraoEditarTarefa,
        atualizarTarefa,
        deletarTarefa
    } = useContext(TarefaContext);

    const [id, setId] = useState("");  
    const [titulo, setTitulo] = useState("");   
    const [descricao, setDescricao] = useState("");

    useEffect(() => {
        if (editarTarefa.editar) {
            setId(editarTarefa.tarefa?.id ?
                editarTarefa.tarefa.id : '');

            setTitulo(editarTarefa.tarefa?.titulo ?
                editarTarefa.tarefa.titulo : '');

            setDescricao(editarTarefa.tarefa?.descricao ?
                editarTarefa.tarefa.descricao : '')
        }
    }, [editarTarefa.editar])

    function limparCamposAoFecharModal() {
        setTitulo('')
        setDescricao('')
        valoresPadraoEditarTarefa();
        props.fecharModal();
    }

    function onSubmitModal(event: FormEvent) {
        //não deixa com que o formulario de reload na pagina
        event.preventDefault();

        if (editarTarefa.editar) {

            let obj: any = {
                ...editarTarefa.tarefa,
                titulo,
                descricao
            }

            // atualizarTarefa({
            //     id: editarTarefa.tarefa?.id ? editarTarefa.tarefa.id : '',
            //     titulo: titulo,
            //     descricao: descricao 
            // })
            atualizarTarefa(obj)
        } else {
            criarTarefas({
                titulo,
                descricao
            })
        }


        limparCamposAoFecharModal();
    }

    function mostrarBotaoExcluirModal () {
       return editarTarefa.editar ? true : false;
    }

    function excluirTarefa() {

        let obj: any = {
            ...editarTarefa.tarefa,
            titulo,
            descricao
        }
        deletarTarefa(obj);

        limparCamposAoFecharModal();
    }

    return (
        <Modal
            isOpen={props.visibleNovoModal}
            onRequestClose={() => limparCamposAoFecharModal()}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button
                type='button'
                onClick={() => limparCamposAoFecharModal()}
                className="react-modal-close"
            >
                <FaWindowClose />
            </button>

            <FormContainer onSubmit={onSubmitModal} >
                <h2>Cadastrar Tarefa</h2>

                <input
                    placeholder='Titulo'
                    value={titulo}
                    onChange={(event) => setTitulo(event.target.value)}
                />

                <textarea
                    placeholder='Descrição'
                    value={descricao}
                    onChange={(event) => setDescricao(event.target.value)}
                />

                <button
                    type='submit'
                >
                    {editarTarefa.editar ? 'Editar' : 'Cadastrar'}
                </button>

                <button
                    type='button'
                    hidden={!mostrarBotaoExcluirModal()}
                    onClick={excluirTarefa}
                >
                    Excluir
                </button>
            </FormContainer>

        </Modal>
    )
}
