import  { useState } from "react";
import { UserPlus, X, Check, ArrowLeft, Camera } from "lucide-react";
import { toast } from "react-hot-toast";
import { groupStore } from "../store/GroupStore"; 
import { useEffect } from "react";

const CreateGroupFlow = ({ onBack, onCreateGroup }) => {
  const [groupName, setGroupName] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [searchUid, setSearchUid] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [searchFound, setSearchFound] = useState("");

  // Pulling state and actions from Zustand
  const { searchResult, isSearching, searchUser, clearSearchResult } = groupStore();

  useEffect(() => {
      if (searchResult) {
        console.log(searchResult)
        setSearchFound(searchResult);
      }
    }, [searchResult]);

  const getInitials = (name) => {
    if (!name.trim()) return "GRP";
    return name.trim().split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Trigger Zustand action
  const handleSearchUser = () => {
    console.log("searching start");
    searchUser(searchUid);
  };

  const handleAddMember = () => {
    if (!searchResult) return;
    if (selectedMembers.some(m => m._id === searchResult._id)) {
      toast.error("Member already added");
      return;
    }
    setSelectedMembers([...selectedMembers, searchResult]);
    clearSearchResult(); // Reset search card after adding
    setSearchUid("");
    toast.success("Member added");
  };

  const handleRemoveMember = (id) => {
    setSelectedMembers(selectedMembers.filter(m => m._id !== id));
  };

  const handleSubmit = async () => {
    if (!groupName.trim()) {
      toast.error("Please enter a group name");
      return;
    }
    if (selectedMembers.length === 0) {
      toast.error("Please add at least one member");
      return;
    }

    setIsCreating(true);
    try {
      const groupData = {
        name: groupName,
        profilePic: imagePreview || '',
        members: selectedMembers
      };

      if (onCreateGroup) {
        await onCreateGroup(groupData);
      }
      toast.success("Group created successfully!");
    } catch (error) {
      toast.error("Failed to create group");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="w-full md:w-[380px] lg:w-[420px] bg-[#0a0a0a] border-r border-[#2ee6a8]/20 flex flex-col h-screen text-white p-4 overflow-y-auto">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#2ee6a8]/15">
        <button onClick={onBack} className="flex items-center gap-1.5 text-xs text-white/70 hover:text-[#2ee6a8] cursor-pointer">
          <ArrowLeft className="w-4 h-4 text-[#2ee6a8]" /> Back
        </button>
        <h3 className="text-sm font-bold text-white">Create New Group</h3>
      </div>

      <div className="space-y-4 flex-1">
        
        {/* Group Avatar & Name Input */}
        <div className="flex items-center gap-3 bg-black border border-[#2ee6a8]/25 p-3 rounded-xl">
          <div className="relative group shrink-0">
            {imagePreview ? (
              <img src={imagePreview} alt="Group Icon" className="w-12 h-12 rounded-full object-cover border border-[#2ee6a8]" />
            ) : (
              <div className="w-12 h-12 rounded-full bg-[#2ee6a8]/10 border border-[#2ee6a8] flex items-center justify-center text-[#2ee6a8] font-bold text-xs">
                {getInitials(groupName)}
              </div>
            )}
            <label className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <Camera className="w-4 h-4 text-[#2ee6a8]" />
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          </div>
          
          <div className="flex-1">
            <label className="block text-[9px] font-mono text-[#2ee6a8] uppercase mb-1">Group Subject</label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Enter group name..."
              className="w-full bg-black border border-[#2ee6a8]/30 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#2ee6a8]"
            />
          </div>
        </div>

        {/* Selected Members Chips */}
        {selectedMembers.length > 0 && (
          <div>
            <span className="text-[10px] font-mono text-white/50 mb-1.5 block">Selected ({selectedMembers.length})</span>
            <div className="flex flex-wrap gap-1.5">
              {selectedMembers.map((member) => (
                <div key={member._id} className="flex items-center gap-1 bg-black border border-[#2ee6a8]/40 px-2.5 py-1 rounded-full text-[11px]">
                  <span>{member.name}</span>
                  <button onClick={() => handleRemoveMember(member._id)} className="text-white/50 hover:text-red-400 cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search Member Bar */}
        <div>
          <label className="block text-[10px] font-mono text-[#2ee6a8] uppercase mb-1">Search User by UID</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={searchUid}
              onChange={(e) => setSearchUid(e.target.value)}
              placeholder="Enter UID..."
              className="flex-1 bg-black border border-[#2ee6a8]/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#2ee6a8]"
            />
            <button
              type="button"
              onClick={handleSearchUser}
              disabled={isSearching}
              className="bg-[#2ee6a8] text-black px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer disabled:opacity-50"
            >
              {isSearching ? "Searching..." : "Search"}
            </button>
          </div>
        </div>

        {/* Search Result Card (Mapped directly from your backend User schema model) */}
        {searchResult && (
          <div className="p-3 bg-black border border-[#2ee6a8]/30 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#2ee6a8]/20 flex items-center justify-center text-xs font-bold text-[#2ee6a8]">
                {searchResult.name ? searchResult.name.charAt(0) : "U"}
              </div>
              <div>
                <h5 className="text-xs font-medium text-white">{searchFound.name}</h5>
                <span className="text-[10px] text-[#2ee6a8] font-mono">UID: {searchFound.uid}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleAddMember}
              className="bg-[#2ee6a8]/20 text-[#2ee6a8] border border-[#2ee6a8]/40 px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1 cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5" /> Add
            </button>
          </div>
        )}

      </div>

      {/* Create Group Action Button */}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={isCreating || selectedMembers.length === 0 || !groupName.trim()}
        className="w-full mt-4 bg-[#2ee6a8] hover:bg-[#25b888] text-black py-2.5 rounded-xl font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40"
      >
        <Check className="w-4 h-4" />
        {isCreating ? "Creating..." : "Create Group"}
      </button>

    </div>
  );
};

export default CreateGroupFlow;