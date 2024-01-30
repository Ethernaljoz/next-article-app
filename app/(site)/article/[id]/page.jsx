import prisma from "@/app/lib/prisma";

const ArticleDetail = async ({ params }) => {

  const post = await prisma.post.findFirst({
    where: {
      id: params.id,
    },
    include: {
      author: true,
    },
  });



  return (
    <div className='max-w-4xl mx-auto py-8'>
      <h1 className='text-3xl font-bold'>{post?.title}</h1>
      <p>Written by: {post?.author?.username}</p>
      <div className='mt-4'>{post?.content}</div>
  </div>
  )
}

export default ArticleDetail