"use client";

import { useState, useRef, useEffect } from "react";
import { EllipsisVertical, Search, Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { samplePlayers } from "@/constant/DummyData";
import ConfirmationModal from "@/components/ui/ConfirmationModal";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function PlayerStats() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);
  const [activePopup, setActivePopup] = useState(null);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    matchId: string | null;
    matchDetails: string;
  }>({
    isOpen: false,
    matchId: null,
    matchDetails: "",
  });
  const router = useRouter();
  const popupRef = useRef<any>(null);

  const filteredPlayers = samplePlayers.filter((player) =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close popup when clicking outside
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setActivePopup(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEllipsisClick = (e: any, playerId: any) => {
    e.stopPropagation(); // Prevent row click
    setActivePopup(activePopup === playerId ? null : playerId);
  };

  const handleEditMatch = (match: any) => {
    // Implement edit functionality here
    console.log("Edit match:", match);
  };

  const handleDeleteMatch = (match: any) => {
    console.log("match", match);

    setDeleteModal({
      isOpen: true,
      matchId: match.id,
      matchDetails: `${match.name}`,
    });
  };

  const confirmDelete = () => {
    if (deleteModal.matchId) {
      console.log("Deleting match:", deleteModal.matchId);
    }
    setDeleteModal({ isOpen: false, matchId: null, matchDetails: "" });
  };

  const cancelDelete = () => {
    setDeleteModal({ isOpen: false, matchId: null, matchDetails: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Player Statistics
          </h1>
          <p className="mt-2 text-gray-600">
            Comprehensive statistics for professional snooker players
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500"
              placeholder="Search players by name or country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Players List */}
          <div className="lg:col-span-3 ">
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Players</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {filteredPlayers.map((player, index) => (
                  <div
                    key={player.id}
                    className={`p-6 hover:bg-gray-50 cursor-pointer transition-colors relative ${
                      selectedPlayer?.id === player.id
                        ? "bg-green-50 border-l-4 border-green-500"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedPlayer(player);
                      router.push(`/player-details/${player.id}`);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="items-center">
                        <h3 className="text-lg font-medium text-gray-900">
                          {player.name}
                        </h3>
                        <div
                          className={`w-[70px] h-[10px] rounded-full`}
                          style={{ backgroundColor: player.color }}
                        ></div>
                      </div>

                      {/* Ellipsis with Popup Menu */}
                      <div className="relative">
                        <button
                          onClick={(e) => handleEllipsisClick(e, player.id)}
                          className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                        >
                          <BsThreeDotsVertical className="h-5 w-5 text-gray-500" />
                        </button>

                        {/* Popup Menu */}
                        {activePopup === player.id && (
                          <div
                            ref={popupRef}
                            className="absolute right-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10"
                          >
                            <div className="py-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditMatch(player);
                                }}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                              >
                                <Edit className="h-4 w-4 mr-3" />
                                Edit
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteMatch(player);
                                }}
                                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                              >
                                <Trash2 className="h-4 w-4 mr-3" />
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Total Matches</p>
                        <p className="text-lg font-semibold">
                          {player.matchesPlayed}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Life Time Score</p>
                        <p className="text-lg font-semibold">
                          {player.lifetimeScore}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Average Score</p>
                        <p className="text-lg font-semibold">
                          {player.averageScore}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        title="Delete Match"
        message={
          <>
            Are you sure you want to delete the record{" "}
            <span className="font-bold text-red-700 text-[16px]">
              {deleteModal.matchDetails}
            </span>
            ? This action cannot be undone.
          </>
        }
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
}
