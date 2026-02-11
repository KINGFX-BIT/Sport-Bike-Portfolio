const pool = require('./db');
require('dotenv').config();

const brands = [
  { name: 'Yamaha', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Yamaha_Motor_Company_logo.svg/200px-Yamaha_Motor_Company_logo.svg.png' },
  { name: 'Kawasaki', logo_url: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/Kawasaki_Heavy_Industries_logo.svg/200px-Kawasaki_Heavy_Industries_logo.svg.png' },
  { name: 'Suzuki', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Suzuki_logo_2.svg/200px-Suzuki_logo_2.svg.png' },
  { name: 'Honda', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Honda.svg/200px-Honda.svg.png' },
  { name: 'Ducati', logo_url: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2c/Ducati_red_logo.PNG/200px-Ducati_red_logo.PNG' },
  { name: 'BMW', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/200px-BMW.svg.png' },
  { name: 'KTM', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/KTM-Logo.svg/200px-KTM-Logo.svg.png' },
  { name: 'Aprilia', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Aprilia_logo.svg/200px-Aprilia_logo.svg.png' },
  { name: 'Triumph', logo_url: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/90/Triumph_Motorcycles_logo.svg/200px-Triumph_Motorcycles_logo.svg.png' },
  { name: 'MV Agusta', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/MV-Agusta-Logo.svg/200px-MV-Agusta-Logo.svg.png' },
  { name: 'Harley Davidson', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Harley-Davidson_logo.svg/200px-Harley-Davidson_logo.svg.png' }
];

const bikes = [
  // Yamaha Bikes (15 bikes)
  {
    brand: 'Yamaha',
    name: 'YZF-R1M',
    model_year: 2024,
    engine_cc: 998,
    horsepower: 200.0,
    torque: 113.0,
    top_speed: 299,
    mileage: 15.5,
    price: 26499.00,
    category: 'HyperSport',
    description: 'The pinnacle of Yamaha\'s racing technology, featuring MotoGP-derived electronics and carbon fiber bodywork.',
    colors: [
      { name: 'Yamaha Blue', hex: '#0033A0' },
      { name: 'Tech Black', hex: '#1C1C1C' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800',
      'https://images.unsplash.com/photo-1558980663-3685c1d673c4?w=800'
    ]
  },
  {
    brand: 'Yamaha',
    name: 'YZF-R1',
    model_year: 2024,
    engine_cc: 998,
    horsepower: 198.0,
    torque: 113.0,
    top_speed: 299,
    mileage: 16.0,
    price: 17899.00,
    category: 'SuperSport',
    description: 'Track-ready superbike with advanced electronics and a crossplane crankshaft engine.',
    colors: [
      { name: 'Team Yamaha Blue', hex: '#0033A0' },
      { name: 'Raven', hex: '#000000' }
    ],
    images: [
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800',
      'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800'
    ]
  },
  {
    brand: 'Yamaha',
    name: 'YZF-R7',
    model_year: 2024,
    engine_cc: 689,
    horsepower: 73.4,
    torque: 67.0,
    top_speed: 240,
    mileage: 20.5,
    price: 9199.00,
    category: 'SuperSport',
    description: 'Middleweight supersport with a potent CP2 engine and sharp handling.',
    colors: [
      { name: 'Team Yamaha Blue', hex: '#0033A0' },
      { name: 'Raven', hex: '#000000' },
      { name: 'Intensity White', hex: '#FFFFFF' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558981359-219d6364c9c8?w=800',
      'https://images.unsplash.com/photo-1558980663-3685c1d673c4?w=800'
    ]
  },
  {
    brand: 'Yamaha',
    name: 'YZF-R6',
    model_year: 2023,
    engine_cc: 599,
    horsepower: 117.0,
    torque: 61.7,
    top_speed: 262,
    mileage: 18.0,
    price: 12199.00,
    category: 'SuperSport',
    description: 'Ultra-high-revving inline-four that dominated the 600cc class for years.',
    colors: [
      { name: 'Team Yamaha Blue', hex: '#0033A0' },
      { name: 'Raven', hex: '#000000' }
    ],
    images: [
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800'
    ]
  },
  {
    brand: 'Yamaha',
    name: 'MT-10',
    model_year: 2024,
    engine_cc: 998,
    horsepower: 164.0,
    torque: 111.0,
    top_speed: 270,
    mileage: 17.0,
    price: 13999.00,
    category: 'Street Sport',
    description: 'Naked bike with R1-derived engine delivering explosive torque.',
    colors: [
      { name: 'Icon Blue', hex: '#0033A0' },
      { name: 'Tech Black', hex: '#1C1C1C' }
    ],
    images: [
      'https://images.unsplash.com/photo-1591799265444-d66432b91588?w=800'
    ]
  },
  {
    brand: 'Yamaha',
    name: 'MT-09',
    model_year: 2024,
    engine_cc: 890,
    horsepower: 117.3,
    torque: 93.0,
    top_speed: 235,
    mileage: 21.0,
    price: 9999.00,
    category: 'Street Sport',
    description: 'Triple-cylinder powerhouse with aggressive styling and rider aids.',
    colors: [
      { name: 'Icon Blue', hex: '#0033A0' },
      { name: 'Storm Fluo', hex: '#FFFF00' },
      { name: 'Tech Black', hex: '#1C1C1C' }
    ],
    images: [
      'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800'
    ]
  },
  {
    brand: 'Yamaha',
    name: 'MT-07',
    model_year: 2024,
    engine_cc: 689,
    horsepower: 74.8,
    torque: 68.0,
    top_speed: 210,
    mileage: 25.0,
    price: 7999.00,
    category: 'Street Sport',
    description: 'Lightweight naked bike perfect for urban riding and weekend fun.',
    colors: [
      { name: 'Ice Fluo', hex: '#00FFFF' },
      { name: 'Tech Black', hex: '#1C1C1C' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-3f4c9c6d25f5?w=800'
    ]
  },
  {
    brand: 'Yamaha',
    name: 'MT-03',
    model_year: 2024,
    engine_cc: 321,
    horsepower: 42.0,
    torque: 29.6,
    top_speed: 180,
    mileage: 32.0,
    price: 4999.00,
    category: 'Street Sport',
    description: 'Entry-level naked bike with aggressive styling and easy handling.',
    colors: [
      { name: 'Ice Fluo', hex: '#00FFFF' },
      { name: 'Tech Black', hex: '#1C1C1C' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800'
    ]
  },
  {
    brand: 'Yamaha',
    name: 'YZF-R3',
    model_year: 2024,
    engine_cc: 321,
    horsepower: 42.0,
    torque: 29.6,
    top_speed: 180,
    mileage: 30.0,
    price: 5299.00,
    category: 'SuperSport',
    description: 'Perfect beginner sportbike with full fairings and nimble handling.',
    colors: [
      { name: 'Yamaha Blue', hex: '#0033A0' },
      { name: 'Raven', hex: '#000000' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980663-3685c1d673c4?w=800'
    ]
  },
  {
    brand: 'Yamaha',
    name: 'Tracer 9 GT',
    model_year: 2024,
    engine_cc: 890,
    horsepower: 117.3,
    torque: 93.0,
    top_speed: 220,
    mileage: 22.0,
    price: 14399.00,
    category: 'Street Sport',
    description: 'Sport-touring bike with comfort features and dynamic performance.',
    colors: [
      { name: 'Tech Graphite', hex: '#4A4A4A' },
      { name: 'Cobalt Blue', hex: '#0047AB' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-1ba1a814e6e8?w=800'
    ]
  },
  {
    brand: 'Yamaha',
    name: 'XSR900',
    model_year: 2024,
    engine_cc: 890,
    horsepower: 117.3,
    torque: 93.0,
    top_speed: 220,
    mileage: 21.0,
    price: 10199.00,
    category: 'Street Sport',
    description: 'Retro-styled sport heritage model with modern performance.',
    colors: [
      { name: 'Redline', hex: '#CC0000' },
      { name: 'Raven', hex: '#000000' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800'
    ]
  },
  {
    brand: 'Yamaha',
    name: 'XSR700',
    model_year: 2024,
    engine_cc: 689,
    horsepower: 74.8,
    torque: 68.0,
    top_speed: 200,
    mileage: 24.0,
    price: 8999.00,
    category: 'Street Sport',
    description: 'Classic-styled naked with CP2 engine and modern tech.',
    colors: [
      { name: 'Liquid Copper', hex: '#B87333' },
      { name: 'Raven', hex: '#000000' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980663-3685c1d673c4?w=800'
    ]
  },
  {
    brand: 'Yamaha',
    name: 'FZ-09',
    model_year: 2023,
    engine_cc: 847,
    horsepower: 115.0,
    torque: 87.5,
    top_speed: 225,
    mileage: 20.0,
    price: 8999.00,
    category: 'Street Sport',
    description: 'Triple threat naked bike with wheelie-prone personality.',
    colors: [
      { name: 'Deep Armor', hex: '#2C2C2C' },
      { name: 'Yamaha Blue', hex: '#0033A0' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-1ba1a814e6e8?w=800'
    ]
  },
  {
    brand: 'Yamaha',
    name: 'FZ6R',
    model_year: 2022,
    engine_cc: 600,
    horsepower: 94.0,
    torque: 64.0,
    top_speed: 215,
    mileage: 22.0,
    price: 7499.00,
    category: 'Street Sport',
    description: 'Versatile middleweight sport bike for daily riding.',
    colors: [
      { name: 'Metallic Black', hex: '#1C1C1C' },
      { name: 'Team Yamaha Blue', hex: '#0033A0' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980663-3685c1d673c4?w=800'
    ]
  },
  {
    brand: 'Yamaha',
    name: 'FZ1',
    model_year: 2020,
    engine_cc: 998,
    horsepower: 150.0,
    torque: 106.0,
    top_speed: 260,
    mileage: 18.0,
    price: 10999.00,
    category: 'Street Sport',
    description: 'Muscular naked bike with litre-class power.',
    colors: [
      { name: 'Blazing Orange', hex: '#FF6600' },
      { name: 'Deep Armor', hex: '#2C2C2C' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800'
    ]
  },

  // Kawasaki Bikes (15 bikes)
  {
    brand: 'Kawasaki',
    name: 'Ninja H2R',
    model_year: 2024,
    engine_cc: 998,
    horsepower: 310.0,
    torque: 165.0,
    top_speed: 400,
    mileage: 12.0,
    price: 55000.00,
    category: 'HyperSport',
    description: 'Track-only supercharged monster delivering unprecedented power.',
    colors: [
      { name: 'Lime Green', hex: '#32CD32' },
      { name: 'Metallic Carbon Gray', hex: '#3C3C3C' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558981359-219d6364c9c8?w=800',
      'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800'
    ]
  },
  {
    brand: 'Kawasaki',
    name: 'Ninja H2',
    model_year: 2024,
    engine_cc: 998,
    horsepower: 228.0,
    torque: 142.0,
    top_speed: 340,
    mileage: 14.0,
    price: 29500.00,
    category: 'HyperSport',
    description: 'Street-legal supercharged bike with mind-bending acceleration.',
    colors: [
      { name: 'Emerald Blazed Green', hex: '#00A651' },
      { name: 'Metallic Diablo Black', hex: '#1C1C1C' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-1ba1a814e6e8?w=800'
    ]
  },
  {
    brand: 'Kawasaki',
    name: 'Ninja ZX-10RR',
    model_year: 2024,
    engine_cc: 998,
    horsepower: 203.0,
    torque: 115.0,
    top_speed: 299,
    mileage: 15.5,
    price: 28999.00,
    category: 'HyperSport',
    description: 'Race-spec homologation special with premium components.',
    colors: [
      { name: 'Lime Green', hex: '#32CD32' },
      { name: 'Metallic Matte Covert Green', hex: '#2C5530' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980663-3685c1d673c4?w=800'
    ]
  },
  {
    brand: 'Kawasaki',
    name: 'Ninja ZX-10R',
    model_year: 2024,
    engine_cc: 998,
    horsepower: 200.0,
    torque: 114.9,
    top_speed: 299,
    mileage: 16.0,
    price: 16999.00,
    category: 'SuperSport',
    description: 'Championship-winning litre-class weapon with advanced electronics.',
    colors: [
      { name: 'Lime Green', hex: '#32CD32' },
      { name: 'Metallic Diablo Black', hex: '#1C1C1C' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800'
    ]
  },
  {
    brand: 'Kawasaki',
    name: 'Ninja ZX-6R',
    model_year: 2024,
    engine_cc: 636,
    horsepower: 126.0,
    torque: 70.8,
    top_speed: 265,
    mileage: 19.0,
    price: 10899.00,
    category: 'SuperSport',
    description: 'The 636cc advantage delivers class-leading performance.',
    colors: [
      { name: 'Lime Green', hex: '#32CD32' },
      { name: 'Metallic Spark Black', hex: '#000000' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980663-3685c1d673c4?w=800'
    ]
  },
  {
    brand: 'Kawasaki',
    name: 'Ninja 650',
    model_year: 2024,
    engine_cc: 649,
    horsepower: 67.3,
    torque: 64.0,
    top_speed: 210,
    mileage: 24.0,
    price: 7799.00,
    category: 'SuperSport',
    description: 'Versatile sport bike perfect for commuting and weekend rides.',
    colors: [
      { name: 'Lime Green', hex: '#32CD32' },
      { name: 'Metallic Spark Black', hex: '#000000' },
      { name: 'Pearl Robotic White', hex: '#F5F5F5' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-1ba1a814e6e8?w=800'
    ]
  },
  {
    brand: 'Kawasaki',
    name: 'Ninja 400',
    model_year: 2024,
    engine_cc: 399,
    horsepower: 44.8,
    torque: 38.0,
    top_speed: 185,
    mileage: 30.0,
    price: 5299.00,
    category: 'SuperSport',
    description: 'Lightweight sportbike ideal for new and experienced riders.',
    colors: [
      { name: 'Lime Green', hex: '#32CD32' },
      { name: 'Metallic Spark Black', hex: '#000000' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800'
    ]
  },
  {
    brand: 'Kawasaki',
    name: 'Z H2',
    model_year: 2024,
    engine_cc: 998,
    horsepower: 197.0,
    torque: 137.0,
    top_speed: 280,
    mileage: 16.0,
    price: 17999.00,
    category: 'Street Sport',
    description: 'Supercharged naked bike with Sugomi design.',
    colors: [
      { name: 'Metallic Diablo Black', hex: '#1C1C1C' },
      { name: 'Metallic Matte Graphenesteel Gray', hex: '#5C5C5C' }
    ],
    images: [
      'https://images.unsplash.com/photo-1591799265444-d66432b91588?w=800'
    ]
  },
  {
    brand: 'Kawasaki',
    name: 'Z900',
    model_year: 2024,
    engine_cc: 948,
    horsepower: 123.0,
    torque: 98.6,
    top_speed: 240,
    mileage: 20.0,
    price: 9399.00,
    category: 'Street Sport',
    description: 'Supernaked with aggressive styling and potent inline-four.',
    colors: [
      { name: 'Metallic Spark Black', hex: '#000000' },
      { name: 'Pearl Robotic White', hex: '#F5F5F5' }
    ],
    images: [
      'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800'
    ]
  },
  {
    brand: 'Kawasaki',
    name: 'Z650',
    model_year: 2024,
    engine_cc: 649,
    horsepower: 67.3,
    torque: 64.0,
    top_speed: 200,
    mileage: 25.0,
    price: 7699.00,
    category: 'Street Sport',
    description: 'Lightweight naked with sharp handling and Sugomi looks.',
    colors: [
      { name: 'Metallic Spark Black', hex: '#000000' },
      { name: 'Pearl Robotic White', hex: '#F5F5F5' },
      { name: 'Lime Green', hex: '#32CD32' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-3f4c9c6d25f5?w=800'
    ]
  },
  {
    brand: 'Kawasaki',
    name: 'Z400',
    model_year: 2024,
    engine_cc: 399,
    horsepower: 44.8,
    torque: 38.0,
    top_speed: 175,
    mileage: 32.0,
    price: 5099.00,
    category: 'Street Sport',
    description: 'Entry-level naked with aggressive Sugomi design.',
    colors: [
      { name: 'Metallic Spark Black', hex: '#000000' },
      { name: 'Lime Green', hex: '#32CD32' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800'
    ]
  },
  {
    brand: 'Kawasaki',
    name: 'ZX-4RR',
    model_year: 2024,
    engine_cc: 399,
    horsepower: 76.0,
    torque: 39.0,
    top_speed: 190,
    mileage: 28.0,
    price: 10199.00,
    category: 'SuperSport',
    description: 'High-revving 400cc four-cylinder sportbike phenomenon.',
    colors: [
      { name: 'Lime Green', hex: '#32CD32' },
      { name: 'Metallic Diablo Black', hex: '#1C1C1C' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980663-3685c1d673c4?w=800'
    ]
  },
  {
    brand: 'Kawasaki',
    name: 'Ninja 1000SX',
    model_year: 2024,
    engine_cc: 1043,
    horsepower: 140.0,
    torque: 111.0,
    top_speed: 250,
    mileage: 19.0,
    price: 13099.00,
    category: 'Street Sport',
    description: 'Sport-touring with litre-bike performance and all-day comfort.',
    colors: [
      { name: 'Emerald Blazed Green', hex: '#00A651' },
      { name: 'Metallic Diablo Black', hex: '#1C1C1C' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-1ba1a814e6e8?w=800'
    ]
  },
  {
    brand: 'Kawasaki',
    name: 'Versys 1000',
    model_year: 2024,
    engine_cc: 1043,
    horsepower: 118.0,
    torque: 102.0,
    top_speed: 210,
    mileage: 21.0,
    price: 13599.00,
    category: 'Street Sport',
    description: 'Adventure sport with sporty handling and touring capability.',
    colors: [
      { name: 'Metallic Diablo Black', hex: '#1C1C1C' },
      { name: 'Pearl Robotic White', hex: '#F5F5F5' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800'
    ]
  },
  {
    brand: 'Kawasaki',
    name: 'Z1000',
    model_year: 2020,
    engine_cc: 1043,
    horsepower: 140.0,
    torque: 111.0,
    top_speed: 250,
    mileage: 18.0,
    price: 12499.00,
    category: 'Street Sport',
    description: 'Muscular naked bike with distinctive Sugomi styling.',
    colors: [
      { name: 'Metallic Spark Black', hex: '#000000' },
      { name: 'Candy Burnt Orange', hex: '#CC5500' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-1ba1a814e6e8?w=800'
    ]
  },

  // Suzuki Bikes (12 bikes)
  {
    brand: 'Suzuki',
    name: 'GSX-R1000R',
    model_year: 2024,
    engine_cc: 999,
    horsepower: 202.0,
    torque: 117.6,
    top_speed: 299,
    mileage: 15.0,
    price: 17499.00,
    category: 'SuperSport',
    description: 'MotoGP-derived technology in a production superbike.',
    colors: [
      { name: 'Metallic Triton Blue', hex: '#0066CC' },
      { name: 'Glass Sparkle Black', hex: '#000000' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800'
    ]
  },
  {
    brand: 'Suzuki',
    name: 'GSX-R1000',
    model_year: 2024,
    engine_cc: 999,
    horsepower: 199.0,
    torque: 117.6,
    top_speed: 295,
    mileage: 15.5,
    price: 14799.00,
    category: 'SuperSport',
    description: 'Legendary Gixxer with excellent power-to-weight ratio.',
    colors: [
      { name: 'Metallic Triton Blue', hex: '#0066CC' },
      { name: 'Glass Sparkle Black', hex: '#000000' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980663-3685c1d673c4?w=800'
    ]
  },
  {
    brand: 'Suzuki',
    name: 'GSX-R750',
    model_year: 2023,
    engine_cc: 750,
    horsepower: 148.0,
    torque: 86.0,
    top_speed: 270,
    mileage: 17.0,
    price: 12299.00,
    category: 'SuperSport',
    description: 'The perfect balance between 600 and 1000cc sportbikes.',
    colors: [
      { name: 'Metallic Triton Blue', hex: '#0066CC' },
      { name: 'Glass Sparkle Black', hex: '#000000' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-1ba1a814e6e8?w=800'
    ]
  },
  {
    brand: 'Suzuki',
    name: 'GSX-R600',
    model_year: 2023,
    engine_cc: 599,
    horsepower: 125.0,
    torque: 69.0,
    top_speed: 260,
    mileage: 19.0,
    price: 11299.00,
    category: 'SuperSport',
    description: 'Middleweight supersport with legendary handling.',
    colors: [
      { name: 'Metallic Triton Blue', hex: '#0066CC' },
      { name: 'Glass Sparkle Black', hex: '#000000' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800'
    ]
  },
  {
    brand: 'Suzuki',
    name: 'Hayabusa',
    model_year: 2024,
    engine_cc: 1340,
    horsepower: 187.0,
    torque: 150.0,
    top_speed: 299,
    mileage: 16.5,
    price: 18599.00,
    category: 'HyperSport',
    description: 'Legendary speed king with elegant aerodynamics.',
    colors: [
      { name: 'Metallic Matte Stellar Blue', hex: '#003366' },
      { name: 'Glass Sparkle Black', hex: '#000000' },
      { name: 'Pearl Brilliant White', hex: '#FFFFFF' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558981359-219d6364c9c8?w=800',
      'https://images.unsplash.com/photo-1558980663-3685c1d673c4?w=800'
    ]
  },
  {
    brand: 'Suzuki',
    name: 'GSX-S1000',
    model_year: 2024,
    engine_cc: 999,
    horsepower: 150.0,
    torque: 106.0,
    top_speed: 250,
    mileage: 18.0,
    price: 11299.00,
    category: 'Street Sport',
    description: 'Naked bike with GSX-R derived engine and sharp looks.',
    colors: [
      { name: 'Glass Sparkle Black', hex: '#000000' },
      { name: 'Metallic Triton Blue', hex: '#0066CC' }
    ],
    images: [
      'https://images.unsplash.com/photo-1591799265444-d66432b91588?w=800'
    ]
  },
  {
    brand: 'Suzuki',
    name: 'GSX-S750',
    model_year: 2023,
    engine_cc: 749,
    horsepower: 114.0,
    torque: 81.0,
    top_speed: 230,
    mileage: 20.0,
    price: 8799.00,
    category: 'Street Sport',
    description: 'Middleweight naked with punchy performance.',
    colors: [
      { name: 'Glass Sparkle Black', hex: '#000000' },
      { name: 'Metallic Triton Blue', hex: '#0066CC' }
    ],
    images: [
      'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800'
    ]
  },
  {
    brand: 'Suzuki',
    name: 'SV650',
    model_year: 2024,
    engine_cc: 645,
    horsepower: 75.0,
    torque: 64.0,
    top_speed: 200,
    mileage: 26.0,
    price: 7399.00,
    category: 'Street Sport',
    description: 'V-twin classic that excels in versatility and fun.',
    colors: [
      { name: 'Glass Sparkle Black', hex: '#000000' },
      { name: 'Titan Black', hex: '#2C2C2C' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-3f4c9c6d25f5?w=800'
    ]
  },
  {
    brand: 'Suzuki',
    name: 'Katana',
    model_year: 2024,
    engine_cc: 999,
    horsepower: 150.0,
    torque: 106.0,
    top_speed: 250,
    mileage: 18.0,
    price: 13599.00,
    category: 'Street Sport',
    description: 'Retro icon reimagined with modern performance.',
    colors: [
      { name: 'Metallic Mystic Silver', hex: '#C0C0C0' },
      { name: 'Glass Sparkle Black', hex: '#000000' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800'
    ]
  },
  {
    brand: 'Suzuki',
    name: 'GSX-R125',
    model_year: 2024,
    engine_cc: 124,
    horsepower: 15.0,
    torque: 11.0,
    top_speed: 130,
    mileage: 45.0,
    price: 4499.00,
    category: 'SuperSport',
    description: 'Entry-level sportbike with full GSX-R DNA.',
    colors: [
      { name: 'Metallic Triton Blue', hex: '#0066CC' },
      { name: 'Glass Sparkle Black', hex: '#000000' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980663-3685c1d673c4?w=800'
    ]
  },
  {
    brand: 'Suzuki',
    name: 'GSX-S950',
    model_year: 2024,
    engine_cc: 999,
    horsepower: 150.0,
    torque: 106.0,
    top_speed: 240,
    mileage: 19.0,
    price: 10999.00,
    category: 'Street Sport',
    description: 'Euro5-compliant naked with aggressive stance.',
    colors: [
      { name: 'Glass Sparkle Black', hex: '#000000' },
      { name: 'Metallic Triton Blue', hex: '#0066CC' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-1ba1a814e6e8?w=800'
    ]
  },
  {
    brand: 'Suzuki',
    name: 'V-Strom 1050',
    model_year: 2024,
    engine_cc: 1037,
    horsepower: 107.0,
    torque: 100.0,
    top_speed: 200,
    mileage: 22.0,
    price: 14299.00,
    category: 'Street Sport',
    description: 'Adventure tourer with sporty V-twin character.',
    colors: [
      { name: 'Champion Yellow', hex: '#FFD700' },
      { name: 'Glass Sparkle Black', hex: '#000000' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800'
    ]
  },

  // Honda Bikes (12 bikes)
  {
    brand: 'Honda',
    name: 'CBR1000RR-R Fireblade SP',
    model_year: 2024,
    engine_cc: 999,
    horsepower: 217.0,
    torque: 113.0,
    top_speed: 299,
    mileage: 14.5,
    price: 28500.00,
    category: 'HyperSport',
    description: 'MotoGP-inspired superbike with cutting-edge technology.',
    colors: [
      { name: 'Grand Prix Red', hex: '#DC143C' },
      { name: 'Matte Ballistic Black Metallic', hex: '#1C1C1C' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800'
    ]
  },
  {
    brand: 'Honda',
    name: 'CBR1000RR-R Fireblade',
    model_year: 2024,
    engine_cc: 999,
    horsepower: 214.0,
    torque: 113.0,
    top_speed: 299,
    mileage: 15.0,
    price: 16999.00,
    category: 'SuperSport',
    description: 'Track-focused superbike with race-winning heritage.',
    colors: [
      { name: 'Grand Prix Red', hex: '#DC143C' },
      { name: 'Pearl Glare White', hex: '#FFFFFF' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980663-3685c1d673c4?w=800'
    ]
  },
  {
    brand: 'Honda',
    name: 'CBR600RR',
    model_year: 2023,
    engine_cc: 599,
    horsepower: 118.0,
    torque: 65.5,
    top_speed: 260,
    mileage: 19.0,
    price: 11899.00,
    category: 'SuperSport',
    description: 'Legendary 600 with precision handling and screaming engine.',
    colors: [
      { name: 'Grand Prix Red', hex: '#DC143C' },
      { name: 'Black', hex: '#000000' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-1ba1a814e6e8?w=800'
    ]
  },
  {
    brand: 'Honda',
    name: 'CBR650R',
    model_year: 2024,
    engine_cc: 649,
    horsepower: 93.0,
    torque: 63.0,
    top_speed: 210,
    mileage: 22.0,
    price: 9399.00,
    category: 'SuperSport',
    description: 'Inline-four middleweight with exceptional versatility.',
    colors: [
      { name: 'Grand Prix Red', hex: '#DC143C' },
      { name: 'Mat Ballistic Black Metallic', hex: '#1C1C1C' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800'
    ]
  },
  {
    brand: 'Honda',
    name: 'CBR500R',
    model_year: 2024,
    engine_cc: 471,
    horsepower: 47.0,
    torque: 43.0,
    top_speed: 190,
    mileage: 28.0,
    price: 6899.00,
    category: 'SuperSport',
    description: 'Perfect sport bike for beginners and commuters.',
    colors: [
      { name: 'Grand Prix Red', hex: '#DC143C' },
      { name: 'Black', hex: '#000000' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980663-3685c1d673c4?w=800'
    ]
  },
  {
    brand: 'Honda',
    name: 'CB1000R',
    model_year: 2024,
    engine_cc: 998,
    horsepower: 143.0,
    torque: 104.0,
    top_speed: 240,
    mileage: 18.0,
    price: 13299.00,
    category: 'Street Sport',
    description: 'Neo Sports Café with litre-bike performance.',
    colors: [
      { name: 'Mat Ballistic Black Metallic', hex: '#1C1C1C' },
      { name: 'Pearl Smoke Gray', hex: '#708090' }
    ],
    images: [
      'https://images.unsplash.com/photo-1591799265444-d66432b91588?w=800'
    ]
  },
  {
    brand: 'Honda',
    name: 'CB650R',
    model_year: 2024,
    engine_cc: 649,
    horsepower: 93.0,
    torque: 63.0,
    top_speed: 200,
    mileage: 23.0,
    price: 9099.00,
    category: 'Street Sport',
    description: 'Middleweight naked with premium finish and four-cylinder howl.',
    colors: [
      { name: 'Mat Gunpowder Black Metallic', hex: '#2C2C2C' },
      { name: 'Pearl Smoky Gray', hex: '#778899' }
    ],
    images: [
      'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800'
    ]
  },
  {
    brand: 'Honda',
    name: 'CB500F',
    model_year: 2024,
    engine_cc: 471,
    horsepower: 47.0,
    torque: 43.0,
    top_speed: 175,
    mileage: 30.0,
    price: 6799.00,
    category: 'Street Sport',
    description: 'Reliable twin-cylinder naked ideal for urban adventures.',
    colors: [
      { name: 'Mat Gunpowder Black Metallic', hex: '#2C2C2C' },
      { name: 'Grand Prix Red', hex: '#DC143C' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-3f4c9c6d25f5?w=800'
    ]
  },
  {
    brand: 'Honda',
    name: 'CB300R',
    model_year: 2024,
    engine_cc: 286,
    horsepower: 30.9,
    torque: 27.5,
    top_speed: 150,
    mileage: 35.0,
    price: 4799.00,
    category: 'Street Sport',
    description: 'Lightweight Neo Sports Café with nimble handling.',
    colors: [
      { name: 'Grand Prix Red', hex: '#DC143C' },
      { name: 'Mat Axis Gray Metallic', hex: '#5C5C5C' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800'
    ]
  },
  {
    brand: 'Honda',
    name: 'CBR300R',
    model_year: 2023,
    engine_cc: 286,
    horsepower: 30.9,
    torque: 27.5,
    top_speed: 155,
    mileage: 33.0,
    price: 4999.00,
    category: 'SuperSport',
    description: 'Affordable entry-level sportbike with full fairings.',
    colors: [
      { name: 'Grand Prix Red', hex: '#DC143C' },
      { name: 'Black', hex: '#000000' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980663-3685c1d673c4?w=800'
    ]
  },
  {
    brand: 'Honda',
    name: 'VFR800F',
    model_year: 2023,
    engine_cc: 782,
    horsepower: 105.0,
    torque: 75.0,
    top_speed: 225,
    mileage: 21.0,
    price: 11999.00,
    category: 'Street Sport',
    description: 'V4 sport-tourer with legendary refinement.',
    colors: [
      { name: 'Grand Prix Red', hex: '#DC143C' },
      { name: 'Pearl Glare White', hex: '#FFFFFF' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-1ba1a814e6e8?w=800'
    ]
  },
  {
    brand: 'Honda',
    name: 'NT1100',
    model_year: 2024,
    engine_cc: 1084,
    horsepower: 102.0,
    torque: 104.0,
    top_speed: 200,
    mileage: 24.0,
    price: 13799.00,
    category: 'Street Sport',
    description: 'Sport-touring with parallel-twin smoothness.',
    colors: [
      { name: 'Mat Iridium Gray Metallic', hex: '#5C5C5C' },
      { name: 'Pearl Organic Green', hex: '#2E8B57' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800'
    ]
  },

  // Ducati Bikes (15 bikes) - Continuing with premium Italian bikes
  {
    brand: 'Ducati',
    name: 'Panigale V4 R',
    model_year: 2024,
    engine_cc: 998,
    horsepower: 221.0,
    torque: 111.0,
    top_speed: 305,
    mileage: 13.0,
    price: 40000.00,
    category: 'HyperSport',
    description: 'Race homologation special with MotoGP technology.',
    colors: [
      { name: 'Ducati Red', hex: '#CC0000' },
      { name: 'Winter Test Livery', hex: '#000000' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558981359-219d6364c9c8?w=800',
      'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800'
    ]
  },
  {
    brand: 'Ducati',
    name: 'Panigale V4 S',
    model_year: 2024,
    engine_cc: 1103,
    horsepower: 214.0,
    torque: 124.0,
    top_speed: 300,
    mileage: 14.0,
    price: 28395.00,
    category: 'HyperSport',
    description: 'Superbike perfection with Öhlins suspension and wings.',
    colors: [
      { name: 'Ducati Red', hex: '#CC0000' },
      { name: 'Black', hex: '#000000' },
      { name: 'White Rosso', hex: '#FFFFFF' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980663-3685c1d673c4?w=800'
    ]
  },
  {
    brand: 'Ducati',
    name: 'Panigale V4',
    model_year: 2024,
    engine_cc: 1103,
    horsepower: 214.0,
    torque: 124.0,
    top_speed: 299,
    mileage: 14.5,
    price: 24295.00,
    category: 'SuperSport',
    description: 'V4 masterpiece combining power and sophistication.',
    colors: [
      { name: 'Ducati Red', hex: '#CC0000' },
      { name: 'Dark Stealth', hex: '#2C2C2C' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-1ba1a814e6e8?w=800'
    ]
  },
  {
    brand: 'Ducati',
    name: 'Panigale V2',
    model_year: 2024,
    engine_cc: 955,
    horsepower: 155.0,
    torque: 104.0,
    top_speed: 270,
    mileage: 17.0,
    price: 17295.00,
    category: 'SuperSport',
    description: 'Twin-cylinder emotion with superbike performance.',
    colors: [
      { name: 'Ducati Red', hex: '#CC0000' },
      { name: 'Bayliss 1st Championship 20th Anniversary', hex: '#FFD700' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800'
    ]
  },
  {
    brand: 'Ducati',
    name: 'Streetfighter V4 S',
    model_year: 2024,
    engine_cc: 1103,
    horsepower: 208.0,
    torque: 123.0,
    top_speed: 290,
    mileage: 15.0,
    price: 25995.00,
    category: 'Street Sport',
    description: 'Naked Panigale with aggressive attitude and brutal power.',
    colors: [
      { name: 'Ducati Red', hex: '#CC0000' },
      { name: 'Dark Stealth', hex: '#2C2C2C' }
    ],
    images: [
      'https://images.unsplash.com/photo-1591799265444-d66432b91588?w=800'
    ]
  },
  {
    brand: 'Ducati',
    name: 'Streetfighter V2',
    model_year: 2024,
    engine_cc: 955,
    horsepower: 153.0,
    torque: 101.4,
    top_speed: 260,
    mileage: 17.5,
    price: 16795.00,
    category: 'Street Sport',
    description: 'Compact fighter combining design and Ducati performance.',
    colors: [
      { name: 'Ducati Red', hex: '#CC0000' },
      { name: 'Thrilling Black', hex: '#000000' }
    ],
    images: [
      'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800'
    ]
  },
  {
    brand: 'Ducati',
    name: 'SuperSport 950 S',
    model_year: 2024,
    engine_cc: 937,
    horsepower: 110.0,
    torque: 93.0,
    top_speed: 240,
    mileage: 19.0,
    price: 14795.00,
    category: 'SuperSport',
    description: 'Versatile sportbike for road and occasional track.',
    colors: [
      { name: 'Ducati Red', hex: '#CC0000' },
      { name: 'Arctic White Silk', hex: '#F5F5F5' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-3f4c9c6d25f5?w=800'
    ]
  },
  {
    brand: 'Ducati',
    name: 'Monster SP',
    model_year: 2024,
    engine_cc: 937,
    horsepower: 111.0,
    torque: 93.0,
    top_speed: 225,
    mileage: 20.0,
    price: 15695.00,
    category: 'Street Sport',
    description: 'Icon reinvented with premium components and sharp design.',
    colors: [
      { name: 'Ducati Red', hex: '#CC0000' },
      { name: 'Graffiti', hex: '#FFFFFF' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800'
    ]
  },
  {
    brand: 'Ducati',
    name: 'Monster',
    model_year: 2024,
    engine_cc: 937,
    horsepower: 111.0,
    torque: 93.0,
    top_speed: 220,
    mileage: 20.5,
    price: 11995.00,
    category: 'Street Sport',
    description: 'Legendary naked with contemporary style and feel.',
    colors: [
      { name: 'Ducati Red', hex: '#CC0000' },
      { name: 'Dark Stealth', hex: '#2C2C2C' },
      { name: '60 Years Logo', hex: '#FFD700' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980663-3685c1d673c4?w=800'
    ]
  },
  {
    brand: 'Ducati',
    name: 'Diavel V4',
    model_year: 2024,
    engine_cc: 1158,
    horsepower: 168.0,
    torque: 126.0,
    top_speed: 250,
    mileage: 16.0,
    price: 25995.00,
    category: 'Street Sport',
    description: 'Muscle cruiser with superbike heart and unmistakable presence.',
    colors: [
      { name: 'Thrilling Black', hex: '#000000' },
      { name: 'Ducati Red', hex: '#CC0000' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-1ba1a814e6e8?w=800'
    ]
  },
  {
    brand: 'Ducati',
    name: 'Hypermotard 950',
    model_year: 2024,
    engine_cc: 937,
    horsepower: 114.0,
    torque: 96.0,
    top_speed: 210,
    mileage: 21.0,
    price: 14795.00,
    category: 'Street Sport',
    description: 'Fun machine transforming every road into a racetrack.',
    colors: [
      { name: 'Ducati Red', hex: '#CC0000' },
      { name: 'Graffiti', hex: '#FFFFFF' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800'
    ]
  },
  {
    brand: 'Ducati',
    name: 'Scrambler 1100 Sport',
    model_year: 2024,
    engine_cc: 1079,
    horsepower: 86.0,
    torque: 88.0,
    top_speed: 195,
    mileage: 22.0,
    price: 13795.00,
    category: 'Street Sport',
    description: 'Retro-modern scrambler with big bike attitude.',
    colors: [
      { name: 'Yellow', hex: '#FFD700' },
      { name: 'Black', hex: '#000000' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980663-3685c1d673c4?w=800'
    ]
  },
  {
    brand: 'Ducati',
    name: 'Multistrada V4 S',
    model_year: 2024,
    engine_cc: 1158,
    horsepower: 170.0,
    torque: 125.0,
    top_speed: 270,
    mileage: 18.0,
    price: 26995.00,
    category: 'Street Sport',
    description: 'Adventure tourer with superbike engine and 4 bikes in 1.',
    colors: [
      { name: 'Ducati Red', hex: '#CC0000' },
      { name: 'Aviator Grey', hex: '#708090' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-1ba1a814e6e8?w=800'
    ]
  },
  {
    brand: 'Ducati',
    name: '848',
    model_year: 2013,
    engine_cc: 849,
    horsepower: 134.0,
    torque: 98.0,
    top_speed: 260,
    mileage: 16.0,
    price: 9995.00,
    category: 'SuperSport',
    description: 'Classic middleweight superbike with timeless Italian design.',
    colors: [
      { name: 'Ducati Red', hex: '#CC0000' },
      { name: 'White', hex: '#FFFFFF' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800'
    ]
  },
  {
    brand: 'Ducati',
    name: '959 Panigale',
    model_year: 2020,
    engine_cc: 955,
    horsepower: 157.0,
    torque: 107.4,
    top_speed: 270,
    mileage: 16.5,
    price: 14995.00,
    category: 'SuperSport',
    description: 'Beautiful twin-cylinder superbike with refined power.',
    colors: [
      { name: 'Ducati Red', hex: '#CC0000' },
      { name: 'Star White Silk', hex: '#FFFFFF' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980663-3685c1d673c4?w=800'
    ]
  },

  // BMW Bikes (10 bikes)
  {
    brand: 'BMW',
    name: 'S 1000 RR',
    model_year: 2024,
    engine_cc: 999,
    horsepower: 207.0,
    torque: 113.0,
    top_speed: 299,
    mileage: 15.0,
    price: 17895.00,
    category: 'SuperSport',
    description: 'German precision engineering meets superbike performance.',
    colors: [
      { name: 'M Motorsport', hex: '#0066CC' },
      { name: 'Light White', hex: '#FFFFFF' },
      { name: 'Black Storm Metallic', hex: '#000000' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800'
    ]
  },
  {
    brand: 'BMW',
    name: 'M 1000 RR',
    model_year: 2024,
    engine_cc: 999,
    horsepower: 212.0,
    torque: 113.0,
    top_speed: 306,
    mileage: 14.0,
    price: 37000.00,
    category: 'HyperSport',
    description: 'Ultimate M superbike with carbon wings and track focus.',
    colors: [
      { name: 'M Motorsport', hex: '#0066CC' },
      { name: 'Racing Red', hex: '#CC0000' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558981359-219d6364c9c8?w=800'
    ]
  },
  {
    brand: 'BMW',
    name: 'S 1000 R',
    model_year: 2024,
    engine_cc: 999,
    horsepower: 165.0,
    torque: 114.0,
    top_speed: 250,
    mileage: 17.0,
    price: 14995.00,
    category: 'Street Sport',
    description: 'Naked roadster with superbike DNA and electronics.',
    colors: [
      { name: 'Racing Red', hex: '#CC0000' },
      { name: 'Black Storm Metallic', hex: '#000000' }
    ],
    images: [
      'https://images.unsplash.com/photo-1591799265444-d66432b91588?w=800'
    ]
  },
  {
    brand: 'BMW',
    name: 'S 1000 XR',
    model_year: 2024,
    engine_cc: 999,
    horsepower: 165.0,
    torque: 114.0,
    top_speed: 240,
    mileage: 18.0,
    price: 17295.00,
    category: 'Street Sport',
    description: 'Adventure sport with touring comfort and dynamic handling.',
    colors: [
      { name: 'Racing Blue Metallic', hex: '#0066CC' },
      { name: 'Light White', hex: '#FFFFFF' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-1ba1a814e6e8?w=800'
    ]
  },
  {
    brand: 'BMW',
    name: 'F 900 R',
    model_year: 2024,
    engine_cc: 895,
    horsepower: 105.0,
    torque: 92.0,
    top_speed: 220,
    mileage: 21.0,
    price: 9995.00,
    category: 'Street Sport',
    description: 'Middleweight naked with parallel-twin punch.',
    colors: [
      { name: 'Style Sport', hex: '#CC0000' },
      { name: 'Black Storm Metallic', hex: '#000000' }
    ],
    images: [
      'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800'
    ]
  },
  {
    brand: 'BMW',
    name: 'F 900 XR',
    model_year: 2024,
    engine_cc: 895,
    horsepower: 105.0,
    torque: 92.0,
    top_speed: 215,
    mileage: 22.0,
    price: 11695.00,
    category: 'Street Sport',
    description: 'Sport-adventure combining agility and versatility.',
    colors: [
      { name: 'Racing Red', hex: '#CC0000' },
      { name: 'Frozen Dark Grey Metallic', hex: '#5C5C5C' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-3f4c9c6d25f5?w=800'
    ]
  },
  {
    brand: 'BMW',
    name: 'M 1000 XR',
    model_year: 2024,
    engine_cc: 999,
    horsepower: 170.0,
    torque: 113.0,
    top_speed: 270,
    mileage: 17.0,
    price: 20495.00,
    category: 'Street Sport',
    description: 'M-powered adventure sport with supreme performance.',
    colors: [
      { name: 'M Motorsport', hex: '#0066CC' },
      { name: 'Blackstorm Metallic', hex: '#000000' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800'
    ]
  },
  {
    brand: 'BMW',
    name: 'G 310 R',
    model_year: 2024,
    engine_cc: 313,
    horsepower: 34.0,
    torque: 28.0,
    top_speed: 143,
    mileage: 30.0,
    price: 4995.00,
    category: 'Street Sport',
    description: 'Entry-level naked with BMW quality and reliability.',
    colors: [
      { name: 'Racing Red', hex: '#CC0000' },
      { name: 'Cosmic Black', hex: '#000000' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800'
    ]
  },
  {
    brand: 'BMW',
    name: 'G 310 RR',
    model_year: 2024,
    engine_cc: 313,
    horsepower: 34.0,
    torque: 28.0,
    top_speed: 145,
    mileage: 29.0,
    price: 5295.00,
    category: 'SuperSport',
    description: 'Fully-faired entry sportbike with aggressive styling.',
    colors: [
      { name: 'Racing Red', hex: '#CC0000' },
      { name: 'Polar White', hex: '#FFFFFF' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980663-3685c1d673c4?w=800'
    ]
  },
  {
    brand: 'BMW',
    name: 'R 1250 RS',
    model_year: 2024,
    engine_cc: 1254,
    horsepower: 136.0,
    torque: 143.0,
    top_speed: 220,
    mileage: 20.0,
    price: 15995.00,
    category: 'Street Sport',
    description: 'Sport-tourer with boxer engine and shaft drive.',
    colors: [
      { name: 'Style Sport', hex: '#0066CC' },
      { name: 'Light White', hex: '#FFFFFF' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-1ba1a814e6e8?w=800'
    ]
  },

  // KTM Bikes (10 bikes)
  {
    brand: 'KTM',
    name: '1290 Super Duke R',
    model_year: 2024,
    engine_cc: 1301,
    horsepower: 180.0,
    torque: 140.0,
    top_speed: 280,
    mileage: 16.0,
    price: 19499.00,
    category: 'Street Sport',
    description: 'The Beast - ultimate naked bike with Austrian fury.',
    colors: [
      { name: 'Orange', hex: '#FF6600' },
      { name: 'Black', hex: '#000000' }
    ],
    images: [
      'https://images.unsplash.com/photo-1591799265444-d66432b91588?w=800',
      'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800'
    ]
  },
  {
    brand: 'KTM',
    name: '890 Duke R',
    model_year: 2024,
    engine_cc: 889,
    horsepower: 121.0,
    torque: 99.0,
    top_speed: 240,
    mileage: 20.0,
    price: 12299.00,
    category: 'Street Sport',
    description: 'Scalpel sharp handling with LC8c parallel-twin power.',
    colors: [
      { name: 'Orange', hex: '#FF6600' },
      { name: 'White', hex: '#FFFFFF' }
    ],
    images: [
      'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800'
    ]
  },
  {
    brand: 'KTM',
    name: '790 Duke',
    model_year: 2023,
    engine_cc: 799,
    horsepower: 105.0,
    torque: 87.0,
    top_speed: 225,
    mileage: 22.0,
    price: 9699.00,
    category: 'Street Sport',
    description: 'The Scalpel - precision middleweight naked.',
    colors: [
      { name: 'Orange', hex: '#FF6600' },
      { name: 'Black', hex: '#000000' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-3f4c9c6d25f5?w=800'
    ]
  },
  {
    brand: 'KTM',
    name: '390 Duke',
    model_year: 2024,
    engine_cc: 373,
    horsepower: 43.5,
    torque: 37.0,
    top_speed: 167,
    mileage: 30.0,
    price: 5799.00,
    category: 'Street Sport',
    description: 'Small capacity fun machine with big bike attitude.',
    colors: [
      { name: 'Orange', hex: '#FF6600' },
      { name: 'White', hex: '#FFFFFF' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800'
    ]
  },
  {
    brand: 'KTM',
    name: 'RC 390',
    model_year: 2024,
    engine_cc: 373,
    horsepower: 43.5,
    torque: 37.0,
    top_speed: 170,
    mileage: 28.0,
    price: 5999.00,
    category: 'SuperSport',
    description: 'Track-ready single with aggressive full fairing.',
    colors: [
      { name: 'Orange', hex: '#FF6600' },
      { name: 'Black', hex: '#000000' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980663-3685c1d673c4?w=800'
    ]
  },
  {
    brand: 'KTM',
    name: 'RC 8C',
    model_year: 2024,
    engine_cc: 889,
    horsepower: 128.0,
    torque: 103.0,
    top_speed: 270,
    mileage: 17.0,
    price: 34999.00,
    category: 'HyperSport',
    description: 'Limited edition track weapon with carbon bodywork.',
    colors: [
      { name: 'Orange', hex: '#FF6600' },
      { name: 'Carbon', hex: '#2C2C2C' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558981359-219d6364c9c8?w=800'
    ]
  },
  {
    brand: 'KTM',
    name: '1290 Super Duke GT',
    model_year: 2024,
    engine_cc: 1301,
    horsepower: 173.0,
    torque: 141.0,
    top_speed: 260,
    mileage: 18.0,
    price: 20799.00,
    category: 'Street Sport',
    description: 'Sport-tourer combining Super Duke power with comfort.',
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Orange', hex: '#FF6600' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-1ba1a814e6e8?w=800'
    ]
  },
  {
    brand: 'KTM',
    name: '1290 Super Adventure S',
    model_year: 2024,
    engine_cc: 1301,
    horsepower: 160.0,
    torque: 138.0,
    top_speed: 240,
    mileage: 19.0,
    price: 19999.00,
    category: 'Street Sport',
    description: 'Adventure bike with sport bike soul.',
    colors: [
      { name: 'Orange', hex: '#FF6600' },
      { name: 'Grey', hex: '#808080' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800'
    ]
  },
  {
    brand: 'KTM',
    name: '890 Adventure R',
    model_year: 2024,
    engine_cc: 889,
    horsepower: 105.0,
    torque: 100.0,
    top_speed: 200,
    mileage: 23.0,
    price: 14799.00,
    category: 'Street Sport',
    description: 'Off-road focused adventure with sporty performance.',
    colors: [
      { name: 'Orange', hex: '#FF6600' },
      { name: 'Black', hex: '#000000' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980663-3685c1d673c4?w=800'
    ]
  },
  {
    brand: 'KTM',
    name: '250 Duke',
    model_year: 2024,
    engine_cc: 248,
    horsepower: 30.0,
    torque: 24.0,
    top_speed: 145,
    mileage: 35.0,
    price: 4499.00,
    category: 'Street Sport',
    description: 'Entry-level naked with KTM DNA and style.',
    colors: [
      { name: 'Orange', hex: '#FF6600' },
      { name: 'White', hex: '#FFFFFF' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-1ba1a814e6e8?w=800'
    ]
  },

  // Aprilia Bikes (8 bikes)
  {
    brand: 'Aprilia',
    name: 'RSV4 Factory',
    model_year: 2024,
    engine_cc: 1099,
    horsepower: 217.0,
    torque: 122.0,
    top_speed: 305,
    mileage: 14.0,
    price: 27999.00,
    category: 'HyperSport',
    description: 'Italian V4 superbike with MotoGP technology.',
    colors: [
      { name: 'Aprilia Black', hex: '#000000' },
      { name: 'Race', hex: '#CC0000' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558981359-219d6364c9c8?w=800',
      'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800'
    ]
  },
  {
    brand: 'Aprilia',
    name: 'RSV4',
    model_year: 2024,
    engine_cc: 1099,
    horsepower: 214.0,
    torque: 122.0,
    top_speed: 299,
    mileage: 14.5,
    price: 19499.00,
    category: 'SuperSport',
    description: 'V4 masterpiece with razor-sharp handling.',
    colors: [
      { name: 'Aprilia Black', hex: '#000000' },
      { name: 'Misano Red', hex: '#CC0000' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980663-3685c1d673c4?w=800'
    ]
  },
  {
    brand: 'Aprilia',
    name: 'Tuono V4 Factory',
    model_year: 2024,
    engine_cc: 1077,
    horsepower: 175.0,
    torque: 121.0,
    top_speed: 270,
    mileage: 16.0,
    price: 19999.00,
    category: 'Street Sport',
    description: 'Naked superbike with uncompromising performance.',
    colors: [
      { name: 'Aprilia Black', hex: '#000000' },
      { name: 'Lava Red', hex: '#CC0000' }
    ],
    images: [
      'https://images.unsplash.com/photo-1591799265444-d66432b91588?w=800'
    ]
  },
  {
    brand: 'Aprilia',
    name: 'RS 660',
    model_year: 2024,
    engine_cc: 659,
    horsepower: 100.0,
    torque: 67.0,
    top_speed: 238,
    mileage: 22.0,
    price: 11299.00,
    category: 'SuperSport',
    description: 'Modern sportbike with parallel-twin efficiency.',
    colors: [
      { name: 'Acid Gold', hex: '#FFD700' },
      { name: 'Aprilia Black', hex: '#000000' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-1ba1a814e6e8?w=800'
    ]
  },
  {
    brand: 'Aprilia',
    name: 'Tuono 660',
    model_year: 2024,
    engine_cc: 659,
    horsepower: 95.0,
    torque: 67.0,
    top_speed: 220,
    mileage: 24.0,
    price: 10499.00,
    category: 'Street Sport',
    description: 'Sport naked with cutting-edge electronics.',
    colors: [
      { name: 'Iridium Grey', hex: '#5C5C5C' },
      { name: 'Concept Black', hex: '#000000' }
    ],
    images: [
      'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800'
    ]
  },
  {
    brand: 'Aprilia',
    name: 'RS 457',
    model_year: 2024,
    engine_cc: 457,
    horsepower: 47.6,
    torque: 43.5,
    top_speed: 190,
    mileage: 26.0,
    price: 6999.00,
    category: 'SuperSport',
    description: 'Entry middleweight with superbike looks.',
    colors: [
      { name: 'Racing Stripes', hex: '#CC0000' },
      { name: 'Prismatic Dark', hex: '#000000' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-3f4c9c6d25f5?w=800'
    ]
  },
  {
    brand: 'Aprilia',
    name: 'Tuono 457',
    model_year: 2024,
    engine_cc: 457,
    horsepower: 47.6,
    torque: 43.5,
    top_speed: 185,
    mileage: 27.0,
    price: 6699.00,
    category: 'Street Sport',
    description: 'Middleweight naked with premium feel.',
    colors: [
      { name: 'Charcoal Grey', hex: '#36454F' },
      { name: 'Black', hex: '#000000' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800'
    ]
  },
  {
    brand: 'Aprilia',
    name: 'RSV4 1100 Factory',
    model_year: 2023,
    engine_cc: 1099,
    horsepower: 217.0,
    torque: 122.0,
    top_speed: 305,
    mileage: 13.5,
    price: 26999.00,
    category: 'HyperSport',
    description: 'Track-focused factory special with racing pedigree.',
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Atomico 6', hex: '#FFFFFF' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980663-3685c1d673c4?w=800'
    ]
  },

  // Triumph Bikes (10 bikes)
  {
    brand: 'Triumph',
    name: 'Daytona Moto2 765',
    model_year: 2024,
    engine_cc: 765,
    horsepower: 128.0,
    torque: 80.0,
    top_speed: 260,
    mileage: 18.0,
    price: 17500.00,
    category: 'HyperSport',
    description: 'Limited edition Moto2-derived middleweight legend.',
    colors: [
      { name: 'Crystal White', hex: '#FFFFFF' },
      { name: 'Matte Silver Ice', hex: '#C0C0C0' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558981359-219d6364c9c8?w=800'
    ]
  },
  {
    brand: 'Triumph',
    name: 'Speed Triple 1200 RS',
    model_year: 2024,
    engine_cc: 1160,
    horsepower: 180.0,
    torque: 125.0,
    top_speed: 270,
    mileage: 17.0,
    price: 18500.00,
    category: 'Street Sport',
    description: 'British muscle bike with triple-cylinder character.',
    colors: [
      { name: 'Carnival Red', hex: '#CC0000' },
      { name: 'Matt Storm Grey', hex: '#708090' }
    ],
    images: [
      'https://images.unsplash.com/photo-1591799265444-d66432b91588?w=800',
      'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800'
    ]
  },
  {
    brand: 'Triumph',
    name: 'Street Triple 765 RS',
    model_year: 2024,
    engine_cc: 765,
    horsepower: 121.0,
    torque: 79.0,
    top_speed: 240,
    mileage: 20.0,
    price: 12500.00,
    category: 'Street Sport',
    description: 'Middleweight naked perfection with arrow sharp handling.',
    colors: [
      { name: 'Carnival Red', hex: '#CC0000' },
      { name: 'Matt Silver Ice', hex: '#C0C0C0' }
    ],
    images: [
      'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800'
    ]
  },
  {
    brand: 'Triumph',
    name: 'Street Triple 765 R',
    model_year: 2024,
    engine_cc: 765,
    horsepower: 118.0,
    torque: 79.0,
    top_speed: 235,
    mileage: 21.0,
    price: 10995.00,
    category: 'Street Sport',
    description: 'Sport-focused triple with premium components.',
    colors: [
      { name: 'Matt Jet Black', hex: '#000000' },
      { name: 'Sapphire Black', hex: '#0F52BA' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-3f4c9c6d25f5?w=800'
    ]
  },
  {
    brand: 'Triumph',
    name: 'Trident 660',
    model_year: 2024,
    engine_cc: 660,
    horsepower: 80.0,
    torque: 64.0,
    top_speed: 210,
    mileage: 25.0,
    price: 8295.00,
    category: 'Street Sport',
    description: 'Easy-going triple with modern design and agility.',
    colors: [
      { name: 'Matt Baja Orange', hex: '#FF8C00' },
      { name: 'Sapphire Black', hex: '#0F52BA' },
      { name: 'Silver', hex: '#C0C0C0' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800'
    ]
  },
  {
    brand: 'Triumph',
    name: 'Tiger Sport 660',
    model_year: 2024,
    engine_cc: 660,
    horsepower: 80.0,
    torque: 64.0,
    top_speed: 200,
    mileage: 26.0,
    price: 9795.00,
    category: 'Street Sport',
    description: 'Sport-adventure with triple character and versatility.',
    colors: [
      { name: 'Lucerne Blue', hex: '#4169E1' },
      { name: 'Sapphire Black', hex: '#0F52BA' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980663-3685c1d673c4?w=800'
    ]
  },
  {
    brand: 'Triumph',
    name: 'Tiger 900 Rally Pro',
    model_year: 2024,
    engine_cc: 888,
    horsepower: 95.0,
    torque: 87.0,
    top_speed: 205,
    mileage: 23.0,
    price: 16295.00,
    category: 'Street Sport',
    description: 'Adventure bike with sporty on-road credentials.',
    colors: [
      { name: 'Sapphire Black', hex: '#0F52BA' },
      { name: 'Greenlight', hex: '#00FF00' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-1ba1a814e6e8?w=800'
    ]
  },
  {
    brand: 'Triumph',
    name: 'Thruxton RS',
    model_year: 2024,
    engine_cc: 1200,
    horsepower: 104.0,
    torque: 112.0,
    top_speed: 220,
    mileage: 19.0,
    price: 15195.00,
    category: 'Street Sport',
    description: 'Café racer with modern performance and classic style.',
    colors: [
      { name: 'Competition Green', hex: '#228B22' },
      { name: 'Silver Ice', hex: '#C0C0C0' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800'
    ]
  },
  {
    brand: 'Triumph',
    name: 'Scrambler 1200 XE',
    model_year: 2024,
    engine_cc: 1200,
    horsepower: 89.0,
    torque: 110.0,
    top_speed: 190,
    mileage: 20.0,
    price: 14995.00,
    category: 'Street Sport',
    description: 'Adventure scrambler with British heritage.',
    colors: [
      { name: 'Korosi Red', hex: '#8B0000' },
      { name: 'Sapphire Black', hex: '#0F52BA' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980663-3685c1d673c4?w=800'
    ]
  },
  {
    brand: 'Triumph',
    name: 'Rocket 3 R',
    model_year: 2024,
    engine_cc: 2458,
    horsepower: 165.0,
    torque: 221.0,
    top_speed: 220,
    mileage: 15.0,
    price: 22500.00,
    category: 'Street Sport',
    description: 'Massive triple muscle cruiser with sport DNA.',
    colors: [
      { name: 'Phantom Black', hex: '#000000' },
      { name: 'Matt Ironstone', hex: '#4A4A4A' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-1ba1a814e6e8?w=800'
    ]
  },

  // MV Agusta Bikes (7 bikes)
  {
    brand: 'MV Agusta',
    name: 'F4 RC',
    model_year: 2024,
    engine_cc: 998,
    horsepower: 212.0,
    torque: 115.0,
    top_speed: 305,
    mileage: 13.0,
    price: 46000.00,
    category: 'HyperSport',
    description: 'Italian exotic superbike with works racing parts.',
    colors: [
      { name: 'Ago Red/Silver', hex: '#CC0000' },
      { name: 'Carbon', hex: '#2C2C2C' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558981359-219d6364c9c8?w=800',
      'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800'
    ]
  },
  {
    brand: 'MV Agusta',
    name: 'Superveloce 800',
    model_year: 2024,
    engine_cc: 798,
    horsepower: 147.0,
    torque: 88.0,
    top_speed: 250,
    mileage: 17.0,
    price: 28000.00,
    category: 'SuperSport',
    description: 'Art in motion - breathtakingly beautiful sportbike.',
    colors: [
      { name: 'Serie Oro', hex: '#FFD700' },
      { name: 'Rosso/Argento', hex: '#CC0000' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980663-3685c1d673c4?w=800'
    ]
  },
  {
    brand: 'MV Agusta',
    name: 'Brutale 1000 RS',
    model_year: 2024,
    engine_cc: 998,
    horsepower: 208.0,
    torque: 116.5,
    top_speed: 300,
    mileage: 14.0,
    price: 32000.00,
    category: 'Street Sport',
    description: 'Most powerful production naked bike ever made.',
    colors: [
      { name: 'Ago Red/Carbon', hex: '#CC0000' },
      { name: 'Black/Carbon', hex: '#000000' }
    ],
    images: [
      'https://images.unsplash.com/photo-1591799265444-d66432b91588?w=800'
    ]
  },
  {
    brand: 'MV Agusta',
    name: 'Brutale 800 RR',
    model_year: 2024,
    engine_cc: 798,
    horsepower: 140.0,
    torque: 87.0,
    top_speed: 245,
    mileage: 18.0,
    price: 16500.00,
    category: 'Street Sport',
    description: 'Triple-cylinder aggression wrapped in Italian design.',
    colors: [
      { name: 'Ago Red/Silver', hex: '#CC0000' },
      { name: 'Pearl Ice/Carbon', hex: '#FFFFFF' }
    ],
    images: [
      'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800'
    ]
  },
  {
    brand: 'MV Agusta',
    name: 'Dragster 800 RR',
    model_year: 2024,
    engine_cc: 798,
    horsepower: 140.0,
    torque: 87.0,
    top_speed: 240,
    mileage: 17.5,
    price: 18500.00,
    category: 'Street Sport',
    description: 'Muscular streetfighter with unique Italian flair.',
    colors: [
      { name: 'Ago Red', hex: '#CC0000' },
      { name: 'Matt Black', hex: '#1C1C1C' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-3f4c9c6d25f5?w=800'
    ]
  },
  {
    brand: 'MV Agusta',
    name: 'Turismo Veloce 800',
    model_year: 2024,
    engine_cc: 798,
    horsepower: 110.0,
    torque: 83.0,
    top_speed: 225,
    mileage: 20.0,
    price: 19500.00,
    category: 'Street Sport',
    description: 'Sport-touring with Italian passion and versatility.',
    colors: [
      { name: 'Ago Red/Silver', hex: '#CC0000' },
      { name: 'Matt Carbon/Silver', hex: '#2C2C2C' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800'
    ]
  },
  {
    brand: 'MV Agusta',
    name: 'F3 800',
    model_year: 2023,
    engine_cc: 798,
    horsepower: 147.0,
    torque: 88.0,
    top_speed: 250,
    mileage: 17.0,
    price: 18998.00,
    category: 'SuperSport',
    description: 'Middleweight masterpiece with triple-cylinder howl.',
    colors: [
      { name: 'Ago Red/Silver', hex: '#CC0000' },
      { name: 'Pearl Ice White', hex: '#FFFFFF' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980663-3685c1d673c4?w=800'
    ]
  },

  // Harley Davidson Sport Bikes (5 bikes)
  {
    brand: 'Harley Davidson',
    name: 'LiveWire',
    model_year: 2024,
    engine_cc: 0,
    horsepower: 105.0,
    torque: 116.0,
    top_speed: 177,
    mileage: 146.0,
    price: 22799.00,
    category: 'Street Sport',
    description: 'Electric sport bike breaking Harley tradition.',
    colors: [
      { name: 'Vivid Black', hex: '#000000' },
      { name: 'Orange Fuse', hex: '#FF6600' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800'
    ]
  },
  {
    brand: 'Harley Davidson',
    name: 'Sportster S',
    model_year: 2024,
    engine_cc: 1252,
    horsepower: 121.0,
    torque: 127.0,
    top_speed: 200,
    mileage: 18.0,
    price: 15999.00,
    category: 'Street Sport',
    description: 'Revolution Max V-twin in aggressive streetfighter chassis.',
    colors: [
      { name: 'Vivid Black', hex: '#000000' },
      { name: 'Gunship Gray', hex: '#707070' },
      { name: 'Redline Red', hex: '#CC0000' }
    ],
    images: [
      'https://images.unsplash.com/photo-1591799265444-d66432b91588?w=800'
    ]
  },
  {
    brand: 'Harley Davidson',
    name: 'Pan America 1250 Special',
    model_year: 2024,
    engine_cc: 1252,
    horsepower: 150.0,
    torque: 128.0,
    top_speed: 210,
    mileage: 19.0,
    price: 19499.00,
    category: 'Street Sport',
    description: 'Adventure bike with sport performance capability.',
    colors: [
      { name: 'Vivid Black', hex: '#000000' },
      { name: 'River Rock Gray', hex: '#808080' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-1ba1a814e6e8?w=800'
    ]
  },
  {
    brand: 'Harley Davidson',
    name: 'Street Bob 114',
    model_year: 2024,
    engine_cc: 1868,
    horsepower: 94.0,
    torque: 155.0,
    top_speed: 180,
    mileage: 16.0,
    price: 14999.00,
    category: 'Street Sport',
    description: 'Bobber with surprising sport riding capability.',
    colors: [
      { name: 'Vivid Black', hex: '#000000' },
      { name: 'Midnight Crimson', hex: '#8B0000' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980663-3685c1d673c4?w=800'
    ]
  },
  {
    brand: 'Harley Davidson',
    name: 'Nightster',
    model_year: 2024,
    engine_cc: 975,
    horsepower: 90.0,
    torque: 95.0,
    top_speed: 175,
    mileage: 20.0,
    price: 13499.00,
    category: 'Street Sport',
    description: 'Modern Revolution Max sportster with classic vibes.',
    colors: [
      { name: 'Vivid Black', hex: '#000000' },
      { name: 'Gunship Gray', hex: '#707070' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800'
    ]
  }
];

async function seedDatabase() {
  const client = await pool.connect();
  
  try {
    console.log('🚀 Starting database seed...');
    
    // Begin transaction
    await client.query('BEGIN');
    
    // Insert brands and create mapping
    console.log('📦 Inserting brands...');
    const brandMap = {};
    
    for (const brand of brands) {
      const result = await client.query(
        'INSERT INTO brands (name, logo_url) VALUES ($1, $2) ON CONFLICT (name) DO UPDATE SET logo_url = $2 RETURNING id',
        [brand.name, brand.logo_url]
      );
      brandMap[brand.name] = result.rows[0].id;
      console.log(`  ✓ ${brand.name}`);
    }
    
    // Insert bikes with colors and images
    console.log('\n🏍️  Inserting bikes...');
    let bikeCount = 0;
    
    for (const bike of bikes) {
      const brand_id = brandMap[bike.brand];
      
      // Insert bike
      const bikeResult = await client.query(
        `INSERT INTO bikes (
          brand_id, name, model_year, engine_cc, horsepower, 
          torque, top_speed, mileage, price, category, description
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id`,
        [
          brand_id,
          bike.name,
          bike.model_year,
          bike.engine_cc,
          bike.horsepower,
          bike.torque,
          bike.top_speed,
          bike.mileage,
          bike.price,
          bike.category,
          bike.description
        ]
      );
      
      const bike_id = bikeResult.rows[0].id;
      
      // Insert colors
      if (bike.colors && bike.colors.length > 0) {
        for (const color of bike.colors) {
          await client.query(
            'INSERT INTO bike_colors (bike_id, color_name, color_hex) VALUES ($1, $2, $3)',
            [bike_id, color.name, color.hex]
          );
        }
      }
      
      // Insert images
      if (bike.images && bike.images.length > 0) {
        for (let i = 0; i < bike.images.length; i++) {
          await client.query(
            'INSERT INTO bike_images (bike_id, image_url, is_primary, display_order) VALUES ($1, $2, $3, $4)',
            [bike_id, bike.images[i], i === 0, i]
          );
        }
      }
      
      bikeCount++;
      console.log(`  ✓ ${bike.brand} ${bike.name} (${bike.model_year})`);
    }
    
    // Create default admin user
    console.log('\n👤 Creating admin user...');
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    await client.query(
      `INSERT INTO users (username, email, password_hash, role) 
       VALUES ($1, $2, $3, $4) 
       ON CONFLICT (email) DO NOTHING`,
      ['admin', 'admin@sportbikes.com', hashedPassword, 'admin']
    );
    console.log('  ✓ Admin user created (email: admin@sportbikes.com, password: admin123)');
    
    // Commit transaction
    await client.query('COMMIT');
    
    console.log(`\n✅ Database seeded successfully!`);
    console.log(`   📊 Brands: ${brands.length}`);
    console.log(`   🏍️  Bikes: ${bikeCount}`);
    console.log(`\n🎉 Ready to start the server!`);
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

// Run seed
seedDatabase().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});

