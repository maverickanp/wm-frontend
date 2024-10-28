"use client";

import { GenericLocation, getCitiesList } from "@/lib/apiclient";
import { ChangeEvent, FormEvent, useState } from "react";

type SelectLocationProps = {
    states: GenericLocation[];
    saveAction: (fd: FormData) => void;
};

export default function CreatePessoaForm({ states, saveAction }: SelectLocationProps) {
    const [availableCities, setAvailableCities] = useState<GenericLocation[]>([]);
    const [selectedCity, setSelectedCity] = useState<string>("");
    const [selectedState, setSelectedState] = useState<string>("");
    const [nome, setNome] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const onStateSelectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        const nome = e.target.value;
        console.log("onStateSelectHandler:", e.target);
        setSelectedState(nome);
        setSelectedCity("");
        getCitiesList(nome).then(setAvailableCities);
    };

    const onCitySelectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedCity(e.target.value);
    };

    const validateEmail = (email: string) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!nome) {
            newErrors.nome = "Nome é obrigatório";
        } else if (nome.length > 250) {
            newErrors.nome = "Nome deve ter no máximo 250 caracteres";
        }

        if (!email) {
            newErrors.email = "Email é obrigatório";
        } else if (!validateEmail(email)) {
            newErrors.email = "Email inválido";
        }

        if (!selectedState) {
            newErrors.estado = "Estado é obrigatório";
        }

        if (!selectedCity) {
            newErrors.cidade = "Cidade é obrigatória";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            const fd = new FormData();
            fd.append("nome", nome);
            fd.append("email", email);
            fd.append("cidade", selectedCity);
            saveAction(fd);
        }
    };

    return (
        <div className="overflow-x-auto">
            <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {errors.general && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                            {errors.general}
                        </div>
                    )}

                    <div>
                        <label className="block mb-1">Email</label>
                        <input
                            type="text"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="email@gmail.com"
                            className={`w-full p-2 border rounded ${errors.email ? "border-red-500" : ""}`}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                    </div>

                    <div>
                        <label className="block mb-1">Nome</label>
                        <input
                            type="text"
                            name="nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            placeholder="Seu Nome"
                            className={`w-full p-2 border rounded ${errors.nome ? "border-red-500" : ""}`}
                        />
                        {errors.nome && (
                            <p className="text-red-500 text-sm mt-1">{errors.nome}</p>
                        )}
                    </div>

                    <div>
                        <label className="block mb-1">Estado</label>
                        <select
                            value={selectedState}
                            onChange={onStateSelectHandler}
                            className={`w-full p-2 border rounded ${errors.estado ? "border-red-500" : ""}`}
                        >
                            <option value="">Selecione o Estado</option>
                            {states.map((state) => (
                                <option key={state.nome} value={state.nome}>
                                    {state.nome}
                                </option>
                            ))}
                        </select>
                        {errors.estado && (
                            <p className="text-red-500 text-sm mt-1">{errors.estado}</p>
                        )}
                    </div>

                    <div>
                        <label className="block mb-1">Cidade</label>
                        <select
                            value={selectedCity}
                            onChange={onCitySelectHandler}
                            className={`w-full p-2 border rounded ${errors.cidade ? "border-red-500" : ""}`}
                            disabled={!availableCities.length}
                        >
                            <option value="">Selecione a Cidade</option>
                            {availableCities.map((city) => (
                                <option key={city.documentId} value={city.documentId}>
                                    {city.nome}
                                </option>
                            ))}
                        </select>
                        {errors.cidade && (
                            <p className="text-red-500 text-sm mt-1">{errors.cidade}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>

    );
}
