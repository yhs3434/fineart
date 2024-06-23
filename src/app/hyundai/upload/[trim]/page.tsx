import React from 'react'
import styles from './page.module.scss'

export default function UploadTrimPage({params}: {params: {trim: string}}) {
    return (
        <div className={styles.container}>
            {params.trim} 
        </div>
    )
}
