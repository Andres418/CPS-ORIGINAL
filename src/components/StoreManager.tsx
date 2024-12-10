import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Plus, Save, Trash2, Edit2, Video } from 'lucide-react';

export const StoreManager: React.FC = () => {
  const { settings, updateSettings, addSocialLink, updateSocialLink, deleteSocialLink } = useStore();
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);

  const showSaveNotification = () => {
    setShowSaveConfirmation(true);
    setTimeout(() => setShowSaveConfirmation(false), 3000);
  };

  const handleAddTutorial = () => {
    const title = prompt('Enter tutorial title:');
    const description = prompt('Enter tutorial description:');
    const url = prompt('Enter tutorial video URL:');
    
    if (title && description && url) {
      const newTutorial = {
        id: Math.max(0, ...settings.tutorials.map(t => t.id)) + 1,
        title,
        description,
        url
      };
      
      updateSettings({
        ...settings,
        tutorials: [...settings.tutorials, newTutorial]
      });
      showSaveNotification();
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Store Settings</h2>
        <button
          onClick={showSaveNotification}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
        >
          <Save size={20} />
          Save Changes
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Store Status</h3>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={settings.isOpen}
              onChange={(e) => updateSettings({
                ...settings,
                isOpen: e.target.checked
              })}
              className="rounded border-gray-300"
            />
            <span>Store is Open</span>
          </label>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Welcome Video</h3>
          <div className="space-y-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings.welcomeVideo.enabled}
                onChange={(e) => updateSettings({
                  ...settings,
                  welcomeVideo: {
                    ...settings.welcomeVideo,
                    enabled: e.target.checked
                  }
                })}
                className="rounded border-gray-300"
              />
              <span>Enable Welcome Video</span>
            </label>
            <div>
              <label className="block text-sm font-medium text-gray-700">Video URL</label>
              <input
                type="url"
                value={settings.welcomeVideo.url}
                onChange={(e) => updateSettings({
                  ...settings,
                  welcomeVideo: {
                    ...settings.welcomeVideo,
                    url: e.target.value
                  }
                })}
                className="mt-1 block w-full rounded-md border-gray-300"
                placeholder="Enter video URL"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Business Hours</h3>
          <div className="flex gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Opening Time</label>
              <input
                type="time"
                value={settings.businessHours.start}
                onChange={(e) => updateSettings({
                  ...settings,
                  businessHours: {
                    ...settings.businessHours,
                    start: e.target.value
                  }
                })}
                className="mt-1 block rounded-md border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Closing Time</label>
              <input
                type="time"
                value={settings.businessHours.end}
                onChange={(e) => updateSettings({
                  ...settings,
                  businessHours: {
                    ...settings.businessHours,
                    end: e.target.value
                  }
                })}
                className="mt-1 block rounded-md border-gray-300"
              />
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Tutorials & Promotions</h3>
            <button
              onClick={handleAddTutorial}
              className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600"
            >
              <Video size={20} />
              Add Tutorial
            </button>
          </div>
          <div className="space-y-4">
            {settings.tutorials.map((tutorial) => (
              <div key={tutorial.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                <div>
                  <h4 className="font-medium">{tutorial.title}</h4>
                  <p className="text-sm text-gray-500">{tutorial.description}</p>
                </div>
                <button
                  onClick={() => {
                    updateSettings({
                      ...settings,
                      tutorials: settings.tutorials.filter(t => t.id !== tutorial.id)
                    });
                    showSaveNotification();
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Social Links</h3>
            <button
              onClick={() => {
                const platform = prompt('Enter social media platform:');
                const url = prompt('Enter profile URL:');
                const icon = prompt('Enter icon name (facebook, instagram, twitter, youtube, tiktok, linkedin, website):');
                if (platform && url && icon) {
                  addSocialLink({ platform, url, icon });
                  showSaveNotification();
                }
              }}
              className="bg-green-500 text-white px-3 py-1 rounded-lg flex items-center gap-1 text-sm hover:bg-green-600"
            >
              <Plus size={16} />
              Add Link
            </button>
          </div>
          <div className="space-y-2">
            {settings.socialLinks.map((link) => (
              <div key={link.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                <div>
                  <span className="font-medium">{link.platform}</span>
                  <span className="text-sm text-gray-500 ml-2">{link.url}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const url = prompt('Enter new URL:', link.url);
                      if (url) {
                        updateSocialLink({ ...link, url });
                        showSaveNotification();
                      }
                    }}
                    className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => {
                      deleteSocialLink(link.id);
                      showSaveNotification();
                    }}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showSaveConfirmation && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          Changes saved successfully!
        </div>
      )}
    </div>
  );
};