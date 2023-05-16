import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark';
import remarkHtml from 'remark-html';

// post와 join시킴
// fs로 파일 처리
// gray-matter로 파싱

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData(){
    // /posts 파일 이름을 잡아주기
    const fileNames = fs.readdirSync(postsDirectory)

    const allPostsData = fileNames.map(fileName => {
        const id = fileName.replace(/\.md$/,"");

        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf-8')

        const matterResult = matter(fileContents);

        return {
            id,
            ...matterResult.data as {data: string; title: string}
        }
    })

    // Sorting
    return allPostsData.sort((a,b) => {
        if(a.date < b.date) {
            return 1
        }
        else return -1
    })
}

export function getAllPostIds(){
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map(fileName => {
        return {
            params: {
                id: fileName.replace(/\.md$/,"")
            }
        }
    })
}

export async function getPostData(id: string) {
    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf-8')

    const matterResult = matter(fileContents);
    // 데이터 가져오기

    const processedContent = await remark()
        .use(remarkHtml)
        .process(matterResult.content);
    const contentHtml = processedContent.toString()
    ;
    // 마크다운을 html 스트링으로 파싱

    return {
        id,
        contentHtml,
        ...(matterResult.data as {date: string, title: string})
    }
}

