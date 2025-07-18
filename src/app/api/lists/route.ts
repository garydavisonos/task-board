import db from '../../../../lib/db';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Handles the HTTP GET request to retrieve all lists from the database.
 * @returns A JSON response containing an array of all lists or an error message.
 * @throws Will return a 500 status if there is a database query error.
 */
export async function GET() {
  try {
    const lists = await db('lists').select('*');
    return NextResponse.json(lists);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Database query failed' },
      { status: 500 }
    );
  }
}

/**
 * Handles the HTTP POST request to create a new list in the database.
 * @param request - The incoming HTTP request object containing the list data.
 * @param request.body - The JSON body containing list information.
 * @param request.body.label - The list title/label (required).
 * @param request.body.description - The list description (optional).
 * @returns A JSON response containing the newly created list data or an error message.
 * @throws Will return a 400 status if the `label` is missing from the request body.
 * @throws Will return a 500 status if there is an internal server error during list creation.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { label } = body;

    if (!label) {
      return NextResponse.json({ error: 'Label is required' }, { status: 400 });
    }

    const [id] = await db('lists').insert({
      label,
      created_at: new Date(),
      updated_at: new Date()
    });

    const newList = await db('lists').where({ id }).first();
    return NextResponse.json(newList, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Failed to create list' },
      { status: 500 }
    );
  }
}
