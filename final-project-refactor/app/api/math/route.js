import { connect } from "@/db/connect"

/*
        400 vague client error
        401 not authorized
        403 forbidden
        404 not found
        500 vague server error

        POST ...../api/math

        Magic file names
            layout.jsx      FE
            page.jsx        FE
            route.js        BE
*/

export const POST = async (req) => {
    try {
        await connect()



    } catch (error) {
        return Response.json({
            message: "database down"
        }, {
            status: 503
        })
    }
}