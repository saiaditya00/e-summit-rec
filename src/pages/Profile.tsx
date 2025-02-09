import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Edit } from 'lucide-react';

interface Profile {
  full_name: string;
  avatar_url: string;
  bio: string;
}

export default function Profile() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile>({
    full_name: '',
    avatar_url: '',
    bio: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    async function getProfile() {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user?.id)
          .single();

        if (error) {
          if (error.code === 'PGRST116') {
            // Profile doesn't exist, create one
            const { error: insertError } = await supabase
              .from('profiles')
              .insert([{ id: user?.id, full_name: '', avatar_url: '', bio: '' }]);
            
            if (insertError) throw insertError;
            
            // Fetch the newly created profile
            const { data: newProfile, error: fetchError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', user?.id)
              .single();
            
            if (fetchError) throw fetchError;
            if (newProfile) setProfile(newProfile);
          } else {
            throw error;
          }
        } else if (data) {
          setProfile(data);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
        setError('Failed to load profile. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    getProfile();
  }, [user, navigate]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: profile.full_name,
          bio: profile.bio,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user?.id);

      if (error) throw error;
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again.');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      setError('Failed to sign out. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Profile</h2>
            <div className="flex space-x-4">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <Edit className="h-5 w-5" />
              </button>
              <button
                onClick={handleSignOut}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                Sign Out
              </button>
            </div>
          </div>

          <div className="p-6">
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
            
            {isEditing ? (
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    value={profile.full_name}
                    onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Bio</label>
                  <textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                  <p className="mt-1 text-sm text-gray-900">{profile.full_name || 'Not set'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p className="mt-1 text-sm text-gray-900">{user?.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Bio</h3>
                  <p className="mt-1 text-sm text-gray-900">{profile.bio || 'No bio added yet'}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}