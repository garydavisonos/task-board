import db from '../../../../../lib/db';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/card/[id] - Get a specific card
/**
 *
 * @param request
 * @param root0
 * @param root0.params
 * @param root0.params.id
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

// PUT /api/cards/[id] - Update a specific card
/**
 *
 * @param request
 * @param root0
 * @param root0.params
 * @param root0.params.id
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

    const existingCard = await db('cards').where({ id }).first();
    if (!existingCard) {
      return NextResponse.json({ error: 'Card not found' }, { status: 404 });
    }

    await db('cards').where({ id }).update({
      label,
      description,
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

// DELETE /api/cards/[id] - Delete a specific card
/**
 *
 * @param request
 * @param root0
 * @param root0.params
 * @param root0.params.id
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

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
