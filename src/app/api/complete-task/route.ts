import { NextRequest, NextResponse } from 'next/server';

/**
 *
 * @param req
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();

    const { email, taskId } = body;

    // Mock email.
    console.log(`Email sent to ${email}: Your task #${taskId} is complete!`);

    return NextResponse.json({
      message: `Task ${taskId} completed and mock email sent`
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: 'Failed to complete task or send email',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 } // Internal Server Error
    );
  }
}
