import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListProprietario from './components/Proprietario/ListProprietario';
import AddProprietario from './components/Proprietario/AddProprietario';
import ReadProprietario from './components/Proprietario/ReadProprietario';
import UpdateProprietario from "./components/Proprietario/UpdateProprietario";
import ListVeiculo from "./components/Veiculo/ListVeiculo";
import AddVeiculo from "./components/Veiculo/AddVeiculo";
import ReadVeiculo from "./components/Veiculo/ReadVeiculo";
import UpdateVeiculo from "./components/Veiculo/UpdadeVeiculo";
import Home from "./components/Home/Home";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/proprietario" element={<ListProprietario />} />
          <Route path="/addProprietario" element={<AddProprietario />} />
          <Route path="/readProprietario/:id" element={<ReadProprietario />} />
          <Route path="/updateProprietario/:id" element={<UpdateProprietario />} />
          <Route path="/veiculo" element={<ListVeiculo/>} />
          <Route path="/addVeiculo" element={<AddVeiculo />} />
          <Route path="/readVeiculo/:id" element={<ReadVeiculo />} />
          <Route path="/updateVeiculo/:id" element={<UpdateVeiculo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


