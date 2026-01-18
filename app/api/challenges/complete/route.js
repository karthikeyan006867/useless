import { NextResponse } from 'next/server';
import { saveChallengeResult } from '../../../../lib/firebase';

export async function POST(request) {
  try {
    const body = await request.json();
    const { userId, challengeId, completed, score, timeSpent } = body;

    if (!userId || !challengeId) {
      return NextResponse.json({ 
        success: false, 
        error: 'User ID and Challenge ID required' 
      }, { status: 400 });
    }

    const result = await saveChallengeResult(userId, challengeId, {
      completed: completed || false,
      score: score || 0,
      timeSpent: timeSpent || 0,
      completedAt: Date.now()
    });

    return NextResponse.json({ 
      success: result.success,
      message: 'Challenge result saved!' 
    });
  } catch (error) {
    console.error('Save challenge error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
