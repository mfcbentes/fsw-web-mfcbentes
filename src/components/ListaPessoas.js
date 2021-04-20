import { Component } from "react";
import { Table, Button, message } from 'antd';
import PessoaDataService from "../services/PessoaDataService";

const { Column } = Table;

export default class ListaPessoas extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pessoas: [],
            message: null
        }
    }

    componentDidMount() {
        this.refreshPeople();
    }

    componentDidUpdate() {
        this.refreshPeople();
    }

    refreshPeople() {
        PessoaDataService.retrieveAllPeople().then(
            response => {
                console.log(response);
                this.setState({ pessoas: response.data })
            }
        );
    }

    success = (record) => {
        if (record.isVacinada) {
            record.isVacinada = false;
        } else {
            record.isVacinada = true;
        }

        PessoaDataService.updatePeople(record, record.codigo);

        message.success('Status alterado com sucesso!');
    }

    render() {
        return (
            <div className="container">
                <h2>Pessoas cadastradas</h2>
                <div>
                    <Table dataSource={this.state.pessoas}>
                        <Column title="NOME" dataIndex="nome" key="nome" />
                        <Column title="CPF" dataIndex="email" key="email" />
                        <Column title="TELEFONE" dataIndex="telefone" key="telefone" />
                        <Column title="EMAIL" dataIndex="email" key="email" />
                        <Column title="VACINADA" dataIndex="isVacinada" key="isVacinada"
                            render={(text, record) => (<p>{String(record.isVacinada)}</p>)} />
                        <Column title="ATUALIZAR" key="atualizar"
                            render={(text, record) => (<Button onClick={() => this.success(record)} type="primary">Alterar status</Button>)} />
                    </Table>
                </div>
            </div>
        );
    }
}