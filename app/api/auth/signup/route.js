import { NextResponse } from 'next/server';
import { saveUserData } from '../../../../lib/firebase';

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, email, password, favoriteColor, birthYear, luckyNumber, petName } = body;

    // Generate simple user ID
    const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Save to Firebase
    const result = await saveUserData(userId, {
      username,
      email,
      favoriteColor,
      birthYear,
      luckyNumber,
      petName,
      points: 0,
      level: 1,
      totalClicks: 0,
      challengesCompleted: [],
      achievements: []
    });

    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        userId,
        username,
        message: 'Account created successfully!' 
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        error: 'Failed to create account' 
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
