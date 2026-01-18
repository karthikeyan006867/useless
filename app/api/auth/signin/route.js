import { NextResponse } from 'next/server';
import { getUserData } from '../../../../lib/firebase';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // For demo: Accept any email/password combo
    // In production, you'd verify against Firebase Auth
    
    // Try to find user by email (simplified - in real app use Firebase Auth)
    const userId = `user_demo_${email.split('@')[0]}`;
    
    return NextResponse.json({ 
      success: true, 
      userId,
      username: email.split('@')[0],
      message: 'Signed in successfully!' 
    });
  } catch (error) {
    console.error('Signin error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Invalid credentials' 
    }, { status: 401 });
  }
}
