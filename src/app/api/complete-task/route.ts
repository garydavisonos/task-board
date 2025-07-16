import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/complete-task
 *
 * Marks a task as completed and mocks sending an email notification.
 *
 * Expects a JSON request body with:
 * - `email` (string): The user's email address.
 * - `taskId` (number): The ID of the task being completed.
 *
 * Logs a message to stdout simulating the sending of an email.
 * @param {NextRequest} req - The incoming HTTP request object.
 * @returns {Promise<NextResponse>} A JSON response indicating success or failure.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();

    const { email, taskId } = body;

    // Mock email.
    console.log(`Email sent to ${email}: Your task #${taskId} is complete!`);

    return NextResponse.json(
      {
        message: `Task ${taskId} completed and mock email sent`
      },
      {
        status: 200
      }
    );
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
