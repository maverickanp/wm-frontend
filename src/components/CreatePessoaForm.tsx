"use client";

import { GenericLocation, getCitiesList } from "@/lib/apiclient";
import { ChangeEvent, useActionState, useState } from "react";

type SelectLocationProps = {
    states: GenericLocation[];
    saveAction: (prevState: object, fd: FormData) => object;
};

export default function CreatePessoaForm({ states, saveAction }: SelectLocationProps) {
    const [availableCities, setAvailableCities] = useState<GenericLocation[]>([]);
    const [selectedCity, setSelectedCity] = useState<string>("");
    const [selectedState, setSelectedState] = useState<string>("");
    const [serverValidation, formAction, isPending] = useActionState<any, FormData>(saveAction, { error: null })
    

    const onStateSelectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        const nome = e.target.value;
        setSelectedState(nome);
        setSelectedCity("");
        getCitiesList(nome).then(setAvailableCities);
        
    };

    const onCitySelectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedCity(e.target.value);
    };

    console.log("ESTADO:",serverValidation);
    
    return (
        <div className="overflow-x-auto">
        <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
        {isPending ? serverValidation?.error : ""}
        </div>
            <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10">
                <form
                    action={formAction}
                    className="space-y-4">

                    <div>
                        <label className="block mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            defaultValue={serverValidation.params?.email}
                            required
                            placeholder="email@gmail.com"
                            className={"w-full p-2 border rounded"}
                        />
                    </div>

                    <div>
                        <label className="block mb-1">Nome</label>
                        <input
                            type="text"
                            name="nome"
                            defaultValue={serverValidation.params?.nome}
                            required
                            maxLength={250}
                            placeholder="Seu Nome"
                            className={"w-full p-2 border rounded"}
                        />
                    </div>

                    <div>
                        <label className="block mb-1">Estado</label>
                        <select
                            value={selectedState}
                            name="estado"
                            required
                            defaultValue={serverValidation.params?.estado}
                            onChange={onStateSelectHandler}
                            className={"w-full p-2 border rounded"}
                        >
                            <option value="">Selecione o Estado</option>
                            {states?.map((state) => (
                                <option key={state?.nome} value={state?.nome}>
                                    {state?.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block mb-1">Cidade</label>
                        <select
                            value={selectedCity}
                            name="cidade"
                            required
                            defaultValue={serverValidation.params?.cidade}
                            onChange={onCitySelectHandler}
                            className={"w-full p-2 border rounded"}
                            disabled={!availableCities.length}
                        >
                            <option value="">Selecione a Cidade</option>
                            {availableCities.map((city) => (
                                <option key={city?.documentId} value={city?.documentId}>
                                    {city?.nome}
                                </option>
                            ))}
                        </select>
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
