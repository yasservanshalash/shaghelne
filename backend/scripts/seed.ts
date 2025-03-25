import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User, { Role } from '../models/User';
import Service, { ServiceStatus } from '../models/Service';
import Job from '../models/Job';
import Project from '../models/Project';
import Review from '../models/Review';
import JobApplication from '../models/JobApplication';
import Proposal from '../models/Proposal';

// Load environment variables
dotenv.config();

// The default password for all seeded users
const DEFAULT_PASSWORD = 'password123';

// Sample data for users
const users = [
  {
    email: 'admin@freeio.com',
    name: 'Admin User',
    role: Role.ADMIN,
    phoneNumber: '+1234567890',
    bio: 'System administrator for the Freeio platform.',
    isVerified: true,
    skills: [],
    portfolio: [],
    languages: [{ language: 'English', proficiency: 'Native' }],
    rating: 0,
    totalReviews: 0,
    completedJobs: 0
  },
  {
    email: 'employer1@freeio.com',
    name: 'John Smith',
    role: Role.EMPLOYER,
    phoneNumber: '+1234567891',
    bio: 'Tech company founder looking for talented freelancers.',
    isVerified: true,
    location: {
      city: 'New York',
      subCity: 'Manhattan',
      specificArea: 'Midtown'
    },
    skills: [],
    portfolio: [],
    languages: [{ language: 'English', proficiency: 'Native' }],
    rating: 4.8,
    totalReviews: 15,
    completedJobs: 25
  },
  {
    email: 'freelancer1@freeio.com',
    name: 'Sarah Johnson',
    role: Role.FREELANCER,
    phoneNumber: '+1234567892',
    profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
    bio: 'Experienced web developer with 5 years of experience in React, Node.js, and MongoDB.',
    isVerified: true,
    location: {
      city: 'San Francisco',
      subCity: 'SoMa',
      specificArea: 'Downtown'
    },
    skills: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'Express'],
    portfolio: [
      {
        title: 'E-commerce Website',
        description: 'Built a full-stack e-commerce platform',
        images: ['https://via.placeholder.com/300']
      },
      {
        title: 'Social Media App',
        description: 'Developed a social networking application',
        images: ['https://via.placeholder.com/300']
      }
    ],
    languages: [
      { language: 'English', proficiency: 'Native' },
      { language: 'Spanish', proficiency: 'Intermediate' }
    ],
    education: [
      {
        institution: 'University of California, Berkeley',
        degree: 'B.S. Computer Science',
        startDate: '2015-09-01',
        endDate: '2019-05-31'
      }
    ],
    experience: [
      {
        company: 'Tech Startup',
        position: 'Frontend Developer',
        startDate: '2019-06-01',
        endDate: '2022-05-31',
        description: 'Developed and maintained web applications using React.'
      }
    ],
    rating: 4.9,
    totalReviews: 27,
    completedJobs: 30
  },
  {
    email: 'freelancer2@freeio.com',
    name: 'Michael Chen',
    role: Role.FREELANCER,
    phoneNumber: '+1234567893',
    profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    bio: 'Graphic designer with a passion for creating beautiful and functional designs.',
    isVerified: true,
    location: {
      city: 'Los Angeles',
      subCity: 'Venice',
      specificArea: 'Abbot Kinney'
    },
    skills: ['Photoshop', 'Illustrator', 'UI/UX Design', 'Figma', 'Sketch'],
    portfolio: [
      {
        title: 'Brand Identity',
        description: 'Created brand identity for a tech startup',
        images: ['https://via.placeholder.com/300']
      },
      {
        title: 'Mobile App Design',
        description: 'Designed UI/UX for a fitness application',
        images: ['https://via.placeholder.com/300']
      }
    ],
    languages: [
      { language: 'English', proficiency: 'Advanced' },
      { language: 'Mandarin', proficiency: 'Native' }
    ],
    education: [
      {
        institution: 'Rhode Island School of Design',
        degree: 'BFA Graphic Design',
        startDate: '2016-09-01',
        endDate: '2020-05-31'
      }
    ],
    experience: [
      {
        company: 'Design Agency',
        position: 'Junior Designer',
        startDate: '2020-06-01',
        endDate: '2022-12-31',
        description: 'Worked on design projects for various clients.'
      }
    ],
    rating: 4.7,
    totalReviews: 18,
    completedJobs: 20
  },
  {
    email: 'user1@freeio.com',
    name: 'Emily Parker',
    role: Role.USER,
    phoneNumber: '+1234567894',
    isVerified: true,
    skills: [],
    portfolio: [],
    languages: [{ language: 'English', proficiency: 'Native' }],
    rating: 0,
    totalReviews: 0,
    completedJobs: 0
  }
];

