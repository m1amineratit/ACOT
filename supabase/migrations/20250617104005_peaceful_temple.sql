/*
  # Remove Stripe Integration Tables

  1. Drop Views
    - `stripe_user_subscriptions`
    - `stripe_user_orders`

  2. Drop Tables
    - `stripe_customers`
    - `stripe_subscriptions`
    - `stripe_orders`

  3. Drop Types
    - `stripe_subscription_status`
    - `stripe_order_status`
*/

-- Drop views first (they depend on tables)
DROP VIEW IF EXISTS stripe_user_subscriptions;
DROP VIEW IF EXISTS stripe_user_orders;

-- Drop tables
DROP TABLE IF EXISTS stripe_customers CASCADE;
DROP TABLE IF EXISTS stripe_subscriptions CASCADE;
DROP TABLE IF EXISTS stripe_orders CASCADE;

-- Drop custom types
DROP TYPE IF EXISTS stripe_subscription_status;
DROP TYPE IF EXISTS stripe_order_status;