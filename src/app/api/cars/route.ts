import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Car from '@/models/Car';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const data = await request.json();

    // Trouver le prochain ID disponible
    const lastCar = await Car.findOne().sort({ id: -1 });
    const nextId = lastCar ? lastCar.id + 1 : 1;

    const newCar = new Car({
      ...data,
      id: nextId
    });

    await newCar.save();

    return NextResponse.json(newCar, { status: 201 });
  } catch (error) {
    console.error('Error creating car:', error);
    return NextResponse.json(
      { error: 'Failed to create car' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const location = searchParams.get('location') || '';
    const brand = searchParams.get('brand') || '';
    const priceMax = searchParams.get('priceMax') || '500';
    const sortBy = searchParams.get('sortBy') || 'rating';

    const query: Record<string, any> = {};

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    if (brand) {
      query.brand = { $regex: brand, $options: 'i' };
    }

    query.price = { $lte: parseInt(priceMax) };

    const sortOptions: Record<string, any> = {};
    if (sortBy === 'price') {
      sortOptions.price = 1;
    } else if (sortBy === 'rating') {
      sortOptions.rating = -1;
    } else if (sortBy === 'horsepower') {
      sortOptions.horsepower = -1;
    }

    const cars = await Car.find(query).sort(sortOptions);

    return NextResponse.json(cars);
  } catch (error) {
    console.error('Error fetching cars:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cars' },
      { status: 500 }
    );
  }
}