import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ReadProprietario = () => {
    const { id } = useParams();
    const [proprietario, setProprietario] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProprietario = async () => {
            try {
                const res = await axios.get(`http://localhost:8081/proprietario/${id}`);
                setProprietario(res.data);
            } catch (err) {
                setError("Erro ao carregar os dados do proprietário.");
            } finally {
                setLoading(false);
            }
        };
        fetchProprietario();
    }, [id]);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="container mx-auto">
                <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                        Detalhes do Proprietário
                    </h1>

                    {loading ? (
                        <p className="text-center text-gray-500">Carregando...</p>
                    ) : error ? (
                        <p className="text-center text-red-500">{error}</p>
                    ) : !proprietario ? (
                        <p className="text-center text-gray-500">Proprietário não encontrado.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="table-auto w-full border-collapse border border-gray-200">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">Nome</th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">CPF</th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">Data Cadastro</th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">Data Alteração</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="hover:bg-gray-50">
                                        <td className="border border-gray-300 px-4 py-2">
                                            {proprietario.id_proprietario || "N/A"}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {proprietario.nome || "N/A"}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {proprietario.cpf || "N/A"}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {proprietario.createdAt
                                                ? new Date(proprietario.createdAt).toLocaleDateString()
                                                : "N/A"}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {proprietario.updatedAt
                                                ? new Date(proprietario.updatedAt).toLocaleDateString()
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

export default ReadProprietario;

