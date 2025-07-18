import db from '../../../../../lib/db';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Handles the HTTP GET request to retrieve a specific card by ID.
 * @param request - The incoming HTTP request object.
 * @param context - An object containing route parameters.
 * @param context.params - The route parameters promise.
 * @param context.params.id - The ID of the card to retrieve.
 * @returns A JSON response containing the card data or an error message.
 * @throws Will return a 400 status if the ID format is invalid.
 * @throws Will return a 404 status if the card with the specified ID is not found.
 * @throws Will return a 500 status if there is a database query error.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const card = await db('cards').where({ id }).first();

    if (!card) {
      return NextResponse.json({ error: 'Card not found' }, { status: 404 });
    }

    return NextResponse.json(card);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Database query failed' },
      { status: 500 }
    );
  }
}

/**
 * Handles the HTTP PUT request to update a card in the database.
 * @param request - The incoming HTTP request object.
 * @param context - An object containing route parameters.
 * @param context.params - The route parameters.
 * @param context.params.id - The ID of the card to be updated.
 * @returns A JSON response containing the updated card data or an error message.
 * @throws Will return a 400 status if the `label` or `list_id` is missing in the request body.
 * @throws Will return a 404 status if the card with the specified ID is not found.
 * @throws Will return a 500 status if there is an internal server error during the update process.
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { label, description, deadline, completed, list_id } = body;

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

    const existingCard = await db('cards').where({ id }).first();
    if (!existingCard) {
      return NextResponse.json({ error: 'Card not found' }, { status: 404 });
    }

    await db('cards').where({ id }).update({
      label,
      description,
      list_id,
      deadline: formattedDeadline,
      completed,
      updated_at: new Date()
    });

    const updatedCard = await db('cards').where({ id }).first();
    return NextResponse.json(updatedCard);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Failed to update card' },
      { status: 500 }
    );
  }
}

/**
 * Handles the HTTP DELETE request to delete a specific card by ID.
 * @param request - The incoming HTTP request object.
 * @param context - An object containing route parameters.
 * @param context.params - The route parameters promise.
 * @param context.params.id - The ID of the card to be deleted.
 * @returns A JSON response containing a success message or an error message.
 * @throws Will return a 400 status if the ID format is invalid.
 * @throws Will return a 404 status if the card with the specified ID is not found.
 * @throws Will return a 500 status if there is an internal server error during the deletion process.
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id: idString } = await params;

    const id = parseInt(idString, 10);

    // Validate that the ID is a valid number
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
    }

    const existingCard = await db('cards').where({ id }).first();
    if (!existingCard) {
      return NextResponse.json({ error: 'Card not found' }, { status: 404 });
    }

    await db('cards').where({ id }).del();
    return NextResponse.json({ message: 'Card deleted successfully' });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Failed to delete card' },
      { status: 500 }
    );
  }
}
