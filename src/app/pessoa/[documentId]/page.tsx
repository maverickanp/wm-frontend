import { getPerson } from "@/lib/apiclient";
import Link from "next/link";

export default async function Page({
    params,
}: {
    params: Promise<{ documentId: string }>;
}) {
    const { documentId } = await params;
    const person = await getPerson(documentId);
    if (!person) {
        return (
            <div className="container mx-auto p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Pessoa não encontrada</h2>
                <Link href="/pessoa/add">
                    <button className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Cadastrar Novo
                    </button>
                </Link>
            </div>
        );
    }
    return (
        <div className="container mx-auto p-6">
            <Link className="flex items-center gap-2 text-blue-600 hover:text-blue-500" href="/">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="#4945FF"
                    className="h-5 w-5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                    />
                </svg>
                Voltar
            </Link>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">{person?.nome}</h1>
                <Link className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" href="/pessoa/add">
                    Cadastrar Nova Pessoa
                </Link>
            </div>

            <div className="overflow-x-auto">
                <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10">
                    <p className="text-gray-700 mb-2">
                        <span className="font-medium">Email:</span> {person?.email}
                    </p>
                    <p className="text-gray-700 mb-2">
                        <span className="font-medium">Estado:</span> {person?.estado}
                    </p>
                    <p className="text-gray-700 mb-6">
                        <span className="font-medium">Cidade:</span> {person?.cidade}
                    </p>

                </div>
            </div>
        </div>

    );
}
