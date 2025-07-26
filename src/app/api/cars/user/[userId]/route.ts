import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Car from '@/models/Car';

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    await connectDB();

    const { userId } = params;

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    console.log('Fetching cars for user:', userId);

    // Récupérer tous les véhicules de l'utilisateur
    // Utiliser à la fois ownerId et owner pour la compatibilité
    const cars = await Car.find({
      $or: [
        { ownerId: userId },
        { owner: userId }
      ]
    });

    console.log('Found cars:', cars.length);

    return NextResponse.json(cars || []);
  } catch (error) {
    console.error('Error fetching user cars:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user cars' },
      { status: 500 }
    );
  }
}