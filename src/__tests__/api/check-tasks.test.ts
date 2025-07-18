import { GET } from '../../app/api/check-tasks/route';
import { CardProps } from '@/resources/types/CardProps';

describe('/api/check-tasks', () => {
  it('should return overdue tasks with appropriate message', async () => {
    const response = await GET();
    const data = await response.json();

    // Check that we get a successful response.
    expect(response.status).toBe(200);

    // Check that response has required properties.
    expect(data).toHaveProperty('message');
    expect(data).toHaveProperty('overdueTasks');
    expect(data).toHaveProperty('count');

    // Check that overdueTasks is an array.
    expect(Array.isArray(data.overdueTasks)).toBe(true);

    // Check that count matches array length.
    expect(data.count).toBe(data.overdueTasks.length);
  });

  it('should return correct message when overdue tasks exist', async () => {
    const response = await GET();
    const data = await response.json();

    if (data.count > 0) {
      expect(data.message).toContain('Found');
      expect(data.message).toContain('overdue task');

      // Verify each overdue task has correct structure.
      data.overdueTasks.forEach((task: CardProps) => {
        expect(task).toHaveProperty('label');
        expect(task).toHaveProperty('deadline');
        expect(task.completed).toBe(false);

        // Verify task is actually overdue.
        const taskDeadline = new Date(task.deadline);
        const now = new Date();
        expect(taskDeadline.getTime()).toBeLessThan(now.getTime());
      });
    } else {
      expect(data.message).toBe('No overdue tasks found');
      expect(data.overdueTasks).toEqual([]);
    }
  });

  it('should only return incomplete overdue tasks', async () => {
    const response = await GET();
    const data = await response.json();

    // All returned tasks should be incomplete.
    data.overdueTasks.forEach((task: CardProps) => {
      expect(task.completed).toBe(false);
    });
  });
});
