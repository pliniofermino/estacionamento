import React, { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const AddVeiculo = () => {
    const [veiculo, setVeiculo] = useState({ placa: "", ano: "", mensalidade: "", fk_proprietario: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setVeiculo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        if (!veiculo.placa || !veiculo.ano || !veiculo.mensalidade || !veiculo.fk_proprietario) {
            setMessage("Preencha todos os campos!");
            return;
        }
        setIsLoading(true);
        setMessage("");
        try {
            await axios.post("http://localhost:8081/veiculo", veiculo);
            setMessage("Veículo cadastrado com sucesso!");
            setTimeout(() => navigate("/veiculo"), 2000);
        } catch (err) {
            setMessage("Erro ao cadastrar veículo!");
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setVeiculo({ placa: "", ano: "", mensalidade: "", fk_proprietario: "" });
        setMessage("");
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    Adicionar Veículo
                </h2>
                {message && (
                    <div
                        className={`text-center mb-4 p-2 rounded-lg ${
                            message.includes("Erro") ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                        }`}
                    >
                        {message}
                    </div>
                )}
                <form>
                    {/* Campo Placa */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="placa">
                            Placa:
                        </label>
                        <input
                            type="text"
                            id="placa"
                            name="placa"
                            placeholder="Digite a placa do veículo"
                            value={veiculo.placa}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    {/* Campo Ano */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="ano">
                            Ano:
                        </label>
                        <input
                            type="number"
                            id="ano"
                            name="ano"
                            placeholder="Digite o ano do veículo"
                            value={veiculo.ano}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    {/* Campo Mensalidade */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="mensalidade">
                            Mensalidade:
                        </label>
                        <input
                            type="number"
                            id="mensalidade"
                            name="mensalidade"
                            placeholder="Digite a mensalidade do veículo"
                            value={veiculo.mensalidade}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    {/* Campo Proprietário */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="fk_proprietario">
                            Proprietário:
                        </label>
                        <input
                            type="text"
                            id="fk_proprietario"
                            name="fk_proprietario"
                            placeholder="Digite o ID do proprietário"
                            value={veiculo.fk_proprietario}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    {/* Botões */}
                    <div className="flex items-center justify-between space-x-4">
                        <button
                            type="submit"
                            onClick={handleClick}
                            disabled={isLoading}
                            className={`w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 ${
                                isLoading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        >
                            {isLoading ? "Cadastrando..." : "Cadastrar"}
                        </button>
                        <button
                            type="button"
                            onClick={handleReset}
                            className="w-full bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
                        >
                            Limpar
                        </button>
                    </div>
                </form>
                <div className="mt-6 text-center">
                    <Link
                        to="/veiculo"
                        className="text-blue-500 hover:underline"
                    >
                        Ver lista de veículos
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AddVeiculo;

