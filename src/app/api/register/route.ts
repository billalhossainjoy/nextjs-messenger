import {NextRequest, NextResponse} from "next/server";
import {signUpSchema} from "@/schema/auth.schema";
import bcrypt from "bcryptjs";
import {prisma} from "@/lib/prisma";


export async function POST(req: NextRequest) {
    try {
        const body = signUpSchema.parse(await req.json())

        const existingUser = await prisma.user.findUnique({where: {email: body.email}})
        if (existingUser) throw new Error("User already exists")

        const hashedPassword = await bcrypt.hash(body.password, 10);

        const user = await prisma.user.create({
            data: {
                ...body,
                password : hashedPassword
            }
        })

        return NextResponse.json(user)
    }catch (error) {
        console.error(error)
        if(error instanceof Error) {
            return new NextResponse(error.message, {
                status: 409
            })
        }
        return new NextResponse("internal server error", {
            status: 500
        })
    }
}