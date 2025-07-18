import db from '../../../../../lib/db';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Handles the HTTP GET request to retrieve a specific list by ID.
 * @param request - The incoming HTTP request object.
 * @param context - An object containing route parameters.
 * @param context.params - The route parameters promise.
 * @param context.params.id - The ID of the list to retrieve.
 * @returns A JSON response containing the list data or an error message.
 * @throws Will return a 400 status if the ID format is invalid.
 * @throws Will return a 404 status if the list with the specified ID is not found.
 * @throws Will return a 500 status if there is a database query error.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const list = await db('lists').where({ id }).first();

    if (!list) {
      return NextResponse.json({ error: 'List not found' }, { status: 404 });
    }

    return NextResponse.json(list);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Database query failed' },
      { status: 500 }
    );
  }
}

/**
 * Handles the HTTP PUT request to update a specific list by ID.
 * @param request - The incoming HTTP request object containing the list update data.
 * @param request.body - The JSON body containing list information.
 * @param request.body.label - The list title/label (required).
 * @param request.body.description - The list description (optional).
 * @param context - An object containing route parameters.
 * @param context.params - The route parameters promise.
 * @param context.params.id - The ID of the list to update.
 * @returns A JSON response containing the updated list data or an error message.
 * @throws Will return a 400 status if the ID format is invalid or `label` is missing.
 * @throws Will return a 404 status if the list with the specified ID is not found.
 * @throws Will return a 500 status if there is an internal server error during the update process.
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { label, description } = body;

    if (!label) {
      return NextResponse.json({ error: 'Label is required' }, { status: 400 });
    }

    const existingList = await db('lists').where({ id }).first();
    if (!existingList) {
      return NextResponse.json({ error: 'List not found' }, { status: 404 });
    }

    await db('lists').where({ id }).update({
      label,
      description,
      updated_at: new Date()
    });

    const updatedList = await db('lists').where({ id }).first();
    return NextResponse.json(updatedList);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Failed to update list' },
      { status: 500 }
    );
  }
}

/**
 * Handles the HTTP DELETE request to delete a specific list by ID.
 * @param request - The incoming HTTP request object.
 * @param context - An object containing route parameters.
 * @param context.params - The route parameters promise.
 * @param context.params.id - The ID of the list to delete.
 * @returns A JSON response containing a success message or an error message.
 * @throws Will return a 400 status if the ID format is invalid.
 * @throws Will return a 404 status if the list with the specified ID is not found.
 * @throws Will return a 500 status if there is an internal server error during the deletion process.
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id: idString } = await params;

    const id = parseInt(idString, 10);

    // Validate that the ID is a valid number.
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
    }

    const existingList = await db('lists').where({ id }).first();
    if (!existingList) {
      return NextResponse.json({ error: 'List not found' }, { status: 404 });
    }

    await db('lists').where({ id }).del();
    return NextResponse.json({ message: 'List deleted successfully' });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Failed to delete list' },
      { status: 500 }
    );
  }
}
