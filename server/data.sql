CREATE DATABASE godutch2025;

-- OPTIMIZED
CREATE TABLE featured_restaurants (
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
    is_favorited BOOLEAN DEFAULT FALSE
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
    img_url TEXT
);
--     primary_payment_source VARCHAR(255),
--     primary_payment_source_username VARCHAR(255),
--     secondary_payment_source VARCHAR(255),
--     secondary_payment_source_username VARCHAR(255),
--     profile_image_key VARCHAR(300), 
--     push_notification_token TEXT






CREATE TABLE dining_events (
    event_id SERIAL PRIMARY KEY,
    dining_date DATE DEFAULT CURRENT_DATE,
    restaurant_bar VARCHAR(255),
    title VARCHAR(255),
    primary_diner_username VARCHAR(255) REFERENCES users(username),
    subtotal DECIMAL(10, 2),
    tax DECIMAL(10, 2),
    tip DECIMAL(10, 2),
    total_meal_cost DECIMAL(10, 2),
    receipt_image_key VARCHAR(300)
);

CREATE TABLE additional_diners (
    diner_id SERIAL PRIMARY KEY,
    event_id INT REFERENCES dining_events(event_id) ON DELETE CASCADE,
    additional_diner_username VARCHAR(255) REFERENCES users(username),
    birthday BOOLEAN,
    diner_meal_cost DECIMAL(10, 2)
);

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

