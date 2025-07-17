import db from '../../../../lib/db';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/cards - Get all cards
/**
 *
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

// POST /api/cards - Create a new list
/**
 *
 * @param request
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { label, description } = body;

    if (!label) {
      return NextResponse.json({ error: 'Label is required' }, { status: 400 });
    }

    const [id] = await db('cards').insert({
      label,
      description,
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