// Function to seed the database
async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/freeio');
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Service.deleteMany({});
    await Job.deleteMany({});
    await Project.deleteMany({});
    await Review.deleteMany({});
    await JobApplication.deleteMany({});
    await Proposal.deleteMany({});
    
    console.log('Cleared existing data');

    // Create users with hashed passwords
    const createdUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(DEFAULT_PASSWORD, 10);
        const newUser = new User({
          ...user,
          password: hashedPassword
        });
        return newUser.save();
      })
    );
    
    console.log(`Created ${createdUsers.length} users with password: ${DEFAULT_PASSWORD}`);

    // Get user IDs for reference
    const adminUser = createdUsers.find(user => user.role === Role.ADMIN);
    const employerUser = createdUsers.find(user => user.role === Role.EMPLOYER);
    const freelancer1 = createdUsers.find(user => user.email === 'freelancer1@freeio.com');
    const freelancer2 = createdUsers.find(user => user.email === 'freelancer2@freeio.com');

    // Check if required users exist
    if (!employerUser || !freelancer1 || !freelancer2) {
      throw new Error('Failed to find required users. Make sure user data is correct.');
    }

    // Create services
    const services = [
      {
        title: 'Professional Web Development',
        description: 'I will create a modern, responsive website for your business or personal needs.',
        price: 500,
        category: 'Web Development',
        status: ServiceStatus.ACTIVE,
        deliveryTime: 7, // days
        revisions: 3,
        features: ['Responsive Design', 'SEO Optimization', 'Contact Form', '5 Pages'],
        requirements: 'Please provide your brand assets and content requirements.',
        images: ['https://via.placeholder.com/600x400'],
        userId: freelancer1._id
      },
      {
        title: 'Mobile App UI Design',
        description: 'I will design a beautiful and intuitive UI for your mobile application.',
        price: 350,
        category: 'UI/UX Design',
        status: ServiceStatus.ACTIVE,
        deliveryTime: 5, // days
        revisions: 2,
        features: ['App Icon Design', 'Up to 10 Screens', 'Source Files Included', 'Interactive Prototype'],
        requirements: 'Please provide your app concept and target audience.',
        images: ['https://via.placeholder.com/600x400'],
        userId: freelancer2._id
      },
      {
        title: 'React Native Development',
        description: 'I will develop a cross-platform mobile app using React Native.',
        price: 800,
        category: 'Mobile Development',
        status: ServiceStatus.ACTIVE,
        deliveryTime: 14, // days
        revisions: 3,
        features: ['iOS & Android', 'API Integration', 'User Authentication', 'Push Notifications'],
        requirements: 'Please provide your app requirements and API documentation if available.',
        images: ['https://via.placeholder.com/600x400'],
        userId: freelancer1._id
      }
    ];

    const createdServices = await Service.insertMany(services);
    console.log(`Created ${createdServices.length} services`);

    // Create jobs
    const jobs = [
      {
        title: 'Frontend Developer Needed for E-commerce Project',
        description: 'We are looking for an experienced frontend developer to help build our e-commerce platform.',
        requirements: ['At least 3 years of experience with React', 'Redux knowledge', 'Responsive design skills'],
        budget: 3000,
        salary: 5000,
        jobType: 'FREELANCE',
        company: {
          name: 'Tech Solutions Inc',
          size: '10-50',
          industry: 'Technology'
        },
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        category: 'Web Development',
        skills: ['React', 'Redux', 'HTML/CSS', 'JavaScript'],
        status: 'OPEN',
        location: {
          city: 'Remote',
          subCity: '',
          specificArea: ''
        },
        userId: employerUser._id
      },
      {
        title: 'Logo and Brand Identity Design',
        description: 'Looking for a talented designer to create a modern logo and brand identity for our tech startup.',
        requirements: ['Experience in branding for tech companies', 'Portfolio of previous work', 'Adobe Illustrator expertise'],
        budget: 1500,
        salary: 2000,
        jobType: 'FREELANCE',
        company: {
          name: 'Startup Innovations',
          size: '1-10',
          industry: 'Technology'
        },
        deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
        category: 'Graphic Design',
        skills: ['Logo Design', 'Brand Identity', 'Illustrator', 'Photoshop'],
        status: 'OPEN',
        location: {
          city: 'Remote',
          subCity: '',
          specificArea: ''
        },
        userId: employerUser._id
      }
    ];

    const createdJobs = await Job.insertMany(jobs);
    console.log(`Created ${createdJobs.length} jobs`);

    // Create projects
    const projects = [
      {
        title: 'Website Redesign for Marketing Agency',
        description: 'We need a complete redesign of our marketing agency website to improve user experience and conversion rates.',
        requirements: 'Looking for modern design with a focus on portfolio showcase and lead generation.',
        budget: 5000,
        deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days from now
        category: 'Web Design',
        skills: ['Web Design', 'UI/UX', 'WordPress', 'SEO'],
        status: 'OPEN',
        location: 'Remote',
        userId: employerUser._id
      },
      {
        title: 'Mobile App Development for Fitness Tracking',
        description: 'We are looking to develop a fitness tracking app for iOS and Android platforms.',
        requirements: 'Experience with fitness apps or health tracking features is a plus.',
        budget: 8000,
        deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
        category: 'Mobile Development',
        skills: ['React Native', 'iOS', 'Android', 'API Development'],
        status: 'OPEN',
        location: 'Remote',
        userId: employerUser._id
      }
    ];

    const createdProjects = await mongoose.model('Project').insertMany(projects);
    console.log(`Created ${createdProjects.length} projects`);

    // Create some reviews for services
    const reviews = [
      {
        rating: 5,
        comment: 'Excellent work! The website is exactly what I was looking for.',
        communication: 5,
        quality: 5,
        timeliness: 4,
        serviceId: createdServices[0]._id,
        userId: employerUser._id
      },
      {
        rating: 4,
        comment: 'Great design, very responsive to feedback. Would recommend.',
        communication: 5,
        quality: 4,
        timeliness: 3,
        serviceId: createdServices[1]._id,
        userId: employerUser._id
      }
    ];

    const createdReviews = await Review.insertMany(reviews);
    console.log(`Created ${createdReviews.length} reviews`);

    // Create some job applications
    const jobApplications = [
      {
        coverLetter: 'I have extensive experience in React development and would be perfect for this job.',
        expectedSalary: 2800,
        jobId: createdJobs[0]._id,
        userId: freelancer1._id,
        status: 'PENDING'
      },
      {
        coverLetter: 'I would love to work on your logo design. Please check out my portfolio.',
        expectedSalary: 1400,
        jobId: createdJobs[1]._id,
        userId: freelancer2._id,
        status: 'PENDING'
      }
    ];

    const createdApplications = await JobApplication.insertMany(jobApplications);
    console.log(`Created ${createdApplications.length} job applications`);

    // Create some proposals for projects
    const proposals = [
      {
        coverLetter: 'I have designed many marketing websites and can deliver a modern, conversion-focused design.',
        price: 4800,
        timeframe: 40, // days
        projectId: createdProjects[0]._id,
        userId: freelancer2._id,
        status: 'PENDING'
      },
      {
        coverLetter: 'I have extensive experience in React Native development and would be perfect for your fitness app.',
        price: 7500,
        timeframe: 55, // days
        projectId: createdProjects[1]._id,
        userId: freelancer1._id,
        status: 'PENDING'
      }
    ];

    const createdProposals = await Proposal.insertMany(proposals);
    console.log(`Created ${createdProposals.length} proposals`);

    console.log('Database seeded successfully!');
    console.log('================================================================');
    console.log('You can login with the following credentials:');
    console.log(`Admin: admin@freeio.com / ${DEFAULT_PASSWORD}`);
    console.log(`Employer: employer1@freeio.com / ${DEFAULT_PASSWORD}`);
    console.log(`Freelancer 1: freelancer1@freeio.com / ${DEFAULT_PASSWORD}`);
    console.log(`Freelancer 2: freelancer2@freeio.com / ${DEFAULT_PASSWORD}`);
    console.log(`Regular User: user1@freeio.com / ${DEFAULT_PASSWORD}`);
    console.log('================================================================');

    // Disconnect from MongoDB
    mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    // Disconnect from MongoDB
    mongoose.disconnect();
    process.exit(1);
  }
}

// Run the seed function
seedDatabase(); 