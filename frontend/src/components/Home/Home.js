import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-200">
            {/* Navbar */}
            <nav className="bg-blue-600 p-6 shadow-lg sticky top-0 z-50">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-white text-3xl font-semibold tracking-wider">
                        <span className="text-indigo-400">Sistema</span> de Veículos
                    </h1>
                    <div className="space-x-8">
                        <Link
                            to="/proprietario"
                            className="text-white hover:text-indigo-300 transition duration-300 transform hover:scale-105"
                        >
                            Proprietários
                        </Link>
                        <Link
                            to="/veiculo"
                            className="text-white hover:text-indigo-300 transition duration-300 transform hover:scale-105"
                        >
                            Veículos
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Main content */}
            <div className="container mx-auto mt-12 p-6 max-w-4xl bg-white shadow-xl rounded-lg border border-gray-200">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
                    Bem-vindo ao Sistema de Gerenciamento de Veículos!
                </h2>
                <p className="text-center text-xl text-gray-600">
                    Escolha uma das opções abaixo para começar a navegar pelas tabelas de Proprietários ou Veículos. Navegue com facilidade e eficiência!
                </p>
                <div className="mt-8 flex justify-center space-x-10">
                    <Link
                        to="/proprietario"
                        className="bg-blue-600 text-white px-8 py-3 rounded-full text-xl font-semibold transition duration-300 transform hover:scale-105 hover:bg-blue-700"
                    >
                        Proprietários
                    </Link>
                    <Link
                        to="/veiculo"
                        className="bg-indigo-600 text-white px-8 py-3 rounded-full text-xl font-semibold transition duration-300 transform hover:scale-105 hover:bg-indigo-700"
                    >
                        Veículos
                    </Link>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-blue-600 text-white text-center py-4 mt-12">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} Sistema de Veículos | Todos os direitos reservados
                </p>
            </footer>
        </div>
    );
};

export default Home;

