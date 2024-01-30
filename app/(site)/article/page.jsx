import prisma from '@/app/lib/prisma';
import Link from 'next/link';

const Article = async () => {
  const posts = await prisma.post.findMany({
    orderBy: {
      id: 'desc',
    },
    include: {
      author: true,
    },
  });

  return (
    <div className='max-w-4xl mx-auto py-8 text-center'>
      <h1 className='text-3xl font-bold mb-4'>Articles</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/article/${post.id}`}
            className='bg-white p-4 rounded-md shadow-md'
          >
            <h2 className='text-xl font-bold'>{post.title}</h2>
            <p>Written by: {post.author?.username}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Article;