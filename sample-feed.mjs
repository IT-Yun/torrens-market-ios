import { fetchListings } from './listing-feed.mjs';
import { formatPrice } from './format.ts';

const rows = [
  { id: 'notebook', title: 'Notebook', price_cents: 850, status: 'active', category_id: 1, sort_ts: 2 },
  { id: 'lamp', title: 'Desk lamp', price_cents: 1200, status: 'sold', category_id: 1, sort_ts: 1 }
];
// Stand-in for the data API, with the same operations used by this feed.
const demo = {
  from(table) {
    if (table !== 'listings') throw new Error('Unknown demo table');
    let result = [...rows];
    return {
      select() { return this; },
      eq(key, value) { result = result.filter(row => row[key] === value); return this; },
      order(key, { ascending }) { result.sort((a, b) => (a[key] - b[key]) * (ascending ? 1 : -1)); return this; },
      limit(count) { result = result.slice(0, count); return this; },
      get data() { return result; }
    };
  }
};
const feed = await fetchListings(demo, 1);
if (feed.length !== 1 || feed[0].id !== 'notebook') throw new Error('Unexpected feed contents');
for (const item of feed) console.log(item.title, formatPrice(item.price_cents));
