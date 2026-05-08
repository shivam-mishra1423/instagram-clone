import { useQuery, useQueryClient } from 'react-query'
import axios from 'axios'
import { Heart, MessageCircle, Send, Bookmark, Loader2 } from 'lucide-react'
import { useState } from 'react'

export function Home() {
  const queryClient = useQueryClient()
  const [likingPostId, setLikingPostId] = useState(null)

  const { data: posts, isLoading, error } = useQuery('posts', async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('No authentication token found')
    }
    
    const response = await axios.get('/api/posts', {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      timeout: 10000 // 10 second timeout
    })
    return response.data
  }, {
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: 30000 // 30 seconds
  })

  const handleLike = async (postId) => {
    try {
      setLikingPostId(postId)
      const token = localStorage.getItem('token')
      
      if (!token) {
        throw new Error('No authentication token')
      }

      await axios.post(`/api/posts/${postId}/like`, {}, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        timeout: 5000
      })
      
      // Optimistic update - better than page reload
      queryClient.invalidateQueries('posts')
      
    } catch (error) {
      console.error('Error liking post:', error)
      alert(error.response?.data?.message || 'Failed to like post. Please try again.')
    } finally {
      setLikingPostId(null)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        <p>Error loading posts: {error.message}</p>
        <button 
          onClick={() => queryClient.invalidateQueries('posts')}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto space-y-6 pb-8">
      <section className="rounded-3xl overflow-hidden border border-gray-200 shadow-sm bg-white">
        <img
          src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80"
          alt="Social feed preview"
          className="w-full h-64 object-cover"
          loading="lazy"
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold">Welcome to your Instagram-inspired feed</h2>
          <p className="mt-2 text-gray-600 text-sm">
            This sample image shows how post media will appear in the app. Scroll down to view actual posts from the API.
          </p>
        </div>
      </section>

      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <article key={post.id} className="bg-white border border-gray-200 rounded-lg">
            {/* Post Header */}
            <div className="flex items-center p-4">
              <img
                src={post.owner?.profile_picture_url || '/default-avatar.png'}
                alt={post.owner?.username || 'User'}
                className="w-8 h-8 rounded-full mr-3 object-cover"
                onError={(e) => { e.target.src = '/default-avatar.png' }}
              />
              <span className="font-semibold">{post.owner?.username || 'Unknown User'}</span>
            </div>

            {/* Post Image */}
            {post.image_url && (
              <img
                src={post.image_url}
                alt="Post"
                className="w-full aspect-square object-cover"
                loading="lazy"
                onError={(e) => { e.target.style.display = 'none' }}
              />
            )}

            {/* Post Actions */}
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleLike(post.id)}
                    disabled={likingPostId === post.id}
                    className={`p-1 transition-colors ${
                      post.is_liked ? 'text-red-500' : 'text-gray-700 hover:text-red-500'
                    } disabled:opacity-50`}
                  >
                    {likingPostId === post.id ? (
                      <Loader2 size={24} className="animate-spin" />
                    ) : (
                      <Heart size={24} fill={post.is_liked ? 'currentColor' : 'none'} />
                    )}
                  </button>
                  <button className="p-1 text-gray-700 hover:text-blue-500 transition-colors">
                    <MessageCircle size={24} />
                  </button>
                  <button className="p-1 text-gray-700 hover:text-blue-500 transition-colors">
                    <Send size={24} />
                  </button>
                </div>
                <button className="p-1 text-gray-700 hover:text-blue-500 transition-colors">
                  <Bookmark size={24} />
                </button>
              </div>

              {/* Likes Count */}
              <div className="font-semibold text-sm mb-1">
                {post.likes_count || 0} {post.likes_count === 1 ? 'like' : 'likes'}
              </div>

              {/* Caption */}
              {post.caption && (
                <div className="text-sm">
                  <span className="font-semibold mr-2">{post.owner?.username}</span>
                  {post.caption}
                </div>
              )}

              {/* Comments Count */}
              {post.comments_count > 0 && (
                <button className="text-gray-500 text-sm mt-1 hover:text-gray-700 transition-colors">
                  View all {post.comments_count} {post.comments_count === 1 ? 'comment' : 'comments'}
                </button>
              )}
            </div>
          </article>
        ))
      ) : (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500">No posts yet. Follow some users to see their posts!</p>
        </div>
      )}
    </div>
  )
}
