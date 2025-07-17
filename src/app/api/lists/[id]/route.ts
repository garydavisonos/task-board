import db from '../../../../../lib/db';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/lists/[id] - Get a specific list
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

// PUT /api/lists/[id] - Update a specific list
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

// DELETE /api/lists/[id] - Delete a specific list
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
