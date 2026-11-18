// Public excerpt: the caller supplies its own Supabase client. This example returns listing rows before favourite counts are attached.
export async function fetchListings(client, categoryId) {
  let query = client
    .from('listings')
    .select(
      'id, seller_id, title, price_cents, suburb, status, created_at, category_id, attributes, lat, lng, pickup_mode, payment_method, bumped_at, hidden, flaw_note, has_flaws, listing_photos (storage_path, sort_order, section)',
    )
    .eq('status', 'active')
    .order('sort_ts', { ascending: false })
    .limit(50);
  if (categoryId != null) query = query.eq('category_id', categoryId);
  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}
