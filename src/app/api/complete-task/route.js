export async function POST(req) {
    try {
        const body = await req.json();

        const { email, taskId} = body;

        // Mock email.
        console.log(`Email sent to ${email}: Your task #${taskId} is complete!`);

        return Response.json({
            message: `Task ${taskId} completed and mock email sent`,
        });
    } catch(error) {
        console.error(error);
        
        return Response.json(
            {
                message: 'Failed to complete task or send email',
                error: error.message,
            },
            { status: 500 } // Internal Server Error
        );
    }
}