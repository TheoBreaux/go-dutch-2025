CREATE DATABASE godutch2025;

-- OPTIMIZED
CREATE TABLE restaurants (
    restaurant_id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(50) NOT NULL,
    zip VARCHAR(10) NOT NULL,
    website TEXT,
    rating DECIMAL(2,1),
    phone VARCHAR(20),
    bio TEXT,
    cuisine TEXT,
    img_url TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    is_restaurant BOOLEAN DEFAULT TRUE
);


-- OPTIMIZED
CREATE TABLE users (
    user_id BIGSERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(255) UNIQUE,
    hashed_password VARCHAR(255) NOT NULL,
    location VARCHAR(200),
    birthday DATE,
    bio TEXT,
    favorite_cuisine VARCHAR(100),
    date_joined DATE DEFAULT CURRENT_DATE,
    img_url TEXT,
    available_splits INTEGER DEFAULT 1,
    is_diner BOOLEAN DEFAULT TRUE
);

-- OPTIMIZED
CREATE TABLE dining_events (
    event_id SERIAL PRIMARY KEY,
    dining_date DATE DEFAULT CURRENT_DATE,
    restaurant_bar VARCHAR(255),
    title VARCHAR(255),
    primary_diner_id BIGINT REFERENCES users(user_id),
    subtotal DECIMAL(10, 2),
    tax DECIMAL(10, 2),
    tip DECIMAL(10, 2),
    total_meal_cost DECIMAL(10, 2),
    img_url TEXT,
);

-- OPTIMIZED
CREATE TABLE event_diners (
    event_id INT REFERENCES dining_events(event_id) ON DELETE CASCADE,
    user_id BIGINT REFERENCES users(user_id) ON DELETE CASCADE,
    is_celebrating BOOLEAN DEFAULT FALSE,
    diner_meal_cost DECIMAL(10, 2),
    PRIMARY KEY (event_id, user_id)
);


CREATE TABLE favorites (
  user_id BIGINT NOT NULL REFERENCES users(user_id),
  favorited_id BIGINT NOT NULL,
  favorited_type TEXT CHECK (favorited_type IN ('diner', 'restaurant')),
  created_at TIMESTAMP DEFAULT NOW(),
  notes TEXT,
  UNIQUE(user_id, favorited_id, favorited_type)
);



CREATE TABLE split_purchases (
    id SERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(user_id) ON DELETE CASCADE,
    splits_purchased INTEGER NOT NULL,
    amount_paid DECIMAL(10, 2) NOT NULL,
    purchased_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);





--     primary_payment_source VARCHAR(255),
--     primary_payment_source_username VARCHAR(255),
--     secondary_payment_source VARCHAR(255),
--     secondary_payment_source_username VARCHAR(255),
--     profile_image_key VARCHAR(300), 
--     push_notification_token TEXT









CREATE TABLE favorite_diners (
    favorite_diner_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    username VARCHAR REFERENCES users(username),
    date_favorited DATE DEFAULT CURRENT_DATE,
    is_favorited BOOLEAN DEFAULT TRUE,
    notes VARCHAR(600)
);

CREATE TABLE favorite_restaurants (
    favorite_restaurant_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    restaurant_id INT REFERENCES featured_restaurants(restaurant_id),
    name VARCHAR(255),
    address VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(50),
    zip VARCHAR(50),
    rating VARCHAR(50),
    bio TEXT,
    website TEXT,
    phone VARCHAR(50),
    date_favorited DATE DEFAULT CURRENT_DATE,
    is_favorited BOOLEAN,
    img_url TEXT,
    notes TEXT
);

