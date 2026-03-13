'use client';

import Image from 'next/image';
import posthog from 'posthog-js';

const Explorebtn = () => {
  const handleClick = () => {
    posthog.capture('explore_events_clicked');
  };

  return (
    <button
      type="button"
      id="explore-btn"
      className="mx-auto mt-7"
      onClick={handleClick}
    >
      <a href="#events">
        Explore Event
        <Image
          src="/icons/arrow-down.svg"
          alt="arrow-down"
          width={24}
          height={24}
        />
      </a>
    </button>
  );
};
export default Explorebtn;
