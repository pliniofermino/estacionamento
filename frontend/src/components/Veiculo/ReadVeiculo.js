import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ReadVeiculo = () => {
    const { id } = useParams();
    const [veiculo, setVeiculo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchVeiculo = async () => {
            try {
                const res = await axios.get(`http://localhost:8081/veiculo/${id}`);
                setVeiculo(res.data);
            } catch (err) {
                setError("Erro ao carregar os dados do veículo.");
            } finally {
                setLoading(false);
            }
        };
        fetchVeiculo();
    }, [id]);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="container mx-auto">
                <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                        Detalhes do Veículo
                    </h1>

                    {loading ? (
                        <p className="text-center text-gray-500">Carregando...</p>
                    ) : error ? (
                        <p className="text-center text-red-500">{error}</p>
                    ) : !veiculo ? (
                        <p className="text-center text-gray-500">Veículo não encontrado.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="table-auto w-full border-collapse border border-gray-200">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">Placa</th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">Modelo</th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">Marca</th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">Ano</th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">Data Cadastro</th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">Data Alteração</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="hover:bg-gray-50">
                                        <td className="border border-gray-300 px-4 py-2">
                                            {veiculo.id_veiculo || "N/A"}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {veiculo.placa || "N/A"}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {veiculo.modelo || "N/A"}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {veiculo.marca || "N/A"}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {veiculo.ano || "N/A"}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {veiculo.createdAt
                                                ? new Date(veiculo.createdAt).toLocaleDateString()
                                                : "N/A"}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {veiculo.updatedAt
                                                ? new Date(veiculo.updatedAt).toLocaleDateString()
                                                : "N/A"}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReadVeiculo;
