import db from '../../../../lib/db';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/lists - Get all lists
/**
 *
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

// POST /api/lists - Create a new list
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

    const [id] = await db('lists').insert({
      label,
      description,
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
