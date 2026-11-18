# Torrens Market

## Architecture

A three-language iPhone marketplace for buying and selling secondhand goods.

```mermaid
flowchart LR
    A["Expo and React Native app"] --> B["Supabase client and database policies"]
    B --> C["PostgreSQL listings and conversations"]
```

### Follow one interaction

A seller enters an item and price. The phone sends the listing to Supabase. A buyer can search, open the item and discuss a meetup. Prices and relative times are formatted in the client.

## APIs and interfaces

| Connection | What crosses it |
| --- | --- |
| Phone → Supabase | The Supabase client reads and writes listings through its data API. PostgreSQL stores the records; access policies are evaluated on the backend. |
| Supabase Auth and Realtime | Auth establishes the session on the phone. Realtime delivers changes such as new chat messages while the buyer and seller are online. |

### Why it works this way

The database decides which rows an account can access. Translations and display formatting live on the phone, so changing a label does not change the stored price or the access rules.

## Read the implementation

See [format.ts](format.ts) for how price and listing age are presented on a listing card. This source module is an excerpt from the application.

## Follow a listing into the feed

Run `node sample-feed.mjs` with Node.js 24 or newer. The [listing query](listing-feed.mjs) asks for active items, orders the feed and can filter by category. The example supplies an in-memory stand-in for Supabase and shows a fictional notebook. No production project, credentials or user records are required.

[Back to the project index](https://github.com/IT-Yun/IT-Yun)
