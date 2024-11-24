import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ListProprietario = () => {
    const [proprietarios, setProprietarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Listar Proprietários
    useEffect(() => {
        const fetchAllProprietarios = async () => {
            try {
                const res = await axios.get("http://localhost:8081/proprietario");
                setProprietarios(res.data);
                setLoading(false);
            } catch (err) {
                setError("Erro ao carregar proprietários.");
                setLoading(false);
            }
        };
        fetchAllProprietarios();
    }, []);

    // Deletar Proprietários
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Tem certeza que deseja excluir este proprietário?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:8081/proprietario/${id}`);
            setProprietarios(proprietarios.filter((p) => p.id_proprietario !== id));
        } catch (err) {
            alert("Erro ao excluir o proprietário.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="container mx-auto">
                <h2 className="text-center text-3xl font-bold text-gray-800 mb-6">
                    Lista de Proprietários
                </h2>
                <div className="mb-6 text-right">
                    <Link
                        to="/addProprietario"
                        className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
                    >
                        Adicionar novo Proprietário
                    </Link>
                </div>

                {/* Exibindo o estado do sistema */}
                {loading ? (
                    <p className="text-center text-gray-500">Carregando...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : proprietarios.length === 0 ? (
                    <p className="text-center text-gray-500">Nenhum proprietário encontrado.</p>
                ) : (
                    <div className="overflow-x-auto shadow-lg rounded-lg">
                        <table className="table-auto w-full border-collapse border border-gray-200 bg-white">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Nome</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">CPF</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">
                                        Data Cadastro
                                    </th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">
                                        Data Alteração
                                    </th>
                                    <th className="border border-gray-300 px-4 py-2 text-center">
                                        Ações
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {proprietarios.map((proprietario) => (
                                    <tr key={proprietario.id_proprietario} className="hover:bg-gray-50">
                                        <td className="border border-gray-300 px-4 py-2">
                                            {proprietario.id_proprietario}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {proprietario.nome}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {proprietario.cpf}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {new Date(proprietario.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {new Date(proprietario.updatedAt).toLocaleDateString()}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center flex space-x-2 justify-center">
                                            <Link
                                                to={`/readProprietario/${proprietario.id_proprietario}`}
                                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                            >
                                                Ler
                                            </Link>
                                            <Link
                                                to={`/updateProprietario/${proprietario.id_proprietario}`}
                                                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                            >
                                                Editar
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(proprietario.id_proprietario)}
                                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                            >
                                                Deletar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ListProprietario;

