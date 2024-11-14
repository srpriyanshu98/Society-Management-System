import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { AnnouncementData } from "@/data/announcementData";
import AddAnnouncement from "@/components/Announcement/addAnnouncement";
import EditAnnouncement from "@/components/Announcement/editAnnouncement";

import ViewAnnouncement from "@/components/Announcement/ViewAnnouncement";
import ConfirmationDialog from "@/components/ConfirmationDialog ";


export default function Announcement({ userRole }) {
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false); // View dialog visibility
  const [announcementToEdit, setAnnouncementToEdit] = useState(null);
  const [announcementToView, setAnnouncementToView] = useState(null); // Announcement being viewed
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [announcementToDelete, setAnnouncementToDelete] = useState(null);

  const fetchAnnouncements = async () => {
    try {
      setIsLoading(true);
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(AnnouncementData);
        }, 1000);
      });
      setAnnouncements(response);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const toggleDropdown = (id) => {
    setDropdownOpenId(dropdownOpenId === id ? null : id);
  };

  const handleAddAnnouncement = () => {
    setIsAddDialogOpen(true);
  };

  const handleOpenAnnouncement = (announcement) => {
    setAnnouncementToEdit(announcement);
    setIsEditDialogOpen(true);
  };

  const handleSaveAnnouncement = (newAnnouncement) => {
    if (announcementToEdit) {
      setAnnouncements((prevAnnouncements) =>
        prevAnnouncements.map((ann) =>
          ann.id === announcementToEdit.id ? newAnnouncement : ann
        )
      );
      setAnnouncementToEdit(null);
    } else {
      setAnnouncements([...announcements, newAnnouncement]);
    }
    setIsAddDialogOpen(false);
    setIsEditDialogOpen(false);
  };

  const confirmDeleteAnnouncement = (id) => {
    setAnnouncementToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteAnnouncement = () => {
    setAnnouncements((prevAnnouncements) =>
      prevAnnouncements.filter((ann) => ann.id !== announcementToDelete)
    );
    setAnnouncementToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  // Open the View Announcement dialog
  const handleViewAnnouncement = (announcement) => {
    setAnnouncementToView(announcement);
    setIsViewDialogOpen(true);
  };

  return (
    <Layout userRole={userRole}>
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle className="text-lg font-semibold">Announcement</CardTitle>
          <Button onClick={handleAddAnnouncement} className="bg-blue-500 text-white">
            Create Announcement
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              announcements.map((item) => (
                <Card key={item.id} className="border shadow-lg rounded-xl border-blue-200 pb-8">
                  <CardHeader className="relative bg-blue-500 text-white p-4 rounded-t-lg">
                    <h3 className="text-lg font-semibold">{item.Announcementtitle}</h3>
                    <div className="absolute top-3 right-3">
                      <DropdownMenu
                        open={dropdownOpenId === item.id}
                        onOpenChange={() => toggleDropdown(item.id)}
                      >
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-white">
                            <MoreVertical />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-white border rounded shadow-md">
                          <DropdownMenuItem onClick={() => handleOpenAnnouncement(item)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleViewAnnouncement(item)}>
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => confirmDeleteAnnouncement(item.id)}>
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 space-y-3">
                    <p>
                      <span className="inline-block text-slate-600">Announcement Date </span>
                      <span className="float-right">{item.Announcementdate}</span>
                    </p>
					<p>
                      <span className="inline-block text-slate-600">Announcement Time </span>
                      <span className="float-right">{item.Announcementtime}</span>
                    </p>
                    <p>
                      <span className="inline-block text-slate-600 mb-2">Description </span>
                      <span className="float-right">{item.Announcementdescription}</span>
                    </p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {isAddDialogOpen && (
        <AddAnnouncement
          isOpen={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          onSave={handleSaveAnnouncement}
        />
      )}

      {isEditDialogOpen && (
        <EditAnnouncement
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          onSave={handleSaveAnnouncement}
          announcement={announcementToEdit}
        />
      )}

      {isViewDialogOpen && (
        <ViewAnnouncement
          isOpen={isViewDialogOpen}
          announcement={announcementToView}
          onClose={() => setIsViewDialogOpen(false)}
        />
      )}

      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        title="Delete Announcement"
        description="Are you sure you want to delete this announcement?"
        onConfirm={handleDeleteAnnouncement}
        onCancel={() => setIsDeleteDialogOpen(false)}
      />
    </Layout>
  );
}
