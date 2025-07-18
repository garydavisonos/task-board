import db from '../../../../lib/db';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Handles the HTTP GET request to retrieve all cards from the database.
 * @returns A JSON response containing an array of all cards or an error message.
 * @throws Will return a 500 status if there is a database query error.
 */
export async function GET() {
  try {
    const cards = await db('cards').select('*');
    return NextResponse.json(cards);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Database query failed' },
      { status: 500 }
    );
  }
}

/**
 * Handles the HTTP POST request to create a new card in the database.
 * @param request - The incoming HTTP request object containing the card data.
 * @param request.body - The JSON body containing card information.
 * @param request.body.label - The card title/label (required).
 * @param request.body.description - The card description.
 * @param request.body.list_id - The ID of the list this card belongs to (required).
 * @param request.body.deadline - The optional deadline date in ISO format.
 * @param request.body.completed - The completion status of the card (defaults to false).
 * @returns A JSON response containing the newly created card data or an error message.
 * @throws Will return a 400 status if the `label` is missing.
 * @throws Will return a 400 status if the `list_id` is missing.
 * @throws Will return a 500 status if there is an internal server error during card creation.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { label, description, list_id, deadline, completed = false } = body;

    if (!label) {
      return NextResponse.json({ error: 'Label is required' }, { status: 400 });
    }

    if (!list_id) {
      return NextResponse.json(
        { error: 'List ID is required' },
        { status: 400 }
      );
    }

    // Convert deadline to proper MySQL format
    let formattedDeadline = null;
    if (deadline) {
      // Convert ISO string to MySQL date format (YYYY-MM-DD)
      formattedDeadline = new Date(deadline).toISOString().split('T')[0];
    }

    const [id] = await db('cards').insert({
      label,
      description,
      list_id,
      deadline: formattedDeadline,
      completed,
      created_at: new Date(),
      updated_at: new Date()
    });

    const newCard = await db('cards').where({ id }).first();
    return NextResponse.json(newCard, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Failed to create card' },
      { status: 500 }
    );
  }
}
