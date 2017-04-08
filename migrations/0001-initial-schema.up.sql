-- Automatically set updated_at timestamp with time zone
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language 'plpgsql';

create type event_category as enum ('event', 'class', 'meetup', 'training', 'signoff', 'staff');

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

create trigger update_events_modtime before
  update on events for each row
  execute procedure  update_updated_at_column();

create table users (
  id SERIAL primary key,

  -- Basic details
  name varchar(120) not null,
  email varchar(120) not null,
  bio varchar default '',

  -- Type
  staff boolean default false,

  -- Timestamps
  created_at timestamp with time zone not null default current_timestamp,
  updated_at timestamp with time zone
);

create trigger update_users_modtime before
  update on users for each row
  execute procedure  update_updated_at_column();

create table instructors (
  primary key(user_id, event_id),
  user_id integer references users,
  event_id integer references events,

  -- Timestamps
  created_at timestamp with time zone not null default current_timestamp,
  updated_at timestamp with time zone
);

create trigger update_instructors_modtime before
  update on instructors for each row
  execute procedure  update_updated_at_column();

create table activities (
  id SERIAL primary key,

  -- Change info
  action varchar(150),

  -- Relations
  user_id integer,
  model_id integer,
  model_name varchar(30),

  -- Extra info
  extra_info json,

  -- Timestamps
  created_at timestamp with time zone not null default current_timestamp,
  updated_at timestamp with time zone
);

create trigger update_activities_modtime before
  update on activities for each row
  execute procedure  update_updated_at_column();

create type transaction_type as enum ('card', 'cash', 'check', 'other');

create table transactions (
  id SERIAL primary key,

  -- Details
  memo varchar,
  last_four integer,
  type transaction_type,
  stripe_transaction_id varchar(100),
  check_number varchar(20),

  -- Timestamps
  created_at timestamp with time zone not null default current_timestamp,
  updated_at timestamp with time zone
);

create table attendees (
  primary key(id, user_id, event_id, transaction_id),
  id SERIAL,

  -- References
  user_id integer references users,
  event_id integer references events,
  transaction_id integer references transactions,

  -- Extra details
  memo varchar,

  -- Timestamps
  created_at timestamp with time zone not null default current_timestamp,
  updated_at timestamp with time zone
);

create trigger update_attendees_modtime before
  update on attendees for each row
  execute procedure  update_updated_at_column();

create trigger update_transactions_modtime before
  update on transactions for each row
  execute procedure  update_updated_at_column();

-- TODO: Create indexes!
