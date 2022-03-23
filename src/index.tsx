import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createServer, Model } from 'miragejs';

createServer({
    models: {
        tarefas: Model
    },
    routes() {

        this.get('/api/tarefas', (schema, request) => {
            return schema.db.tarefas
        })

        this.post('/api/tarefas', (schema, resquest) => {
            const data = JSON.parse(resquest.requestBody);

            return schema.db.tarefas.insert(data);
        })

        this.put('/api/tarefas', (schema, request) => {
            const data = JSON.parse(request.requestBody);

            return schema.db.tarefas.update(data.id, data);
        })

        this.del('/api/tarefas/:id', (schema, request): any => {

            let id = request.params.id;

            return schema.db.tarefas.remove({id: id});
        })
    }
})

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
