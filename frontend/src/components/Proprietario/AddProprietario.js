import React, { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const AddProprietario = () => {
    const [proprietario, setProprietario] = useState({ nome: "", cpf: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setProprietario((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        if (!proprietario.nome || !proprietario.cpf) {
            setMessage("Preencha todos os campos!");
            return;
        }
        setIsLoading(true);
        setMessage("");
        try {
            await axios.post("http://localhost:8081/proprietario", proprietario);
            setMessage("Proprietário cadastrado com sucesso!");
            setTimeout(() => navigate("/proprietario"), 2000);
        } catch (err) {
            setMessage("Erro ao cadastrar proprietário!");
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setProprietario({ nome: "", cpf: "" });
        setMessage("");
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    Adicionar Proprietário
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
                    {/* Campo Nome */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="nome">
                            Nome:
                        </label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            placeholder="Digite o nome do Proprietário"
                            value={proprietario.nome}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    {/* Campo CPF */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="cpf">
                            CPF:
                        </label>
                        <input
                            type="text"
                            id="cpf"
                            name="cpf"
                            placeholder="Digite o CPF do Proprietário"
                            value={proprietario.cpf}
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
                        to="/proprietario"
                        className="text-blue-500 hover:underline"
                    >
                        Ver lista de proprietários
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AddProprietario;

