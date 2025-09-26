import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { Product, Section } from '@/lib/models'

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    const { searchParams } = new URL(request.url)

    const sectionName = searchParams.get('section')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')

    const query: any = {}

    if (sectionName && sectionName !== 'all') {
      const sectionDoc = await Section.findOne({
        name: { $regex: new RegExp(sectionName, 'i') },
        isActive: true,
      })
      if (sectionDoc) query.sectionIds = sectionDoc._id
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ]
    }

    const totalProducts = await Product.countDocuments(query)

    const products = await Product.find(query)
      .populate('sectionIds', 'name slug')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec()

    const transformedProducts = products.map((product) => ({
      id: product._id.toString(),
      title: product.title,
      description: product.description,
      displayImage: product.displayImage,
      createdAt: product.createdAt,
      sections:
        product.sectionIds?.map((section: any) => ({
          id: section._id.toString(),
          name: section.name,
          slug: section.slug,
        })) || [],
    }))

    return NextResponse.json({
      products: transformedProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page,
    })
  } catch (error: any) {
    console.error('Error fetching products:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const data = await request.json()

    if (!data.sectionIds || !Array.isArray(data.sectionIds) || data.sectionIds.length === 0) {
      return NextResponse.json({ error: 'At least one section must be selected' }, { status: 400 })
    }

    const validSections = await Section.find({
      _id: { $in: data.sectionIds },
      isActive: true,
    })

    if (validSections.length !== data.sectionIds.length) {
      return NextResponse.json({ error: 'One or more selected sections are invalid' }, { status: 400 })
    }

    const product = new Product(data)
    await product.save()

    return NextResponse.json({ success: true, id: product._id })
  } catch (error: any) {
    console.error('Error creating product:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
