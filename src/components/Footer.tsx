import Link from 'next/link'
import React from 'react'
import { BsInstagram, BsGithub, BsLinkedin, BsTwitter } from 'react-icons/bs'

function Footer() {
  return (
    <div className='mx-auto rounded-lg mb-0'>
        <div className='flex flex-col items-center bg-neutral-900'>
            <h1 className='font-semibold text-xl m-4'>Socials</h1>
            <ul className='flex gap-x-8 mb-10'>
                <li><Link href='https://github.com/priyanshu07222' target='_blank'><BsGithub className='size-8 hover:' /></Link></li>
                <li><Link href='https://x.com/Priyanshuu_eth' target='_blank'><BsTwitter className='size-8' /></Link></li>
                <li><Link href='https://www.linkedin.com/in/priyanshueth/' target='_blank'><BsLinkedin className='size-8' /></Link></li>
                <li><Link href='https://www.instagram.com/priyanshuu.eth/' target='_blank'><BsInstagram className='size-8' /></Link></li>
            </ul>
        </div>
        <div className='bg-neutral-950 py-4'>
            <p className='text-center'>Copyright <span>&#169;</span>2022, Design by Priyanshu</p>
        </div>
    </div>
  )
}

export default Footer