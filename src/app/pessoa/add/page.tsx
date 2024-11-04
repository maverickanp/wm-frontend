import { createPerson, CreatePerson, getStatesList } from "@/lib/apiclient";
import CreatePessoaForm from "../../../components/CreatePessoaForm";
import Link from "next/link";
import { redirect } from "next/navigation";

async function createPersonAction(prevState: object, formdata: FormData) {
    "use server";
    const params = {
        email: formdata.get("email"),
        nome: formdata.get("nome"),
        cidade: formdata.get("cidade"),
    } as CreatePerson;
    const result = await createPerson(params);
    console.log("result:", result);
    await new Promise(resolve => {
        setTimeout(resolve, 1000);
    });
    if (result.data === null) {        
        return {
            result,
            params
        }
    }
    redirect(`/pessoa/${result.documentId}`)
}

export default async function Page() {

    const states = await getStatesList();
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
                <h1 className="text-2xl font-bold">Cadastrar Nova Pessoa</h1>
            </div>
            <CreatePessoaForm states={states} saveAction={createPersonAction} />
        </div>
    );
}
