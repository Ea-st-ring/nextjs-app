import pageStyles from './page.module.css'
import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'


const Home = ({allPostsData}: {
  // 타입을 알려주는 방식
  allPostData: {
    date: string
    title: string
    id: string
  }[]
}) => {
  return(
    <div className={pageStyles.container}>
      <Head>
        <title>Hyun</title>
      </Head>
      <section className={pageStyles.headingMd}>
        <p>[Hyun Introduction]</p>
        <p>
          (This is a website)
        </p>
      </section>
    <section className={`${pageStyles.headingMd} ${pageStyles.padding1px}`}>
      <h2 className={pageStyles.headingLg}>Blog</h2>
      <ul className={pageStyles.list}></ul>
      {allPostsData.map(({id, date, title}) =>
      <li className={pageStyles.listItem} key={id}>
        <Link href={`/posts/${id}`}>
        {title}
        </Link>
          <br/>
        <small className={pageStyles.lightText}>
          {date}
        </small>
      </li>
      )}
    </section>
    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  // 빌드 타임에 로드 위함
  return {
    props: {
      allPostsData
    }
  }
}


