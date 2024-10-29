export type GenericLocation = {
    documentId: string;
    nome: string;
};

export type Person = {
    documentId: string;
    email: string;
    nome: string;
    cidade: string;
    estado: string;
};

export type CreatePerson = {
    email: string;
    nome: string;
    cidade: string;
};


export async function getStatesList(): Promise<GenericLocation[]> {
    const response = await fetch(process.env.NEXT_PUBLIC_STRAPI_URL + "/api/estados");
    return (await response.json()).data;
}

export async function getCitiesList(state: string): Promise<GenericLocation[]> {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/cidades?filters[estado][nome][$eq]=${state}`,
    );
    return (await response.json()).data;
}

export async function createPerson({
    email,
    nome,
    cidade,
}: CreatePerson): Promise<any> {
    const response = await fetch(process.env.NEXT_PUBLIC_STRAPI_URL + "/api/pessoas", {
        body: JSON.stringify({ data: { email, nome, cidade } }),
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
    });
    // console.log("Create person:", response.data);
    console.log("-----------------JSON");
    // console.log("Create person:", (await response.json()).error.details.errors[0].path);

if (!response.ok) {
    const error = (await response.json());
    console.log("error:",error);
    return error;
    // if (error?.error?.message.includes('unique')) {
    //     console.log('Este email já está cadastrado');
    //     // throw new Error('Este email já está cadastrado');
    //     return (await response.json()).data;
    // } else {
    //     console.log('Erro ao cadastrar pessoa');
    //     // throw new Error('Erro ao cadastrar pessoa');
    //     return (await response.json()).data;
    // }
}

    return (await response.json()).data;
}

export async function getPerson(documentId: string): Promise<Person | null> {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/pessoas/${documentId}?populate=cidade.estado`,
    );
    const result = (await response.json()).data;
    return (
        result && {
            documentId: result.documentId,
            email: result.email,
            nome: result.nome,
            cidade: result.cidade.nome,
            estado: result.cidade.estado.nome,
        }
    );
}


export async function getPersonList(): Promise<Person[]> {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/pessoas?populate=cidade.estado`,
    );
    const result = (await response.json()).data;
    return (
        result && result.map((person:any) => ({
            documentId: person.documentId,
            email: person.email,
            nome: person.nome,
            cidade: person.cidade.nome,
            estado: person.cidade.estado.nome
        }))
    );
}

