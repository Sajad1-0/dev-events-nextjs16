/* eslint-disable react/no-unescaped-entities */
import Explorebtn from '@/components/Explorebtn';
import EventCard from '@/components/EventCard';
import { events } from '@/lib/constants';
import { IEvent } from '@/database';
import { cacheLife } from 'next/cache';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const Home = async () => {
  'use cache';
  cacheLife('hours');
  const response = await fetch(`${BASE_URL}/api/events`);
  const { events } = await response.json();
  return (
    <section>
      <h1 className="text-center">
        The Hub for Every Dev <br /> Event You Can't Miss!
      </h1>
      <p className="mt-5 text-center">Hackathons, Meetups, and Conferences, All in One Place</p>

      <Explorebtn />

      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>

        <ul className="list-none events">
          {events &&
            events.length > 0 &&
            events.map((event: IEvent) => (
              <li key={event.slug}>
                <EventCard {...event} />
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};
export default Home;
