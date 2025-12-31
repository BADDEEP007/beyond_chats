import axios from "axios";
import * as cheerio from "cheerio";

export async function Scrape_url(req, res) {
  try {
    const url = req.body.url;
    const BLOG_URL = url.trim();
    const Blogs = [];

    const { data: html } = await axios.get(BLOG_URL);
    const $ = cheerio.load(html);

    $('article').each((i, el) => {
      const link = $(el).find('a').attr('href') || '';
      const div = $(el).find('div.card-content');
      const title = div.find('h2').text();

      
      const author = div.find('ul.entry-meta').eq(1).find('li').eq(0).text();
      const date = div.find('ul.entry-meta').eq(1).find('li').eq(1).text();

      Blogs.push({ title, link, author, date });
    });

    res.status(200).json({ data: Blogs });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
}
