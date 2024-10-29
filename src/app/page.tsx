import { getPersonList } from "@/lib/apiclient";
import Link from "next/link";

export default async function Home() {
    const personList = await getPersonList();

    return (<>
        <div className="container mx-auto p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Lista de Pessoas</h1>
                <Link className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" href="/pessoa/add">
                    Cadastrar Nova Pessoa
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700">
                                Nome
                            </th>
                            <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700">
                                Email
                            </th>
                            <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700">
                                Cidade
                            </th>
                            <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700">
                                Estado
                            </th>
                            <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700">
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    
                        {personList?.map((pessoa, index) => {
                            const { documentId, cidade, email, estado, nome } = pessoa
                            return (
                                <tr
                                    key={documentId}
                                    className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                                >
                                    <td className="px-6 py-4 border-b text-sm text-gray-700">
                                        {nome}
                                    </td>
                                    <td className="px-6 py-4 border-b text-sm text-gray-700">
                                        {email}
                                    </td>
                                    <td className="px-6 py-4 border-b text-sm text-gray-700">
                                        {cidade}
                                    </td>
                                    <td className="px-6 py-4 border-b text-sm text-gray-700">
                                        {estado}
                                    </td>
                                    <td className="px-6 py-4 border-b text-sm text-gray-700">
                                        <Link className="text-blue-500 hover:underline" href={`/pessoa/${documentId}`}>
                                            Detalhes
                                        </Link>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    </>
    );
}
