create type event_category as enum ('event', 'class', 'meetup', 'training');

create table events (
  id SERIAL primary key,

  -- Basic details
  title varchar(150) not null,
  description varchar default '',
  photo_url varchar(250),
  meetup_url varchar(250),
  draft boolean default true,
  internal boolean default true,
  category event_category,

  -- Attendees
  attendee_min smallint,
  attendee_max smallint,

  -- Pricing
  price integer,
  member_price integer,
  material_fee integer,

  -- Dates
  starts_at timestamp with time zone,
  ends_at timestamp with time zone,
  cancelled_at timestamp with time zone,

  -- Timestamps
  created_at timestamp with time zone not null default current_timestamp,
  updated_at timestamp with time zone
);

create table users (
  id SERIAL primary key,
  name varchar(120) not null,
  email varchar(120) not null,
  bio varchar default '',
  created_at timestamp with time zone not null default current_timestamp,
  updated_at timestamp with time zone
);

create table instructors (
  primary key(user_id, event_id),
  user_id int references users,
  event_id int references events
);

-- TODO: Create indexes!

-- Automatically set updated_at timestamp with time zone
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language 'plpgsql';

create trigger update_events_modtime before update on events for each row execute procedure  update_updated_at_column();
