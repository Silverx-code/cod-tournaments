import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProfileCreation = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    gamertag: "",
    platform: "",
    favoriteMode: "",
    skillLevel: "",
    bio: "",
    region: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const platforms = ["PlayStation", "Xbox", "PC", "Mobile"];
  const modes = ["Team Deathmatch", "Search & Destroy", "Domination", "Hardpoint", "Battle Royale"];
  const skillLevels = ["Beginner", "Intermediate", "Advanced", "Professional"];
  const regions = ["North America", "Europe", "Asia", "South America", "Africa", "Oceania"];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validation
    if (!formData.gamertag.trim()) {
      setError("Gamertag is required");
      setLoading(false);
      return;
    }

    if (!formData.platform) {
      setError("Please select a platform");
      setLoading(false);
      return;
    }

    try {
      // Replace this with your actual API call
      // const response = await fetch('/api/profile', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Profile created:", formData);
      
      // Redirect to home after successful profile creation
      navigate("/home");
    } catch (err) {
      setError("Failed to create profile. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-white text-4xl font-bold mb-2">Complete Your Profile</h1>
          <p className="text-gray-400">
            Welcome {user?.username}! Let's set up your gaming profile
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            {/* Gamertag */}
            <div>
              <label htmlFor="gamertag" className="block text-sm font-medium text-gray-300 mb-2">
                Gamertag / In-Game Name *
              </label>
              <input
                type="text"
                id="gamertag"
                name="gamertag"
                value={formData.gamertag}
                onChange={handleChange}
                placeholder="Enter your gamertag"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Platform */}
            <div>
              <label htmlFor="platform" className="block text-sm font-medium text-gray-300 mb-2">
                Primary Platform *
              </label>
              <select
                id="platform"
                name="platform"
                value={formData.platform}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a platform</option>
                {platforms.map((platform) => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                ))}
              </select>
            </div>

            {/* Favorite Mode */}
            <div>
              <label htmlFor="favoriteMode" className="block text-sm font-medium text-gray-300 mb-2">
                Favorite Game Mode
              </label>
              <select
                id="favoriteMode"
                name="favoriteMode"
                value={formData.favoriteMode}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a game mode</option>
                {modes.map((mode) => (
                  <option key={mode} value={mode}>
                    {mode}
                  </option>
                ))}
              </select>
            </div>

            {/* Skill Level */}
            <div>
              <label htmlFor="skillLevel" className="block text-sm font-medium text-gray-300 mb-2">
                Skill Level
              </label>
              <select
                id="skillLevel"
                name="skillLevel"
                value={formData.skillLevel}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select your skill level</option>
                {skillLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            {/* Region */}
            <div>
              <label htmlFor="region" className="block text-sm font-medium text-gray-300 mb-2">
                Region
              </label>
              <select
                id="region"
                name="region"
                value={formData.region}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select your region</option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>

            {/* Bio */}
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-2">
                Bio (Optional)
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself..."
                rows="4"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              <p className="text-gray-500 text-xs mt-1">
                {formData.bio.length}/500 characters
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Profile...
                  </span>
                ) : (
                  "Complete Profile"
                )}
              </button>
            </div>

            {/* Skip for now */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => navigate("/home")}
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Skip for now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileCreation;