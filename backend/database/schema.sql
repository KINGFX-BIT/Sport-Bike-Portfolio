-- Drop tables if they exist
DROP TABLE IF EXISTS bike_images CASCADE;
DROP TABLE IF EXISTS bike_colors CASCADE;
DROP TABLE IF EXISTS bikes CASCADE;
DROP TABLE IF EXISTS brands CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Create brands table
CREATE TABLE brands (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    logo_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create bikes table
CREATE TABLE bikes (
    id SERIAL PRIMARY KEY,
    brand_id INTEGER REFERENCES brands(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL,
    model_year INTEGER NOT NULL,
    engine_cc INTEGER NOT NULL,
    horsepower DECIMAL(5, 1) NOT NULL,
    torque DECIMAL(5, 1) NOT NULL,
    top_speed INTEGER NOT NULL,
    mileage DECIMAL(4, 1) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create bike_colors table
CREATE TABLE bike_colors (
    id SERIAL PRIMARY KEY,
    bike_id INTEGER REFERENCES bikes(id) ON DELETE CASCADE,
    color_name VARCHAR(50) NOT NULL,
    color_hex VARCHAR(7) NOT NULL
);

-- Create bike_images table
CREATE TABLE bike_images (
    id SERIAL PRIMARY KEY,
    bike_id INTEGER REFERENCES bikes(id) ON DELETE CASCADE,
    image_url VARCHAR(500) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    display_order INTEGER DEFAULT 0
);

-- Create users table (for admin authentication)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_bikes_brand ON bikes(brand_id);
CREATE INDEX idx_bikes_category ON bikes(category);
CREATE INDEX idx_bikes_price ON bikes(price);
CREATE INDEX idx_bikes_cc ON bikes(engine_cc);
CREATE INDEX idx_bike_colors_bike ON bike_colors(bike_id);
CREATE INDEX idx_bike_images_bike ON bike_images(bike_id);
