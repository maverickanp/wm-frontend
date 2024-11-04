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
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_STRAPI_URL + "/api/estados");
        return (await response.json()).data;

    } catch {
        return []
    }
}

export async function getCitiesList(state: string): Promise<GenericLocation[]> {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/cidades?filters[estado][nome][$eq]=${state}`,
        );
        return (await response.json()).data;

    } catch {
        return []
    }
}

export async function createPerson({
    email,
    nome,
    cidade,
}: CreatePerson): Promise<any> {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_STRAPI_URL + "/api/pessoas", {
            body: JSON.stringify({ data: { email, nome, cidade } }),
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
        });
    
        if (!response.ok) {
            const error = (await response.json());
            console.log("error:", error);
            return error;
        }
    
        return (await response.json()).data;
        
    } catch {
        return null
    }
}

export async function getPerson(documentId: string): Promise<Person | null> {
    try {
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

    } catch {
        return null
    }
}


export async function getPersonList(): Promise<Person[]> {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/pessoas?populate=cidade.estado`,
        );
        const result = (await response.json()).data;
        return (
            result && result.map((person: any) => ({
                documentId: person.documentId,
                email: person.email,
                nome: person.nome,
                cidade: person.cidade.nome,
                estado: person.cidade.estado.nome
            }))
        );

    } catch {
        return []
    }
}

