'use client';
import { createBooking } from '@/lib/actions/booking.actions';
import posthog from 'posthog-js';
import React, { FormEvent, useState } from 'react';

const BookEvent = ({ eventId, slug }: { eventId: string; slug: string }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { success } = await createBooking({ eventId, slug, email });

    if (success) {
      setSubmitted(true);
      posthog.capture('event_booked', { eventId, slug, email });
    } else {
      console.error('Failed to create booking');
      posthog.captureException('Failed to create booking');
    }
  };

  return (
    <div id="book-event">
      {submitted ? (
        <p className="text-sm">Thank for joining the event</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter you email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button type="submit" className="button-submit">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default BookEvent;
