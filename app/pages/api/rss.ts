import type { NextApiRequest, NextApiResponse } from 'next';
import { Article } from '#logic/data/types';
import { getFeedArticles } from '#modules/rss/services/rssFeed';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Article[] | { message: string }>,
) {
  const { url } = req.query;

  if (typeof url !== 'string') {
    return res.status(400).json({ message: 'URL must be a valid string.' });
  }

  try {
    const articles = await getFeedArticles(url);
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Oops, something went wrong! Please try again later' });
  }
}
