import { CardProps } from '@/resources/types/CardProps';

import { NextResponse } from 'next/server';

const tasks: CardProps[] = [
  {
    label: 'Card 1',
    description: 'Lorem ipsum',
    deadline: '2025-08-15',
    id: 1,
    listId: 12,
    completed: false
  },
  {
    label: 'Card 2',
    description: 'Lorem ipsum',
    deadline: '2025-09-15',
    id: 12,
    listId: 12,
    completed: false
  },
  {
    label: 'Card 3',
    description: 'Lorem ipsum',
    deadline: '2025-06-15',
    id: 123,
    listId: 12,
    completed: false
  },
  {
    label: 'Card 4',
    description: 'Lorem ipsum',
    deadline: '2025-02-15',
    id: 1234,
    listId: 12,
    completed: false
  }
];

/**
 *
 */
export async function GET() {
  const now = new Date();

  tasks.forEach((task) => {
    const deadline = new Date(task.deadline);

    if (now > deadline) {
      console.log(`Your task ${task.label} is overdue!`);
    }
  });

  return NextResponse.json({
    message: 'Tasks have been checked for overdue deadlines'
  });
}
