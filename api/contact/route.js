// File: app/api/contact/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Parse the incoming request body
    const body = await request.json();
    
    // Validate required fields
    const { name, email, subject, message } = body;
    
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Here you would typically send an email
    // This is a placeholder for your actual email sending logic
    // You can use services like Nodemailer, SendGrid, Resend, etc.
    
    /* 
    Example using Nodemailer (you'll need to install it first):
    
    const transporter = nodemailer.createTransport({
      host: 'your-smtp-host',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: 'krishnarane2005@gmail.com', // Your email where you want to receive messages
      replyTo: email,
      subject: `New contact form submission: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Subject:</strong> ${subject}</p>
             <p><strong>Message:</strong> ${message}</p>`,
    });
    */
    
    // For now, we'll just simulate a successful response
    // In a real application, you'd handle the email sending logic above
    
    return NextResponse.json(
      { message: 'Message sent successfully! I will get back to you soon.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { message: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}