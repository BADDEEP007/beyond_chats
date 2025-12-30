import axios from "axios"
import * as cheerio from "cheerio"
import { articles } from "./database"
export interface Blogs_data{
  title : string,
  link :string,
  author :string,
  date:string

}

export async function Scrape_url(url:string) {
  const BLOG_URL = url.trim()
  const Blogs :Blogs_data[]=[]
  try {
    const { data: html } = await axios.get(BLOG_URL)
    const $ = cheerio.load(html)
      $('article').each((i,el)=>{
         const link = $(el).find('a').attr('href')|| '';
         const div = $(el).find('div.card-content');
         const title = div.find('h2').text();
         const author = div.find('ul li').eq(0).text();
         const date = div.find('ul li').eq(1).text();

        Blogs.push({title,link ,author,date})
      });


      console.log(Blogs)
    
  } catch (error) {
    console.log(error)
    
  }
  
  
}

