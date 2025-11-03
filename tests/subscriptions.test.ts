import { expect, test } from 'vitest';
import { subscriptions, type Subscription } from '@/lib/subscriptions';

test('Each subscription has a valid structure', () => {
  subscriptions.forEach((sub: Subscription) => {
    expect(sub.id).toBeTypeOf('string');
    expect(sub.id.length).toBeGreaterThan(0);

    expect(sub.name).toBeTypeOf('string');
    expect(sub.name.length).toBeGreaterThan(0);

    expect(sub.description).toBeTypeOf('string');

    expect(sub.price).toBeTypeOf('number');
    expect(sub.price).toBeGreaterThan(0);
    
    expect(sub.icon).toBeTypeOf('string');
    expect(sub.icon.startsWith('https://picsum.photos/seed/')).toBe(true);

    expect(sub.frequency).toMatch(/^(monthly|yearly)$/);

    expect(sub.chainId).toBe('421613');
  });
});

test('Subscription IDs are unique', () => {
  const ids = subscriptions.map(sub => sub.id);
  const uniqueIds = new Set(ids);
  expect(uniqueIds.size).toBe(ids.length);
});
