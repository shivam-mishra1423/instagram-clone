import { useQuery } from 'react-query'
import axios from 'axios'
import { Heart, MessageCircle, Send, Bookmark } from 'lucide-react'

export function Home() {
  const { data: posts, isLoading } = useQuery('posts', async () => {
    const token = localStorage.getItem('token')
    const response = await axios.get('/api/posts', {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  })

  const handleLike = async (postId) => {
    const token = localStorage.getItem('token')
    await axios.post(`/api/posts/${postId}/like`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
    // Refetch posts
    window.location.reload()
  }

  if (isLoading) return <div className="text-center py-8">Loading...</div>

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <section className="rounded-3xl overflow-hidden border border-gray-200 shadow-sm bg-white">
        <img
          src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80"
          alt="Social feed preview"
          className="w-full h-64 object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold">Welcome to your Instagram-inspired feed</h2>
          <p className="mt-2 text-gray-600 text-sm">
            This sample image shows how post media will appear in the app. Scroll down to view actual posts from the API.
          </p>
        </div>
      </section>

      {posts?.map((post) => (
        <article key={post.id} className="bg-white border border-gray-200 rounded-lg">
          {/* Post Header */}
          <div className="flex items-center p-4">
            <img
              src={post.owner.profile_picture_url || '/default-avatar.png'}
              alt={post.owner.username}
              className="w-8 h-8 rounded-full mr-3"
            />
            <span className="font-semibold">{post.owner.username}</span>
          </div>

          {/* Post Image */}
          <img
            src={post.image_url}
            alt="Post"
            className="w-full aspect-square object-cover"
          />

          {/* Post Actions */}
          <div className="p-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex space-x-4">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`p-1 ${post.is_liked ? 'text-red-500' : 'text-gray-700'}`}
                >
                  <Heart size={24} fill={post.is_liked ? 'currentColor' : 'none'} />
                </button>
                <button className="p-1 text-gray-700">
                  <MessageCircle size={24} />
                </button>
                <button className="p-1 text-gray-700">
                  <Send size={24} />
                </button>
              </div>
              <button className="p-1 text-gray-700">
                <Bookmark size={24} />
              </button>
            </div>

            {/* Likes Count */}
            <div className="font-semibold text-sm mb-1">
              {post.likes_count} likes
            </div>

            {/* Caption */}
            {post.caption && (
              <div className="text-sm">
                <span className="font-semibold mr-2">{post.owner.username}</span>
                {post.caption}
              </div>
            )}

            {/* Comments Count */}
            {post.comments_count > 0 && (
              <button className="text-gray-500 text-sm mt-1">
                View all {post.comments_count} comments
              </button>
            )}
          </div>
        </article>
      ))}

      {(!posts || posts.length === 0) && (
        <div className="text-center py-12 text-gray-500">
          <p>No posts yet. Follow some users to see their posts!</p>
        </div>
      )}
    </div>
  )
}
