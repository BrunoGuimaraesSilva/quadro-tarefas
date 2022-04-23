import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { InterfaceEditarTarefa, interfaceTarefaContext, InterfaceTarefas, PropsTarefasInput, PropsTarefasProvider } from "./tarefa.type";

export const TarefaContext = createContext({} as interfaceTarefaContext);

export function TarefasProvider(props: PropsTarefasProvider) {


      
    const [tarefas, setTarefas] = useState<Array<InterfaceTarefas>>([]);
    const [editarTarefa, setEditarTarefa] = useState<InterfaceEditarTarefa>({
        editar: false, tarefa: null
    });

    useEffect(() => {

        axios.get('/api/tarefas').then((res) => {
            setTarefas(res.data)
        })

    }, [])

    async function criarTarefas(data: PropsTarefasInput) {
        await axios.post('/api/tarefas', data)
            .then((res) => {

            })

        await axios.get('/api/tarefas').then((resposta) => {

            setTarefas(resposta.data)

        })
    }

    async function atualizarTarefa(data: InterfaceTarefas) {
        await axios.put('/api/tarefas', data)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })

        await axios.get('/api/tarefas').then((resposta) => {

            setTarefas(resposta.data)

        })
    }

    async function deletarTarefa(data: InterfaceTarefas) {
        const id = data.id ? data.id : null;

        await axios.delete(`/api/tarefas/${id}`)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })

        await axios.get('/api/tarefas').then((resposta) => {

            setTarefas(resposta.data)

        })
    }

    function valoresPadraoEditarTarefa() {
        setEditarTarefa({ editar: false, tarefa: null })
    }

    function funEditarTarefa(data: InterfaceEditarTarefa) {
        // console.log('funEditarTarefa')
        // console.log(data)
        setEditarTarefa(data)
    }

    return (
        <TarefaContext.Provider value={{
            tarefas, criarTarefas,
            atualizarTarefa,
            funEditarTarefa, editarTarefa, 
            valoresPadraoEditarTarefa, deletarTarefa
        }}>
            {props.children}
        </TarefaContext.Provider>
    )
}
