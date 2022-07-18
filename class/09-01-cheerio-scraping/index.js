import cheerio from 'cheerio'
import axios from 'axios'

async function getOpenGraph(contents) {
    const openGraph = {
    // title: '',
    // description: '',
    // image: '',
}

if (contents.includes('http')) {
    let myHttpOg = ''
    contents.split(' ').forEach((el) => {
        if (el.startsWith('http')) {
        myHttpOg = el
        }
    })

    const html = await axios.get(myHttpOg)

    const $ = cheerio.load(html.data)
    $('meta').each((_, el) => {
        if (!$(el).attr('property')) return // 없으면 종료
        const key = $(el).attr('property').split(':')[1].replace(/\url/g,'');
        const content = $(el).attr('content')
        // console.log(key)
        openGraph[key] = content
    })

    console.log(openGraph)
    }
}

// const contents = 'https://naver.com'
// getOpenGraph(contents)