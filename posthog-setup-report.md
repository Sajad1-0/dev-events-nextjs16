<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog into the DevEvent Next.js App Router application. Here's a summary of all changes made:

- **`posthog-js` installed** via npm as a new dependency.
- **`instrumentation-client.ts`** created at the project root to initialize PostHog client-side using the recommended Next.js 15.3+ approach. Configured with a reverse proxy path (`/ingest`), EU host, exception capture, and debug mode in development.
- **`next.config.ts`** updated with reverse proxy rewrites for PostHog ingest endpoints (EU region), plus `skipTrailingSlashRedirect: true`.
- **`components/Explorebtn.tsx`** updated to capture `explore_events_clicked` when the "Explore Events" button is clicked.
- **`components/EventCard.tsx`** updated to capture `event_card_clicked` (with event title, slug, location, and date properties) when a user clicks an event card.
- **`.env.local`** updated with `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` environment variables.

| Event Name | Description | File |
|---|---|---|
| `explore_events_clicked` | User clicks the "Explore Events" button on the homepage to scroll to the events list | `components/Explorebtn.tsx` |
| `event_card_clicked` | User clicks on an event card to view the event detail page (properties: `event_title`, `event_slug`, `event_location`, `event_date`) | `components/EventCard.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard**: [Analytics basics](https://eu.posthog.com/project/135903/dashboard/553103)
- **Insight**: [Event Engagement Overview (Last 30 Days)](https://eu.posthog.com/project/135903/insights/lbI9MIAf) — Daily trend of both events
- **Insight**: [Homepage to Event Click Conversion Funnel](https://eu.posthog.com/project/135903/insights/PJpkGXZS) — Ordered funnel from Explore click → Event Card click
- **Insight**: [Daily Active Users Clicking Events](https://eu.posthog.com/project/135903/insights/FaLdVNeD) — Unique users clicking event cards per day
- **Insight**: [Most Clicked Events (by Title)](https://eu.posthog.com/project/135903/insights/IhJ5ruBd) — Breakdown of which events attract the most clicks

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
