import { NextResponse } from 'next/server';
import { updateUserProgress } from '../../../../lib/firebase';

export async function POST(request) {
  try {
    const body = await request.json();
    const { userId, points, totalClicks, challengesCompleted } = body;

    if (!userId) {
      return NextResponse.json({ 
        success: false, 
        error: 'User ID required' 
      }, { status: 400 });
    }

    const result = await updateUserProgress(userId, {
      points: points || 0,
      totalClicks: totalClicks || 0,
      challengesCompleted: challengesCompleted || [],
      lastUpdated: Date.now()
    });

    return NextResponse.json({ 
      success: result.success,
      message: 'Progress updated successfully!' 
    });
  } catch (error) {
    console.error('Update progress error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
