import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  MessageCircle, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  Send,
  ArrowLeft,
  User,
  Clock,
  BookOpen,
  Save,
  X
} from 'lucide-react';
import axios from 'axios';

const Forum = () => {
  const { forumId } = useParams();
  const navigate = useNavigate();
  const [forum, setForum] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showReplies, setShowReplies] = useState(null);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [newReply, setNewReply] = useState('');
  const [editingPost, setEditingPost] = useState(null);
  const [editPostData, setEditPostData] = useState({ title: '', content: '' });
  const [loading, setLoading] = useState(true);
  
  const studentId = localStorage.getItem('id');
  const userName = localStorage.getItem('userName') || 'Học viên';

  // Fetch forum details
  const fetchForum = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/forum/${forumId}`);
      setForum(res.data);
    } catch (err) {
      console.log('Error fetching forum:', err);
      if (err.response?.status === 404) {
        setForum({
          forumId: forumId,
          name: `Diễn đàn khóa học ${forumId}`,
          description: 'Thảo luận về khóa học',
          courseId: forumId,
          posts: []
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // Search posts within forum
  const searchPosts = async () => {
    if (!forum) return;
    
    try {
      const res = await axios.get(`http://localhost:8080/posts/search`, {
        params: { 
          courseId: forumId, 
          keyword: searchTerm, 
          sortType: 'newest' 
        }
      });
      
      setForum(prev => ({
        ...prev,
        posts: res.data
      }));
    } catch (err) {
      console.log('Error searching posts:', err);
    }
  };

  useEffect(() => {
    if (forumId) {
      fetchForum();
    }
  }, [forumId]);

  useEffect(() => {
    if (searchTerm && forumId) {
      searchPosts();
    } else if (forumId) {
      fetchForum();
    }
  }, [searchTerm, forumId]);

  // Create new post
  const handleCreatePost = async () => {
    if (!newPost.title || !newPost.content) {
      alert('Vui lòng nhập tiêu đề và nội dung');
      return;
    }

    try {
      await axios.post('http://localhost:8080/posts/add', {
        forumId: forumId,
        userId: studentId,
        title: newPost.title,
        content: newPost.content
      });
      
      setNewPost({ title: '', content: '' });
      setShowCreatePost(false);
      fetchForum();
      alert('Đăng bài thành công!');
    } catch (err) {
      console.log('Error creating post:', err);
      alert('Có lỗi xảy ra khi đăng bài');
    }
  };

  // Update post
  const handleUpdatePost = async () => {
    if (!editPostData.title || !editPostData.content) {
      alert('Vui lòng nhập tiêu đề và nội dung');
      return;
    }

    try {
      await axios.put('http://localhost:8080/posts/update', {
        postId: editingPost.postId,
        forumId: forumId,
        title: editPostData.title,
        content: editPostData.content
      });
      
      setEditingPost(null);
      setEditPostData({ title: '', content: '' });
      fetchForum();
      alert('Cập nhật bài viết thành công!');
    } catch (err) {
      console.log('Error updating post:', err);
      alert('Có lỗi xảy ra khi cập nhật bài viết');
    }
  };

  // Delete post
  const handleDeletePost = async (postId) => {
    if (!confirm('Bạn có chắc chắn muốn xóa bài viết này?')) return;

    try {
      await axios.delete('http://localhost:8080/posts/delete', {
        params: { postId, forumId: forumId }
      });
      
      fetchForum();
      alert('Đã xóa bài viết');
    } catch (err) {
      console.log('Error deleting post:', err);
      alert('Có lỗi xảy ra khi xóa bài viết');
    }
  };

  // Add reply
  const handleAddReply = async (postId) => {
    if (!newReply.trim()) {
      alert('Vui lòng nhập nội dung phản hồi');
      return;
    }

    try {
      await axios.post('http://localhost:8080/posts/reply', {
        postId: postId,
        forumId: forumId,
        userId: studentId,
        content: newReply
      });
      
      setNewReply('');
      fetchReplies(postId);
      alert('Phản hồi thành công!');
    } catch (err) {
      console.log('Error adding reply:', err);
      alert('Có lỗi xảy ra khi phản hồi');
    }
  };

  // Delete reply
  const handleDeleteReply = async (replyId, postId) => {
    if (!confirm('Bạn có chắc chắn muốn xóa phản hồi này?')) return;

    try {
      await axios.delete('http://localhost:8080/posts/reply', {
        params: { 
          replyId: replyId, 
          postId: postId, 
          forumId: forumId 
        }
      });
      
      fetchReplies(postId);
      alert('Đã xóa phản hồi');
    } catch (err) {
      console.log('Error deleting reply:', err);
      alert('Có lỗi xảy ra khi xóa phản hồi');
    }
  };

  // Fetch replies for a post
  const fetchReplies = async (postId) => {
    try {
      const res = await axios.get(`http://localhost:8080/posts/${postId}/replies`, {
        params: { forumId: forumId }
      });
      
      setForum(prev => ({
        ...prev,
        posts: prev.posts.map(post => 
          post.postId === postId ? { ...post, replies: res.data } : post
        )
      }));
    } catch (err) {
      console.log('Error fetching replies:', err);
    }
  };

  // Start editing a post
  const startEditingPost = (post) => {
    setEditingPost(post);
    setEditPostData({
      title: post.title,
      content: post.content
    });
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingPost(null);
    setEditPostData({ title: '', content: '' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">⏳</div>
          <p className="text-gray-600">Đang tải diễn đàn...</p>
        </div>
      </div>
    );
  }

  if (!forum) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">❌</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Không tìm thấy diễn đàn</h3>
          <p className="text-gray-600">Diễn đàn không tồn tại hoặc đã bị xóa</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-500 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(`/student/courseParam/${forumId}`)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft size={20} />
                Quay lại khóa học
              </button>
            </div>
            
            <button
              onClick={() => setShowCreatePost(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={20} />
              Bài viết mới
            </button>
          </div>

          <div className="flex items-center gap-3 mb-2">
            <MessageCircle className="text-blue-600" size={24} />
            <h1 className="text-2xl font-bold text-gray-900">{forum.name}</h1>
          </div>
          
          <p className="text-gray-600 mb-4">{forum.description}</p>
          
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <BookOpen size={16} />
              <span>Mã khóa học: {forum.courseId}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle size={16} />
              <span>{forum.posts?.length || 0} bài viết</span>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Tìm kiếm bài viết..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Create Post Modal */}
        {showCreatePost && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Bài viết mới</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề</label>
                  <input
                    type="text"
                    value={newPost.title}
                    onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Nhập tiêu đề bài viết..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nội dung</label>
                  <textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                    rows={6}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    placeholder="Nhập nội dung bài viết..."
                  />
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <button
                  onClick={() => setShowCreatePost(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleCreatePost}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Đăng bài
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Post Modal */}
        {editingPost && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Chỉnh sửa bài viết</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề</label>
                  <input
                    type="text"
                    value={editPostData.title}
                    onChange={(e) => setEditPostData({...editPostData, title: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Nhập tiêu đề bài viết..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nội dung</label>
                  <textarea
                    value={editPostData.content}
                    onChange={(e) => setEditPostData({...editPostData, content: e.target.value})}
                    rows={6}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    placeholder="Nhập nội dung bài viết..."
                  />
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <button
                  onClick={cancelEditing}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleUpdatePost}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Save size={16} className="inline mr-2" />
                  Lưu thay đổi
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Posts List */}
        <div className="space-y-4">
          {!forum.posts || forum.posts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <MessageCircle className="text-gray-400 mx-auto mb-4" size={48} />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Chưa có bài viết nào</h3>
              <p className="text-gray-600">Hãy là người đầu tiên đăng bài trong diễn đàn này</p>
            </div>
          ) : (
            forum.posts.map(post => (
              <div key={post.postId} className="bg-white rounded-lg shadow-sm border border-gray-500 overflow-hidden">
                {/* Post Header */}
                <div className="p-4 border-b border-gray-200 bg-green-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg mb-2">{post.title}</h3>
                      <p className="text-gray-700 mb-3">{post.content}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <User size={14} />
                          <span>{post.userName}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{post.createdAt}</span>
                        </div>
                        <button
                          onClick={() => {
                            setShowReplies(showReplies === post.postId ? null : post.postId);
                            if (showReplies !== post.postId) {
                              fetchReplies(post.postId);
                            }
                          }}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          {post.replyCount || 0} phản hồi
                        </button>
                      </div>
                    </div>
                    
                    {post.userId == studentId && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEditingPost(post)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                          title="Chỉnh sửa"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => handleDeletePost(post.postId)}
                          className="text-red-600 hover:text-red-800 p-1"
                          title="Xóa"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Replies Section */}
                {showReplies === post.postId && (
                  <div className="p-4 bg-gray-400">
                    {/* Replies List */}
                    {post.replies && post.replies.length > 0 ? (
                      <div className="space-y-3 mb-4">
                        {post.replies.map(reply => (
                          <div key={reply.replyId} className="flex gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                              <User size={14} className="text-blue-600" />
                            </div>
                            <div className="flex-1 bg-white rounded-lg p-3 border border-gray-200">
                              <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-gray-900">{reply.userName}</span>
                                  <span className="text-xs text-gray-500">{reply.time}</span>
                                </div>
                                {reply.userId == studentId && (
                                  <button
                                    onClick={() => handleDeleteReply(reply.replyId, post.postId)}
                                    className="text-red-500 hover:text-red-700 p-1"
                                    title="Xóa phản hồi"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                )}
                              </div>
                              <p className="text-gray-700">{reply.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm mb-4"></p>
                    )}

                    {/* Add Reply */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newReply}
                        onChange={(e) => setNewReply(e.target.value)}
                        placeholder="Viết phản hồi của bạn..."
                        className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleAddReply(post.postId);
                          }
                        }}
                      />
                      <button
                        onClick={() => handleAddReply(post.postId)}
                        className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Send size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Forum;