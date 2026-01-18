import { NextResponse } from 'next/server';
import { getUserData } from '../../../../lib/firebase';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ 
        success: false, 
        error: 'User ID required' 
      }, { status: 400 });
    }

    const userData = await getUserData(userId);

    if (userData) {
      return NextResponse.json({ 
        success: true, 
        user: userData 
      });
    } else {
      // Return default user data if not found
      return NextResponse.json({ 
        success: true, 
        user: {
          points: 0,
          level: 1,
          totalClicks: 0,
          challengesCompleted: [],
          achievements: []
        }
      });
    }
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
