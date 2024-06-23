import React from 'react'
import styles from './layout.module.scss'
import Link from 'next/link'

export default function HyundaiUploadLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <section className={styles.container}>
        <nav className={styles.navigation}>
            <Link href="/">PREV</Link>
            <Link href="/hyundai/edit">NEXT</Link>
        </nav>
        <p>Paste PDF text following guides.</p>
        <nav>
            <Link href="0">트림1</Link>
            <Link href="1">트림2</Link>
            <Link href="2">트림3</Link>
            <span>+</span>
            <Link href="etc">기타 안내사항</Link>
        </nav>
        <div>{children}</div>
    </section>
    )
}


