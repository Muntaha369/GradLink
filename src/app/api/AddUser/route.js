import { writeFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';
import ConnectDB from '../../db/db'
import User from '../../model/model'

export async function POST(req) {
  try {

    await ConnectDB()

    const data = await req.formData();
    const file = data.get('file');
    const name = data.get('name');
    const Uname = data.get('Uname');
    const email = data.get('email');
    const pass = data.get('pass');
    const phone = data.get('phone');
    const GY = data.get('GY');
    const JobDesc = data.get('JobDesc');

    
    if (!file) {
      return NextResponse.json({ success: false, message: 'No file found' }, { status: 400 });
    }
    if (!email || !Uname || !name || !pass || !phone || !GY || !JobDesc) {
      return NextResponse.json({ success: false, message: 'Image type (imgtype) is required' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    
    const filename = `${Date.now()}-${Uname}`; 
    const filePath = path.join(process.cwd(), 'public', filename+".png");
    await writeFile(filePath, buffer);

    const newUser = await User.create({
      name,
      email,
      pass,
      phone,
      GY,
      Uname,
      JobDesc
    })

    
    console.log(`File uploaded: ${filename}`);

    return NextResponse.json({
      success: true,
      message: 'File uploaded successfully',
      User:newUser
    });

  } catch (error) {
    console.error('Error handling upload:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}