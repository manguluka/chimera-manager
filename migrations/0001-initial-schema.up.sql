create type event_category as enum ('event', 'class', 'meetup', 'training');

create table events (
  id SERIAL,

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
  starts_at timestamp,
  ends_at timestamp,

  -- Timestamps
  created_at timestamp not null default current_timestamp,
  updated_at timestamp
);

-- create table users (
  -- id SERIAL,
  -- name varchar(120) not null,
  -- video_url varchar(500) not null,
  -- description varchar,
  -- created_at date not null  default CURRENT_DATE,
  -- updated_at date
-- );

-- Automatically set updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language 'plpgsql';

create trigger update_events_modtime before update on events for each row execute procedure  update_updated_at_column();
