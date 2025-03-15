// Sample review data for development purposes
const sampleReviews = [
  {
    id: '1',
    title: 'iPhone 15 Pro Max Review',
    slug: 'iphone-15-pro-max-review',
    content: 'The iPhone 15 Pro Max represents Apple\'s pinnacle of smartphone technology for 2023. With the new A17 Pro chip, this device delivers unprecedented performance for mobile gaming and professional applications.',
    excerpt: 'Apple\'s flagship iPhone 15 Pro Max delivers exceptional performance, a remarkable camera system, and improved battery life in a premium titanium design.',
    rating: 4.8,
    coverImage: 'https://source.unsplash.com/random/800x600/?iphone',
    createdAt: '2023-09-22T18:25:43.511Z',
    updatedAt: '2023-09-22T18:25:43.511Z',
    category: {
      id: '1',
      name: 'Smartphones',
      slug: 'smartphones'
    }
  },
  {
    id: '2',
    title: 'Samsung Galaxy S23 Ultra Review',
    slug: 'samsung-galaxy-s23-ultra-review',
    content: 'The Samsung Galaxy S23 Ultra continues Samsung\'s tradition of packing every conceivable feature into a single device. The standout feature is undoubtedly the 200MP main camera, which produces incredibly detailed photos.',
    excerpt: 'The Samsung Galaxy S23 Ultra impresses with its 200MP camera, powerful performance, and S Pen functionality, though it comes with a premium price tag.',
    rating: 4.7,
    coverImage: 'https://source.unsplash.com/random/800x600/?samsung',
    createdAt: '2023-09-21T15:30:43.511Z',
    updatedAt: '2023-09-21T15:30:43.511Z',
    category: {
      id: '1',
      name: 'Smartphones',
      slug: 'smartphones'
    }
  },
  {
    id: '3',
    title: 'MacBook Pro 16" M3 Max Review',
    slug: 'macbook-pro-16-m3-max-review',
    content: 'Apple\'s MacBook Pro 16" with the M3 Max chip represents the pinnacle of laptop performance in an impressively efficient package. The new M3 Max chip delivers desktop-class performance while maintaining the MacBook\'s legendary battery life.',
    excerpt: 'The MacBook Pro 16" with M3 Max delivers exceptional performance for creative professionals with a stunning display and all-day battery life, though at a premium price point.',
    rating: 4.9,
    coverImage: 'https://source.unsplash.com/random/800x600/?macbook',
    createdAt: '2023-09-20T10:15:43.511Z',
    updatedAt: '2023-09-20T10:15:43.511Z',
    category: {
      id: '2',
      name: 'Laptops',
      slug: 'laptops'
    }
  },
  {
    id: '4',
    title: 'Dell XPS 15 (2023) Review',
    slug: 'dell-xps-15-2023-review',
    content: 'The Dell XPS 15 continues to be one of the best Windows laptops on the market. The 2023 model features Intel\'s latest 13th generation processors and can be configured with powerful NVIDIA RTX graphics.',
    excerpt: 'The Dell XPS 15 (2023) combines premium build quality with strong performance and a gorgeous display, making it one of the best Windows laptops available.',
    rating: 4.6,
    coverImage: 'https://source.unsplash.com/random/800x600/?dell-laptop',
    createdAt: '2023-09-19T14:20:43.511Z',
    updatedAt: '2023-09-19T14:20:43.511Z',
    category: {
      id: '2',
      name: 'Laptops',
      slug: 'laptops'
    }
  },
  {
    id: '5',
    title: 'Sony WH-1000XM5 Headphones Review',
    slug: 'sony-wh-1000xm5-headphones-review',
    content: 'Sony\'s WH-1000XM5 headphones improve upon their already excellent predecessors with a new design, improved noise cancellation, and even better sound quality.',
    excerpt: 'The Sony WH-1000XM5 headphones offer best-in-class noise cancellation, excellent sound quality, and great battery life in a comfortable new design.',
    rating: 4.8,
    coverImage: 'https://source.unsplash.com/random/800x600/?headphones',
    createdAt: '2023-09-18T09:45:43.511Z',
    updatedAt: '2023-09-18T09:45:43.511Z',
    category: {
      id: '3',
      name: 'Headphones',
      slug: 'headphones'
    }
  },
  {
    id: '6',
    title: 'Apple AirPods Pro 2 Review',
    slug: 'airpods-pro-2-review',
    content: 'The second-generation AirPods Pro improve on the original formula with better noise cancellation, sound quality, and battery life. The H2 chip enables a significant jump in noise cancellation performance.',
    excerpt: 'The Apple AirPods Pro 2 offer significant improvements in noise cancellation, sound quality, and battery life, making them the best choice for Apple users.',
    rating: 4.7,
    coverImage: 'https://source.unsplash.com/random/800x600/?airpods',
    createdAt: '2023-09-17T16:35:43.511Z',
    updatedAt: '2023-09-17T16:35:43.511Z',
    category: {
      id: '3',
      name: 'Headphones',
      slug: 'headphones'
    }
  },
  {
    id: '7',
    title: 'Canon EOS R5 Review',
    slug: 'canon-eos-r5-review',
    content: 'The Canon EOS R5 represents Canon\'s most capable mirrorless camera to date. The 45MP sensor delivers exceptional image quality with excellent dynamic range and low-light performance.',
    excerpt: 'The Canon EOS R5 delivers outstanding image quality, impressive autofocus, and groundbreaking 8K video capabilities, making it a top choice for professional photographers and videographers.',
    rating: 4.8,
    coverImage: 'https://source.unsplash.com/random/800x600/?canon-camera',
    createdAt: '2023-09-16T11:20:43.511Z',
    updatedAt: '2023-09-16T11:20:43.511Z',
    category: {
      id: '4',
      name: 'Cameras',
      slug: 'cameras'
    }
  },
  {
    id: '8',
    title: 'Sony A7 IV Review',
    slug: 'sony-a7-iv-review',
    content: 'The Sony A7 IV builds upon the popular A7 III with meaningful upgrades across the board. The new 33MP sensor provides a nice bump in resolution while maintaining excellent low-light performance.',
    excerpt: 'The Sony A7 IV offers impressive image quality, improved autofocus, and enhanced video capabilities, making it an excellent all-around camera for both photographers and videographers.',
    rating: 4.7,
    coverImage: 'https://source.unsplash.com/random/800x600/?sony-camera',
    createdAt: '2023-09-15T13:15:43.511Z',
    updatedAt: '2023-09-15T13:15:43.511Z',
    category: {
      id: '4',
      name: 'Cameras',
      slug: 'cameras'
    }
  },
  {
    id: '9',
    title: 'Amazon Echo Show 10 Review',
    slug: 'amazon-echo-show-10-review',
    content: 'The Amazon Echo Show 10 (3rd Gen) introduces a unique rotating display that follows you around the room during video calls or while watching content. This feature works surprisingly well.',
    excerpt: 'The Amazon Echo Show 10 features an innovative rotating display, improved sound quality, and enhanced smart home capabilities, though it comes with a premium price tag.',
    rating: 4.5,
    coverImage: 'https://source.unsplash.com/random/800x600/?echo-show',
    createdAt: '2023-09-14T12:10:43.511Z',
    updatedAt: '2023-09-14T12:10:43.511Z',
    category: {
      id: '5',
      name: 'Smart Home',
      slug: 'smart-home'
    }
  },
  {
    id: '10',
    title: 'Google Nest Hub Max Review',
    slug: 'google-nest-hub-max-review',
    content: 'The Google Nest Hub Max combines a smart display with a security camera and smart speaker functionality. The 10-inch HD screen is bright and crisp, perfect for viewing photos, watching videos, or making video calls.',
    excerpt: 'The Google Nest Hub Max serves as an excellent central smart home controller with great sound, display quality, and the added benefit of a security camera.',
    rating: 4.6,
    coverImage: 'https://source.unsplash.com/random/800x600/?nest-hub',
    createdAt: '2023-09-13T10:05:43.511Z',
    updatedAt: '2023-09-13T10:05:43.511Z',
    category: {
      id: '5',
      name: 'Smart Home',
      slug: 'smart-home'
    }
  }
];

export default sampleReviews;
