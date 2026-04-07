export const GET = async (req) => {
    const url = new URL(req.url)
    const code = url.searchParams.get('code')
    const state = url.searchParams.get('state')

    console.log({code, state})

    if (!state) {
        return Response.json({
            message: "something went wrong"
        }, {
            status: 500
        })
    }

    
}