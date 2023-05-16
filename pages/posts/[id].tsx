// rface
import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import { getAllPostIds, getSortedPostsData } from '../../lib/posts'
import { getPostData } from '../../lib/posts'
import Head from 'next/head'
import pageStyles from '../page.module.css'
const Post = ({postData} : {
    postData: {
        title : string
        date : string
        contentHtml : string
    }
}) => {
  return (
    <div className={pageStyles.container}>
        <Head>
            <title>{postData.title}</title>
        </Head>
        <article>
            <h1 className={pageStyles.headingXl}>{postData.title}</h1>
            <div>
                {postData.date}
            </div>
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml}}></div>
        </article>
    </div>
  )
}

export default Post

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllPostIds();
    // [{params: {id:`pre-rendering`}, {params: {id: `ssg-ssr`}}}]
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params}) => {
    const postData = await getPostData(params.id as string)
    return {
        props: {
            postData
        }
    }
}