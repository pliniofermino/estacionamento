import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function UpdateVeiculo() {
    const { id } = useParams();
    const [veiculo, setVeiculo] = useState({
        placa: "",
        ano: "",
        mensalidade: "",
        fk_proprietario: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setVeiculo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

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

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8081/veiculo/${id}`, veiculo);
            navigate("/veiculo");
        } catch (err) {
            setError("Erro ao atualizar os dados. Tente novamente.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="container mx-auto">
                <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                        Editar Veículo
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
                                    value={veiculo.id_veiculo || ""}
                                    disabled
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 focus:outline-none cursor-not-allowed"
                                />
                            </div>
                            {/* Placa */}
                            <div>
                                <label
                                    htmlFor="placa"
                                    className="block text-gray-700 font-medium mb-2"
                                >
                                    Placa:
                                </label>
                                <input
                                    type="text"
                                    id="placa"
                                    name="placa"
                                    placeholder="Placa do Veículo"
                                    value={veiculo.placa}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            {/* Ano */}
                            <div>
                                <label
                                    htmlFor="ano"
                                    className="block text-gray-700 font-medium mb-2"
                                >
                                    Ano:
                                </label>
                                <input
                                    type="number"
                                    id="ano"
                                    name="ano"
                                    placeholder="Ano do Veículo"
                                    value={veiculo.ano}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            {/* Mensalidade */}
                            <div>
                                <label
                                    htmlFor="mensalidade"
                                    className="block text-gray-700 font-medium mb-2"
                                >
                                    Mensalidade:
                                </label>
                                <input
                                    type="number"
                                    id="mensalidade"
                                    name="mensalidade"
                                    placeholder="Mensalidade do Veículo"
                                    value={veiculo.mensalidade}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            {/* Proprietário */}
                            <div>
                                <label
                                    htmlFor="fk_proprietario"
                                    className="block text-gray-700 font-medium mb-2"
                                >
                                    Proprietário:
                                </label>
                                <input
                                    type="text"
                                    id="fk_proprietario"
                                    name="fk_proprietario"
                                    value={veiculo.fk_proprietario || ""}
                                    disabled
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 focus:outline-none cursor-not-allowed"
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
                                        veiculo.createdAt
                                            ? new Date(veiculo.createdAt).toLocaleDateString()
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
                                        veiculo.updatedAt
                                            ? new Date(veiculo.updatedAt).toLocaleDateString()
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

                    {/* Link para Lista de Veículos */}
                    <div className="text-center mt-6">
                        <Link
                            to="/veiculo"
                            className="text-blue-500 hover:underline"
                        >
                            Voltar para a lista de Veículos
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateVeiculo;


