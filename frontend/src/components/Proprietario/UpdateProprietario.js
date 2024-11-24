import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function UpdateProprietario() {
    const { id } = useParams();
    const [proprietario, setProprietario] = useState({
        nome: "",
        cpf: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setProprietario((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

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

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8081/proprietario/${id}`, proprietario);
            navigate("/proprietario");
        } catch (err) {
            setError("Erro ao atualizar os dados. Tente novamente.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="container mx-auto">
                <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                        Editar Proprietário
                    </h1>

                    {loading ? (
                        <p className="text-center text-gray-500">Carregando...</p>
                    ) : error ? (
                        <p className="text-center text-red-500">{error}</p>
                    ) : (
                        <form className="space-y-6">
                            {/* ID */}
                            <div>
                                <label
                                    htmlFor="id"
                                    className="block text-gray-700 font-medium mb-2"
                                >
                                    ID:
                                </label>
                                <input
                                    type="text"
                                    id="id"
                                    name="id"
                                    value={proprietario.id_proprietario || ""}
                                    disabled
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 focus:outline-none cursor-not-allowed"
                                />
                            </div>
                            {/* Nome */}
                            <div>
                                <label
                                    htmlFor="nome"
                                    className="block text-gray-700 font-medium mb-2"
                                >
                                    Nome:
                                </label>
                                <input
                                    type="text"
                                    id="nome"
                                    name="nome"
                                    placeholder="Nome do Proprietário"
                                    value={proprietario.nome}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            {/* CPF */}
                            <div>
                                <label
                                    htmlFor="cpf"
                                    className="block text-gray-700 font-medium mb-2"
                                >
                                    CPF:
                                </label>
                                <input
                                    type="text"
                                    id="cpf"
                                    name="cpf"
                                    placeholder="CPF do Proprietário"
                                    value={proprietario.cpf}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            {/* Data de Criação */}
                            <div>
                                <label
                                    htmlFor="createdAt"
                                    className="block text-gray-700 font-medium mb-2"
                                >
                                    Data da Criação:
                                </label>
                                <input
                                    type="text"
                                    id="createdAt"
                                    name="createdAt"
                                    value={
                                        proprietario.createdAt
                                            ? new Date(proprietario.createdAt).toLocaleDateString()
                                            : "N/A"
                                    }
                                    disabled
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 focus:outline-none cursor-not-allowed"
                                />
                            </div>
                            {/* Data de Alteração */}
                            <div>
                                <label
                                    htmlFor="updatedAt"
                                    className="block text-gray-700 font-medium mb-2"
                                >
                                    Data da Alteração:
                                </label>
                                <input
                                    type="text"
                                    id="updatedAt"
                                    name="updatedAt"
                                    value={
                                        proprietario.updatedAt
                                            ? new Date(proprietario.updatedAt).toLocaleDateString()
                                            : "N/A"
                                    }
                                    disabled
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 focus:outline-none cursor-not-allowed"
                                />
                            </div>
                            {/* Botão de Atualizar */}
                            <div className="text-center">
                                <button
                                    type="submit"
                                    onClick={handleClick}
                                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                >
                                    Atualizar
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Link para Lista de Proprietários */}
                    <div className="text-center mt-6">
                        <Link
                            to="/proprietario"
                            className="text-blue-500 hover:underline"
                        >
                            Voltar para a lista de Proprietários
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateProprietario;
