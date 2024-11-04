import { getCitiesList } from "@/lib/apiclient"
import { NextResponse } from "next/server"

export async function GET(
    request: Request,
    { params }: { params: Promise<{ state: string }> }
) {
    const { state } = await params
    return NextResponse.json(await getCitiesList(state))
}