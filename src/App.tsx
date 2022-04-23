import { useState } from "react";
import { GlobalStyle } from "./styles";
import Modal from "react-modal";
import {
    Header,
    ModalQuadros,
    ModalTarefas,
    ListagemTarefas,
    Loading,
} from "./components";
import { TarefasProvider, QuadrosProvider, LoadingProvider } from "./contexts";

Modal.setAppElement("#root");
function App() {
    const [visibleModalTarefa, setVisibleModalTarefa] =
        useState<boolean>(false);
    const [visibleModalQuadro, setVisibleModalQuadro] =
        useState<boolean>(false);

    function abrirModalTarefa() {
        setVisibleModalTarefa(true);
    }

    function fecharModalTarefa() {
        setVisibleModalTarefa(false);
    }

    function abrirModalQuadros() {
        setVisibleModalQuadro(true);
    }

    function fecharModalQuadros() {
        setVisibleModalQuadro(false);
    }

    return (
        <LoadingProvider>
            <QuadrosProvider>
                <TarefasProvider>
                    <div>
                        <Loading />
                        <GlobalStyle />
                        <Header
                            abrirModalTarefa={abrirModalTarefa}
                            abrirModalQuadros={abrirModalQuadros}
                        />
                        <ListagemTarefas
                            abrirModal={abrirModalTarefa}
                            abrirModalQuadro={abrirModalQuadros}
                        />
                        <ModalTarefas
                            visibleNovoModal={visibleModalTarefa}
                            fecharModal={fecharModalTarefa}
                        />
                        <ModalQuadros
                            visibleNovoModal={visibleModalQuadro}
                            fecharModal={fecharModalQuadros}
                        />
                    </div>
                </TarefasProvider>
            </QuadrosProvider>
        </LoadingProvider>
    );
}

export default App;
