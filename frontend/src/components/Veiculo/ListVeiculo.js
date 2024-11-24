import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ListVeiculo = () => {
    const [veiculos, setVeiculos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Listar Veículos
    useEffect(() => {
        const fetchAllVeiculos = async () => {
            try {
                const res = await axios.get("http://localhost:8081/veiculo");
                setVeiculos(res.data);
                setLoading(false);
            } catch (err) {
                setError("Erro ao carregar veículos. Tente novamente.");
                setLoading(false);
            }
        };
        fetchAllVeiculos();
    }, []);

    // Deletar Veículos
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Tem certeza que deseja excluir este veículo?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:8081/veiculo/${id}`);
            setVeiculos(veiculos.filter((v) => v.id_veiculo !== id));
        } catch (err) {
            alert("Erro ao excluir o veículo. Tente novamente.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="container mx-auto">
                <h2 className="text-center text-3xl font-bold text-gray-800 mb-6">
                    Lista de Veículos
                </h2>
                <div className="mb-6 text-right">
                    <Link
                        to="/addVeiculo"
                        className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
                    >
                        Adicionar novo Veículo
                    </Link>
                </div>

                {/* Exibindo o estado do sistema */}
                {loading ? (
                    <p className="text-center text-gray-500">Carregando...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : veiculos.length === 0 ? (
                    <p className="text-center text-gray-500">Nenhum veículo encontrado.</p>
                ) : (
                    <div className="overflow-x-auto shadow-lg rounded-lg">
                        <table className="table-auto w-full border-collapse border border-gray-200 bg-white">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Placa</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Proprietário (ID)</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Ano</th>
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
                                {veiculos.map((veiculo) => (
                                    <tr key={veiculo.id_veiculo} className="hover:bg-gray-50">
                                        <td className="border border-gray-300 px-4 py-2">
                                            {veiculo.id_veiculo}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {veiculo.placa}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {veiculo.fk_proprietario}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {veiculo.ano}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {new Date(veiculo.createdAt).toLocaleDateString('pt-BR')}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {new Date(veiculo.updatedAt).toLocaleDateString('pt-BR')}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center flex space-x-2 justify-center">
                                            <Link
                                                to={`/readVeiculo/${veiculo.id_veiculo}`}
                                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                            >
                                                Ler
                                            </Link>
                                            <Link
                                                to={`/updateVeiculo/${veiculo.id_veiculo}`}
                                                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                            >
                                                Editar
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(veiculo.id_veiculo)}
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

export default ListVeiculo;



