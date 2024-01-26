import { NextResponse } from 'next/server';
import User from '@/models/Users';
import { connectDB } from '@/utils/mongoose'
import bcrypt from 'bcryptjs'

export async function POST(request) {
    const { fullname, email, password } = await request.json()

    if (!password || password.length < 6) return NextResponse.json({
        message: "La contraceña debe de contener 6 caracteres"
    }, {
        status: 400
    });

    try {
        await connectDB()
        const userFound = await User.findOne({ email })

        if (userFound) return NextResponse.json({
            message: "El email ya esta registrado"
        }, {
            status: 409
        });

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = new User({
            email,
            fullname,
            password: hashedPassword
        });

        const savedUser = await user.save()

        return NextResponse.json({
            _id : savedUser._id,
            email : savedUser.email,
            fullname : savedUser.fullname,
        });
    } catch (error) {

        if (error instanceof Error) {
            return NextResponse.json(
                {
                    message: error.message,
                },
                {
                    status: 400,
                }
            )
        }
    }
}

